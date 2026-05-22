const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("cookie-session");
const Database = require("better-sqlite3");

const app = express();
const PORT = process.env.PORT || 10000;

const publicDir = path.join(__dirname, "public");

// SQLite (single-user demo storage per account; shared catalog)
const dbPath = path.join(__dirname, "grocery.sqlite");
const db = new Database(dbPath);

function initDb() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'User',
      created_at TEXT NOT NULL,
      last_login_at TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      icon TEXT NOT NULL,
      price REAL NOT NULL,
      nutrition TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      user_id INTEGER PRIMARY KEY,
      diet TEXT NOT NULL,
      household INTEGER NOT NULL,
      store TEXT NOT NULL,
      allergies TEXT NOT NULL,
      currency TEXT NOT NULL DEFAULT 'PHP'
    );

    CREATE TABLE IF NOT EXISTS budget (
      user_id INTEGER PRIMARY KEY,
      budget_limit REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS grocery_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      qty REAL NOT NULL,
      unit_price REAL NOT NULL,
      category TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      day TEXT NOT NULL,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pantry_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      qty REAL NOT NULL,
      expiry TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      reviewed_at TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

function seedProductsIfEmpty() {
  const count = db.prepare("SELECT COUNT(*) as c FROM products").get().c;
  if (count > 0) return;

  // Minimal starter set (UI uses local defaults too, but we now provide real DB data)
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO products (name, category, icon, price, nutrition) VALUES (@name,@category,@icon,@price,@nutrition)"
  );

  const starter = [
    { name: "Organic Banana", category: "Produce", icon: "🍌", price: 67.2, nutrition: "Potassium rich snack" },
    { name: "Red Apples", category: "Produce", icon: "🍎", price: 212.8, nutrition: "Crisp fruit for snacks" },
    { name: "Whole Milk", category: "Dairy", icon: "🥛", price: 257.6, nutrition: "Calcium and protein" },
    { name: "Chicken Breast", category: "Protein", icon: "🍗", price: 498.4, nutrition: "Lean protein" },
    { name: "Brown Rice", category: "Grains", icon: "🍚", price: 235.2, nutrition: "Fiber rich pantry staple" },
    { name: "Pasta", category: "Pantry", icon: "🍝", price: 123.2, nutrition: "Fast dinner base" },
    { name: "Hand Soap", category: "Hygiene", icon: "🧼", price: 156.8, nutrition: "Personal hygiene" },
    { name: "Toothpaste", category: "Hygiene", icon: "🪥", price: 128.8, nutrition: "Dental care" },
    { name: "Toilet Paper", category: "Household", icon: "🧻", price: 289.6, nutrition: "Bathroom essential" }
  ];

  const tx = db.transaction((items) => {
    for (const p of items) stmt.run(p);
  });
  tx(starter);
}

initDb();
seedProductsIfEmpty();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "grocery_session",
    keys: [process.env.SESSION_KEY || "dev-only-session-key"],
    httpOnly: true,
    sameSite: "lax",
    secure: false
  })
);

app.use(express.static(publicDir));

function requireAuth(req, res, next) {
  if (!req.session?.userId) return res.status(401).json({ error: "Unauthorized" });
  return next();
}

function requireAdmin(req, res, next) {
  if (!req.session?.userId) return res.status(401).json({ error: "Unauthorized" });
  const me = db.prepare("SELECT id, role FROM users WHERE id = ?").get(req.session.userId);
  if (!me) return res.status(401).json({ error: "Unauthorized" });
  if (me.role !== "Admin") return res.status(403).json({ error: "Forbidden" });
  return next();
}

function mePayload(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    joinedAt: user.created_at,
    lastLoginAt: user.last_login_at
  };
}

// Routes
app.get("/", (req, res) => res.sendFile(path.join(publicDir, "index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(publicDir, "login.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(publicDir, "admin.html")));

// Health
app.get("/api", (req, res) => {
  res.json({ message: "Personalized Grocery AI System API is running 🚀" });
});

// Auth
app.post("/api/auth/register", (req, res) => {
  const { name, email, password, role } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

  const normalizedEmail = String(email).trim().toLowerCase();

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(normalizedEmail);
  if (existing) return res.status(409).json({ error: "Email already exists" });

  const passwordHash = bcrypt.hashSync(String(password), 10);

  const now = new Date().toISOString();
  const userRole = role === "Admin" ? "Admin" : "User";

  const info = db.prepare(
    "INSERT INTO users (name, email, password_hash, role, created_at, last_login_at) VALUES (@name,@email,@password_hash,@role,@created_at,NULL)"
  ).run({
    name: String(name).trim(),
    email: normalizedEmail,
    password_hash: passwordHash,
    role: userRole,
    created_at: now
  });

  // default settings + budget
  db.prepare(
    "INSERT INTO settings (user_id, diet, household, store, allergies, currency) VALUES (?,?,?,?,?,?, 'PHP')"
  ).run(info.lastInsertRowid, "Balanced", 3, "BudgetBasket", "");
  db.prepare("INSERT INTO budget (user_id, budget_limit) VALUES (?, ?)").run(info.lastInsertRowid, 6500);
  db.prepare("INSERT INTO notifications (user_id, reviewed_at, created_at) VALUES (?, NULL, ?)").run(info.lastInsertRowid, now);

  req.session.userId = info.lastInsertRowid;
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(info.lastInsertRowid);
  res.json({ user: mePayload(user) });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(normalizedEmail);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = bcrypt.compareSync(String(password), user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const now = new Date().toISOString();
  db.prepare("UPDATE users SET last_login_at = ? WHERE id = ?").run(now, user.id);

  req.session.userId = user.id;
  res.json({ user: mePayload({ ...user, last_login_at: now }) });
});

app.post("/api/auth/logout", (req, res) => {
  req.session = null;
  res.json({ ok: true });
});

app.get("/api/me", requireAuth, (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.session.userId);
  res.json({ user: mePayload(user) });
});

// User data: settings + budget
app.get("/api/settings", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM settings WHERE user_id = ?").get(req.session.userId);
  res.json({ settings: row });
});

app.put("/api/settings", requireAuth, (req, res) => {
  const { diet, household, store, allergies } = req.body || {};
  db.prepare(
    "UPDATE settings SET diet = ?, household = ?, store = ?, allergies = ? WHERE user_id = ?"
  ).run(diet || "Balanced", Number(household || 3), store || "BudgetBasket", allergies || "", req.session.userId);
  res.json({ ok: true });
});

app.get("/api/budget", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM budget WHERE user_id = ?").get(req.session.userId);
  res.json({ budget: row });
});

app.put("/api/budget", requireAuth, (req, res) => {
  const { budget_limit } = req.body || {};
  db.prepare("UPDATE budget SET budget_limit = ? WHERE user_id = ?").run(Number(budget_limit || 6500), req.session.userId);
  res.json({ ok: true });
});

// Products (user-visible)
app.get("/api/products", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT id, name, category, icon, price, nutrition FROM products ORDER BY name ASC").all();
  res.json({ products: rows });
});

// Grocery
app.get("/api/grocery", requireAuth, (req, res) => {
  const rows = db.prepare(
    "SELECT id, product_name as name, qty, unit_price as price, category, done, created_at FROM grocery_items WHERE user_id = ? ORDER BY created_at ASC"
  ).all(req.session.userId);
  res.json({ grocery: rows });
});

app.post("/api/grocery", requireAuth, (req, res) => {
  const { name, qty, price, category } = req.body || {};
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO grocery_items (user_id, product_name, qty, unit_price, category, done, created_at) VALUES (?,?,?,?,?,0,?)"
  ).run(req.session.userId, String(name), Number(qty || 1), Number(price || 0), String(category || "General"), now);
  res.json({ ok: true });
});

app.patch("/api/grocery/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const { done, qty } = req.body || {};

  const current = db.prepare("SELECT * FROM grocery_items WHERE id = ? AND user_id = ?").get(id, req.session.userId);
  if (!current) return res.status(404).json({ error: "Not found" });

  db.prepare("UPDATE grocery_items SET done = ?, qty = ? WHERE id = ?").run(done ? 1 : 0, Number(qty ?? current.qty), id);
  res.json({ ok: true });
});

app.delete("/api/grocery/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  db.prepare("DELETE FROM grocery_items WHERE id = ? AND user_id = ?").run(id, req.session.userId);
  res.json({ ok: true });
});

// Pantry
app.get("/api/pantry", requireAuth, (req, res) => {
  const rows = db.prepare(
    "SELECT id, name, qty, expiry, created_at FROM pantry_items WHERE user_id = ? ORDER BY created_at ASC"
  ).all(req.session.userId);
  res.json({ pantry: rows });
});

app.post("/api/pantry", requireAuth, (req, res) => {
  const { name, qty, expiry } = req.body || {};
  db.prepare(
    "INSERT INTO pantry_items (user_id, name, qty, expiry, created_at) VALUES (?,?,?,?,?)"
  ).run(req.session.userId, String(name), Number(qty || 0), String(expiry), new Date().toISOString());
  res.json({ ok: true });
});

app.delete("/api/pantry/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  db.prepare("DELETE FROM pantry_items WHERE id = ? AND user_id = ?").run(id, req.session.userId);
  res.json({ ok: true });
});

// Meals
app.get("/api/meals", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT id, day, name, ingredients, created_at FROM meals WHERE user_id = ? ORDER BY created_at ASC").all(req.session.userId);
  res.json({ meals: rows });
});

app.post("/api/meals", requireAuth, (req, res) => {
  const { day, name, ingredients } = req.body || {};
  db.prepare("INSERT INTO meals (user_id, day, name, ingredients, created_at) VALUES (?,?,?,?,?)").run(req.session.userId, String(day), String(name), String(ingredients), new Date().toISOString());
  res.json({ ok: true });
});

app.delete("/api/meals/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  db.prepare("DELETE FROM meals WHERE id = ? AND user_id = ?").run(id, req.session.userId);
  res.json({ ok: true });
});

// Admin: product management
app.post("/api/products", requireAdmin, (req, res) => {
  const { name, category, icon, price, nutrition } = req.body || {};
  db.prepare("INSERT OR REPLACE INTO products (name, category, icon, price, nutrition) VALUES (?,?,?,?,?)").run(String(name), String(category || "General"), String(icon || "🛒"), Number(price || 0), String(nutrition || ""));
  res.json({ ok: true });
});

app.delete("/api/products/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  res.json({ ok: true });
});

// Notifications (computed)
app.get("/api/notifications", requireAuth, (req, res) => {
  const pantry = db.prepare("SELECT name, expiry FROM pantry_items WHERE user_id = ?").all(req.session.userId);
  const budget = db.prepare("SELECT budget_limit FROM budget WHERE user_id = ?").get(req.session.userId);
  const groceries = db.prepare("SELECT qty, unit_price, done FROM grocery_items WHERE user_id = ?").all(req.session.userId);
  const total = groceries.reduce((s, it) => s + Number(it.unit_price || 0), 0);

  const expiring = pantry.filter((item) => {
    const days = (new Date(item.expiry) - new Date()) / 86400000;
    return days <= 14;
  });

  res.json({
    notifications: [
      {
        type: total > budget.budget_limit ? "danger" : "info",
        title: total > budget.budget_limit ? "Budget limit exceeded" : "Budget on track",
        body:
          total > budget.budget_limit
            ? "Review premium items or compare prices before checkout."
            : "Your current list is within the weekly grocery target."
      },
      {
        type: "warning",
        title: `${expiring.length} pantry item${expiring.length === 1 ? "" : "s"} expiring soon`,
        body: expiring.length ? expiring.map((x) => x.name).join(", ") : "No urgent pantry expiry alerts."
      }
    ]
  });
});

app.post("/api/notifications/mark-reviewed", requireAuth, (req, res) => {
  db.prepare("UPDATE notifications SET reviewed_at = ? WHERE user_id = ?").run(new Date().toISOString(), req.session.userId);
  res.json({ ok: true });
});

// Fallback
app.get(/.*/, (req, res) => res.sendFile(path.join(publicDir, "index.html")));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


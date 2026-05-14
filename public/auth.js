const storageKey = "personalized-grocery-ai-state";

const starterProducts = [
  { name: "Organic Banana", category: "Produce", icon: "🍌", price: 67.2, nutrition: "Potassium rich snack" },
  { name: "Red Apples", category: "Produce", icon: "🍎", price: 212.8, nutrition: "Crisp fruit for snacks" },
  { name: "Broccoli", category: "Produce", icon: "🥦", price: 162.4, nutrition: "Vitamin C and fiber" },
  { name: "Spinach", category: "Produce", icon: "🥬", price: 190.4, nutrition: "Iron and folate" },
  { name: "Tomatoes", category: "Produce", icon: "🍅", price: 151.2, nutrition: "Bright sauce and salad staple" },
  { name: "Carrots", category: "Produce", icon: "🥕", price: 117.6, nutrition: "Crunchy beta-carotene" },
  { name: "Mangoes", category: "Fruit", icon: "🥭", price: 268.0, nutrition: "Tropical sweet fruit" },
  { name: "Oranges", category: "Fruit", icon: "🍊", price: 201.6, nutrition: "Vitamin C" },
  { name: "Whole Milk", category: "Dairy", icon: "🥛", price: 257.6, nutrition: "Calcium and protein" },
  { name: "Greek Yogurt", category: "Dairy", icon: "🥣", price: 285.6, nutrition: "Protein and probiotics" },
  { name: "Eggs", category: "Protein", icon: "🥚", price: 263.2, nutrition: "Versatile breakfast protein" },
  { name: "Chicken Breast", category: "Protein", icon: "🍗", price: 498.4, nutrition: "Lean protein" },
  { name: "Brown Rice", category: "Grains", icon: "🍚", price: 235.2, nutrition: "Fiber rich pantry staple" },
  { name: "Pasta", category: "Pantry", icon: "🍝", price: 123.2, nutrition: "Fast dinner base" },
  { name: "Coffee Beans", category: "Beverage", icon: "☕", price: 532.0, nutrition: "Morning drink" },
  { name: "Frozen Vegetables", category: "Frozen", icon: "🥕", price: 134.4, nutrition: "Quick cooking veggies" },
  { name: "Mixed Nuts", category: "Snacks", icon: "🥜", price: 375.2, nutrition: "Energy snack" },
  { name: "Hand Soap", category: "Hygiene", icon: "🧼", price: 156.8, nutrition: "Personal hygiene" },
  { name: "Shampoo", category: "Hygiene", icon: "🧴", price: 235.2, nutrition: "Hair care" },
  { name: "Conditioner", category: "Hygiene", icon: "🧴", price: 246.4, nutrition: "Hair conditioning" },
  { name: "Body Wash", category: "Hygiene", icon: "🧴", price: 190.4, nutrition: "Body cleansing" },
  { name: "Toothpaste", category: "Hygiene", icon: "🪥", price: 128.8, nutrition: "Dental care" },
  { name: "Toothbrush", category: "Hygiene", icon: "🪥", price: 89.6, nutrition: "Dental hygiene" },
  { name: "Mouthwash", category: "Hygiene", icon: "💧", price: 168.0, nutrition: "Oral care" },
  { name: "Deodorant", category: "Hygiene", icon: "🧴", price: 145.6, nutrition: "Personal care" },
  { name: "Facial Cleanser", category: "Hygiene", icon: "🧴", price: 201.6, nutrition: "Face care" },
  { name: "Face Moisturizer", category: "Hygiene", icon: "🧴", price: 268.0, nutrition: "Skin hydration" },
  { name: "Sunscreen", category: "Hygiene", icon: "☀️", price: 290.0, nutrition: "UV protection" },
  { name: "Lip Balm", category: "Hygiene", icon: "💄", price: 78.4, nutrition: "Lip care" },
  { name: "Feminine Hygiene Pads", category: "Hygiene", icon: "🧴", price: 268.0, nutrition: "Personal hygiene" },
  { name: "Tampons", category: "Hygiene", icon: "🧴", price: 289.6, nutrition: "Personal hygiene" },
  { name: "Baby Wipes", category: "Hygiene", icon: "🧻", price: 235.2, nutrition: "Baby care" },
  { name: "Hand Sanitizer", category: "Hygiene", icon: "💧", price: 156.8, nutrition: "Germ protection" },
  { name: "Wet Wipes", category: "Hygiene", icon: "🧻", price: 134.4, nutrition: "Cleaning wipes" },
  { name: "Toilet Paper", category: "Household", icon: "🧻", price: 289.6, nutrition: "Bathroom essential" },
  { name: "Paper Towels", category: "Household", icon: "🧻", price: 347.2, nutrition: "Cleanup essential" },
  { name: "Laundry Detergent", category: "Household", icon: "🧴", price: 638.4, nutrition: "Laundry cleaning" },
  { name: "Fabric Softener", category: "Household", icon: "🧴", price: 289.6, nutrition: "Laundry softener" },
  { name: "All Purpose Cleaner", category: "Household", icon: "🧹", price: 201.6, nutrition: "General cleaning" },
  { name: "Dish Soap", category: "Household", icon: "🧼", price: 134.4, nutrition: "Kitchen cleaning" },
  { name: "Bleach", category: "Household", icon: "🧴", price: 168.0, nutrition: "Disinfectant" },
  { name: "Trash Bags", category: "Household", icon: "🗑️", price: 268.0, nutrition: "Waste management" },
  { name: "Sponges", category: "Household", icon: "🧽", price: 95.2, nutrition: "Cleaning tool" },
  { name: "Ziploc Bags", category: "Household", icon: "🔲", price: 201.6, nutrition: "Food storage" }
];

function ensureStarterProducts(state) {
  const byName = new Map();
  starterProducts.forEach((product) => byName.set(product.name.toLowerCase(), product));
  if (Array.isArray(state.products)) {
    state.products.forEach((product) => {
      if (product?.name) {
        byName.set(product.name.toLowerCase(), product);
      }
    });
  }
  state.products = Array.from(byName.values());
  return state;
}

function readState() {
  try {
    return ensureStarterProducts(JSON.parse(localStorage.getItem(storageKey)) || {});
  } catch {
    return ensureStarterProducts({});
  }
}

function saveState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

// Tab switching
document.querySelectorAll('.auth-tab, .switch-tab').forEach(tab => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    const mode = tab.dataset.authMode;

    // Update active tab
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-auth-mode="${mode}"].auth-tab`)?.classList.add('active');

    // Show/hide panels
    document.getElementById('loginPanel').classList.toggle('hidden', mode !== 'login');
    document.getElementById('registerPanel').classList.toggle('hidden', mode !== 'register');
  });
});

// Login form handler
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value; // Note: password not actually validated

  const state = readState();
  const accounts = state.accounts || [];

  // Find user by email
  const account = accounts.find(acc => acc.email === email);

  if (!account) {
    alert("No account found with this email. Please register first.");
    return;
  }

  // Login successful (password not checked)
  state.user = {
    name: account.name,
    email: account.email,
    role: account.role,
    joinedAt: account.joinedAt,
    lastLoginAt: new Date().toISOString()
  };

  // Update last login in accounts
  account.lastLoginAt = state.user.lastLoginAt;
  saveState(state);

  window.location.href = state.user.role === "Admin" ? "admin.html" : "index.html";
});

// Register form handler
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value; // Note: password not stored
  const role = document.getElementById("registerRole").value;

  const state = readState();
  const accounts = state.accounts || [];

  // Check if email already exists
  if (accounts.some(acc => acc.email === email)) {
    alert("An account with this email already exists. Please login instead.");
    return;
  }

  // Create new account
  const newAccount = {
    name,
    email,
    role,
    joinedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };

  accounts.push(newAccount);
  state.accounts = accounts;
  state.user = {
    name: newAccount.name,
    email: newAccount.email,
    role: newAccount.role,
    joinedAt: newAccount.joinedAt,
    lastLoginAt: newAccount.lastLoginAt
  };

  saveState(state);

  window.location.href = state.user.role === "Admin" ? "admin.html" : "index.html";
});

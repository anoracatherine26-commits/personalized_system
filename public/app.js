const storageKey = "personalized-grocery-ai-state";

const products = [
  { name: "Organic Banana", category: "Produce", icon: "🍌", price: 1.2, nutrition: "Potassium rich snack" },
  { name: "Red Apples", category: "Produce", icon: "🍎", price: 3.8, nutrition: "Crisp fruit for snacks" },
  { name: "Avocado", category: "Produce", icon: "🥑", price: 2.4, nutrition: "Healthy fats" },
  { name: "Broccoli", category: "Produce", icon: "🥦", price: 2.9, nutrition: "Vitamin C and fiber" },
  { name: "Spinach", category: "Produce", icon: "🥬", price: 3.4, nutrition: "Iron and folate" },
  { name: "Romaine Lettuce", category: "Produce", icon: "🥬", price: 2.6, nutrition: "Fresh salad base" },
  { name: "Tomatoes", category: "Produce", icon: "🍅", price: 2.7, nutrition: "Bright sauce and salad staple" },
  { name: "Bell Peppers", category: "Produce", icon: "🫑", price: 3.2, nutrition: "Colorful vitamin boost" },
  { name: "Carrots", category: "Produce", icon: "🥕", price: 2.1, nutrition: "Crunchy beta-carotene" },
  { name: "Potatoes", category: "Produce", icon: "🥔", price: 3.1, nutrition: "Budget friendly starch" },
  { name: "Sweet Corn", category: "Produce", icon: "🌽", price: 2.5, nutrition: "Quick side dish" },
  { name: "Mushrooms", category: "Produce", icon: "🍄", price: 3.7, nutrition: "Savory meatless option" },
  { name: "Strawberries", category: "Fruit", icon: "🍓", price: 5.2, nutrition: "Dessert and smoothie fruit" },
  { name: "Blueberries", category: "Fruit", icon: "🫐", price: 4.9, nutrition: "Antioxidant snack" },
  { name: "Oranges", category: "Fruit", icon: "🍊", price: 3.6, nutrition: "Vitamin C" },
  { name: "Grapes", category: "Fruit", icon: "🍇", price: 4.4, nutrition: "Easy lunchbox fruit" },
  { name: "Watermelon", category: "Fruit", icon: "🍉", price: 6.8, nutrition: "Hydrating family fruit" },
  { name: "Whole Milk", category: "Dairy", icon: "🥛", price: 4.6, nutrition: "Calcium and protein" },
  { name: "Almond Milk", category: "Dairy", icon: "🥛", price: 2.4, nutrition: "Dairy-free beverage" },
  { name: "Greek Yogurt", category: "Dairy", icon: "🥣", price: 5.1, nutrition: "Protein and probiotics" },
  { name: "Cheddar Cheese", category: "Dairy", icon: "🧀", price: 4.8, nutrition: "Sandwich and snack staple" },
  { name: "Butter", category: "Dairy", icon: "🧈", price: 3.9, nutrition: "Baking essential" },
  { name: "Eggs", category: "Protein", icon: "🥚", price: 4.7, nutrition: "Versatile breakfast protein" },
  { name: "Chicken Breast", category: "Protein", icon: "🍗", price: 8.9, nutrition: "Lean protein" },
  { name: "Ground Beef", category: "Protein", icon: "🥩", price: 7.6, nutrition: "Dinner protein" },
  { name: "Pork Chops", category: "Protein", icon: "🥩", price: 7.2, nutrition: "High protein entree" },
  { name: "Tofu", category: "Protein", icon: "◻️", price: 3.3, nutrition: "Plant protein" },
  { name: "Black Beans", category: "Protein", icon: "🫘", price: 1.8, nutrition: "Fiber and protein" },
  { name: "Salmon Fillet", category: "Seafood", icon: "🐟", price: 12.5, nutrition: "Omega-3 source" },
  { name: "Shrimp", category: "Seafood", icon: "🍤", price: 10.7, nutrition: "Quick seafood protein" },
  { name: "Tuna Cans", category: "Seafood", icon: "🥫", price: 4.5, nutrition: "Pantry seafood" },
  { name: "Brown Rice", category: "Grains", icon: "🍚", price: 4.2, nutrition: "Fiber rich pantry staple" },
  { name: "White Rice", category: "Grains", icon: "🍚", price: 3.7, nutrition: "Everyday staple" },
  { name: "Quinoa 1kg", category: "Grains", icon: "🌾", price: 3.5, nutrition: "Complete grain protein" },
  { name: "Rolled Oats", category: "Grains", icon: "🥣", price: 3.2, nutrition: "Breakfast staple" },
  { name: "Whole Wheat Bread", category: "Bakery", icon: "🍞", price: 3.6, nutrition: "Whole grain option" },
  { name: "Baguette", category: "Bakery", icon: "🥖", price: 2.8, nutrition: "Soup and sandwich bread" },
  { name: "Bagels", category: "Bakery", icon: "🥯", price: 4.1, nutrition: "Breakfast bread" },
  { name: "Pasta", category: "Pantry", icon: "🍝", price: 2.2, nutrition: "Fast dinner base" },
  { name: "Tomato Sauce", category: "Pantry", icon: "🥫", price: 2.3, nutrition: "Pasta night essential" },
  { name: "Olive Oil", category: "Pantry", icon: "🫒", price: 8.4, nutrition: "Cooking oil" },
  { name: "Peanut Butter", category: "Pantry", icon: "🥜", price: 4.2, nutrition: "Protein spread" },
  { name: "Honey", category: "Pantry", icon: "🍯", price: 5.6, nutrition: "Natural sweetener" },
  { name: "Granola", category: "Breakfast", icon: "🥣", price: 4.7, nutrition: "Crunchy breakfast topper" },
  { name: "Cereal", category: "Breakfast", icon: "🥣", price: 4.3, nutrition: "Family breakfast" },
  { name: "Coffee Beans", category: "Beverage", icon: "☕", price: 9.5, nutrition: "Morning drink" },
  { name: "Green Tea", category: "Beverage", icon: "🍵", price: 4.9, nutrition: "Light caffeine option" },
  { name: "Orange Juice", category: "Beverage", icon: "🧃", price: 4.1, nutrition: "Breakfast drink" },
  { name: "Sparkling Water", category: "Beverage", icon: "💧", price: 3.9, nutrition: "Sugar-free drink" },
  { name: "Frozen Peas", category: "Frozen", icon: "🟢", price: 2.6, nutrition: "Quick vegetable side" },
  { name: "Frozen Berries", category: "Frozen", icon: "🫐", price: 5.9, nutrition: "Smoothie fruit" },
  { name: "Pizza Dough", category: "Frozen", icon: "🍕", price: 3.8, nutrition: "Easy pizza night" },
  { name: "Mixed Nuts", category: "Snacks", icon: "🥜", price: 6.7, nutrition: "Energy snack" },
  { name: "Dark Chocolate", category: "Snacks", icon: "🍫", price: 3.4, nutrition: "Sweet treat" },
  { name: "Crackers", category: "Snacks", icon: "🫓", price: 2.9, nutrition: "Cheese board snack" },
  { name: "Dish Soap", category: "Household", icon: "🧼", price: 3.3, nutrition: "Kitchen cleaning" },
  { name: "Paper Towels", category: "Household", icon: "🧻", price: 6.2, nutrition: "Cleanup essential" },
  { name: "Laundry Detergent", category: "Household", icon: "🧴", price: 11.4, nutrition: "Household supply" }
];

products.forEach((item) => {
  item.price = Number((item.price * 56).toFixed(2));
});

const priceComparison = products.slice(0, 24).map((item, index) => ({
  product: item.name,
  FreshMart: Number((item.price * (1 + ((index % 4) * 0.035))).toFixed(2)),
  BudgetBasket: Number((item.price * 0.93).toFixed(2)),
  GreenCart: Number((item.price * (0.96 + ((index % 3) * 0.025))).toFixed(2))
}));

const defaultState = {
  user: null,
  settings: {
    diet: "Balanced",
    household: 3,
    store: "BudgetBasket",
    allergies: ""
  },
  currency: "PHP",
  budgetLimit: 6500,
  grocery: [
    { id: crypto.randomUUID(), name: "Brown Rice", qty: "2", price: 470.4, category: "Grains", done: false },
    { id: crypto.randomUUID(), name: "Spinach", qty: "3", price: 571.2, category: "Produce", done: false },
    { id: crypto.randomUUID(), name: "Greek Yogurt", qty: "4", price: 1142.4, category: "Dairy", done: true }
  ],
  meals: [
    { id: crypto.randomUUID(), day: "Monday", name: "Chicken rice bowls", ingredients: "Chicken, brown rice, spinach" },
    { id: crypto.randomUUID(), day: "Wednesday", name: "Salmon and broccoli", ingredients: "Salmon, broccoli, yogurt sauce" },
    { id: crypto.randomUUID(), day: "Friday", name: "Vegetable egg toast", ingredients: "Eggs, bread, spinach" }
  ],
  pantry: [
    { id: crypto.randomUUID(), name: "Olive Oil", qty: 1, expiry: "2026-08-30" },
    { id: crypto.randomUUID(), name: "Oats", qty: 2, expiry: "2026-07-16" },
    { id: crypto.randomUUID(), name: "Canned Tomatoes", qty: 5, expiry: "2026-11-05" }
  ],
  activity: ["System initialized", "Weekly meal plan created", "Budget limit set"]
};

let state = loadState();

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return structuredClone(defaultState);

  try {
    return normalizeState({ ...structuredClone(defaultState), ...JSON.parse(saved) });
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(nextState) {
  if (nextState.currency === "PHP") return nextState;

  nextState.currency = "PHP";
  nextState.budgetLimit = Number((Number(nextState.budgetLimit || defaultState.budgetLimit) * 56).toFixed(2));
  nextState.grocery = nextState.grocery.map((item) => ({
    ...item,
    price: Number((Number(item.price || 0) * 56).toFixed(2))
  }));
  return nextState;
}

function saveState(activity) {
  if (activity) {
    state.activity = [activity, ...state.activity].slice(0, 8);
  }
  localStorage.setItem(storageKey, JSON.stringify(state));
  render();
}

function getInitials(name) {
  if (!name) return "GA";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "GA";
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value);
}

function getGroceryTotal() {
  return state.grocery.reduce((sum, item) => sum + Number(item.price || 0), 0);
}

function getQtyNumber(qty) {
  const parsed = Number.parseFloat(qty);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function getCartItemCount() {
  return state.grocery.reduce((sum, item) => sum + getQtyNumber(item.qty), 0);
}

function getProductQtyInCart(productName) {
  const item = state.grocery.find((entry) => entry.name.toLowerCase() === productName.toLowerCase() && !entry.done);
  return item ? getQtyNumber(item.qty) : 0;
}

function addProductToCart(product) {
  const existing = state.grocery.find((entry) => entry.name.toLowerCase() === product.name.toLowerCase() && !entry.done);

  if (existing) {
    const qty = getQtyNumber(existing.qty) + 1;
    existing.qty = String(qty);
    existing.price = Number((product.price * qty).toFixed(2));
    existing.category = product.category;
    saveState(`Updated ${product.name} cart quantity to ${qty}`);
    return;
  }

  state.grocery.push({
    id: crypto.randomUUID(),
    name: product.name,
    qty: "1",
    price: product.price,
    category: product.category,
    done: false
  });
  saveState(`Added ${product.name} to cart`);
}

function getBestPrice(row) {
  const stores = ["FreshMart", "BudgetBasket", "GreenCart"];
  return stores.reduce((best, store) => (row[store] < row[best] ? store : best), stores[0]);
}

function getNotifications() {
  const expiring = state.pantry.filter((item) => {
    const days = (new Date(item.expiry) - new Date()) / 86400000;
    return days <= 14;
  });
  const total = getGroceryTotal();
  const notices = [
    {
      type: total > state.budgetLimit ? "danger" : "info",
      title: total > state.budgetLimit ? "Budget limit exceeded" : "Budget on track",
      body: total > state.budgetLimit
        ? "Review premium items or compare prices before checkout."
        : "Your current list is within the weekly grocery target."
    },
    {
      type: "warning",
      title: `${expiring.length} pantry item${expiring.length === 1 ? "" : "s"} expiring soon`,
      body: expiring.length ? expiring.map((item) => item.name).join(", ") : "No urgent pantry expiry alerts."
    },
    {
      type: "info",
      title: "Recommendation engine updated",
      body: `Diet preference: ${state.settings.diet}. Favorite store: ${state.settings.store}.`
    }
  ];
  return notices;
}

function getRecommendations() {
  const pantryNames = new Set(state.pantry.map((item) => item.name.toLowerCase()));
  const groceryNames = new Set(state.grocery.map((item) => item.name.toLowerCase()));
  const base = products
    .filter((product) => !pantryNames.has(product.name.toLowerCase()) && !groceryNames.has(product.name.toLowerCase()))
    .slice(0, 5);

  if (state.settings.diet === "High protein") {
    return base.sort((a) => (["Protein", "Seafood", "Dairy"].includes(a.category) ? -1 : 1));
  }
  if (state.settings.diet === "Vegetarian") {
    return base.filter((item) => item.category !== "Seafood" && item.name !== "Chicken Breast");
  }
  return base;
}

function switchView(viewId) {
  if (viewId === "profile" && !state.user) {
    document.getElementById("authPanel").classList.remove("hidden");
    return;
  }

  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  document.getElementById("authPanel").classList.add("hidden");
}

function renderDashboard() {
  const total = getGroceryTotal();
  const budgetPercent = Math.min(100, Math.round((total / state.budgetLimit) * 100));
  const bestSavings = priceComparison.reduce((sum, row) => {
    const prices = [row.FreshMart, row.BudgetBasket, row.GreenCart];
    return sum + (Math.max(...prices) - Math.min(...prices));
  }, 0);

  document.getElementById("itemCount").textContent = state.grocery.length;
  document.getElementById("pantryCount").textContent = state.pantry.length;
  document.getElementById("budgetUsed").textContent = `${budgetPercent}%`;
  document.getElementById("savings").textContent = formatMoney(bestSavings);

  document.getElementById("recommendationList").innerHTML = getRecommendations().slice(0, 3).map((item) => `
    <div class="recommendation-mini">
      <strong>${item.icon} ${item.name}</strong>
      <span>${item.nutrition} • ${formatMoney(item.price)}</span>
    </div>
  `).join("");

  document.getElementById("mealPreview").innerHTML = state.meals.slice(0, 4).map((meal) => `
    <div class="compact-item">
      <strong>${meal.day}: ${meal.name}</strong>
      <span>${meal.ingredients}</span>
    </div>
  `).join("");
}

function renderGrocery() {
  document.getElementById("groceryTable").innerHTML = state.grocery.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${formatMoney(Number(item.price))}</td>
      <td><button type="button" class="pill ${item.done ? "" : "warning"}" data-toggle-item="${item.id}">${item.done ? "Bought" : "Needed"}</button></td>
      <td><button type="button" class="danger-button" data-delete-item="${item.id}">Remove</button></td>
    </tr>
  `).join("");
}

function renderMeals() {
  document.getElementById("mealGrid").innerHTML = state.meals.map((meal) => `
    <article class="meal-card">
      <span class="day">${meal.day}</span>
      <strong>${meal.name}</strong>
      <span>${meal.ingredients}</span>
    </article>
  `).join("");
}

function renderPantry() {
  document.getElementById("pantryGrid").innerHTML = state.pantry.map((item) => {
    const days = Math.ceil((new Date(item.expiry) - new Date()) / 86400000);
    const status = days <= 7 ? "danger" : days <= 14 ? "warning" : "";
    return `
      <article class="pantry-card">
        <strong>${item.name}</strong>
        <span>Stock: ${item.qty}</span>
        <p class="pill ${status}">Expires in ${days} days</p>
      </article>
    `;
  }).join("");
}

function renderBudget() {
  const total = getGroceryTotal();
  const percent = Math.min(100, Math.round((total / state.budgetLimit) * 100));
  const categories = state.grocery.reduce((acc, item) => {
    const category = item.category || "General";
    acc[category] = (acc[category] || 0) + Number(item.price || 0);
    return acc;
  }, {});

  document.getElementById("budgetLimit").value = state.budgetLimit;
  document.getElementById("budgetBar").style.width = `${percent}%`;
  document.getElementById("categorySpend").innerHTML = Object.entries(categories).map(([category, amount]) => `
    <div class="bar-item">
      <strong>${category} ${formatMoney(amount)}</strong>
      <div class="bar-track"><div class="bar-fill" style="width: ${Math.min(100, (amount / state.budgetLimit) * 100)}%"></div></div>
    </div>
  `).join("");
  document.getElementById("budgetAdvice").textContent = total > state.budgetLimit
    ? "You are over budget. Try swapping high-cost items with best-price alternatives from BudgetBasket or GreenCart."
    : `You have ${formatMoney(state.budgetLimit - total)} left this week. Add pantry staples while staying within your plan.`;
}

function renderProducts() {
  const search = document.getElementById("productSearch").value.toLowerCase();
  const filtered = products.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(search));
  document.getElementById("cartCount").textContent = `${getCartItemCount()} item${getCartItemCount() === 1 ? "" : "s"}`;
  document.getElementById("cartTotal").textContent = formatMoney(getGroceryTotal());
  document.getElementById("productGrid").innerHTML = filtered.map((item) => `
    <article class="product-card">
      <div class="product-icon">${item.icon}</div>
      <div>
        <strong>${item.name}</strong>
        <span>${item.category} • ${item.nutrition}</span>
      </div>
      <div class="product-meta">
        <span>${formatMoney(item.price)}</span>
        <button type="button" class="ghost-button" data-add-product="${item.name}">${getProductQtyInCart(item.name) ? `In Cart (${getProductQtyInCart(item.name)})` : "Add to Cart"}</button>
      </div>
    </article>
  `).join("");
}

function renderPrices() {
  document.getElementById("priceTable").innerHTML = priceComparison.map((row) => {
    const best = getBestPrice(row);
    return `
      <tr>
        <td>${row.product}</td>
        <td>${formatMoney(row.FreshMart)}</td>
        <td>${formatMoney(row.BudgetBasket)}</td>
        <td>${formatMoney(row.GreenCart)}</td>
        <td><span class="pill">${best}</span></td>
      </tr>
    `;
  }).join("");
}

function renderRecommendations() {
  document.getElementById("fullRecommendations").innerHTML = getRecommendations().map((item) => `
    <article class="recommend-card">
      <strong>${item.icon} ${item.name}</strong>
      <span>${item.nutrition}</span>
      <p class="pill">${item.category}</p>
    </article>
  `).join("");
}

function renderNotifications() {
  const notices = getNotifications();
  document.getElementById("notificationList").innerHTML = notices.map((notice) => `
    <article class="notification ${notice.type}">
      <strong>${notice.title}</strong>
      <p>${notice.body}</p>
    </article>
  `).join("");
  document.getElementById("adminAlerts").textContent = notices.length;
}

function renderSettings() {
  document.getElementById("dietSetting").value = state.settings.diet;
  document.getElementById("householdSetting").value = state.settings.household;
  document.getElementById("storeSetting").value = state.settings.store;
  document.getElementById("allergySetting").value = state.settings.allergies;
}

function renderProfile() {
  const accountButton = document.getElementById("accountButton");
  const profileName = state.user?.name || "Guest user";
  const profileEmail = state.user?.email || "No email saved";
  const joinedDate = state.user?.joinedAt
    ? new Date(state.user.joinedAt).toLocaleDateString()
    : "Profile not created yet";

  accountButton.textContent = state.user ? `♙ ${profileName.split(" ")[0]}` : "♙ Login";
  document.getElementById("profileInitials").textContent = getInitials(profileName);
  document.getElementById("profileName").textContent = profileName;
  document.getElementById("profileEmail").textContent = profileEmail;
  document.getElementById("profileJoined").textContent = state.user ? `Joined ${joinedDate}` : joinedDate;
  document.getElementById("profileDiet").textContent = state.settings.diet;
  document.getElementById("profileHousehold").textContent = state.settings.household;
  document.getElementById("profileStore").textContent = state.settings.store;
  document.getElementById("profileBudget").textContent = formatMoney(state.budgetLimit);
  document.getElementById("profileCartItems").textContent = getCartItemCount();
  document.getElementById("profilePantryItems").textContent = state.pantry.length;
  document.getElementById("profileAllergies").textContent = state.settings.allergies || "None";

  if (state.user) {
    document.getElementById("userName").value = state.user.name;
    document.getElementById("userEmail").value = state.user.email;
  }
}

function renderAdmin() {
  document.getElementById("adminUsers").textContent = state.user ? 1 : 0;
  document.getElementById("adminProducts").textContent = products.length;
  document.getElementById("adminProductsHero").textContent = `${products.length}+`;
  document.getElementById("activityFeed").innerHTML = state.activity.map((item) => `
    <div class="compact-item"><strong>${item}</strong><span>${new Date().toLocaleDateString()}</span></div>
  `).join("");
}

function render() {
  renderDashboard();
  renderGrocery();
  renderMeals();
  renderPantry();
  renderBudget();
  renderProducts();
  renderPrices();
  renderRecommendations();
  renderNotifications();
  renderSettings();
  renderProfile();
  renderAdmin();
}

document.addEventListener("click", (event) => {
  const profileButton = event.target.closest("[data-profile-open]");
  if (profileButton) {
    if (state.user) {
      switchView("profile");
    } else {
      document.getElementById("authPanel").classList.toggle("hidden");
    }
    return;
  }

  const button = event.target.closest("[data-view], [data-view-trigger]");
  if (!button) return;

  const view = button.dataset.view || button.dataset.viewTrigger;
  if (view === "auth") {
    document.getElementById("authPanel").classList.toggle("hidden");
    return;
  }

  switchView(view);
});

const notifyButton = document.getElementById("notifyButton");
if (notifyButton) {
  notifyButton.addEventListener("click", () => switchView("notifications"));
}

document.getElementById("authForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const existingJoinedAt = state.user?.joinedAt || new Date().toISOString();
  state.user = {
    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value,
    joinedAt: existingJoinedAt,
    lastLoginAt: new Date().toISOString()
  };
  document.getElementById("authPanel").classList.add("hidden");
  saveState(`Profile saved for ${state.user.name}`);
  switchView("profile");
});

document.getElementById("editProfileButton").addEventListener("click", () => {
  document.getElementById("authPanel").classList.remove("hidden");
});

document.getElementById("logoutButton").addEventListener("click", () => {
  const name = state.user?.name || "User";
  state.user = null;
  document.getElementById("userPassword").value = "";
  saveState(`${name} logged out`);
  switchView("dashboard");
});

document.getElementById("groceryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("groceryName").value.trim();
  const product = products.find((item) => item.name.toLowerCase() === name.toLowerCase());
  state.grocery.push({
    id: crypto.randomUUID(),
    name,
    qty: document.getElementById("groceryQty").value,
    price: Number(document.getElementById("groceryPrice").value),
    category: product?.category || "General",
    done: false
  });
  event.target.reset();
  saveState(`Added ${name} to grocery list`);
});

document.getElementById("groceryTable").addEventListener("click", (event) => {
  const toggleId = event.target.dataset.toggleItem;
  const deleteId = event.target.dataset.deleteItem;
  if (toggleId) {
    const item = state.grocery.find((entry) => entry.id === toggleId);
    item.done = !item.done;
    saveState(`${item.name} marked ${item.done ? "bought" : "needed"}`);
  }
  if (deleteId) {
    const item = state.grocery.find((entry) => entry.id === deleteId);
    state.grocery = state.grocery.filter((entry) => entry.id !== deleteId);
    saveState(`Removed ${item.name} from grocery list`);
  }
});

document.getElementById("mealForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const meal = {
    id: crypto.randomUUID(),
    day: document.getElementById("mealDay").value,
    name: document.getElementById("mealName").value,
    ingredients: document.getElementById("mealIngredients").value
  };
  state.meals.push(meal);
  event.target.reset();
  saveState(`Scheduled ${meal.name}`);
});

document.getElementById("pantryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const item = {
    id: crypto.randomUUID(),
    name: document.getElementById("pantryName").value,
    qty: Number(document.getElementById("pantryQty").value),
    expiry: document.getElementById("pantryExpiry").value
  };
  state.pantry.push(item);
  event.target.reset();
  saveState(`Tracked pantry item ${item.name}`);
});

document.getElementById("budgetLimit").addEventListener("change", (event) => {
  state.budgetLimit = Number(event.target.value);
  saveState(`Budget changed to ${formatMoney(state.budgetLimit)}`);
});

document.getElementById("productSearch").addEventListener("input", renderProducts);

document.getElementById("productGrid").addEventListener("click", (event) => {
  const productName = event.target.dataset.addProduct;
  if (!productName) return;
  const product = products.find((item) => item.name === productName);
  if (!product) return;
  addProductToCart(product);
});

document.getElementById("settingsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.settings = {
    diet: document.getElementById("dietSetting").value,
    household: Number(document.getElementById("householdSetting").value),
    store: document.getElementById("storeSetting").value,
    allergies: document.getElementById("allergySetting").value
  };
  saveState("Settings updated");
});

document.getElementById("refreshRecs").addEventListener("click", () => {
  saveState("Recommendations refreshed");
});

render();

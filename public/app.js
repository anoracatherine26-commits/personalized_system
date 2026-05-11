const storageKey = "personalized-grocery-ai-state";

const products = [
  { name: "Brown Rice", category: "Grains", icon: "🍚", price: 4.2, nutrition: "Fiber rich pantry staple" },
  { name: "Chicken Breast", category: "Protein", icon: "🍗", price: 8.9, nutrition: "Lean protein" },
  { name: "Spinach", category: "Produce", icon: "🥬", price: 3.4, nutrition: "Iron and folate" },
  { name: "Greek Yogurt", category: "Dairy", icon: "🥣", price: 5.1, nutrition: "Protein and probiotics" },
  { name: "Apples", category: "Produce", icon: "🍎", price: 3.8, nutrition: "Snack and breakfast friendly" },
  { name: "Salmon Fillet", category: "Seafood", icon: "🐟", price: 12.5, nutrition: "Omega-3 source" },
  { name: "Whole Wheat Bread", category: "Bakery", icon: "🍞", price: 3.6, nutrition: "Whole grain option" },
  { name: "Eggs", category: "Protein", icon: "🥚", price: 4.7, nutrition: "Versatile breakfast protein" },
  { name: "Broccoli", category: "Produce", icon: "🥦", price: 2.9, nutrition: "Vitamin C and fiber" }
];

const priceComparison = [
  { product: "Brown Rice", FreshMart: 4.2, BudgetBasket: 3.85, GreenCart: 4.4 },
  { product: "Chicken Breast", FreshMart: 8.9, BudgetBasket: 8.35, GreenCart: 9.15 },
  { product: "Spinach", FreshMart: 3.4, BudgetBasket: 3.15, GreenCart: 2.95 },
  { product: "Greek Yogurt", FreshMart: 5.1, BudgetBasket: 4.8, GreenCart: 5.35 },
  { product: "Apples", FreshMart: 3.8, BudgetBasket: 3.5, GreenCart: 3.7 },
  { product: "Salmon Fillet", FreshMart: 12.5, BudgetBasket: 11.9, GreenCart: 12.2 }
];

const defaultState = {
  user: null,
  settings: {
    diet: "Balanced",
    household: 3,
    store: "BudgetBasket",
    allergies: ""
  },
  budgetLimit: 120,
  grocery: [
    { id: crypto.randomUUID(), name: "Brown Rice", qty: "2 bags", price: 8.4, category: "Grains", done: false },
    { id: crypto.randomUUID(), name: "Spinach", qty: "3 bunches", price: 10.2, category: "Produce", done: false },
    { id: crypto.randomUUID(), name: "Greek Yogurt", qty: "4 cups", price: 20.4, category: "Dairy", done: true }
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
    return { ...structuredClone(defaultState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState(activity) {
  if (activity) {
    state.activity = [activity, ...state.activity].slice(0, 8);
  }
  localStorage.setItem(storageKey, JSON.stringify(state));
  render();
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function getGroceryTotal() {
  return state.grocery.reduce((sum, item) => sum + Number(item.price || 0), 0);
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
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
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
  document.getElementById("todaySpend").textContent = formatMoney(total);

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
      <td><button class="pill ${item.done ? "" : "warning"}" data-toggle-item="${item.id}">${item.done ? "Bought" : "Needed"}</button></td>
      <td><button class="danger-button" data-delete-item="${item.id}">Remove</button></td>
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
  document.getElementById("productGrid").innerHTML = filtered.map((item) => `
    <article class="product-card">
      <div class="product-icon">${item.icon}</div>
      <div>
        <strong>${item.name}</strong>
        <span>${item.category} • ${item.nutrition}</span>
      </div>
      <div class="product-meta">
        <span>${formatMoney(item.price)}</span>
        <button class="ghost-button" data-add-product="${item.name}">Add</button>
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

function renderAdmin() {
  document.getElementById("adminUsers").textContent = state.user ? 1 : 0;
  document.getElementById("adminProducts").textContent = products.length;
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
  renderAdmin();
}

document.querySelectorAll("[data-view], [data-view-trigger]").forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view || button.dataset.viewTrigger;
    if (view === "auth") {
      document.getElementById("authPanel").classList.toggle("hidden");
      return;
    }
    switchView(view);
  });
});

document.getElementById("notifyButton").addEventListener("click", () => switchView("notifications"));

document.getElementById("authForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.user = {
    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value
  };
  document.getElementById("authPanel").classList.add("hidden");
  saveState(`Profile saved for ${state.user.name}`);
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
  state.grocery.push({
    id: crypto.randomUUID(),
    name: product.name,
    qty: "1",
    price: product.price,
    category: product.category,
    done: false
  });
  saveState(`Added ${product.name} from product menu`);
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

const storageKey = "personalized-grocery-ai-state";

const defaultProducts = [
  { name: "Organic Banana", category: "Produce", icon: "🍌", price: 67.2, nutrition: "Potassium rich snack" },
  { name: "Red Apples", category: "Produce", icon: "🍎", price: 212.8, nutrition: "Crisp fruit for snacks" },
  { name: "Avocado", category: "Produce", icon: "🥑", price: 134.4, nutrition: "Healthy fats" },
  { name: "Broccoli", category: "Produce", icon: "🥦", price: 162.4, nutrition: "Vitamin C and fiber" },
  { name: "Spinach", category: "Produce", icon: "🥬", price: 190.4, nutrition: "Iron and folate" },
  { name: "Romaine Lettuce", category: "Produce", icon: "🥬", price: 145.6, nutrition: "Fresh salad base" },
  { name: "Tomatoes", category: "Produce", icon: "🍅", price: 151.2, nutrition: "Bright sauce and salad staple" },
  { name: "Bell Peppers", category: "Produce", icon: "🫑", price: 179.2, nutrition: "Colorful vitamin boost" },
  { name: "Carrots", category: "Produce", icon: "🥕", price: 117.6, nutrition: "Crunchy beta-carotene" },
  { name: "Potatoes", category: "Produce", icon: "🥔", price: 173.6, nutrition: "Budget friendly starch" },
  { name: "Sweet Corn", category: "Produce", icon: "🌽", price: 140.0, nutrition: "Quick side dish" },
  { name: "Mushrooms", category: "Produce", icon: "🍄", price: 207.2, nutrition: "Savory meatless option" },
  { name: "Cucumbers", category: "Produce", icon: "🥒", price: 89.6, nutrition: "Hydrating fresh vegetable" },
  { name: "Zucchini", category: "Produce", icon: "🥒", price: 129.6, nutrition: "Low calorie vegetable" },
  { name: "Green Beans", category: "Produce", icon: "🫘", price: 134.4, nutrition: "Fresh tender vegetable" },
  { name: "Garlic", category: "Produce", icon: "🧅", price: 56.0, nutrition: "Flavor and immune boost" },
  { name: "Onions", category: "Produce", icon: "🧅", price: 78.4, nutrition: "Versatile cooking base" },
  { name: "Lettuce", category: "Produce", icon: "🥬", price: 112.0, nutrition: "Light salad green" },
  { name: "Cabbage", category: "Produce", icon: "🥬", price: 98.0, nutrition: "Budget vegetable staple" },
  { name: "Strawberries", category: "Fruit", icon: "🍓", price: 291.2, nutrition: "Dessert and smoothie fruit" },
  { name: "Blueberries", category: "Fruit", icon: "🫐", price: 274.4, nutrition: "Antioxidant snack" },
  { name: "Oranges", category: "Fruit", icon: "🍊", price: 201.6, nutrition: "Vitamin C" },
  { name: "Grapes", category: "Fruit", icon: "🍇", price: 246.4, nutrition: "Easy lunchbox fruit" },
  { name: "Watermelon", category: "Fruit", icon: "🍉", price: 380.8, nutrition: "Hydrating family fruit" },
  { name: "Lemons", category: "Fruit", icon: "🍋", price: 84.0, nutrition: "Zesty citrus flavor" },
  { name: "Mangoes", category: "Fruit", icon: "🥭", price: 268.0, nutrition: "Tropical sweet fruit" },
  { name: "Pineapple", category: "Fruit", icon: "🍍", price: 312.0, nutrition: "Tropical and sweet" },
  { name: "Kiwi", category: "Fruit", icon: "🥝", price: 201.6, nutrition: "Tangy vitamin C source" },
  { name: "Coconut", category: "Fruit", icon: "🥥", price: 224.0, nutrition: "Tropical versatile fruit" },
  { name: "Peaches", category: "Fruit", icon: "🍑", price: 235.2, nutrition: "Sweet summer fruit" },
  { name: "Whole Milk", category: "Dairy", icon: "🥛", price: 257.6, nutrition: "Calcium and protein" },
  { name: "Almond Milk", category: "Dairy", icon: "🥛", price: 134.4, nutrition: "Dairy-free beverage" },
  { name: "Greek Yogurt", category: "Dairy", icon: "🥣", price: 285.6, nutrition: "Protein and probiotics" },
  { name: "Cheddar Cheese", category: "Dairy", icon: "🧀", price: 268.8, nutrition: "Sandwich and snack staple" },
  { name: "Butter", category: "Dairy", icon: "🧈", price: 218.4, nutrition: "Baking essential" },
  { name: "Mozzarella Cheese", category: "Dairy", icon: "🧀", price: 289.6, nutrition: "Melting cheese" },
  { name: "Cream Cheese", category: "Dairy", icon: "🧀", price: 235.2, nutrition: "Bagel and dessert spread" },
  { name: "Sour Cream", category: "Dairy", icon: "🥣", price: 156.8, nutrition: "Rich creamy condiment" },
  { name: "Cottage Cheese", category: "Dairy", icon: "🥣", price: 196.0, nutrition: "High protein snack" },
  { name: "Oat Milk", category: "Dairy", icon: "🥛", price: 168.0, nutrition: "Plant-based alternative" },
  { name: "Eggs", category: "Protein", icon: "🥚", price: 263.2, nutrition: "Versatile breakfast protein" },
  { name: "Chicken Breast", category: "Protein", icon: "🍗", price: 498.4, nutrition: "Lean protein" },
  { name: "Ground Beef", category: "Protein", icon: "🥩", price: 425.6, nutrition: "Dinner protein" },
  { name: "Pork Chops", category: "Protein", icon: "🥩", price: 403.2, nutrition: "High protein entree" },
  { name: "Tofu", category: "Protein", icon: "◻️", price: 184.8, nutrition: "Plant protein" },
  { name: "Black Beans", category: "Protein", icon: "🫘", price: 100.8, nutrition: "Fiber and protein" },
  { name: "Chickpeas", category: "Protein", icon: "🫘", price: 117.6, nutrition: "Protein-packed legume" },
  { name: "Lentils", category: "Protein", icon: "🫘", price: 128.8, nutrition: "Iron rich legume" },
  { name: "Canned Beans", category: "Protein", icon: "🥫", price: 95.2, nutrition: "Quick protein option" },
  { name: "Turkey Breast", category: "Protein", icon: "🍗", price: 445.6, nutrition: "Lean poultry protein" },
  { name: "Salmon Fillet", category: "Seafood", icon: "🐟", price: 700.0, nutrition: "Omega-3 source" },
  { name: "Shrimp", category: "Seafood", icon: "🍤", price: 599.2, nutrition: "Quick seafood protein" },
  { name: "Tuna Cans", category: "Seafood", icon: "🥫", price: 252.0, nutrition: "Pantry seafood" },
  { name: "Fish Fillets", category: "Seafood", icon: "🐟", price: 536.0, nutrition: "White fish protein" },
  { name: "Cod", category: "Seafood", icon: "🐟", price: 624.0, nutrition: "Mild white fish" },
  { name: "Brown Rice", category: "Grains", icon: "🍚", price: 235.2, nutrition: "Fiber rich pantry staple" },
  { name: "White Rice", category: "Grains", icon: "🍚", price: 207.2, nutrition: "Everyday staple" },
  { name: "Quinoa 1kg", category: "Grains", icon: "🌾", price: 196.0, nutrition: "Complete grain protein" },
  { name: "Rolled Oats", category: "Grains", icon: "🥣", price: 179.2, nutrition: "Breakfast staple" },
  { name: "Barley", category: "Grains", icon: "🌾", price: 145.6, nutrition: "Chewy healthy grain" },
  { name: "Couscous", category: "Grains", icon: "🌾", price: 156.8, nutrition: "Quick cooking grain" },
  { name: "Whole Wheat Bread", category: "Bakery", icon: "🍞", price: 201.6, nutrition: "Whole grain option" },
  { name: "Baguette", category: "Bakery", icon: "🥖", price: 156.8, nutrition: "Soup and sandwich bread" },
  { name: "Bagels", category: "Bakery", icon: "🥯", price: 229.6, nutrition: "Breakfast bread" },
  { name: "Croissants", category: "Bakery", icon: "🥐", price: 268.0, nutrition: "Buttery pastry" },
  { name: "Tortillas", category: "Bakery", icon: "🫔", price: 134.4, nutrition: "Wrap and taco base" },
  { name: "Pasta", category: "Pantry", icon: "🍝", price: 123.2, nutrition: "Fast dinner base" },
  { name: "Tomato Sauce", category: "Pantry", icon: "🥫", price: 128.8, nutrition: "Pasta night essential" },
  { name: "Olive Oil", category: "Pantry", icon: "🫒", price: 470.4, nutrition: "Cooking oil" },
  { name: "Peanut Butter", category: "Pantry", icon: "🥜", price: 235.2, nutrition: "Protein spread" },
  { name: "Honey", category: "Pantry", icon: "🍯", price: 313.6, nutrition: "Natural sweetener" },
  { name: "Soy Sauce", category: "Pantry", icon: "🥢", price: 117.6, nutrition: "Savory seasoning" },
  { name: "Vinegar", category: "Pantry", icon: "🍶", price: 95.2, nutrition: "Cooking acid" },
  { name: "Salt", category: "Pantry", icon: "🧂", price: 56.0, nutrition: "Seasoning essential" },
  { name: "Sugar", category: "Pantry", icon: "🍬", price: 89.6, nutrition: "Sweetening agent" },
  { name: "Granola", category: "Breakfast", icon: "🥣", price: 263.2, nutrition: "Crunchy breakfast topper" },
  { name: "Cereal", category: "Breakfast", icon: "🥣", price: 240.8, nutrition: "Family breakfast" },
  { name: "Pancake Mix", category: "Breakfast", icon: "🥞", price: 156.8, nutrition: "Easy breakfast" },
  { name: "Maple Syrup", category: "Breakfast", icon: "🍯", price: 336.0, nutrition: "Pancake topping" },
  { name: "Coffee Beans", category: "Beverage", icon: "☕", price: 532.0, nutrition: "Morning drink" },
  { name: "Green Tea", category: "Beverage", icon: "🍵", price: 274.4, nutrition: "Light caffeine option" },
  { name: "Orange Juice", category: "Beverage", icon: "🧃", price: 229.6, nutrition: "Breakfast drink" },
  { name: "Sparkling Water", category: "Beverage", icon: "💧", price: 218.4, nutrition: "Sugar-free drink" },
  { name: "Apple Juice", category: "Beverage", icon: "🧃", price: 201.6, nutrition: "Fruit beverage" },
  { name: "Milk (2L)", category: "Beverage", icon: "🥛", price: 235.2, nutrition: "Cold beverage" },
  { name: "Black Tea", category: "Beverage", icon: "🍵", price: 268.0, nutrition: "Classic tea option" },
  { name: "Frozen Peas", category: "Frozen", icon: "🟢", price: 145.6, nutrition: "Quick vegetable side" },
  { name: "Frozen Berries", category: "Frozen", icon: "🫐", price: 330.4, nutrition: "Smoothie fruit" },
  { name: "Pizza Dough", category: "Frozen", icon: "🍕", price: 212.8, nutrition: "Easy pizza night" },
  { name: "Frozen Vegetables", category: "Frozen", icon: "🥕", price: 134.4, nutrition: "Quick cooking veggies" },
  { name: "Ice Cream", category: "Frozen", icon: "🍦", price: 289.6, nutrition: "Frozen dessert" },
  { name: "Mixed Nuts", category: "Snacks", icon: "🥜", price: 375.2, nutrition: "Energy snack" },
  { name: "Dark Chocolate", category: "Snacks", icon: "🍫", price: 190.4, nutrition: "Sweet treat" },
  { name: "Crackers", category: "Snacks", icon: "🫓", price: 162.4, nutrition: "Cheese board snack" },
  { name: "Potato Chips", category: "Snacks", icon: "🥔", price: 145.6, nutrition: "Crunchy snack" },
  { name: "Granola Bars", category: "Snacks", icon: "🫓", price: 196.0, nutrition: "Portable snack" },
  { name: "Pretzels", category: "Snacks", icon: "🥨", price: 128.8, nutrition: "Salty snack" },
  { name: "Popcorn", category: "Snacks", icon: "🍿", price: 117.6, nutrition: "Light snack" },
  { name: "Dish Soap", category: "Hygiene", icon: "🧼", price: 134.4, nutrition: "Kitchen cleaning" },
  { name: "Hand Soap", category: "Hygiene", icon: "🧼", price: 156.8, nutrition: "Personal hygiene" },
  { name: "Shampoo", category: "Hygiene", icon: "🧴", price: 235.2, nutrition: "Hair care" },
  { name: "Conditioner", category: "Hygiene", icon: "🧴", price: 246.4, nutrition: "Hair conditioning" },
  { name: "Body Wash", category: "Hygiene", icon: "🧴", price: 190.4, nutrition: "Body cleansing" },
  { name: "Toothpaste", category: "Hygiene", icon: "🪥", price: 128.8, nutrition: "Dental care" },
  { name: "Toothbrush", category: "Hygiene", icon: "🪥", price: 89.6, nutrition: "Dental hygiene" },
  { name: "Mouthwash", category: "Hygiene", icon: "💧", price: 168.0, nutrition: "Oral care" },
  { name: "Deodorant", category: "Hygiene", icon: "🧴", price: 145.6, nutrition: "Personal care" },
  { name: "Shaving Cream", category: "Hygiene", icon: "🧴", price: 117.6, nutrition: "Shaving prep" },
  { name: "Razors", category: "Hygiene", icon: "🪒", price: 235.2, nutrition: "Shaving tool" },
  { name: "Facial Cleanser", category: "Hygiene", icon: "🧴", price: 201.6, nutrition: "Face care" },
  { name: "Face Moisturizer", category: "Hygiene", icon: "🧴", price: 268.0, nutrition: "Skin hydration" },
  { name: "Sunscreen", category: "Hygiene", icon: "☀️", price: 290.0, nutrition: "UV protection" },
  { name: "Lip Balm", category: "Hygiene", icon: "💄", price: 78.4, nutrition: "Lip care" },
  { name: "Toilet Paper", category: "Household", icon: "🧻", price: 289.6, nutrition: "Bathroom essential" },
  { name: "Paper Towels", category: "Household", icon: "🧻", price: 347.2, nutrition: "Cleanup essential" },
  { name: "Laundry Detergent", category: "Household", icon: "🧴", price: 638.4, nutrition: "Laundry cleaning" },
  { name: "Fabric Softener", category: "Household", icon: "🧴", price: 289.6, nutrition: "Laundry softener" },
  { name: "All Purpose Cleaner", category: "Household", icon: "🧹", price: 201.6, nutrition: "General cleaning" },
  { name: "Bleach", category: "Household", icon: "🧴", price: 168.0, nutrition: "Disinfectant" },
  { name: "Glass Cleaner", category: "Household", icon: "🪟", price: 145.6, nutrition: "Window cleaning" },
  { name: "Trash Bags", category: "Household", icon: "🗑️", price: 268.0, nutrition: "Waste management" },
  { name: "Sponges", category: "Household", icon: "🧽", price: 95.2, nutrition: "Cleaning tool" },
  { name: "Aluminum Foil", category: "Household", icon: "🔲", price: 117.6, nutrition: "Food wrapping" },
  { name: "Plastic Wrap", category: "Household", icon: "🔲", price: 128.8, nutrition: "Food preservation" },
  { name: "Ziploc Bags", category: "Household", icon: "🔲", price: 201.6, nutrition: "Food storage" },
  { name: "Napkins", category: "Household", icon: "🧻", price: 117.6, nutrition: "Table essential" },
  { name: "Tissues", category: "Household", icon: "🧻", price: 134.4, nutrition: "Nose care" },
  { name: "Feminine Hygiene Pads", category: "Hygiene", icon: "🧴", price: 268.0, nutrition: "Personal hygiene" },
  { name: "Tampons", category: "Hygiene", icon: "🧴", price: 289.6, nutrition: "Personal hygiene" },
  { name: "Adult Diapers", category: "Hygiene", icon: "🧴", price: 623.2, nutrition: "Personal care" },
  { name: "Baby Wipes", category: "Hygiene", icon: "🧻", price: 235.2, nutrition: "Baby care" },
  { name: "Hand Sanitizer", category: "Hygiene", icon: "💧", price: 156.8, nutrition: "Germ protection" },
  { name: "Wet Wipes", category: "Hygiene", icon: "🧻", price: 134.4, nutrition: "Cleaning wipes" }
];

const priceComparison = defaultProducts.slice(0, 14).map((product, index) => ({
  product: product.name,
  FreshMart: Number((product.price * (1 + ((index % 4) * 0.035))).toFixed(2)),
  BudgetBasket: Number((product.price * (0.92 + ((index % 3) * 0.025))).toFixed(2)),
  GreenCart: Number((product.price * (0.96 + ((index % 5) * 0.02))).toFixed(2))
}));

const defaultState = {
  user: null,
  accounts: [],
  products: defaultProducts,
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
    const parsed = JSON.parse(saved);
    const merged = normalizeState({ ...structuredClone(defaultState), ...parsed });
    if (!Array.isArray(merged.products) || merged.products.length === 0) {
      merged.products = defaultProducts;
    }
    return merged;
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(nextState) {
  nextState.accounts = Array.isArray(nextState.accounts) ? nextState.accounts : [];
  nextState.products = Array.isArray(nextState.products) && nextState.products.length > 0 ? nextState.products : defaultProducts;
  nextState.grocery = Array.isArray(nextState.grocery) && nextState.grocery.length > 0 ? nextState.grocery : defaultState.grocery;
  nextState.meals = Array.isArray(nextState.meals) && nextState.meals.length > 0 ? nextState.meals : defaultState.meals;
  nextState.pantry = Array.isArray(nextState.pantry) && nextState.pantry.length > 0 ? nextState.pantry : defaultState.pantry;

  if (nextState.user && !nextState.user.role) {
    nextState.user.role = "User";
  }
  if (nextState.user && !nextState.accounts.some((account) => account.email === nextState.user.email)) {
    nextState.accounts.push({
      name: nextState.user.name,
      email: nextState.user.email,
      role: nextState.user.role || "User",
      joinedAt: nextState.user.joinedAt || new Date().toISOString(),
      lastLoginAt: nextState.user.lastLoginAt || new Date().toISOString()
    });
  }

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
  const base = state.products
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
    window.location.href = "login.html";
    return;
  }

  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  closeSidebar();
}

function toggleSidebar() {
  const sidebar = document.getElementById("mainSidebar");
  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("mainSidebar");
  if (sidebar) {
    sidebar.classList.remove("open");
  }
}

function openFeatureGuide() {
  const modal = document.getElementById("featureGuideModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeFeatureGuide() {
  const modal = document.getElementById("featureGuideModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
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
  document.getElementById("adminProductsHero").textContent = state.products.length;

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
  if (!Array.isArray(state.products) || state.products.length === 0) {
    state.products = defaultProducts;
  }
  const filtered = state.products.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(search));
  document.getElementById("cartCount").textContent = `${getCartItemCount()} item${getCartItemCount() === 1 ? "" : "s"}`;
  document.getElementById("cartTotal").textContent = formatMoney(getGroceryTotal());
  const grid = document.getElementById("productGrid");
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">No products found. Please try a different search or reload the page.</div>`;
    return;
  }
  grid.innerHTML = filtered.map((item) => `
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
}

function renderSettings() {
  document.getElementById("dietSetting").value = state.settings.diet;
  document.getElementById("householdSetting").value = state.settings.household;
  document.getElementById("storeSetting").value = state.settings.store;
  document.getElementById("allergySetting").value = state.settings.allergies;
}

function renderProfile() {
  const accountButton = document.getElementById("accountButton");
  const adminLink = document.getElementById("adminDashboardLink");
  const adminOnlyProductForm = document.getElementById("addProductForm");
  const profileName = state.user?.name || "Guest user";
  const profileEmail = state.user?.email || "No email saved";
  const joinedDate = state.user?.joinedAt
    ? new Date(state.user.joinedAt).toLocaleDateString()
    : "Profile not created yet";

  if (accountButton) {
    accountButton.textContent = state.user ? profileName.split(" ")[0] : "Login";
  }
  if (adminLink) {
    adminLink.classList.toggle("hidden", state.user?.role !== "Admin");
  }
  if (adminOnlyProductForm) {
    adminOnlyProductForm.classList.toggle("hidden", state.user?.role !== "Admin");
  }
  document.getElementById("profileInitials").textContent = getInitials(profileName);
  document.getElementById("profileName").textContent = profileName;
  document.getElementById("profileEmail").textContent = profileEmail;
  document.getElementById("profileJoined").textContent = state.user ? `Joined ${joinedDate}` : joinedDate;
  document.getElementById("profileDiet").textContent = state.settings.diet;
  document.getElementById("profileHousehold").textContent = state.settings.household;
  document.getElementById("profileStore").textContent = state.settings.store;
  document.getElementById("profileBudget").textContent = formatMoney(state.budgetLimit);
  document.getElementById("profileRole").textContent = state.user?.role || "User";
  document.getElementById("profileCartItems").textContent = getCartItemCount();
  document.getElementById("profilePantryItems").textContent = state.pantry.length;
  document.getElementById("profileAllergies").textContent = state.settings.allergies || "None";

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
}

document.addEventListener("click", (event) => {
  const profileButton = event.target.closest("[data-profile-open]");
  if (profileButton) {
    if (state.user) {
      switchView("profile");
    } else {
      window.location.href = "login.html";
    }
    return;
  }

  const button = event.target.closest("[data-view], [data-view-trigger]");
  if (!button) return;

  const view = button.dataset.view || button.dataset.viewTrigger;
  if (view === "auth") {
    window.location.href = "login.html";
    return;
  }

  switchView(view);
});

window.addEventListener("load", () => {
  const allButtons = document.querySelectorAll("[data-view], [data-view-trigger], [data-profile-open]");
  allButtons.forEach((btn) => {
    btn.style.cursor = "pointer";
  });
});

const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", toggleSidebar);
}

const navLinks = document.querySelectorAll(".nav-link[data-view]");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const view = link.dataset.view;
    switchView(view);
  });
});

const mainContent = document.querySelector(".main-content");
if (mainContent) {
  mainContent.addEventListener("click", (event) => {
    const sidebar = document.getElementById("mainSidebar");
    if (sidebar && sidebar.classList.contains("open") && window.innerWidth <= 1180) {
      closeSidebar();
    }
  });
}

const notifyButton = document.getElementById("notifyButton");
if (notifyButton) {
  notifyButton.addEventListener("click", () => switchView("notifications"));
}

const featureGuideButton = document.getElementById("featureGuideButton");
if (featureGuideButton) {
  featureGuideButton.addEventListener("click", openFeatureGuide);
}

const heroFeatureButton = document.getElementById("heroFeatureButton");
if (heroFeatureButton) {
  heroFeatureButton.addEventListener("click", openFeatureGuide);
}

const closeFeatureGuideButton = document.getElementById("closeFeatureGuide");
if (closeFeatureGuideButton) {
  closeFeatureGuideButton.addEventListener("click", closeFeatureGuide);
}

const featureGuideModal = document.getElementById("featureGuideModal");
if (featureGuideModal) {
  featureGuideModal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeFeatureGuide();
    }
  });
}

document.getElementById("editProfileButton").addEventListener("click", () => {
  window.location.href = "login.html";
});

document.getElementById("logoutButton").addEventListener("click", () => {
  const name = state.user?.name || "User";
  state.user = null;
  saveState(`${name} logged out`);
  window.location.href = "login.html";
});

document.getElementById("groceryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("groceryName").value.trim();
  const product = state.products.find((item) => item.name.toLowerCase() === name.toLowerCase());
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
  const product = state.products.find((item) => item.name === productName);
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

document.getElementById("addProductForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("productName").value.trim();
  const category = document.getElementById("productCategory").value;
  const price = Number(document.getElementById("productPrice").value);
  const icon = document.getElementById("productIcon").value;
  const nutrition = document.getElementById("productNutrition").value;

  // Check if product already exists
  if (state.products.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    alert("A product with this name already exists!");
    return;
  }

  state.products.push({
    name,
    category,
    price,
    icon,
    nutrition
  });

  // Clear form
  document.getElementById("addProductForm").reset();
  saveState(`Added ${name} to product catalog`);
});

document.getElementById("generateReceiptButton").addEventListener("click", () => {
  const purchasedItems = state.grocery.filter(item => item.done);
  if (purchasedItems.length === 0) {
    alert("No purchased items to generate receipt for!");
    return;
  }

  const total = purchasedItems.reduce((sum, item) => sum + Number(item.price), 0);
  const customerName = state.user?.name || "Guest";

  document.getElementById("receiptDate").textContent = new Date().toLocaleDateString();
  document.getElementById("receiptCustomer").textContent = customerName;
  document.getElementById("receiptItemsTable").innerHTML = purchasedItems.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${formatMoney(item.price / getQtyNumber(item.qty))}</td>
      <td>${formatMoney(item.price)}</td>
    </tr>
  `).join("");
  document.getElementById("receiptTotal").textContent = formatMoney(total);

  saveState(`Generated receipt for ${purchasedItems.length} items`);
});

document.getElementById("clearPurchasedButton").addEventListener("click", () => {
  const purchasedCount = state.grocery.filter(item => item.done).length;
  if (purchasedCount === 0) {
    alert("No purchased items to clear!");
    return;
  }

  if (confirm(`Clear ${purchasedCount} purchased items from the list?`)) {
    state.grocery = state.grocery.filter(item => !item.done);
    saveState(`Cleared ${purchasedCount} purchased items`);
  }
});

render();

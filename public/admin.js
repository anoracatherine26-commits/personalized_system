const storageKey = "personalized-grocery-ai-state";

const fallbackProducts = [
  { name: "Organic Banana", category: "Produce", icon: "🍌", price: 67.2, nutrition: "Potassium rich snack" },
  { name: "Red Apples", category: "Produce", icon: "🍎", price: 212.8, nutrition: "Crisp fruit for snacks" },
  { name: "Whole Milk", category: "Dairy", icon: "🥛", price: 257.6, nutrition: "Calcium and protein" },
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
  { name: "Ziploc Bags", category: "Household", icon: "🔲", price: 201.6, nutrition: "Food storage" },
  { name: "Pork Belly", category: "Protein", icon: "🥩", price: 392.0, nutrition: "Rich cooking meat" },
  { name: "Chicken Thighs", category: "Protein", icon: "🍗", price: 336.0, nutrition: "Juicy family protein" },
  { name: "Hotdogs", category: "Protein", icon: "🌭", price: 184.8, nutrition: "Quick meal protein" },
  { name: "Corned Beef", category: "Pantry", icon: "🥫", price: 156.8, nutrition: "Canned breakfast staple" },
  { name: "Canned Sardines", category: "Seafood", icon: "🥫", price: 67.2, nutrition: "Affordable seafood protein" },
  { name: "Canned Mackerel", category: "Seafood", icon: "🥫", price: 89.6, nutrition: "Pantry fish protein" },
  { name: "Evaporated Milk", category: "Pantry", icon: "🥫", price: 72.8, nutrition: "Cooking and dessert milk" },
  { name: "Condensed Milk", category: "Pantry", icon: "🥫", price: 89.6, nutrition: "Sweet dessert milk" },
  { name: "Coconut Milk", category: "Pantry", icon: "🥥", price: 84.0, nutrition: "Creamy cooking base" },
  { name: "Flour", category: "Pantry", icon: "🌾", price: 112.0, nutrition: "Baking and cooking staple" },
  { name: "Cooking Oil", category: "Pantry", icon: "🛢️", price: 196.0, nutrition: "Everyday frying oil" },
  { name: "Oyster Sauce", category: "Pantry", icon: "🥢", price: 112.0, nutrition: "Savory stir-fry sauce" },
  { name: "Fish Sauce", category: "Pantry", icon: "🍶", price: 84.0, nutrition: "Salty cooking seasoning" },
  { name: "Ketchup", category: "Pantry", icon: "🍅", price: 106.4, nutrition: "Classic condiment" },
  { name: "Mayonnaise", category: "Pantry", icon: "🥫", price: 156.8, nutrition: "Sandwich and salad spread" },
  { name: "Instant Noodles", category: "Pantry", icon: "🍜", price: 72.8, nutrition: "Quick pantry meal" },
  { name: "Pandesal", category: "Bakery", icon: "🍞", price: 67.2, nutrition: "Breakfast bread" },
  { name: "Bottled Water", category: "Beverage", icon: "💧", price: 84.0, nutrition: "Drinking water pack" },
  { name: "Soft Drinks", category: "Beverage", icon: "🥤", price: 117.6, nutrition: "Party beverage" },
  { name: "Frozen Chicken Nuggets", category: "Frozen", icon: "🍗", price: 246.4, nutrition: "Quick freezer meal" },
  { name: "Frozen Fries", category: "Frozen", icon: "🍟", price: 179.2, nutrition: "Easy side dish" },
  { name: "Frozen Siomai", category: "Frozen", icon: "🥟", price: 212.8, nutrition: "Steam-and-serve snack" },
  { name: "Cookies", category: "Snacks", icon: "🍪", price: 123.2, nutrition: "Sweet snack" },
  { name: "Biscuits", category: "Snacks", icon: "🍪", price: 89.6, nutrition: "Everyday snack pack" },
  { name: "Baby Diapers", category: "Baby Care", icon: "🧷", price: 560.0, nutrition: "Baby essential" },
  { name: "Baby Powder", category: "Baby Care", icon: "🧴", price: 123.2, nutrition: "Baby skin care" },
  { name: "Infant Formula", category: "Baby Care", icon: "🍼", price: 896.0, nutrition: "Baby nutrition" },
  { name: "Alcohol", category: "Hygiene", icon: "🧴", price: 112.0, nutrition: "Disinfecting essential" },
  { name: "Bar Soap", category: "Hygiene", icon: "🧼", price: 50.4, nutrition: "Bath soap" },
  { name: "Lotion", category: "Hygiene", icon: "🧴", price: 190.4, nutrition: "Skin moisturizer" },
  { name: "Cotton Buds", category: "Hygiene", icon: "🧴", price: 61.6, nutrition: "Personal care cotton swabs" },
  { name: "Dishwashing Liquid", category: "Household", icon: "🧼", price: 112.0, nutrition: "Dish cleaning soap" },
  { name: "Floor Cleaner", category: "Household", icon: "🧹", price: 168.0, nutrition: "Floor cleaning solution" },
  { name: "Toilet Cleaner", category: "Household", icon: "🚽", price: 145.6, nutrition: "Bathroom cleaning" },
  { name: "Insect Spray", category: "Household", icon: "🧴", price: 224.0, nutrition: "Household pest control" },
  { name: "Rubber Gloves", category: "Household", icon: "🧤", price: 95.2, nutrition: "Cleaning hand protection" },
  { name: "Pet Food", category: "Pet Care", icon: "🐾", price: 336.0, nutrition: "Pet meal staple" },
  { name: "Cat Litter", category: "Pet Care", icon: "🐾", price: 280.0, nutrition: "Pet cleanup essential" }
];

function mergeFallbackProducts(products) {
  const byName = new Map();
  fallbackProducts.forEach((product) => byName.set(product.name.toLowerCase(), product));
  if (Array.isArray(products)) {
    products.forEach((product) => {
      if (product?.name) {
        byName.set(product.name.toLowerCase(), product);
      }
    });
  }
  return Array.from(byName.values());
}

function readState() {
  try {
    const state = JSON.parse(localStorage.getItem(storageKey)) || {};
    state.accounts = state.accounts || [];
    state.products = mergeFallbackProducts(state.products);
    state.grocery = state.grocery || [];
    return state;
  } catch {
    return { accounts: [], products: fallbackProducts, grocery: [] };
  }
}

function saveState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value);
}

function formatDate(value) {
  if (!value) return "Not recorded";
  return new Date(value).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function renderAdminPage() {
  const state = readState();
  const currentUser = state.user;
  const isAdmin = currentUser?.role === "Admin";

  document.getElementById("adminGate").classList.toggle("hidden", isAdmin);
  document.getElementById("adminContent").classList.toggle("hidden", !isAdmin);
  document.getElementById("adminLogoutButton").classList.toggle("hidden", !currentUser);

  if (!isAdmin) return;

  const adminAccounts = state.accounts.filter((account) => account.role === "Admin");

  document.getElementById("adminIdentity").textContent = `${currentUser.name} • Admin`;
  document.getElementById("adminAccountCount").textContent = state.accounts.length;
  document.getElementById("adminRoleCount").textContent = adminAccounts.length;
  document.getElementById("adminProductCount").textContent = state.products.length;
  document.getElementById("adminCartCount").textContent = state.grocery.length;
  document.getElementById("lastLoginLabel").textContent = `Last login ${formatDate(currentUser.lastLoginAt)}`;

  document.getElementById("adminAccountsTable").innerHTML = state.accounts.map((account) => `
    <tr>
      <td>${account.name}</td>
      <td>${account.email}</td>
      <td><span class="pill ${account.role === "Admin" ? "" : "warning"}">${account.role || "User"}</span></td>
      <td>${formatDate(account.lastLoginAt)}</td>
    </tr>
  `).join("");

  document.getElementById("adminProductsTable").innerHTML = state.products.map((product) => `
    <tr>
      <td>${product.icon} ${product.name}</td>
      <td>${product.category}</td>
      <td>${formatMoney(Number(product.price || 0))}</td>
      <td>${product.nutrition}</td>
      <td><button type="button" class="danger-button" data-delete-product="${product.name}">Remove</button></td>
    </tr>
  `).join("");
}

document.getElementById("adminProductForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const state = readState();
  const product = {
    name: document.getElementById("adminProductName").value.trim(),
    category: document.getElementById("adminProductCategory").value,
    price: Number(document.getElementById("adminProductPrice").value),
    icon: document.getElementById("adminProductIcon").value.trim(),
    nutrition: document.getElementById("adminProductNutrition").value.trim()
  };

  if (state.products.some((item) => item.name.toLowerCase() === product.name.toLowerCase())) {
    alert("A product with this name already exists.");
    return;
  }

  state.products.push(product);
  saveState(state);
  event.target.reset();
  renderAdminPage();
});

document.getElementById("adminProductsTable").addEventListener("click", (event) => {
  const productName = event.target.dataset.deleteProduct;
  if (!productName) return;

  const state = readState();
  state.products = state.products.filter((product) => product.name !== productName);
  saveState(state);
  renderAdminPage();
});

document.getElementById("adminLogoutButton").addEventListener("click", () => {
  const state = readState();
  state.user = null;
  saveState(state);
  window.location.href = "login.html";
});

renderAdminPage();

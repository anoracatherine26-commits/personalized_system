const storageKey = "personalized-grocery-ai-state";

const fallbackProducts = [
  { name: "Organic Banana", category: "Produce", icon: "🍌", price: 67.2, nutrition: "Potassium rich snack" },
  { name: "Red Apples", category: "Produce", icon: "🍎", price: 212.8, nutrition: "Crisp fruit for snacks" },
  { name: "Whole Milk", category: "Dairy", icon: "🥛", price: 257.6, nutrition: "Calcium and protein" },
  { name: "Chicken Breast", category: "Protein", icon: "🍗", price: 498.4, nutrition: "Lean protein" },
  { name: "Brown Rice", category: "Grains", icon: "🍚", price: 235.2, nutrition: "Fiber rich pantry staple" }
];

function readState() {
  try {
    const state = JSON.parse(localStorage.getItem(storageKey)) || {};
    state.accounts = state.accounts || [];
    state.products = state.products || fallbackProducts;
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

const storageKey = "personalized-grocery-ai-state";

function readState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
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
  const accounts = state.accounts || (currentUser ? [currentUser] : []);
  const isAdmin = currentUser?.role === "Admin";

  document.getElementById("adminGate").classList.toggle("hidden", isAdmin);
  document.getElementById("adminContent").classList.toggle("hidden", !isAdmin);
  document.getElementById("adminLogoutButton").classList.toggle("hidden", !currentUser);

  if (!isAdmin) return;

  const adminAccounts = accounts.filter((account) => account.role === "Admin");
  const userAccounts = accounts.filter((account) => account.role !== "Admin");

  document.getElementById("adminIdentity").textContent = `${currentUser.name} • Admin`;
  document.getElementById("adminAccountCount").textContent = accounts.length;
  document.getElementById("adminRoleCount").textContent = adminAccounts.length;
  document.getElementById("userRoleCount").textContent = userAccounts.length;
  document.getElementById("lastLoginLabel").textContent = `Last login ${formatDate(currentUser.lastLoginAt)}`;

  document.getElementById("adminAccountsTable").innerHTML = accounts.map((account) => `
    <tr>
      <td>${account.name}</td>
      <td>${account.email}</td>
      <td><span class="pill ${account.role === "Admin" ? "" : "warning"}">${account.role || "User"}</span></td>
      <td>${formatDate(account.joinedAt)}</td>
      <td>${formatDate(account.lastLoginAt)}</td>
    </tr>
  `).join("");
}

document.getElementById("adminLogoutButton").addEventListener("click", () => {
  const state = readState();
  state.user = null;
  saveState(state);
  window.location.href = "index.html";
});

renderAdminPage();

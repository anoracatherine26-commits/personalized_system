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

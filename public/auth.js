import { apiFetch } from "./_api.js";

// Tab switching
document.querySelectorAll(".auth-tab, .switch-tab").forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    const mode = tab.dataset.authMode;

    document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"));
    document.querySelector(`[data-auth-mode="${mode}"].auth-tab`)?.classList.add("active");

    document.getElementById("loginPanel").classList.toggle("hidden", mode !== "login");
    document.getElementById("registerPanel").classList.toggle("hidden", mode !== "register");
  });
});

function getVal(id) {
  return document.getElementById(id)?.value?.trim();
}

function getPass() {
  const el = document.getElementById("loginPassword");
  return el ? el.value : "";
}

function showErr(action, err) {
  const msg = err?.message || String(err);
  alert(`${action} failed: ${msg}`);
}

// Login
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = getVal("loginEmail");
  const password = getPass();

  try {
    await apiFetch("/api/auth/login", { method: "POST", body: { email, password } });
    window.location.href = "index.html";
  } catch (err) {
    showErr("Login", err);
  }
});

// Register
document.getElementById("registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = getVal("registerName");
  const email = getVal("registerEmail");
  const password = document.getElementById("registerPassword")?.value || "";
  const role = document.getElementById("registerRole")?.value || "User";

  try {
    await apiFetch("/api/auth/register", {
      method: "POST",
      body: { name, email, password, role }
    });
    window.location.href = "index.html";
  } catch (err) {
    showErr("Register", err);
  }
});


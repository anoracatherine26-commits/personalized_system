const API_BASE = "";

async function apiFetch(path, { method = "GET", headers = {}, body = undefined } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : undefined;
  } catch {
    json = undefined;
  }

  if (!res.ok) {
    const msg = json?.error || json?.message || text || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return json;
}

function ensureLoggedIn() {
  return apiFetch("/api/me").then((r) => r.user);
}

export { apiFetch, ensureLoggedIn };


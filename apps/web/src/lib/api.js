// apps/web/src/lib/api.js
const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",                           
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  health: () => request("/health"),
  listTrilhas: () => request("/trilhas"),
  listVideos: () => request("/videos"),
  getVideo: (id) => request(`/videos/${id}`),
  // se já existir no back:
  me: () => request("/auth/me"),
  setPassword: (email, newPassword) =>
    request("/auth/set-password", {
      method: "POST",
      body: JSON.stringify({ email, newPassword }),
    }),
};

export default api;

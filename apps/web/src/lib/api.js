const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

/* exemplos de endpoints futuros */
export const api = {
  health: () => request("/health"),
  listTrilhas: () => request("/trilhas"),
  listVideos: () => request("/videos"),
  getVideo: (id) => request(`/videos/${id}`),
};

export default api;

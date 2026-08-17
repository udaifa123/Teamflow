export const API_URL = "http://localhost:5000/api";

async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.accessToken);
    return data.accessToken;
  } else {
    localStorage.clear();
    window.location.href = "/login";
  }
}

export async function apiFetch(endpoint: string, options?: RequestInit) {
  let token = localStorage.getItem("token");

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // 🔥 auto refresh
  if (res.status === 401) {
    token = await refreshToken();

    res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
"use client";


export const API_URL = "https://teamflow1.duckdns.org/api";

async function refreshToken(redirectToLogin: () => void) {
  const refreshToken = localStorage.getItem("refreshToken");

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (res.ok && data?.accessToken) {
    localStorage.setItem("token", data.accessToken);
    return data.accessToken;
  } else {
    localStorage.clear();


    redirectToLogin();

    throw new Error("Session expired");
  }
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  redirectToLogin?: () => void
) {
  let token = localStorage.getItem("token");

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });


  if (res.status === 401 && redirectToLogin) {
    token = await refreshToken(redirectToLogin);

    res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    console.error("API ERROR:", data);
    throw new Error(
      data?.message || `Request failed (${res.status})`
    );
  }

  return data;
}
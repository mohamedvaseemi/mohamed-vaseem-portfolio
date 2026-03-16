// src/app/utils/HTTPWrapper.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method?: HTTPMethod;
  body?: any;
  headers?: Record<string, string>;
}

// Helper to get a cookie by name
function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null; // SSR-safe
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
}

async function HTTPWrapper(path: string, options: RequestOptions = {}) {
  const { method = "GET", body, headers = {} } = options;

  // Get token from cookies
  const token = getCookie("token");

  const fetchHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  return response.json();
}

// Shortcut methods
HTTPWrapper.get = (path: string, headers?: Record<string, string>) =>
  HTTPWrapper(path, { method: "GET", headers });

HTTPWrapper.post = (path: string, body: any, headers?: Record<string, string>) =>
  HTTPWrapper(path, { method: "POST", body, headers });

HTTPWrapper.put = (path: string, body: any, headers?: Record<string, string>) =>
  HTTPWrapper(path, { method: "PUT", body, headers });

HTTPWrapper.delete = (path: string, body?: any, headers?: Record<string, string>) =>
  HTTPWrapper(path, { method: "DELETE", body, headers });

export default HTTPWrapper;

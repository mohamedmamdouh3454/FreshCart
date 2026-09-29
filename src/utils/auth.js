import { jwtDecode } from "jwt-decode";

const AUTH_KEYS = ["token", "userName", "userId"];

// remove only the keys this app owns, so other data on the domain survives
export function clearAuthStorage() {
  AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
}

// returns the token payload only when it decodes and has not expired,
// otherwise null so callers can treat it as "not signed in"
export function getDecodedToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp * 1000 <= Date.now()) return null;
    return decoded;
  } catch (err) {
    return null;
  }
}

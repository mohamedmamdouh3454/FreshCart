import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

export let tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const updateToken = (newToken) => {
    if (!newToken) return;

    setToken(newToken);

    try {
      const { id, name } = jwtDecode(newToken);
      setUserData({ id, name });
      localStorage.setItem("userName", name);
      localStorage.setItem("userId", id);
    } catch (err) {
      // a malformed token must not bring down the whole provider
      setUserData(null);
    }
  };

  return (
    <tokenContext.Provider
      value={{ token, setToken, updateToken, userData, setUserData }}
    >
      {children}
    </tokenContext.Provider>
  );
}

import React, { createContext, useEffect, useState, useMemo } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("userToken"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("userToken", token);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [token]);

  const value = useMemo(() => ({ token, setToken }), [token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

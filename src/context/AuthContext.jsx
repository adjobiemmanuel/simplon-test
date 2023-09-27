import { useState, createContext, useMemo } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("identifiant")) || ""
  );
  const [token,setToken] = useState(JSON.parse(localStorage.getItem("token")) || "")

  const values = useMemo(() => {
    return {
      user,
      token,
      login: (user,token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("identifiant", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
      },
      logOut: () => {
        localStorage.removeItem("identifiant");
        localStorage.removeItem("token");
        setUser("");
        setToken(" ");
      },
    };
  }, [user,token]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};




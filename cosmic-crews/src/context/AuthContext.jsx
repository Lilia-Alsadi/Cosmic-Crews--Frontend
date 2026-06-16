import { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../api/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService
        .getCurrentUser()
        .then((userData) => {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        })
        .catch((err) => {
          console.error("Failed to fetch user profile", err);
          if (err.response?.status === 401) {
            logout();
          }
        });
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return <AuthContext.Provider value={{ user, setUser: updateUser, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

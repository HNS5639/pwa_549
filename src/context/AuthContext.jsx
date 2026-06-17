import { createContext, useContext, useMemo, useState } from "react";
import { GetLocalStorage, SetLocalStorage } from "./../service/localStorage";
import * as authService from "./../service/auth";

const AuthContext = createContext(null);

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

function getStoredUser() {
  const stored = GetLocalStorage(USER_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [accessToken, setAccessToken] = useState(
    () => GetLocalStorage(ACCESS_TOKEN_KEY) ?? null
  );

  const persistSession = ({ user: nextUser, accessToken: nextToken, refreshToken }) => {
    setUser(nextUser);
    setAccessToken(nextToken);
    SetLocalStorage(USER_KEY, JSON.stringify(nextUser));
    SetLocalStorage(ACCESS_TOKEN_KEY, nextToken);
    SetLocalStorage(REFRESH_TOKEN_KEY, refreshToken);
  };

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    persistSession(result);
    return result;
  };

  const register = async (credentials) => {
    const result = await authService.register(credentials);
    persistSession(result);
    return result;
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    SetLocalStorage(USER_KEY, "");
    SetLocalStorage(ACCESS_TOKEN_KEY, "");
    SetLocalStorage(REFRESH_TOKEN_KEY, "");
  };

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      login,
      register,
      logout,
    }),
    [user, accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
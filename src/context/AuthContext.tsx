"use client";

import { fetchCurrentUser } from "@/features/auth/api/auth.api";
import { normalizeUser } from "@/features/auth/utils/normalizeUser";
import {
  clearAuthStorage,
  getAuthToken,
  persistUser,
  setAuthToken,
} from "@/lib/auth/tokenStorage";
import type { SetCredentialsPayload } from "@/types/auth";
import type { User } from "@/types/user";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

type AuthContextState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  redirectPath: string | null;
};

type AuthAction =
  | { type: "INITIALIZE"; token: string | null; user: User | null }
  | { type: "SET_CREDENTIALS"; payload: SetCredentialsPayload }
  | { type: "SET_USER"; user: User }
  | { type: "LOGOUT" }
  | { type: "SET_REDIRECT"; path: string | null }
  | { type: "CLEAR_REDIRECT" };

const initialState: AuthContextState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
  redirectPath: null,
};

function authReducer(state: AuthContextState, action: AuthAction): AuthContextState {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        token: action.token,
        user: action.user,
        isAuthenticated: Boolean(action.token),
        isInitialized: true,
      };
    case "SET_CREDENTIALS": {
      const user = normalizeUser(action.payload.user);
      setAuthToken(action.payload.token);
      persistUser(user);
      return {
        ...state,
        user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case "SET_USER":
      persistUser(action.user);
      return { ...state, user: action.user };
    case "LOGOUT":
      clearAuthStorage();
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        redirectPath: null,
      };
    case "SET_REDIRECT":
      return { ...state, redirectPath: action.path };
    case "CLEAR_REDIRECT":
      return { ...state, redirectPath: null };
    default:
      return state;
  }
}

type AuthContextValue = AuthContextState & {
  setCredentials: (payload: SetCredentialsPayload) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setRedirectPath: (path: string | null) => void;
  clearRedirectPath: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return normalizeUser(JSON.parse(raw) as User);
  } catch {
    return null;
  }
}

function AuthSessionSync({
  token,
  isInitialized,
  onUser,
  onSessionInvalid,
}: {
  token: string | null;
  isInitialized: boolean;
  onUser: (user: User) => void;
  onSessionInvalid: () => void;
}) {
  useEffect(() => {
    if (!isInitialized || !token) return;

    let cancelled = false;

    void fetchCurrentUser()
      .then((user) => {
        if (!cancelled) onUser(user);
      })
      .catch(() => {
        if (!cancelled) onSessionInvalid();
      });

    return () => {
      cancelled = true;
    };
  }, [isInitialized, token, onUser, onSessionInvalid]);

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = getAuthToken();
    const user = readStoredUser();
    dispatch({ type: "INITIALIZE", token, user });
  }, []);

  const setCredentials = useCallback((payload: SetCredentialsPayload) => {
    dispatch({ type: "SET_CREDENTIALS", payload });
  }, []);

  const setUser = useCallback((user: User) => {
    dispatch({ type: "SET_USER", user: normalizeUser(user) });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const setRedirectPath = useCallback((path: string | null) => {
    dispatch({ type: "SET_REDIRECT", path });
  }, []);

  const clearRedirectPath = useCallback(() => {
    dispatch({ type: "CLEAR_REDIRECT" });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setCredentials,
      setUser,
      logout,
      setRedirectPath,
      clearRedirectPath,
    }),
    [state, setCredentials, setUser, logout, setRedirectPath, clearRedirectPath],
  );

  return (
    <AuthContext.Provider value={value}>
      <AuthSessionSync
        token={state.token}
        isInitialized={state.isInitialized}
        onUser={setUser}
        onSessionInvalid={logout}
      />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { EmployeeData } from "../types/global";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { jwtDecode } from "jwt-decode";

type OptionProps = {
  token: string;
  expirationTime: number;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: EmployeeData | null;
  login: (
    userData: EmployeeData,
    { token, expirationTime }: OptionProps
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<EmployeeData | null>(null);
  const navigate = useNavigate();

  const login = (
    userData: EmployeeData,
    { token, expirationTime }: { token: string; expirationTime: number }
  ) => {
    setIsAuthenticated(true);
    setUser(userData);
    // localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("authToken", token); // Store the access token
    // localStorage.setItem("tokenExpiration", expirationTime.toString()); // Store the expiration time
    // localStorage.setItem("loginTimestamp", Date.now().toString());
    navigate("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    // localStorage.removeItem("tokenExpiration");
    // localStorage.removeItem("loginTimestamp");
    navigate("/login");
  };

  useEffect(() => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        logout(); // Token has expired, log the user out
      } else {
        const timeoutDuration = expirationTime - currentTime;
        setTimeout(() => {
          logout(); // Schedule a logout when the token expires
        }, timeoutDuration);
      }
    }
  }, []);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken(true); // Force refresh the token
          const decodedToken: any = jwtDecode(token);
          const newExpirationTime = decodedToken.exp * 1000;

          localStorage.setItem("authToken", token);
          localStorage.setItem("tokenExpiration", newExpirationTime.toString());
        }
      } catch (error) {
        console.log("Error refreshing token:", error);
      }
    };

    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      const currentTime = Date.now();
      const refreshThreshold = expirationTime - 5 * 60 * 1000; // Refresh 5 minutes before expiration

      if (currentTime < refreshThreshold) {
        const refreshInterval = setInterval(
          refreshToken,
          refreshThreshold - currentTime
        );
        return () => clearInterval(refreshInterval);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

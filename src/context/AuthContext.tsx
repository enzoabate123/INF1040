
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, AuthState } from "../types/user";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
            error: null,
          });
        } catch (error) {
          localStorage.removeItem("user");
          setAuthState({
            ...initialState,
            loading: false,
          });
        }
      } else {
        setAuthState({
          ...initialState,
          loading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // In a real app, this would be an API call to your backend
      if (email && password) {
        // Simulate successful login
        const user: User = {
          id: "user-123",
          name: email.split("@")[0],
          email,
        };

        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });

        localStorage.setItem("user", JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });

        return true;
      }

      throw new Error("Invalid credentials");
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : "Login failed",
      });

      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });

      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // In a real app, this would be an API call to your backend
      if (name && email && password) {
        // Simulate successful registration
        const user: User = {
          id: `user-${Date.now()}`,
          name,
          email,
        };

        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });

        localStorage.setItem("user", JSON.stringify(user));
        
        toast({
          title: "Account created",
          description: `Welcome to TripTide, ${name}!`,
        });

        return true;
      }

      throw new Error("Invalid signup information");
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : "Registration failed",
      });

      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again with different information",
        variant: "destructive",
      });

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

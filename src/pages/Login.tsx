
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const from = location.state?.from || "/";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-booking-light">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-serif font-bold">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your TripTide account</p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-booking-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-booking-primary hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-booking-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;

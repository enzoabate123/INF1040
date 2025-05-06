
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would make an API call to update the user profile
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-booking-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-serif font-bold mb-6">My Profile</h1>
            
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <form onSubmit={handleUpdateProfile}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="bg-booking-primary hover:bg-blue-600"
                      >
                        {loading ? "Updating..." : "Update Profile"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter your current password"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant="outline" 
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => logout()}
                    >
                      Log Out
                    </Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;

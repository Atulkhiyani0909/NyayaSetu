
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { BACKEND_URL } from '../lib/config';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      FullName: '',
      Email: '',
      PhoneNumber: '',
      Password: '',
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, formData);
      
      if(response.data) {
        toast.success("Registration successfull");
        navigate('/login');
      }

      console.log('Registration attempt');

    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-center" />
      <div className="container mx-auto flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1A5F7A]">Create Account</h2>
              <p className="text-gray-600 mt-2">Join NyayaSetu for government services</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="FullName" 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  value={formData.FullName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="Email" 
                  type="email" 
                  placeholder="your-email@example.com" 
                  required 
                  value={formData.Email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="PhoneNumber" 
                  type="tel" 
                  placeholder="+91 9876543210" 
                  required
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="Password" 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  value={formData.Password}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required
                  className="h-4 w-4 text-[#1A5F7A] rounded border-gray-300" 
                />
                <label htmlFor="terms" className="ml-2 text-gray-600 text-sm">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#1A5F7A] hover:underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#FF6B35] hover:bg-orange-600 text-white"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#1A5F7A] hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

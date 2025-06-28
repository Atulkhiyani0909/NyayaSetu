import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../lib/config";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        gov_id: '',
        department: '', 
        password: '',
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
        const response = await axios.post(`${BACKEND_URL}/admin/register`, formData);
        
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
                <h2 className="text-3xl font-bold text-[#1A5F7A]">Create Admin Account</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                    id="name" 
                    type="text" 
                    placeholder="Pawan Kumar" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                    id="email" 
                    type="email" 
                    placeholder="your-email@example.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="flex justify-between">
                    <div className="space-y-2">
                    <Label htmlFor="email">City</Label>
                    <Input 
                    id="city" 
                    type="text" 
                    placeholder="Gwalior" 
                    required 
                    value={formData.city}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="space-y-2">
                    <Label >State</Label>
                    <Input 
                    id="state" 
                    type="text" 
                    placeholder="Madhya Pradesh" 
                    required 
                    value={formData.state}
                    onChange={handleChange}
                    />
                </div>
                </div>
                
                <div className="flex justify-between">
                    <div className="space-y-2">
                    <Label htmlFor="email">Admin Govt. ID</Label>
                    <Input 
                    id="gov_id" 
                    type="text" 
                    placeholder="ABXXX5676XXX" 
                    required 
                    value={formData.gov_id}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="email">Department</Label>
                    <Input 
                    id="department" 
                    type="text" 
                    placeholder="Railway" 
                    required 
                    value={formData.department}
                    onChange={handleChange}
                    />
                </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    value={formData.password}
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
                    <Link to="/adminlogin" className="text-[#1A5F7A] hover:underline">
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
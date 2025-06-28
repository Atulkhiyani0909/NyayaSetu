import { useNavigate } from "react-router-dom";
import LandingHeader from "../components/LandingHeader";
import { Users, BarChart, Award, Briefcase, Gavel, ShieldCheck, BriefcaseIcon } from 'lucide-react';

export const GetStarted = () => {
    
    const navigate = useNavigate();

    const handelUser = () => {
        navigate('/userregister')
    };
    
    const handelEmployee = () => {
        navigate('/employeeregister')
    };
    
    const handelLawyer = () => {
        navigate('/lawyerregister')
    };
    
    const handelAdmin = () => {
        navigate('/adminregister')
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A5F7A] mb-4">
            Who Are You ?
          </h1>
        </div>
        
        {/* Key Features */}
        <div className="mb-16">
          
          <div className="grid cursor-pointer md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "User",
                description: "Register or login to access citizen services.",
                onClick : handelUser
              },
              {
                icon: BriefcaseIcon,
                title: "Employee",
                description: "Register or Login to manage and resolve service requests.",
                onClick : handelEmployee
              },
              {
                icon: Gavel,
                title: "Lawyer",
                description: "Register or Login to assist users with legal matters.",
                onClick : handelLawyer
              },
              {
                icon: ShieldCheck,
                title: "Admin",
                description: "Register or Login to oversee and administer the platform.",
                onClick : handelAdmin
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                onClick={feature.onClick}
              >
                <div className="flex justify-center mb-4">
                  <feature.icon 
                    size={48} 
                    className="text-[#1A5F7A] opacity-80" 
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-[#1A5F7A] text-white py-8">
        <div className="container mx-auto text-center">
          <p>© 2025 NyayaSetu. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
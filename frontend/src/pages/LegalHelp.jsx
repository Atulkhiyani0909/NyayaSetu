// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { 
//   Scale, 
//   Star, 
//   MapPin, 
//   Clock, 
//   Phone, 
//   Mail,
//   Calendar,
//   Video,
//   MessageCircle,
//   Award,
//   BookOpen,
//   Users,
//   Search,
//   IndianRupee
// } from 'lucide-react';
// // FIX: Import Navbar as a named import, not default
// import Navbar from '@/components/Navbar';
// import { useToast } from '@/hooks/use-toast';
// import UserHeader from '../components/ui/UserHeader';

// const LegalHelp = () => {
//   const { toast } = useToast();
//   const [selectedSpeciality, setSelectedSpeciality] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const specialities = [
//     { id: 'all', name: 'All Lawyers', count: 150 },
//     { id: 'civil', name: 'Civil Law', count: 45 },
//     { id: 'criminal', name: 'Criminal Law', count: 32 },
//     { id: 'consumer', name: 'Consumer Rights', count: 28 },
//     { id: 'labor', name: 'Labor Law', count: 25 },
//     { id: 'constitutional', name: 'Constitutional Law', count: 20 }
//   ];

  

//   const handleBookConsultation = (lawyer) => {
//     toast({
//       title: "Consultation Booking",
//       description: `Booking consultation with ${lawyer.name}. You will be redirected to payment.`,
//     });
//   };

//   const filteredLawyers = lawyers.filter(lawyer => {
//     const matchesSpeciality = selectedSpeciality === 'all' || 
//       lawyer.speciality.toLowerCase().includes(selectedSpeciality);
//     const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       lawyer.speciality.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesSpeciality && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//         <UserHeader/>
      
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="pt-20 px-4 sm:px-6 lg:px-8"
//       >
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-center mb-12"
//           >
//             <h1 className="text-4xl font-bold text-[#195f7a] mb-4">Legal Assistance</h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Connect with qualified lawyers and legal professionals. Get expert advice for your legal concerns.
//             </p>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
//           >
//             {[
//               { label: 'Verified Lawyers', value: '150+', icon: Scale },
//               { label: 'Consultations', value: '2,500+', icon: Users },
//               { label: 'Success Rate', value: '95%', icon: Award },
//               { label: 'Pro Bono Services', value: '40%', icon: BookOpen }
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-[#6c95a6] to-[#28707c] rounded-2xl flex items-center justify-center mx-auto mb-3">
//                   <stat.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Filters */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="mb-8"
//           >
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex flex-col md:flex-row gap-4">
//                   {/* Search */}
//                   <div className="flex-1">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <Input
//                         placeholder="Search lawyers by name or speciality..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="pl-10"
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Speciality Filter */}
//                   <div className="flex flex-wrap gap-2">
//                     {specialities.map((spec) => (
//                       <Button
//                         key={spec.id}
//                         variant={selectedSpeciality === spec.id ? 'default' : 'outline'}
//                         size="sm"
//                         onClick={() => setSelectedSpeciality(spec.id)}
//                         className={selectedSpeciality === spec.id ? 
//                           'bg-gradient-to-r from-[#6c95a6] to-[#28707c]' : ''}
//                       >
//                         {spec.name} ({spec.count})
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Lawyers Grid */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {filteredLawyers.map((lawyer, index) => (
//               <motion.div
//                 key={lawyer.id}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <Card className="h-full hover:shadow-xl transition-all duration-300">
//                   <CardHeader className="pb-4">
//                     <div className="flex items-center space-x-4">
//                       <Avatar className="w-16 h-16">
//                         <AvatarImage src={lawyer.image} alt={lawyer.Name} />
//                         <AvatarFallback>{lawyer.Name}</AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2">
//                           <h3 className="font-bold text-lg">{lawyer.name}</h3>
//                           {true && (
//                             <Badge className="bg-green-100 text-green-800">
//                               Verified
//                             </Badge>
//                           )}
//                         </div>
//                         <p className="text-blue-600 font-medium">{lawyer.speciality}</p>
//                         <p className="text-sm text-gray-600">{lawyer.experience} years experience</p>
//                       </div>
//                     </div>
//                   </CardHeader>
                  
//                   <CardContent className="space-y-4">
//                     {/* Rating */}
//                     <div className="flex items-center space-x-2">
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-4 h-4 ${
//                               i < Math.floor(lawyer.ratings)
//                                 ? 'text-yellow-400 fill-current'
//                                 : 'text-gray-300'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="font-medium">{lawyer.ratings}</span>
//                     </div>

//                     {/* Details */}
//                     <div className="space-y-2 text-sm">
//                       <div className="flex items-center space-x-2 text-gray-600">
//                         <MapPin className="w-4 h-4" />
//                         <span>{lawyer.location.city}</span>
//                         <span>{lawyer.location.state}</span>
//                       </div>
//                     </div>

//                     {/* Call fees */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-1">
//                         <IndianRupee className="w-4 h-4 text-green-600" />
//                         <span className="font-bold text-green-600">₹{lawyer.call_fees}</span>
//                         <span className="text-sm text-gray-500">/ consultation</span>
//                       </div>
//                       {true && (
//                         <Badge className="bg-blue-100 text-blue-800">
//                           Pro Bono Available
//                         </Badge>
//                       )}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="grid grid-cols-2 gap-2 pt-4">
//                       <Button
//                         size="sm"
//                         onClick={() => handleBookConsultation(lawyer)}
//                         className="bg-gradient-to-r from-[#7fa2b4] to-[#44778f] hover:from-[#44778f] hover:to-[#548498] flex items-center space-x-1"
//                       >
//                         <Video className="w-4 h-4" />
//                         <span>Book</span>
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Nyaya Bandhu Section */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="mt-16"
//           >
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LegalHelp;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Scale, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Calendar,
  Video,
  MessageCircle,
  Award,
  BookOpen,
  Users,
  Search,
  IndianRupee
} from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../lib/config';
import { useToast } from '@/hooks/use-toast';
import UserHeader from '../components/ui/UserHeader';

const LegalHelp = () => {
  const { toast } = useToast();
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lawyers, setLawyers] = useState([]);

  const specialities = [
    { id: 'all', name: 'All Lawyers', count: 150 },
    { id: 'civil', name: 'Civil Law', count: 45 },
    { id: 'criminal', name: 'Criminal Law', count: 32 },
    { id: 'consumer', name: 'Consumer Rights', count: 28 },
    { id: 'labor', name: 'Labor Law', count: 25 },
    { id: 'constitutional', name: 'Constitutional Law', count: 20 }
  ];

  // Fetch lawyers from backend
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/lawyer/get-lawyers`);
        setLawyers(res.data);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to fetch lawyers.",
        });
      }
    };
    fetchLawyers();
  }, [toast]);

 const handleBookConsultation = async (lawyer) => {
  try {
    // If you use JWT auth, add headers here:
    // const token = localStorage.getItem('token');
    // const resbook = await axios.get(
    //   `${BACKEND_URL}/call/initiateCall/${lawyer._id}`,
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
    const resbook = await axios.get(`${BACKEND_URL}/call/initiateCall/${lawyer._id}`);
    toast({
      title: "Consultation Booking",
      description: `Booking consultation with ${lawyer.Name || lawyer.name}. You will be redirected to payment.`,
    });
    console.log(resbook.data);
  } catch (error) {
    toast({
      title: "Error",
      description: error?.response?.data?.error || "Failed to initiate call.",
    });
    console.error(error);
  }
};

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSpeciality =
      selectedSpeciality === 'all' ||
      (lawyer.speciality && lawyer.speciality.toLowerCase().includes(selectedSpeciality));
    const matchesSearch =
      (lawyer.Name && lawyer.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lawyer.speciality && lawyer.speciality.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpeciality && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <UserHeader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-[#195f7a] mb-4">Legal Assistance</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with qualified lawyers and legal professionals. Get expert advice for your legal concerns.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'Verified Lawyers', value: '150+', icon: Scale },
              { label: 'Consultations', value: '2,500+', icon: Users },
              { label: 'Success Rate', value: '95%', icon: Award },
              { label: 'Pro Bono Services', value: '40%', icon: BookOpen }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#6c95a6] to-[#28707c] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search lawyers by name or speciality..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  {/* Speciality Filter */}
                  <div className="flex flex-wrap gap-2">
                    {specialities.map((spec) => (
                      <Button
                        key={spec.id}
                        variant={selectedSpeciality === spec.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSpeciality(spec.id)}
                        className={selectedSpeciality === spec.id ?
                          'bg-gradient-to-r from-[#6c95a6] to-[#28707c]' : ''}
                      >
                        {spec.name} ({spec.count})
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lawyers Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredLawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer._id || lawyer.id || index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={lawyer.image} alt={lawyer.Name || lawyer.name} />
                        <AvatarFallback>{(lawyer.Name || lawyer.name || '').split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-lg">{lawyer.Name || lawyer.name}</h3>
                          {lawyer.verified && (
                            <Badge className="bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-blue-600 font-medium">{lawyer.speciality}</p>
                        <p className="text-sm text-gray-600">{lawyer.experience} years experience</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(lawyer.ratings || lawyer.rating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{lawyer.ratings || lawyer.rating || 0}</span>
                    </div>
                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{lawyer.location?.city || lawyer.location || ''}</span>
                        <span>{lawyer.location?.state || ''}</span>
                      </div>
                    </div>
                    {/* Call fees */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600">₹{lawyer.call_fees || lawyer.consultationFee || 0}</span>
                        <span className="text-sm text-gray-500">/ consultation</span>
                      </div>
                      {lawyer.proBono && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Pro Bono Available
                        </Badge>
                      )}
                    </div>
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <Button
                        size="sm"
                        onClick={() => handleBookConsultation(lawyer)}
                        className="bg-gradient-to-r from-[#7fa2b4] to-[#44778f] hover:from-[#44778f] hover:to-[#548498] flex items-center space-x-1"
                      >
                        <Video className="w-4 h-4" />
                        <span>Book</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalHelp;
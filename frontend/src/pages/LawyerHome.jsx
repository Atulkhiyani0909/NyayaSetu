import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../hooks/auth-context';
import LawyerHeader from '../components/ui/LawyerHeader';

// You can use Framer Motion for smooth animations
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "NyayaSetu connected me with clients who needed my expertise. The platform's transparency and ease of use are unmatched.",
    author: "Adv. Ravi Desai, Delhi"
  },
  {
    quote: "Managing my appointments and case documents is seamless. NyayaSetu has truly modernized my legal practice.",
    author: "Adv. Anita Sharma, Mumbai"
  },
  {
    quote: "The client communication tools and secure document uploads make my workflow efficient and professional.",
    author: "Adv. Prakash Iyer, Bangalore"
  }
];

const LawyerHome = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A5F7A] via-[#3A8CA8] to-[#FF6B35] flex flex-col">
      <LawyerHeader />

      <main className="flex-grow container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome, Legal Expert!
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Empower your legal practice with NyayaSetu. Connect with clients, manage cases, and grow your reputation—all in one secure platform.
          </motion.p>

          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
            >
              <Link
                to="/lawyerregister"
                className="bg-[#FF6B35] text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg font-semibold text-lg"
              >
                Join as a Lawyer
              </Link>
              <Link
                to="/lawyerlogin"
                className="bg-white text-[#1A5F7A] px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg font-semibold text-lg"
              >
                Login
              </Link>
            </motion.div>
          )}

          {/* Features Section */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {[
              {
                title: "Client Connections",
                desc: "Get discovered by clients seeking legal help in your area of expertise.",
                icon: "🤝"
              },
              {
                title: "Case Management",
                desc: "Organize case files, appointments, and communications in one place.",
                icon: "📁"
              },
              {
                title: "Secure Document Sharing",
                desc: "Upload and share sensitive documents with clients securely.",
                icon: "🔒"
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-white/90 p-8 rounded-xl shadow-xl flex flex-col items-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#1A5F7A] mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 drop-shadow-lg">
              What Lawyers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/90 p-6 rounded-lg shadow-md border-l-4 border-[#FF6B35] relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <span className="absolute -left-3 top-6 text-4xl text-[#FF6B35]">“</span>
                  <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                  <p className="font-medium text-[#1A5F7A]">— {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {!isAuthenticated && (
            <motion.div
              className="mt-24 bg-[#1A5F7A]/90 text-white p-12 rounded-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Practice?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Join a growing network of legal professionals and connect with clients who need your expertise.
              </p>
              <Link to="/lawyerregister">
                <Button className="bg-[#FF6B35] hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-lg">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="bg-[#1A5F7A] text-white py-8 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">NyayaSetu</h3>
              <p className="text-sm text-gray-300">
                Empowering lawyers to serve citizens better through technology and transparency.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>lawyers@nyayasetu.gov.in</li>
                <li>+91 1800-XXX-XXXX</li>
                <li>New Delhi, India</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <a href="#" key={social} className="text-gray-300 hover:text-white text-xl font-bold">
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p>© 2025 NyayaSetu. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LawyerHome;
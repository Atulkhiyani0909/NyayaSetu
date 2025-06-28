import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../hooks/auth-context";
import axios from "axios";
import { BACKEND_URL } from "../lib/config";
import { PhoneCall, User, BadgeCheck, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CallHistory = () => {
  const { user, isAuthenticated } = useAuth();
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      setLoading(true);
      try {
        // Use the correct endpoint for lawyer call history
        const res = await axios.get(
          `${BACKEND_URL}/lawyer/get-call-history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // The backend returns { callsHistory: [...] }
        // Flatten the nested structure if needed
        if (Array.isArray(res.data.callsHistory)) {
          // Each item has allCalls (the call object)
          const flatCalls = res.data.callsHistory.map((item) => ({
            ...item.allCalls,
            totalCalls: item.totalCalls,
          }));
          setCalls(flatCalls);
        } else {
          setCalls([]);
        }
      } catch (err) {
        setCalls([]);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchCalls();
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A5F7A] via-[#3A8CA8] to-[#FF6B35] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto flex-grow flex flex-col items-center justify-center py-12 px-4"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-white mb-8 drop-shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <PhoneCall className="inline-block w-8 h-8 mr-2 text-[#FF6B35]" />
          Call History
        </motion.h1>

        {loading ? (
          <motion.div
            className="text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading call history...
          </motion.div>
        ) : calls.length === 0 ? (
          <motion.div
            className="text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No call history found.
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-3xl bg-white/90 rounded-lg shadow-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-3 text-[#1A5F7A] font-bold">User</th>
                  <th className="py-2 px-3 text-[#1A5F7A] font-bold">Lawyer</th>
                  <th className="py-2 px-3 text-[#1A5F7A] font-bold">Call Time (min)</th>
                  <th className="py-2 px-3 text-[#1A5F7A] font-bold">Cost (₹)</th>
                  <th className="py-2 px-3 text-[#1A5F7A] font-bold">Proof</th>
                  <th className="py-2 px-3 text-[#1A5F7A] font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call, idx) => (
                  <motion.tr
                    key={call._id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="hover:bg-[#FF6B35]/10 transition"
                  >
                    <td className="py-2 px-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#3A8CA8]" />
                      {call.userID?.Name || call.userID?.email || "User"}
                    </td>
                    <td className="py-2 px-3 flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-[#1A5F7A]" />
                      {call.LawyerID?.Name || call.LawyerID?.email || "Lawyer"}
                    </td>
                    <td className="py-2 px-3">{call.callTime || 0}</td>
                    <td className="py-2 px-3">₹{call.callCost || 0}</td>
                    <td className="py-2 px-3">
                      {call.callProof ? (
                        <a
                          href={call.callProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF6B35] hover:underline flex items-center"
                        >
                          <FileText className="w-4 h-4 mr-1" /> View
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {call.createdAt
                        ? new Date(call.createdAt).toLocaleString()
                        : "--"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        <Link
          as={Link}
          to="/lawyerhome"
          className="mt-10 bg-[#1A5F7A] hover:bg-[#164B61] text-white px-8 py-3 rounded-lg shadow-lg"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default CallHistory;
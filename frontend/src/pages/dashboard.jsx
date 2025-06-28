import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { PolarArea, Line } from 'react-chartjs-2';
import { ClipboardList, CheckCircle, XCircle, Clock, BarChart3, MapPin, Map, Building2 } from 'lucide-react';
import axios from 'axios';
import AdminHeader from '../components/ui/AdminHeader';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

// Custom hook for animated numbers
function useAnimatedNumber(target, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [target]);
  return value;
}

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const graphOptions = [
  { label: 'Total Complaints', value: 'total' },
  { label: 'City-wise', value: 'city' },
  { label: 'State-wise', value: 'state' },
  { label: 'Department-wise', value: 'department' },
];

// X-axis label arrays
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];
const states = ['Maharashtra', 'Madhya Pradesh', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'UP', 'Gujarat'];
const departments = ['Railways', 'Municipal', 'Police', 'Electricity', 'Water', 'Transport', 'Health'];

const Dashboard = () => {
  // Left side: complaints stats
  const [tickets, setTickets] = useState([]);
  const [length, setLength] = useState(0);
  const [Pendinglength, setPendingLength] = useState(0);
  const [Rejectedlength, setRejectedLength] = useState(0);
  const [Solvedlength, setSolvedLength] = useState(0);

  // Right side: line chart stats
  const [cityWise, setCityWise] = useState(0);
  const [stateWise, setStateWise] = useState(0);
  const [deptWise, setDeptWise] = useState(0);

  // For line chart animation
  const [allLineData, setAllLineData] = useState({
    total: [],
    city: [],
    state: [],
    department: [],
  });
  const [selectedGraph, setSelectedGraph] = useState('total');

  useEffect(() => {
    // Simulate fetching complaints
    const allComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/allTickets');
        setLength(response.data.length);
        setTickets(response.data);
      } catch (err) {
        // fallback to random numbers if backend fails
        const randomPending = randomInt(10, 100);
        const randomSolved = randomInt(10, 100);
        const randomRejected = randomInt(5, 50);
        setPendingLength(randomPending);
        setSolvedLength(randomSolved);
        setRejectedLength(randomRejected);
        setLength(randomPending + randomSolved + randomRejected);
      }
    };
    allComplaints();

    // Simulate right-side stats
    setCityWise(randomInt(50, 200));
    setStateWise(randomInt(100, 300));
    setDeptWise(randomInt(80, 250));

    // Simulate line chart data
    setAllLineData({
      total: Array.from({ length: months.length }, () => randomInt(100, 300)),
      city: Array.from({ length: cities.length }, () => randomInt(50, 200)),
      state: Array.from({ length: states.length }, () => randomInt(80, 250)),
      department: Array.from({ length: departments.length }, () => randomInt(60, 180)),
    });
  }, []);

  useEffect(() => {
    let pending = 0;
    let rejected = 0;
    let solved = 0;
    tickets.forEach(ticket => {
      if (ticket.status === 'Pending') {
        pending++;
      } else if (ticket.status === 'Rejected') {
        rejected++;
      } else {
        solved++;
      }
    });
    setPendingLength(pending);
    setRejectedLength(rejected);
    setSolvedLength(solved);
    setLength(pending + solved + rejected);
  }, [tickets]);

  // Animated numbers
  const animatedTotal = useAnimatedNumber(length);
  const animatedPending = useAnimatedNumber(Pendinglength);
  const animatedSolved = useAnimatedNumber(Solvedlength);
  const animatedRejected = useAnimatedNumber(Rejectedlength);

  const animatedCityWise = useAnimatedNumber(cityWise);
  const animatedStateWise = useAnimatedNumber(stateWise);
  const animatedDeptWise = useAnimatedNumber(deptWise);

  // Pie chart data
  const complaintData = {
    labels: ['Pending', 'Solved', 'Rejected'],
    datasets: [
      {
        data: [Pendinglength, Solvedlength, Rejectedlength],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)', // Pending - Yellow
          'rgba(75, 192, 192, 0.7)',  // Solved - Green
          'rgba(255, 99, 132, 0.7)',  // Rejected - Red
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        padding: 12,
        backgroundColor: 'rgba(26, 95, 122, 0.8)',
      }
    },
  };

  // Line chart options
  const lineOptions = {
    responsive: true,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        padding: 12,
        backgroundColor: 'rgba(26, 95, 122, 0.8)',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 50 }
      }
    }
  };

  // Dynamic x-axis labels based on selected graph
  const xLabels =
    selectedGraph === 'total'
      ? months
      : selectedGraph === 'city'
      ? cities
      : selectedGraph === 'state'
      ? states
      : departments;

  // Prepare line chart data for selected graph
  const lineChartData = {
    labels: xLabels,
    datasets: [
      {
        label: graphOptions.find(opt => opt.value === selectedGraph)?.label,
        data: allLineData[selectedGraph] || [],
        borderColor:
          selectedGraph === 'total'
            ? '#1A5F7A'
            : selectedGraph === 'city'
            ? '#FF6B35'
            : selectedGraph === 'state'
            ? '#4BC0C0'
            : '#FF6384',
        backgroundColor:
          selectedGraph === 'total'
            ? 'rgba(26,95,122,0.1)'
            : selectedGraph === 'city'
            ? 'rgba(255,107,53,0.1)'
            : selectedGraph === 'state'
            ? 'rgba(75,192,192,0.1)'
            : 'rgba(255,99,132,0.1)',
        tension: 0.4, // smooth lines, set to 0 for straight lines
        pointRadius: 5,
        pointBackgroundColor:
          selectedGraph === 'total'
            ? '#1A5F7A'
            : selectedGraph === 'city'
            ? '#FF6B35'
            : selectedGraph === 'state'
            ? '#4BC0C0'
            : '#FF6384',
      },
    ],
  };

  // Left stats
  const stats = [
    {
      title: 'Total Complaints',
      value: animatedTotal,
      icon: ClipboardList,
      color: 'bg-[#1A5F7A]',
      trend: '+12% this month'
    },
    {
      title: 'Pending',
      value: animatedPending,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '5 new today'
    },
    {
      title: 'Solved',
      value: animatedSolved,
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '3 solved today'
    },
    {
      title: 'Rejected',
      value: animatedRejected,
      icon: XCircle,
      color: 'bg-red-500',
      trend: '1 rejected today'
    },
  ];

  // Right stats
  const rightStats = [
    {
      title: 'Total Complaints',
      value: animatedTotal,
      icon: BarChart3,
      color: 'bg-[#1A5F7A]',
      trend: '+12% this month'
    },
    {
      title: 'City-wise',
      value: animatedCityWise,
      icon: MapPin,
      color: 'bg-[#FF6B35]',
      trend: 'Top: Delhi'
    },
    {
      title: 'State-wise',
      value: animatedStateWise,
      icon: Map,
      color: 'bg-[#4BC0C0]',
      trend: 'Top: Maharashtra'
    },
    {
      title: 'Department-wise',
      value: animatedDeptWise,
      icon: Building2,
      color: 'bg-[#FF6384]',
      trend: 'Top: Municipal'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-4 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#1A5F7A] mb-4 md:mb-0">Complaints Overview</h1>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Last updated:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{stat.trend}</span>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 transition-all duration-500">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-[#1A5F7A] mb-6">Complaints Distribution</h2>
            <div className="aspect-square max-w-md mx-auto w-full">
              <PolarArea data={complaintData} options={pieOptions} />
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-4 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#FF6B35] mb-4 md:mb-0">Complaints Analytics</h1>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Analytics for:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {rightStats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{stat.trend}</span>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 transition-all duration-500">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#FF6B35] mb-4 md:mb-0">Complaints Trend</h2>
              <select
                className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                value={selectedGraph}
                onChange={e => setSelectedGraph(e.target.value)}
              >
                {graphOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="aspect-[2/1] max-w-xl mx-auto w-full">
              <Line data={lineChartData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
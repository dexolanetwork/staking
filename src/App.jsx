import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/NavBar';
import Home from '@/pages/Home';
import Presale from '@/pages/Presale';
import Stake from '@/pages/Stake';
import Airdrop from '@/pages/Airdrop';
import Dashboard from '@/pages/Dashboard';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/presale"   element={<Presale />} />
        <Route path="/stake"     element={<Stake />} />
        <Route path="/airdrop"   element={<Airdrop />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 RBO. All Rights Reserved.</p>
          <ul className="flex space-x-8">
            <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}

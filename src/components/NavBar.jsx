import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  return (
    <header className="py-3 shadow-lg bg-indigo-900 fixed w-full z-50">
      <nav className="max-w-[90rem] mx-auto px-4 flex justify-between items-center text-white">
        {/* Logo */}
        <Link to="/">
          <div className="flex justify-center items-center">
            <img src="/images/004.png" alt="RBO Logo" className="h-15 w-20 mx-auto" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent -ml-4">
              RBO
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li><Link to="/presale"   className="hover:text-pink-300 transition-colors">Presale</Link></li>
          <li><Link to="/airdrop"   className="hover:text-pink-300 transition-colors">Airdrop</Link></li>
          <li><Link to="/stake"     className="hover:text-pink-300 transition-colors">Stake &amp; Earn</Link></li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-yellow-400 focus:outline-none" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-indigo-900 z-50 transform transition-transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4">
          <button className="text-yellow-400 focus:outline-none mb-4" onClick={toggleMobileMenu} aria-label="Close menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="space-y-4">
            {[
              { to: '/presale', label: 'Presale' },
              { to: '/airdrop', label: 'Airdrop' },
              { to: '/stake',   label: 'Stake & Earn' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="block text-lg text-white hover:text-gray-300 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MapPin, 
  Hotel, 
  Activity, 
  Store, 
  PhoneCall, 
  QrCode, 
  Menu, 
  X, 
  Compass,
  AlertTriangle
} from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trip Planner', path: '/plan', icon: Compass },
    { name: 'Live Crowd IoT', path: '/crowd', icon: Activity, badge: 'LIVE' },
    { name: 'Hotels', path: '/hotels', icon: Hotel },
    { name: 'Local Bazaars', path: '/directory', icon: Store },
    { name: 'Tourist Pass', path: '/pass', icon: QrCode },
    { name: 'Emergency SOS', path: '/emergency', icon: PhoneCall, isEmergency: true }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D8ECD6] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <BrandLogo size="md" className="group-hover:scale-105 transition-transform duration-200" />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#1A2E22]">
                  YatraSense
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#E6F7EB] text-[#22A45D] border border-[#BDE8C7] rounded-md">
                  AI + IoT
                </span>
              </div>
              <p className="text-[10px] text-[#4E5E54] -mt-0.5 hidden sm:block font-medium">Smart Tourism Platform • SIH</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              if (link.isEmergency) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`ml-2 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-xs font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' 
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>SOS Help</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all duration-150 ${
                    isActive
                      ? 'text-[#1D8E50] bg-[#E8F8ED] border border-[#BDE8C7] shadow-xs'
                      : 'text-[#4E5E54] hover:text-[#1A2E22] hover:bg-[#F1F8F0]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#22A45D]' : 'text-[#718778]'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 bg-[#22A45D] text-white text-[9px] font-extrabold rounded-full animate-pulse shadow-xs">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              to="/emergency"
              className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center space-x-1"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>SOS</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#4E5E54] hover:text-[#1A2E22] hover:bg-[#F1F8F0] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D8ECD6] bg-white px-4 pt-2 pb-5 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive
                    ? 'bg-[#E8F8ED] text-[#1D8E50] border border-[#BDE8C7]'
                    : 'text-[#4E5E54] hover:bg-[#F1F8F0]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-[#22A45D]" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] bg-[#22A45D] text-white rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

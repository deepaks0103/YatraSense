import React from 'react';
import { ShieldCheck, Cpu, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="border-t border-[#D8ECD6] bg-[#EAF5E8] mt-20 text-[#4E5E54] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & SIH */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <BrandLogo size="sm" />
              <span className="text-[#1A2E22] font-bold text-base tracking-tight">YatraSense</span>
            </div>
            <p className="text-[#4E5E54] leading-relaxed text-xs font-medium">
              Smart Tourism & Crowd Management Platform powered by Artificial Intelligence and IoT Sensors. Designed for Smart India Hackathon (SIH).
            </p>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-white border border-[#D8ECD6] text-[11px] text-[#1D8E50] font-semibold shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-[#22A45D]" />
              <span>SIH Hackathon Prototype Build</span>
            </div>
          </div>

          {/* Col 2: Smart Modules */}
          <div>
            <h4 className="text-[#1A2E22] font-bold mb-3 text-xs tracking-wider uppercase">Platform Modules</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/plan" className="hover:text-[#22A45D] transition-colors">AI Dynamic Trip Planner</Link>
              </li>
              <li>
                <Link to="/crowd" className="hover:text-[#22A45D] transition-colors">IoT Real-Time Crowd Heatmap</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-[#22A45D] transition-colors">Smart Hotel Recommendations</Link>
              </li>
              <li>
                <Link to="/directory" className="hover:text-[#22A45D] transition-colors">Verified Local Bazaars & Guides</Link>
              </li>
              <li>
                <Link to="/pass" className="hover:text-[#22A45D] transition-colors">Digital Tourist QR Pass</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Safety & Emergency */}
          <div>
            <h4 className="text-[#1A2E22] font-bold mb-3 text-xs tracking-wider uppercase">Tourist Safety</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/emergency" className="hover:text-rose-600 transition-colors flex items-center space-x-1 text-rose-700 font-bold">
                  <span>1-Tap SOS Emergency Center</span>
                </Link>
              </li>
              <li className="text-[#4E5E54]">National Emergency: <strong className="text-[#1A2E22]">112</strong></li>
              <li className="text-[#4E5E54]">Tourist Toll-Free: <strong className="text-[#1A2E22]">1363</strong></li>
              <li className="text-[#4E5E54]">Ambulance: <strong className="text-[#1A2E22]">108</strong></li>
            </ul>
          </div>

          {/* Col 4: System & IoT telemetry */}
          <div>
            <h4 className="text-[#1A2E22] font-bold mb-3 text-xs tracking-wider uppercase">IoT Telemetry Status</h4>
            <div className="p-3.5 rounded-xl bg-white border border-[#D8ECD6] space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#4E5E54]">ESP32 Sensor Nodes:</span>
                <span className="text-[#22A45D] font-mono font-bold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#22A45D] inline-block mr-1.5 animate-pulse"></span>
                  4 Online
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#4E5E54]">LLM Inference Mode:</span>
                <span className="text-[#1D8E50] font-mono font-semibold">Hybrid Ready</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#4E5E54]">Data Feed Sync:</span>
                <span className="text-[#1A2E22] font-mono font-medium">3.5s Live Polling</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#D8ECD6] flex flex-col sm:flex-row items-center justify-between text-[#718778] text-[11px]">
          <p>© 2026 YatraSense. Developed for Smart India Hackathon.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <span className="flex items-center text-[#4E5E54] font-medium">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 mx-1 fill-rose-500" /> for Indian Tourism
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

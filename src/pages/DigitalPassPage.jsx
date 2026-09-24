import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { 
  QrCode, 
  ShieldCheck, 
  CheckCircle, 
  Download, 
  Share2, 
  User, 
  Calendar, 
  MapPin, 
  Tag, 
  Scan, 
  Check, 
  AlertCircle
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function DigitalPassPage() {
  const locationState = useLocation().state;
  const [searchParams] = useSearchParams();

  const queryTripId = searchParams.get('tripId');
  const queryDestination = searchParams.get('destination');
  const queryDays = searchParams.get('days');

  const [touristName, setTouristName] = useState('Dr. Aarav Sharma');
  const [passengersCount, setPassengersCount] = useState(2);
  const [tripId, setTripId] = useState(queryTripId || locationState?.tripId || 'YS-7849-2026');
  const [destination, setDestination] = useState(queryDestination || locationState?.destination || 'Jaipur Pink City Circuit');
  const [validDays, setValidDays] = useState(queryDays ? Number(queryDays) : (locationState?.days || 3));
  
  const [scannedResult, setScannedResult] = useState(null);

  const passPayload = JSON.stringify({
    passId: `PASS-${tripId}`,
    tourist: touristName,
    partySize: passengersCount,
    validUntil: new Date(Date.now() + validDays * 24 * 60 * 60 * 1000).toLocaleDateString(),
    circuit: destination,
    benefits: ['FastTrack Heritage Turnstile', '15% MSME Handicraft Discount', 'Emergency SOS Sync']
  });

  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const simulateGatekeeperScan = (checkpointName) => {
    setScannedResult({
      checkpoint: checkpointName,
      status: 'VERIFIED_ACCESS_GRANTED',
      time: new Date().toLocaleTimeString(),
      remainingAccess: 'Unlimited across Circuit'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F0EEFF] border border-[#DDD6FE] text-xs font-bold text-[#7C3AED]">
          <QrCode className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>Unified Digital Identity & Fast-Track Access</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#1A2E22] tracking-tight">
          Digital Tourist Smart Pass
        </h1>
        <p className="text-[#4E5E54] text-xs sm:text-sm font-medium">
          A single encrypted QR pass for contactless monument turnstile entry, partner merchant discounts, and emergency identification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Pass Customizer Controls */}
        <div className="lg:col-span-5 glass-panel bg-white p-6 rounded-3xl border border-[#D8ECD6] space-y-5 shadow-sm">
          <h2 className="text-base font-extrabold text-[#1A2E22] flex items-center space-x-2 pb-3 border-b border-[#D8ECD6]">
            <User className="w-4 h-4 text-[#22A45D]" />
            <span>Pass Holder Details</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#1A2E22] font-bold mb-1">Primary Traveler Name</label>
              <input
                type="text"
                value={touristName}
                onChange={(e) => setTouristName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-[#1A2E22] text-xs font-semibold focus:outline-none focus:border-[#22A45D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#1A2E22] font-bold mb-1">Party Size</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={passengersCount}
                  onChange={(e) => setPassengersCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-[#1A2E22] text-xs font-semibold focus:outline-none focus:border-[#22A45D]"
                />
              </div>

              <div>
                <label className="block text-[#1A2E22] font-bold mb-1">Validity (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={validDays}
                  onChange={(e) => setValidDays(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-[#1A2E22] text-xs font-semibold focus:outline-none focus:border-[#22A45D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1A2E22] font-bold mb-1">Trip ID / Reference</label>
              <input
                type="text"
                value={tripId}
                onChange={(e) => setTripId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-[#1A2E22] text-xs font-mono font-bold focus:outline-none focus:border-[#22A45D]"
              />
            </div>

            <div>
              <label className="block text-[#1A2E22] font-bold mb-1">Circuit Location</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-[#1A2E22] text-xs font-semibold focus:outline-none focus:border-[#22A45D]"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[#D8ECD6] space-y-2">
            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-purple-600/25 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Save & Print Digital Pass</span>
            </button>
          </div>
        </div>

        {/* Right Column: Holographic Digital Pass Preview */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card Component */}
          <div className="relative rounded-3xl p-7 bg-gradient-to-br from-white via-[#F4FBF3] to-[#E8F8ED] border-2 border-[#B8E4B5] shadow-xl overflow-hidden">
            
            {/* Background glowing watermarks */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#6FE3A6]/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#22A45D]/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Pass Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D8ECD6]">
              <div className="flex items-center space-x-2.5">
                <BrandLogo size="sm" />
                <div>
                  <h3 className="text-[#1A2E22] font-extrabold text-base tracking-tight">
                    YatraSense Digital Tourist Pass
                  </h3>
                  <p className="text-[10px] text-[#1D8E50] font-bold tracking-wider uppercase">
                    Govt. Smart Tourism Credential
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-[#1D8E50] text-xs font-bold bg-[#E8F8ED] border border-[#BDE8C7] px-2.5 py-1 rounded-full shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22A45D]" />
                <span>VALID</span>
              </div>
            </div>

            {/* Pass Content Body: QR & Details */}
            <div className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              
              {/* QR Code Container */}
              <div className="p-3.5 bg-white rounded-2xl shadow-md border-4 border-white shrink-0 flex flex-col items-center">
                <QRCodeSVG
                  value={passPayload}
                  size={150}
                  level="H"
                  includeMargin={false}
                />
                <span className="text-[9px] font-mono text-[#1A2E22] font-extrabold mt-1.5 uppercase">
                  Scan to Validate
                </span>
              </div>

              {/* Pass Metadata List */}
              <div className="space-y-3 flex-1 text-xs w-full">
                <div>
                  <p className="text-[10px] text-[#718778] uppercase font-bold">Primary Traveler</p>
                  <p className="text-base font-extrabold text-[#1A2E22]">{touristName}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-[#718778] uppercase font-bold">Travelers</p>
                    <p className="font-bold text-[#1A2E22]">{passengersCount} Person(s)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#718778] uppercase font-bold">Validity</p>
                    <p className="font-bold text-[#1D8E50]">{validDays} Days Active</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-[#718778] uppercase font-bold">Destination Sector</p>
                  <p className="font-bold text-[#1A2E22]">{destination}</p>
                </div>

                <div>
                  <p className="text-[10px] text-[#718778] uppercase font-bold">Trip Identifier</p>
                  <p className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 inline-block">{tripId}</p>
                </div>
              </div>

            </div>

            {/* Pass Footer Benefits Strip */}
            <div className="pt-4 border-t border-[#D8ECD6] flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="flex items-center space-x-1 text-[#1D8E50] font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-[#22A45D]" />
                <span>Monuments Fast-Track</span>
              </span>
              <span className="flex items-center space-x-1 text-[#D97706] font-bold">
                <Tag className="w-3.5 h-3.5 text-[#D97706]" />
                <span>15% Artisan Discount</span>
              </span>
              <span className="flex items-center space-x-1 text-rose-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                <span>SOS Linked</span>
              </span>
            </div>

          </div>

          {/* Gatekeeper / Merchant Scanner Simulator (Crucial for SIH Demo) */}
          <div className="glass-panel bg-white p-5 rounded-2xl border border-[#D8ECD6] space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scan className="w-4 h-4 text-[#22A45D]" />
                <h3 className="text-xs font-extrabold text-[#1A2E22] uppercase tracking-wider">
                  Checkpoint Gatekeeper / Turnstile Simulator
                </h3>
              </div>
              <span className="text-[10px] text-[#718778] font-bold">SIH Interactive Demo</span>
            </div>

            <p className="text-xs text-[#4E5E54]">
              Simulate scanning this QR pass at various heritage checkpoints to test instant validation:
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                'Amer Fort Turnstile #02',
                'Hawa Mahal Fast-Track Gate',
                'LMB Sweets Partner POS'
              ].map((checkpoint) => (
                <button
                  key={checkpoint}
                  onClick={() => simulateGatekeeperScan(checkpoint)}
                  className="px-3 py-1.5 rounded-lg bg-[#F4FBF3] hover:bg-[#E8F8ED] border border-[#D8ECD6] text-xs font-bold text-[#1A2E22] hover:text-[#1D8E50] transition-colors shadow-2xs"
                >
                  Scan at {checkpoint}
                </button>
              ))}
            </div>

            {scannedResult && (
              <div className="p-3.5 rounded-xl bg-[#E8F8ED] border border-[#BDE8C7] text-xs space-y-1 text-[#1D8E50] shadow-2xs">
                <div className="flex items-center space-x-1.5 font-bold text-[#1D8E50]">
                  <Check className="w-4 h-4 text-[#22A45D]" />
                  <span>Access Granted & Authenticated!</span>
                </div>
                <p className="text-[#1A2E22] text-[11px] font-semibold">
                  Scanned at: <strong>{scannedResult.checkpoint}</strong> at {scannedResult.time}
                </p>
                <p className="text-[10px] text-[#4E5E54] font-medium">
                  Verified Traveler: {touristName} • Party of {passengersCount}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

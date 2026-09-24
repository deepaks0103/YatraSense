import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import ItineraryPage from './pages/ItineraryPage';
import HotelsPage from './pages/HotelsPage';
import CrowdDashboardPage from './pages/CrowdDashboardPage';
import BusinessDirectoryPage from './pages/BusinessDirectoryPage';
import EmergencySupportPage from './pages/EmergencySupportPage';
import DigitalPassPage from './pages/DigitalPassPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4FBF3] text-[#1A2E22] selection:bg-[#6FE3A6] selection:text-[#1A2E22]">
      {/* Top sticky Navbar */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan" element={<PlannerPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/crowd" element={<CrowdDashboardPage />} />
          <Route path="/directory" element={<BusinessDirectoryPage />} />
          <Route path="/emergency" element={<EmergencySupportPage />} />
          <Route path="/pass" element={<DigitalPassPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

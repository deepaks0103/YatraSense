import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Star, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Tag, 
  ExternalLink,
  Utensils,
  ShoppingBag,
  UserCheck,
  Check
} from 'lucide-react';
import { MOCK_BUSINESSES } from '../services/mockData';

export default function BusinessDirectoryPage() {
  const [businesses, setBusinesses] = useState(MOCK_BUSINESSES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Local Listings' },
    { id: 'Authentic Street Food & Sweets', label: 'Street Food & Dining' },
    { id: 'Local Handicrafts & Souvenirs', label: 'Handicrafts & Bazaars' },
    { id: 'Government Certified Guide', label: 'Certified Guides' }
  ];

  const filteredBusinesses = businesses.filter((b) => {
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-xs font-bold text-[#D97706] mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Empowering Local MSMEs & Artisans</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1A2E22] tracking-tight">
            Local Business & Artisan Directory
          </h1>
          <p className="text-[#4E5E54] text-xs sm:text-sm mt-1 font-medium">
            Certified local food hubs, heritage craft cooperatives, and vetted tour hosts with exclusive YatraSense Pass privileges.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#718778] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sweets, crafts, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D8ECD6] text-[#1A2E22] placeholder-[#718778] text-xs font-medium focus:outline-none focus:border-[#22A45D] focus:ring-1 focus:ring-[#22A45D] shadow-2xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#D97706] text-white border-[#B45309] shadow-sm'
                : 'bg-white text-[#4E5E54] border-[#D8ECD6] hover:border-[#D97706]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Business Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((biz) => (
          <div
            key={biz.id}
            className="glass-card bg-white rounded-2xl p-6 border border-[#D8ECD6] hover:border-[#D97706] transition-all flex flex-col justify-between space-y-4 group shadow-sm"
          >
            <div className="space-y-3">
              
              {/* Top Category and Verification Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4E5E54] bg-[#F4FBF3] px-2.5 py-1 rounded-md border border-[#D8ECD6]">
                  {biz.category.split(' ')[0]}
                </span>
                
                {biz.verifiedTouristBadge && (
                  <span className="flex items-center space-x-1 text-[10px] font-bold text-[#1D8E50] bg-[#E8F8ED] border border-[#BDE8C7] px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Govt. Verified</span>
                  </span>
                )}
              </div>

              {/* Business Name & Rating */}
              <div>
                <h3 className="text-base font-extrabold text-[#1A2E22] group-hover:text-[#D97706] transition-colors">
                  {biz.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{biz.rating}</span>
                  </div>
                  <span className="text-[11px] text-[#718778]">({biz.reviews} reviews)</span>
                  <span className="text-[#D8ECD6]">•</span>
                  <span className="text-xs font-bold text-[#1A2E22]">{biz.priceRange}</span>
                </div>
              </div>

              {/* Specialty */}
              <p className="text-xs text-[#4E5E54] leading-relaxed font-medium">
                {biz.specialty}
              </p>

              {/* Location */}
              <p className="text-xs text-[#718778] flex items-center space-x-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#22A45D] shrink-0" />
                <span className="truncate">{biz.location}</span>
              </p>

              {/* Exclusive Pass Discount Tag */}
              <div className="p-2.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center space-x-2 text-[11px] text-[#B45309] font-bold">
                <Tag className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{biz.discountOffer}</span>
              </div>
            </div>

            {/* Direct Action Contact */}
            <div className="pt-3 border-t border-[#D8ECD6] flex items-center justify-between">
              <a
                href={`tel:${biz.phone}`}
                className="text-xs font-bold text-[#1A2E22] hover:text-[#22A45D] flex items-center space-x-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#22A45D]" />
                <span>{biz.phone}</span>
              </a>

              <span className="text-[10px] text-[#22A45D] font-bold group-hover:underline cursor-pointer">
                Directions ↗
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

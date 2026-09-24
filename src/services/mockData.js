// Mock Data for YatraSense — Smart Tourism Platform Prototype

export const POPULAR_DESTINATIONS = [
  { id: 'jaipur', name: 'Jaipur, Rajasthan', state: 'Rajasthan', tag: 'Heritage & Royalty', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
  { id: 'goa', name: 'Goa (North & South)', state: 'Goa', tag: 'Beaches & Nightlife', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
  { id: 'varanasi', name: 'Varanasi, Uttar Pradesh', state: 'Uttar Pradesh', tag: 'Spiritual & Ghats', img: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80' },
  { id: 'manali', name: 'Manali, Himachal Pradesh', state: 'Himachal Pradesh', tag: 'Adventure & Snow', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80' },
  { id: 'munnar', name: 'Munnar, Kerala', state: 'Kerala', tag: 'Nature & Tea Gardens', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80' },
  { id: 'agra', name: 'Agra, Uttar Pradesh', state: 'Uttar Pradesh', tag: 'Mughal Architecture', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80' }
];

export const INTEREST_CATEGORIES = [
  { id: 'temples', label: 'Temples & Heritage', icon: 'Landmark', color: 'from-amber-500 to-orange-600' },
  { id: 'nature', label: 'Nature & Scenic', icon: 'Trees', color: 'from-emerald-500 to-teal-600' },
  { id: 'adventure', label: 'Adventure & Trekking', icon: 'Compass', color: 'from-cyan-500 to-blue-600' },
  { id: 'food', label: 'Street Food & Dining', icon: 'Utensils', color: 'from-rose-500 to-pink-600' },
  { id: 'shopping', label: 'Local Bazaars & Crafts', icon: 'ShoppingBag', color: 'from-purple-500 to-indigo-600' },
  { id: 'relaxation', label: 'Relaxation & Wellness', icon: 'Sparkles', color: 'from-teal-500 to-emerald-600' },
  { id: 'photography', label: 'Photo Spots & Sunset', icon: 'Camera', color: 'from-fuchsia-500 to-rose-600' }
];

export const MOCK_HOTELS = [
  {
    id: 'h1',
    name: 'The Heritage Haveli & Spa',
    city: 'Jaipur',
    pricePerNight: 3499,
    rating: 4.8,
    reviewsCount: 312,
    distanceKm: '1.2 km from Hawa Mahal',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    whyRecommended: 'AI Selected: Close to top heritage monuments with zero morning traffic congestion.',
    badge: 'Best Heritage Value',
    amenities: ['Free WiFi', 'Rooftop Pool', 'Rajasthani Breakfast', 'EV Charging', 'AC Rooms']
  },
  {
    id: 'h2',
    name: 'Zostel Smart Backpacker Hub',
    city: 'Jaipur',
    pricePerNight: 899,
    rating: 4.6,
    reviewsCount: 845,
    distanceKm: '0.8 km from City Center',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    whyRecommended: 'AI Selected: Highly optimized for solo backpackers & budget group travelers.',
    badge: 'Budget Top Pick',
    amenities: ['High Speed WiFi', 'Community Kitchen', 'Game Lounge', 'Lockers', 'Guided Walks']
  },
  {
    id: 'h3',
    name: 'Royal Palace Grand Resort',
    city: 'Jaipur',
    pricePerNight: 7899,
    rating: 4.9,
    reviewsCount: 520,
    distanceKm: '4.5 km from Amer Fort',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    whyRecommended: 'AI Selected: Luxury stay with authentic folk performances and complimentary transport.',
    badge: 'Luxury Experience',
    amenities: ['Fine Dining', 'Ayurvedic Spa', 'Private Garden', 'Chauffeur Service', '24/7 Butler']
  },
  {
    id: 'h4',
    name: 'Sunset View Eco Suites',
    city: 'Jaipur',
    pricePerNight: 2199,
    rating: 4.5,
    reviewsCount: 198,
    distanceKm: '2.1 km from Nahargarh Fort',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    whyRecommended: 'AI Selected: Scenic panoramic view point, quiet green zone with solar-powered amenities.',
    badge: 'Eco Friendly',
    amenities: ['Mountain View Balcony', 'Organic Cafe', 'Yoga Deck', 'Free Parking', 'Pet Friendly']
  }
];

export const INITIAL_CROWD_SPOTS = [
  {
    id: 'spot-1',
    name: 'Hawa Mahal & Old Bazaar',
    location: 'Badi Choupad, Jaipur',
    category: 'Heritage Landmark',
    currentCount: 420,
    maxCapacity: 600,
    iotSensorId: 'ESP32-NODE-HM-01',
    sensorStatus: 'ONLINE (MQTT: 120ms ping)',
    trend: 'rising',
    peakHour: '4:00 PM - 7:00 PM',
    recommendation: 'Best time to visit: Early morning (8:00 AM - 10:00 AM) to beat the crowd.',
    history: [120, 190, 260, 310, 420, 390]
  },
  {
    id: 'spot-2',
    name: 'Amer Fort Entrance & Courtyard',
    location: 'Deoritha, Amer',
    category: 'Historic Fortress',
    currentCount: 780,
    maxCapacity: 900,
    iotSensorId: 'ESP32-CAM-AF-04',
    sensorStatus: 'ONLINE (Turnstile Counter)',
    trend: 'high',
    peakHour: '11:00 AM - 3:00 PM',
    recommendation: 'High congestion detected! Consider visiting Nahargarh Fort first or use West Gate.',
    history: [300, 480, 690, 810, 780, 840]
  },
  {
    id: 'spot-3',
    name: 'City Palace Art Gallery',
    location: 'Gangori Bazaar, Jaipur',
    category: 'Museum & Gallery',
    currentCount: 160,
    maxCapacity: 500,
    iotSensorId: 'IR-BEAM-CP-02',
    sensorStatus: 'ONLINE (Optical Sensors)',
    trend: 'low',
    peakHour: '1:00 PM - 3:30 PM',
    recommendation: 'Ideal time to visit right now. Low wait time (<5 mins at ticket counter).',
    history: [90, 110, 140, 180, 160, 150]
  },
  {
    id: 'spot-4',
    name: 'Jal Mahal Promenade',
    location: 'Amer Road, Jaipur',
    category: 'Lakeside Viewpoint',
    currentCount: 230,
    maxCapacity: 750,
    iotSensorId: 'ESP32-WIFI-JM-07',
    sensorStatus: 'ONLINE (Probe Sniffer)',
    trend: 'stable',
    peakHour: '5:30 PM - 7:30 PM (Sunset)',
    recommendation: 'Crowd building up for evening sunset view. Ample parking available.',
    history: [80, 120, 160, 210, 230, 250]
  }
];

export const MOCK_BUSINESSES = [
  {
    id: 'b1',
    name: 'Laxmi Mishthan Bhandar (LMB)',
    category: 'Authentic Street Food & Sweets',
    rating: 4.8,
    reviews: 1420,
    location: 'Johari Bazaar, Pink City',
    specialty: 'Famous Paneer Ghewar, Pyaaz Kachori & Royal Thali',
    priceRange: '₹₹',
    phone: '+91 141 2565844',
    verifiedTouristBadge: true,
    discountOffer: '10% off for YatraSense Digital Pass holders'
  },
  {
    id: 'b2',
    name: 'Blue Pottery & Block Print Collective',
    category: 'Local Handicrafts & Souvenirs',
    rating: 4.9,
    reviews: 630,
    location: 'Mirza Ismail Road',
    specialty: 'Government-certified authentic handmade Jaipur pottery & scarves',
    priceRange: '₹₹',
    phone: '+91 98290 11223',
    verifiedTouristBadge: true,
    discountOffer: 'Free artisan demo + 15% discount on bulk orders'
  },
  {
    id: 'b3',
    name: 'Rajesh Sharma — Certified Heritage Tour Guide',
    category: 'Government Certified Guide',
    rating: 4.9,
    reviews: 410,
    location: 'Available across Jaipur & Amer',
    specialty: 'Speaks English, Hindi, French. 12+ years experience in architectural history.',
    priceRange: '₹₹',
    phone: '+91 94140 55667',
    verifiedTouristBadge: true,
    discountOffer: 'Custom 4-hour heritage audio-walk discount'
  },
  {
    id: 'b4',
    name: 'Rawat Mishthan Bhandar',
    category: 'Authentic Street Food & Sweets',
    rating: 4.7,
    reviews: 2100,
    location: 'Station Road, Sindhi Camp',
    specialty: 'India famous Mawa Kachori & Mirchi Vada',
    priceRange: '₹',
    phone: '+91 141 2367460',
    verifiedTouristBadge: true,
    discountOffer: 'Special tourist takeaway pack'
  },
  {
    id: 'b5',
    name: 'Jaipur Rugs & Carpet Weavers Co-op',
    category: 'Local Handicrafts & Souvenirs',
    rating: 4.8,
    reviews: 380,
    location: 'Civil Lines',
    specialty: 'Hand-knotted silk and wool carpets direct from rural artisans',
    priceRange: '₹₹₹',
    phone: '+91 141 2810374',
    verifiedTouristBadge: true,
    discountOffer: 'Worldwide shipping support + 5% pass benefit'
  },
  {
    id: 'b6',
    name: 'Sunita Meena — Local Food & Photography Walking Host',
    category: 'Government Certified Guide',
    rating: 4.9,
    reviews: 290,
    location: 'Old City Alleyways',
    specialty: 'Hidden culinary gem trails & golden-hour Instagram photography spots',
    priceRange: '₹₹',
    phone: '+91 98291 99881',
    verifiedTouristBadge: true,
    discountOffer: 'Free high-res digital photo packet included'
  }
];

export const EMERGENCY_SERVICES = {
  helplines: [
    { name: 'National Emergency Number', number: '112', desc: 'All-in-one Police, Fire & Medical hotline', icon: 'ShieldAlert', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { name: 'National Tourist Helpline', number: '1363', desc: '24x7 Multi-lingual toll-free assistance (Govt. of India)', icon: 'PhoneCall', color: 'bg-[#E8F8ED] text-[#1D8E50] border-[#BDE8C7]' },
    { name: 'Tourist Police Control', number: '100', desc: 'Dedicated Tourist Protection & Safety Squad', icon: 'ShieldCheck', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Ambulance & Emergency Medical', number: '108', desc: 'Instant response ambulance dispatch', icon: 'HeartPulse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ],
  hospitals: [
    {
      name: 'Sawai Man Singh (SMS) Government Medical Hospital',
      distance: '1.4 km',
      address: 'Jawahar Lal Nehru Marg, Ashok Nagar, Jaipur',
      phone: '+91 141 2560291',
      emergencyRoom: '24/7 Trauma Center & ICU Available',
      type: 'Government Super-Speciality'
    },
    {
      name: 'Fortis Escorts Super Speciality Hospital',
      distance: '3.8 km',
      address: 'Jawaharlal Nehru Marg, Malviya Nagar, Jaipur',
      phone: '+91 141 2547000',
      emergencyRoom: '24/7 Cardiac & Emergency Care with English/Foreign Desk',
      type: 'Private NABH Accredited'
    }
  ],
  policeStations: [
    {
      name: 'Kotwali Tourist Police Post (Old City)',
      distance: '0.6 km',
      address: 'Near Badi Choupad, Pink City, Jaipur',
      phone: '+91 141 2602222',
      inCharge: 'Inspector V.K. Singh (Tourist Liaison Officer)'
    },
    {
      name: 'Amer Tourist Assistance Booth',
      distance: '8.5 km',
      address: 'Near Amer Fort Elephant Stand, Amer',
      phone: '+91 141 2530101',
      inCharge: 'Sub-Inspector R. Rathore'
    }
  ]
};

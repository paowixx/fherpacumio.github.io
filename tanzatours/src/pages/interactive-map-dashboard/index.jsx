import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import MapContainer from './components/MapContainer';
import CategoryFilters from './components/CategoryFilters';
import BottomSheet from './components/BottomSheet';
import DesktopSidebar from './components/DesktopSidebar';
import SearchOverlay from './components/SearchOverlay';
import DestinationModal from '../../components/ui/DestinationModal';
import Icon from '../../components/AppIcon';


const InteractiveMapDashboard = () => {
  const location = useLocation();
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 14.3169, lng: 120.9317 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock destinations data
  const mockDestinations = [
    {
      id: 1,
      name: "Aguinaldo Shrine",
      location: "Kawit, Cavite",
      category: "Historical",
      description: "The birthplace of Philippine independence, where General Emilio Aguinaldo proclaimed the country's freedom from Spanish rule on June 12, 1898.",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 324,
      coordinates: { lat: 14.2937, lng: 120.9013 },
      entryFee: "₱30",
      openingHours: "8:00 AM - 5:00 PM",
      operatingHours: [
        { day: "Monday - Sunday", time: "8:00 AM - 5:00 PM" }
      ],
      amenities: ["Parking", "Restrooms", "Gift Shop", "Guided Tours"],
      phone: "+63 46 481 0572",
      website: "https://aguinaldoshrine.gov.ph"
    },
    {
      id: 2,
      name: "Corregidor Island",
      location: "Cavite",
      category: "Historical",
      description: "A historic island fortress that played a crucial role during World War II, featuring war memorials, tunnels, and panoramic views of Manila Bay.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 567,
      coordinates: { lat: 14.3847, lng: 120.5889 },
      entryFee: "₱2,500 (with ferry)",
      openingHours: "Day tours available",
      operatingHours: [
        { day: "Daily", time: "Day tours from Manila" }
      ],
      amenities: ["Ferry Service", "Tour Guide", "Museum", "Restaurant"],
      phone: "+63 2 8527 5555"
    },
    {
      id: 3,
      name: "Tagaytay Ridge",
      location: "Tagaytay, Cavite",
      category: "Nature",
      description: "A scenic mountain ridge offering breathtaking views of Taal Volcano and Lake, perfect for relaxation and photography.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 892,
      coordinates: { lat: 14.1053, lng: 120.9621 },
      entryFee: "Free",
      openingHours: "24/7",
      operatingHours: [
        { day: "Daily", time: "24 hours" }
      ],
      amenities: ["Viewpoints", "Restaurants", "Hotels", "Shopping"],
      phone: "+63 46 413 1111"
    },
    {
      id: 4,
      name: "Ternate Beach",
      location: "Ternate, Cavite",
      category: "Beach",
      description: "A pristine beach destination with crystal clear waters, white sand, and excellent facilities for swimming and water sports.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      rating: 4.3,
      reviewCount: 445,
      coordinates: { lat: 14.2756, lng: 120.7189 },
      entryFee: "₱50",
      openingHours: "6:00 AM - 6:00 PM",
      operatingHours: [
        { day: "Monday - Sunday", time: "6:00 AM - 6:00 PM" }
      ],
      amenities: ["Beach Access", "Cottages", "Restrooms", "Food Stalls"],
      phone: "+63 46 471 2345"
    },
    {
      id: 5,
      name: "Lomi King",
      location: "Tanza, Cavite",
      category: "Restaurant",
      description: "Famous local restaurant serving authentic Batangas lomi and other Filipino comfort foods in generous portions.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      rating: 4.4,
      reviewCount: 234,
      coordinates: { lat: 14.3169, lng: 120.9317 },
      entryFee: "₱150-300 per meal",
      openingHours: "10:00 AM - 9:00 PM",
      operatingHours: [
        { day: "Monday - Sunday", time: "10:00 AM - 9:00 PM" }
      ],
      amenities: ["Dine-in", "Take-out", "Parking", "Air Conditioning"],
      phone: "+63 46 481 7890"
    },
    {
      id: 6,
      name: "Tanza Cultural Center",
      location: "Tanza, Cavite",
      category: "Cultural",
      description: "A modern cultural center showcasing local arts, crafts, and hosting community events and performances.",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=600&fit=crop",
      rating: 4.2,
      reviewCount: 156,
      coordinates: { lat: 14.3200, lng: 120.9350 },
      entryFee: "₱20",
      openingHours: "9:00 AM - 6:00 PM",
      operatingHours: [
        { day: "Tuesday - Sunday", time: "9:00 AM - 6:00 PM" },
        { day: "Monday", time: "Closed" }
      ],
      amenities: ["Exhibition Hall", "Theater", "Workshop Rooms", "Library"],
      phone: "+63 46 481 5678"
    },
    {
      id: 7,
      name: "People\'s Park in the Sky",
      location: "Tagaytay, Cavite",
      category: "Nature",
      description: "An elevated park offering panoramic views of Taal Lake and surrounding landscapes, built on the ruins of an unfinished mansion.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      rating: 4.1,
      reviewCount: 678,
      coordinates: { lat: 14.1167, lng: 120.9667 },
      entryFee: "₱35",
      openingHours: "6:00 AM - 6:00 PM",
      operatingHours: [
        { day: "Monday - Sunday", time: "6:00 AM - 6:00 PM" }
      ],
      amenities: ["Viewing Deck", "Souvenir Shops", "Parking", "Picnic Areas"],
      phone: "+63 46 413 2222"
    },
    {
      id: 8,
      name: "Maragondon Market",
      location: "Maragondon, Cavite",
      category: "Shopping",
      description: "A bustling local market offering fresh produce, local delicacies, handicrafts, and authentic Filipino street food.",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",
      rating: 4.0,
      reviewCount: 189,
      coordinates: { lat: 14.2833, lng: 120.7333 },
      entryFee: "Free",
      openingHours: "5:00 AM - 7:00 PM",
      operatingHours: [
        { day: "Monday - Sunday", time: "5:00 AM - 7:00 PM" }
      ],
      amenities: ["Fresh Produce", "Local Crafts", "Food Court", "ATM"],
      phone: "+63 46 471 3456"
    }
  ];

  const categories = ['Historical', 'Beach', 'Restaurant', 'Cultural', 'Nature', 'Adventure', 'Shopping', 'Entertainment'];

  useEffect(() => {
    // Simulate loading destinations
    const timer = setTimeout(() => {
      setDestinations(mockDestinations);
      setFilteredDestinations(mockDestinations);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter destinations based on categories and search query
    let filtered = destinations;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(dest => selectedCategories.includes(dest.category));
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDestinations(filtered);
  }, [destinations, selectedCategories, searchQuery]);

  useEffect(() => {
    // Check if there's a destination passed from navigation
    if (location.state?.selectedDestination) {
      setSelectedDestination(location.state.selectedDestination);
      setMapCenter(location.state.selectedDestination.coordinates);
    }
  }, [location.state]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
    setMapCenter(destination.coordinates);
    setIsDestinationModalOpen(true);
  };

  const handleLocationRequest = (location) => {
    setUserLocation(location);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const handleSearchOverlaySearch = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <div className="pt-28 md:pt-32 flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading destinations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryNavigation />
      
      <main className="pt-28 md:pt-32 h-screen overflow-hidden">
        {/* Category Filters */}
        <CategoryFilters
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onClearFilters={handleClearFilters}
        />

        {/* Main Content */}
        <div className="flex h-full">
          {/* Desktop Sidebar */}
          <DesktopSidebar
            destinations={destinations}
            filteredDestinations={filteredDestinations}
            selectedDestination={selectedDestination}
            onDestinationSelect={handleDestinationSelect}
            userLocation={userLocation}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
          />

          {/* Map Container */}
          <div className="flex-1 relative">
            <MapContainer
              destinations={destinations}
              filteredDestinations={filteredDestinations}
              selectedDestination={selectedDestination}
              onDestinationSelect={handleDestinationSelect}
              userLocation={userLocation}
              onLocationRequest={handleLocationRequest}
              mapCenter={mapCenter}
              onMapCenterChange={setMapCenter}
            />

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOverlayOpen(true)}
              className="md:hidden fixed top-32 left-4 right-4 z-30 bg-background border border-border rounded-lg px-4 py-3 flex items-center space-x-3 shadow-elevation-2"
            >
              <Icon name="Search" size={20} className="text-muted-foreground" />
              <span className="text-muted-foreground flex-1 text-left">Search destinations...</span>
            </button>
          </div>
        </div>

        {/* Mobile Bottom Sheet */}
        <BottomSheet
          destinations={filteredDestinations}
          selectedDestination={selectedDestination}
          onDestinationSelect={handleDestinationSelect}
          userLocation={userLocation}
        />

        {/* Search Overlay */}
        <SearchOverlay
          isOpen={isSearchOverlayOpen}
          onClose={() => setIsSearchOverlayOpen(false)}
          onSearch={handleSearchOverlaySearch}
          destinations={destinations}
        />

        {/* Destination Modal */}
        <DestinationModal
          isOpen={isDestinationModalOpen}
          onClose={() => setIsDestinationModalOpen(false)}
          destination={selectedDestination}
        />
      </main>
    </div>
  );
};

export default InteractiveMapDashboard;
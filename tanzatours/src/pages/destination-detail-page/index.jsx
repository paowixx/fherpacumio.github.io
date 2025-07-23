import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import ImageGallery from './components/ImageGallery';
import DestinationHeader from './components/DestinationHeader';
import DestinationInfo from './components/DestinationInfo';
import LocationMap from './components/LocationMap';
import ReviewsSection from './components/ReviewsSection';
import RelatedDestinations from './components/RelatedDestinations';
import FloatingActionButton from './components/FloatingActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DestinationDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock destination data
  const mockDestinations = [
    {
      id: 1,
      name: "Corregidor Island Historical Landmark",
      location: "Corregidor Island, Cavite",
      category: "Historical Site",
      rating: 4.7,
      reviewCount: 342,
      entryFee: "₱150",
      duration: "4-6 hours",
      bestTime: "Morning",
      difficulty: "Easy",
      isOpen: true,
      description: `Corregidor Island stands as a testament to Philippine history and valor. This tadpole-shaped island fortress served as a crucial military stronghold during World War II and witnessed some of the most significant battles in Philippine history.\n\nThe island offers visitors a unique blend of historical education and natural beauty, with well-preserved ruins, memorials, and stunning views of Manila Bay. Guided tours provide deep insights into the heroic stories of Filipino and American soldiers who defended the island.`,
      images: [
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop"
      ],
      highlights: [
        "Malinta Tunnel - Underground fortress and hospital",
        "Pacific War Memorial - Tribute to fallen heroes",
        "Battery Way - Historic gun emplacements",
        "Eternal Flame of Freedom monument",
        "Panoramic views of Manila Bay"
      ],
      operatingHours: [
        { day: "Monday - Sunday", time: "8:00 AM - 5:00 PM" },
        { day: "Last trip departure", time: "3:00 PM" }
      ],
      specialHours: "Ferry schedules may vary during monsoon season (June-September)",
      amenities: [
        "Guided tours available",
        "Souvenir shop",
        "Restrooms",
        "Food court",
        "Audio-visual presentations",
        "Wheelchair accessible paths",
        "Parking area at ferry terminal"
      ],
      accessibility: "Wheelchair accessible areas available, though some historical sites may have limited access due to terrain",
      travelTips: [
        "Bring comfortable walking shoes and sun protection",
        "Ferry rides can be affected by weather conditions",
        "Book guided tours in advance during peak season",
        "Carry water and snacks for the day trip",
        "Respect historical sites and follow guide instructions"
      ],
      warnings: "Ferry services may be suspended during bad weather. Check weather conditions before traveling.",
      phone: "+63 2 8527 3877",
      email: "info@corregidor.ph",
      website: "https://www.corregidor.org",
      coordinates: { lat: 14.3869, lng: 120.5896 },
      address: "Corregidor Island, Cavite City, Cavite 4100, Philippines",
      transportation: [
        {
          type: "ferry",
          method: "Sun Cruises Ferry",
          description: "Daily ferry service from CCP Terminal, Manila",
          duration: "1 hour"
        },
        {
          type: "car",
          method: "Private Vehicle to Ferry Terminal",
          description: "Drive to CCP Terminal and take ferry",
          duration: "30 mins to terminal + 1 hour ferry"
        }
      ],
      nearbyLandmarks: [
        { name: "CCP Terminal Manila", distance: "1 hour by ferry" },
        { name: "Cavite City", distance: "45 minutes by boat" },
        { name: "Manila Bay", distance: "Surrounding waters" }
      ],
      shortDescription: "Historic island fortress with WWII significance and stunning Manila Bay views."
    },
    {
      id: 2,
      name: "Tagaytay Ridge Scenic Viewpoint",
      location: "Tagaytay City, Cavite",
      category: "Scenic Viewpoint",
      rating: 4.5,
      reviewCount: 567,
      entryFee: "Free",
      duration: "2-3 hours",
      bestTime: "Sunset",
      difficulty: "Easy",
      isOpen: true,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      shortDescription: "Breathtaking views of Taal Lake and Volcano with cool mountain climate.",
      features: ["Scenic Views", "Photography", "Cool Climate"]
    },
    {
      id: 3,
      name: "Aguinaldo Shrine Museum",
      location: "Kawit, Cavite",
      category: "Museum",
      rating: 4.3,
      reviewCount: 234,
      entryFee: "₱30",
      duration: "1-2 hours",
      bestTime: "Morning",
      difficulty: "Easy",
      isOpen: false,
      image: "https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=400&h=300&fit=crop",
      shortDescription: "Birthplace of Philippine independence and President Aguinaldo's residence.",
      features: ["Historical", "Museum", "Independence"]
    },
    {
      id: 4,
      name: "Ternate Beach Resort",
      location: "Ternate, Cavite",
      category: "Beach Resort",
      rating: 4.2,
      reviewCount: 189,
      entryFee: "₱100",
      duration: "Full day",
      bestTime: "All day",
      difficulty: "Easy",
      isOpen: true,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      shortDescription: "Pristine beach with crystal clear waters and water sports activities.",
      features: ["Beach", "Swimming", "Water Sports"]
    }
  ];

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userName: "Maria Santos",
      userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2025-01-15",
      comment: `Amazing historical experience! The guided tour was very informative and the views from the island are breathtaking. The Malinta Tunnel was particularly fascinating - you can really feel the history there. Highly recommend for anyone interested in Philippine history.`,
      helpful: 24,
      verified: true,
      images: [
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
      ]
    },
    {
      id: 2,
      userName: "John Rodriguez",
      userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      date: "2025-01-10",
      comment: `Great day trip from Manila. The ferry ride was smooth and the island has so much history. The only downside was that some areas were quite crowded during our visit. I'd recommend going early in the morning.`,
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      userName: "Lisa Chen",
      userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      date: "2025-01-08",
      comment: `Perfect for history buffs! The audio-visual presentations were excellent and really brought the stories to life. The Pacific War Memorial was very moving. Don't forget to bring a camera - the sunset views are incredible!`,
      helpful: 31,
      verified: false
    }
  ];

  useEffect(() => {
    // Load language preference
    const savedLanguage = localStorage.getItem('tanzatours-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Get destination ID from URL params
    const destinationId = searchParams.get('id') || '1';
    
    // Simulate API call
    setTimeout(() => {
      const foundDestination = mockDestinations.find(dest => dest.id === parseInt(destinationId));
      setDestination(foundDestination || mockDestinations[0]);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  const handleBookmark = (isBookmarked) => {
    // Handle bookmark functionality
    console.log('Bookmark toggled:', isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share && destination) {
      navigator.share({
        title: destination.name,
        text: destination.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleGetDirections = () => {
    if (destination?.coordinates) {
      const { lat, lng } = destination.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  const handlePlanRoute = () => {
    navigate('/interactive-map-dashboard');
  };

  const handleBookGuide = () => {
    // Navigate to guide booking or show modal
    alert('Guide booking feature coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <div className="pt-28 md:pt-32">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="animate-pulse space-y-6">
              <div className="h-64 md:h-80 lg:h-96 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <div className="pt-28 md:pt-32">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center py-12">
              <Icon name="MapPin" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                Destination Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The destination you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/search-and-filter-results')}>
                <Icon name="Search" size={16} className="mr-2" />
                Browse Destinations
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryNavigation />
      
      {/* Main Content */}
      <div className="pt-28 md:pt-32 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <ImageGallery 
              images={destination.images} 
              destinationName={destination.name} 
            />
            <DestinationHeader 
              destination={destination}
              onBookmark={handleBookmark}
              onShare={handleShare}
            />
            <DestinationInfo destination={destination} />
            <LocationMap 
              destination={destination}
              onGetDirections={handleGetDirections}
            />
            <ReviewsSection 
              reviews={mockReviews}
              averageRating={destination.rating}
              totalReviews={destination.reviewCount}
            />
            <RelatedDestinations 
              destinations={mockDestinations}
              currentDestinationId={destination.id}
            />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column - Main Content */}
              <div className="col-span-7 space-y-6">
                <ImageGallery 
                  images={destination.images} 
                  destinationName={destination.name} 
                />
                <DestinationHeader 
                  destination={destination}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                />
                <DestinationInfo destination={destination} />
                <ReviewsSection 
                  reviews={mockReviews}
                  averageRating={destination.rating}
                  totalReviews={destination.reviewCount}
                />
              </div>

              {/* Right Column - Sidebar */}
              <div className="col-span-5 space-y-6">
                <div className="sticky top-32 space-y-6">
                  <LocationMap 
                    destination={destination}
                    onGetDirections={handleGetDirections}
                  />
                  
                  {/* Quick Actions */}
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="font-heading font-semibold text-foreground mb-4">
                      Plan Your Visit
                    </h3>
                    <div className="space-y-3">
                      <Button
                        variant="default"
                        onClick={handleGetDirections}
                        className="w-full"
                        iconName="Navigation"
                        iconPosition="left"
                      >
                        Get Directions
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleBookGuide}
                        className="w-full"
                        iconName="Users"
                        iconPosition="left"
                      >
                        Book Local Guide
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleShare}
                        className="w-full"
                        iconName="Share"
                        iconPosition="left"
                      >
                        Share Destination
                      </Button>
                    </div>
                  </div>

                  <RelatedDestinations 
                    destinations={mockDestinations}
                    currentDestinationId={destination.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile Only */}
      <div className="lg:hidden">
        <FloatingActionButton
          onPlanRoute={handlePlanRoute}
          onBookGuide={handleBookGuide}
          onShare={handleShare}
        />
      </div>
    </div>
  );
};

export default DestinationDetailPage;
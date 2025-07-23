import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import FilterChip from './components/FilterChip';
import DestinationCard from './components/DestinationCard';
import FilterOverlay from './components/FilterOverlay';
import SortDropdown from './components/SortDropdown';
import MapView from './components/MapView';
import EmptyState from './components/EmptyState';

const SearchAndFilterResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    minRating: 0,
    accessibility: [],
    amenities: []
  });

  // Mock destinations data
  const mockDestinations = [
    {
      id: 1,
      name: "Corregidor Island",
      location: "Corregidor, Cavite",
      category: "Historical",
      rating: 4.5,
      reviewCount: 324,
      distance: "2.3 km",
      entryFee: "₱150",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
      isBookmarked: false,
      coordinates: { lat: 14.3833, lng: 120.5833 },
      description: "Historic island fortress with WWII tunnels and memorials"
    },
    {
      id: 2,
      name: "Tagaytay Ridge",
      location: "Tagaytay, Cavite",
      category: "Nature",
      rating: 4.7,
      reviewCount: 567,
      distance: "15.2 km",
      entryFee: "Free",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      isBookmarked: true,
      coordinates: { lat: 14.1167, lng: 120.9667 },
      description: "Scenic viewpoint overlooking Taal Lake and Volcano"
    },
    {
      id: 3,
      name: "Aguinaldo Shrine",
      location: "Kawit, Cavite",
      category: "Historical",
      rating: 4.3,
      reviewCount: 189,
      distance: "8.7 km",
      entryFee: "₱30",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      isBookmarked: false,
      coordinates: { lat: 14.4500, lng: 120.9000 },
      description: "Birthplace of Philippine independence and museum"
    },
    {
      id: 4,
      name: "Ternate Beach Resort",
      location: "Ternate, Cavite",
      category: "Beach",
      rating: 4.1,
      reviewCount: 412,
      distance: "12.5 km",
      entryFee: "₱200",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      isBookmarked: false,
      coordinates: { lat: 14.2833, lng: 120.7167 },
      description: "Beautiful beach resort with crystal clear waters"
    },
    {
      id: 5,
      name: "People\'s Park in the Sky",
      location: "Tagaytay, Cavite",
      category: "Nature",
      rating: 4.0,
      reviewCount: 298,
      distance: "16.8 km",
      entryFee: "₱50",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      isBookmarked: true,
      coordinates: { lat: 14.1000, lng: 120.9500 },
      description: "Elevated park with panoramic views and cool climate"
    },
    {
      id: 6,
      name: "Lomi King Restaurant",
      location: "Tanza, Cavite",
      category: "Restaurant",
      rating: 4.6,
      reviewCount: 156,
      distance: "0.8 km",
      entryFee: "₱80-150",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      isBookmarked: false,
      coordinates: { lat: 14.3200, lng: 120.9400 },
      description: "Famous local restaurant serving authentic Batangas lomi"
    }
  ];

  const [filteredDestinations, setFilteredDestinations] = useState(mockDestinations);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchQuery, filters, sortBy]);

  const applyFiltersAndSort = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...mockDestinations];

      // Apply search query filter
      if (searchQuery.trim()) {
        filtered = filtered.filter(dest =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply category filters
      if (filters.categories.length > 0) {
        filtered = filtered.filter(dest =>
          filters.categories.some(cat => dest.category.toLowerCase().includes(cat))
        );
      }

      // Apply price range filters
      if (filters.priceRanges.length > 0) {
        filtered = filtered.filter(dest => {
          const fee = dest.entryFee.toLowerCase();
          return filters.priceRanges.some(range => {
            switch (range) {
              case 'free': return fee === 'free';
              case 'budget': return fee.includes('₱') && !fee.includes('200');
              case 'moderate': return fee.includes('₱200') || fee.includes('₱150');
              case 'premium': return fee.includes('₱500') || fee.includes('₱300');
              default: return true;
            }
          });
        });
      }

      // Apply rating filter
      if (filters.minRating > 0) {
        filtered = filtered.filter(dest => dest.rating >= filters.minRating);
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'distance':
            return parseFloat(a.distance) - parseFloat(b.distance);
          case 'rating':
            return b.rating - a.rating;
          case 'price_low':
            const aPrice = a.entryFee === 'Free' ? 0 : parseInt(a.entryFee.replace(/[^\d]/g, '')) || 0;
            const bPrice = b.entryFee === 'Free' ? 0 : parseInt(b.entryFee.replace(/[^\d]/g, '')) || 0;
            return aPrice - bPrice;
          case 'price_high':
            const aPriceHigh = a.entryFee === 'Free' ? 0 : parseInt(a.entryFee.replace(/[^\d]/g, '')) || 0;
            const bPriceHigh = b.entryFee === 'Free' ? 0 : parseInt(b.entryFee.replace(/[^\d]/g, '')) || 0;
            return bPriceHigh - aPriceHigh;
          case 'newest':
            return b.id - a.id;
          default: // relevance
            return b.reviewCount - a.reviewCount;
        }
      });

      setFilteredDestinations(filtered);
      setIsLoading(false);
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      applyFiltersAndSort();
      setIsRefreshing(false);
    }, 1000);
  };

  const handleFilterRemove = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(item => item !== value)
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      priceRanges: [],
      minRating: 0,
      accessibility: [],
      amenities: []
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const getActiveFilterChips = () => {
    const chips = [];
    
    filters.categories.forEach(cat => {
      chips.push({
        type: 'category',
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        onRemove: () => handleFilterRemove('categories', cat)
      });
    });

    filters.priceRanges.forEach(range => {
      const labels = {
        free: 'Free Entry',
        budget: '₱1-100',
        moderate: '₱101-500',
        premium: '₱501+'
      };
      chips.push({
        type: 'price',
        label: labels[range],
        onRemove: () => handleFilterRemove('priceRanges', range)
      });
    });

    if (filters.minRating > 0) {
      chips.push({
        type: 'default',
        label: `${filters.minRating}+ Stars`,
        onRemove: () => setFilters(prev => ({ ...prev, minRating: 0 }))
      });
    }

    return chips;
  };

  const activeFilterChips = getActiveFilterChips();
  const hasActiveFilters = activeFilterChips.length > 0 || searchQuery.trim();

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryNavigation />
      
      {/* Main Content */}
      <main className="pt-28 md:pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Mobile Search Bar */}
          <div className="md:hidden mb-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="search"
                  placeholder="Search destinations, activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </form>
          </div>

          {/* Filter Chips */}
          {activeFilterChips.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {activeFilterChips.map((chip, index) => (
                  <FilterChip
                    key={index}
                    label={chip.label}
                    type={chip.type}
                    onRemove={chip.onRemove}
                  />
                ))}
                {activeFilterChips.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAllFilters}
                    className="text-muted-foreground whitespace-nowrap"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  `${filteredDestinations.length} destinations found`
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                iconName={isRefreshing ? "Loader2" : "RefreshCw"}
                iconPosition="left"
                className={isRefreshing ? "animate-spin" : ""}
              >
                Refresh
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
              
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                iconName="Filter"
                iconPosition="left"
                className="hidden md:flex"
              >
                Filters
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden"
              >
                <Icon name="Filter" size={18} />
              </Button>

              <div className="hidden md:flex border border-border rounded-lg">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  iconName="List"
                  className="rounded-r-none"
                />
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  className="rounded-l-none border-l"
                />
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  iconName="Map"
                  className="rounded-l-none border-l"
                />
              </div>
            </div>
          </div>

          {/* Results Content */}
          {filteredDestinations.length === 0 && !isLoading ? (
            <EmptyState
              searchQuery={searchQuery}
              onClearFilters={handleClearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          ) : (
            <>
              {viewMode === 'map' ? (
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <MapView
                    destinations={filteredDestinations}
                    onDestinationSelect={(destination) => {
                      navigate(`/destination-detail-page?id=${destination.id}`);
                    }}
                  />
                </div>
              ) : (
                <div className={`${
                  viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
                }`}>
                  {filteredDestinations.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {filteredDestinations.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Simulate loading more results
                      console.log('Loading more results...');
                    }}
                    iconName="ChevronDown"
                    iconPosition="right"
                  >
                    Load More Destinations
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Mobile View Toggle */}
      <div className="fixed bottom-20 right-4 md:hidden z-40">
        <div className="flex flex-col space-y-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Icon name="List" size={18} />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Icon name="Grid3X3" size={18} />
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('map')}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Icon name="Map" size={18} />
          </Button>
        </div>
      </div>

      {/* Filter Overlay */}
      <FilterOverlay
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
};

export default SearchAndFilterResults;
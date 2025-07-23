import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import DestinationCard from './DestinationCard';

const DesktopSidebar = ({ 
  destinations, 
  selectedDestination, 
  onDestinationSelect, 
  userLocation,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  filteredDestinations 
}) => {
  const [sortBy, setSortBy] = useState('name'); // 'name', 'rating', 'distance'
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid'
  const navigate = useNavigate();

  const calculateDistance = (dest) => {
    if (!userLocation) return null;
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (dest.coordinates.lat - userLocation.lat) * Math.PI / 180;
    const dLon = (dest.coordinates.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(dest.coordinates.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };

  const sortDestinations = (destinations) => {
    const sorted = [...destinations];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'distance':
        if (!userLocation) return sorted;
        return sorted.sort((a, b) => {
          const distA = calculateDistance(a);
          const distB = calculateDistance(b);
          if (!distA || !distB) return 0;
          return parseFloat(distA) - parseFloat(distB);
        });
      case 'name':
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const handleAdvancedSearch = () => {
    navigate('/search-and-filter-results', { 
      state: { 
        initialQuery: searchQuery,
        fromMap: true 
      } 
    });
  };

  const sortedDestinations = sortDestinations(filteredDestinations || destinations);

  return (
    <div className="hidden md:flex flex-col w-96 bg-background border-r border-border h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-xl text-foreground">
            Explore Tanza
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            title={`Switch to ${viewMode === 'list' ? 'grid' : 'list'} view`}
          >
            <Icon name={viewMode === 'list' ? 'Grid3X3' : 'List'} size={20} />
          </Button>
        </div>

        {/* Search Bar */}
        <form onSubmit={onSearchSubmit} className="mb-4">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </form>

        {/* Advanced Search Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAdvancedSearch}
          className="w-full mb-4"
          iconName="SlidersHorizontal"
          iconPosition="left"
        >
          Advanced Filters
        </Button>

        {/* Sort Options */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-background border border-border rounded-md px-2 py-1 text-foreground"
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            {userLocation && <option value="distance">Distance</option>}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {sortedDestinations.length} destination{sortedDestinations.length !== 1 ? 's' : ''} found
          </span>
          {userLocation && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Location enabled</span>
            </div>
          )}
        </div>
      </div>

      {/* Destinations List */}
      <div className="flex-1 overflow-y-auto">
        {sortedDestinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MapPin" size={48} className="text-muted-foreground mb-4" />
            <h3 className="font-medium text-foreground mb-2">No destinations found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSearchChange('')}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-1 gap-4' : 'space-y-3'}`}>
            {sortedDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onSelect={onDestinationSelect}
                isSelected={selectedDestination?.id === destination.id}
                showDistance={!!userLocation}
                distance={calculateDistance(destination)}
                variant={viewMode === 'grid' ? 'compact' : 'list'}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{destinations.length}</div>
            <div className="text-xs text-muted-foreground">Total Places</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {destinations.filter(d => d.rating >= 4.5).length}
            </div>
            <div className="text-xs text-muted-foreground">Top Rated</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {new Set(destinations.map(d => d.category)).size}
            </div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
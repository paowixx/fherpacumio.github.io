import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import DestinationCard from './DestinationCard';

const BottomSheet = ({ 
  destinations, 
  selectedDestination, 
  onDestinationSelect, 
  isVisible = true,
  userLocation = null 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef(null);

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

  const handleTouchStart = (e) => {
    setDragStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setDragCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const dragDistance = dragCurrentY - dragStartY;
    const threshold = 50;
    
    if (dragDistance > threshold && isExpanded) {
      setIsExpanded(false);
    } else if (dragDistance < -threshold && !isExpanded) {
      setIsExpanded(true);
    }
    
    setIsDragging(false);
    setDragStartY(0);
    setDragCurrentY(0);
  };

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible || !destinations || destinations.length === 0) {
    return null;
  }

  return (
    <>
      {/* Backdrop for expanded state */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-xl shadow-elevation-3 z-50 md:hidden transition-transform duration-300 ease-out ${
          isExpanded ? 'transform translate-y-0' : 'transform translate-y-[calc(100%-120px)]'
        }`}
        style={{
          maxHeight: '80vh',
          transform: isDragging 
            ? `translateY(${Math.max(0, dragCurrentY - dragStartY)}px)` 
            : undefined
        }}
      >
        {/* Drag Handle */}
        <div
          className="flex items-center justify-center py-3 cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleHeaderClick}
        >
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                Explore Destinations
              </h3>
              <p className="text-sm text-muted-foreground">
                {destinations.length} place{destinations.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button
              onClick={handleHeaderClick}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon 
                name={isExpanded ? "ChevronDown" : "ChevronUp"} 
                size={20} 
                className="text-muted-foreground" 
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {/* Collapsed View - Horizontal Scroll */}
          {!isExpanded && (
            <div className="px-4 pb-4">
              <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                {destinations.slice(0, 10).map((destination) => (
                  <div key={destination.id} className="flex-shrink-0 w-72">
                    <DestinationCard
                      destination={destination}
                      onSelect={onDestinationSelect}
                      isSelected={selectedDestination?.id === destination.id}
                      showDistance={!!userLocation}
                      distance={calculateDistance(destination)}
                      variant="default"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expanded View - Vertical List */}
          {isExpanded && (
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 pb-4 space-y-3">
                {destinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onSelect={onDestinationSelect}
                    isSelected={selectedDestination?.id === destination.id}
                    showDistance={!!userLocation}
                    distance={calculateDistance(destination)}
                    variant="list"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border p-4">
          <div className="flex space-x-3">
            <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <Icon name="Filter" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Sort</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Icon name="MapPin" size={16} />
              <span className="text-sm font-medium">View All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapContainer = ({ 
  destinations, 
  selectedDestination, 
  onDestinationSelect, 
  userLocation, 
  onLocationRequest,
  mapCenter,
  onMapCenterChange,
  filteredDestinations 
}) => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showLocationButton, setShowLocationButton] = useState(true);

  // Mock Google Maps implementation using iframe
  const generateMapUrl = () => {
    const center = mapCenter || { lat: 14.3169, lng: 120.9317 }; // Tanza, Cavite coordinates
    let markers = '';
    
    if (filteredDestinations && filteredDestinations.length > 0) {
      markers = filteredDestinations.map(dest => 
        `&markers=color:red%7Clabel:${dest.name.charAt(0)}%7C${dest.coordinates.lat},${dest.coordinates.lng}`
      ).join('');
    }

    return `https://www.google.com/maps/embed/v1/view?key=demo&center=${center.lat},${center.lng}&zoom=13${markers}`;
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          onLocationRequest(location);
          onMapCenterChange(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleRecenterMap = () => {
    const tanzaCenter = { lat: 14.3169, lng: 120.9317 };
    onMapCenterChange(tanzaCenter);
  };

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-muted">
      {/* Loading State */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          ref={mapRef}
          width="100%"
          height="100%"
          loading="lazy"
          title="Tanza Tourism Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={generateMapUrl()}
          className={`w-full h-full border-0 transition-opacity duration-500 ${
            isMapLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsMapLoaded(true)}
        />
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
        {/* Current Location Button */}
        {showLocationButton && (
          <Button
            variant="default"
            size="icon"
            onClick={handleLocationRequest}
            className="bg-background text-foreground shadow-elevation-2 hover:bg-muted"
            title="Get current location"
          >
            <Icon name="MapPin" size={20} />
          </Button>
        )}

        {/* Recenter Map Button */}
        <Button
          variant="default"
          size="icon"
          onClick={handleRecenterMap}
          className="bg-background text-foreground shadow-elevation-2 hover:bg-muted"
          title="Recenter map to Tanza"
        >
          <Icon name="Home" size={20} />
        </Button>

        {/* Zoom Controls */}
        <div className="flex flex-col bg-background rounded-lg shadow-elevation-2 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none border-b border-border"
            title="Zoom in"
          >
            <Icon name="Plus" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none"
            title="Zoom out"
          >
            <Icon name="Minus" size={20} />
          </Button>
        </div>
      </div>

      {/* User Location Indicator */}
      {userLocation && (
        <div className="absolute bottom-4 left-4 bg-background rounded-lg shadow-elevation-2 px-3 py-2 z-20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Your location</span>
          </div>
        </div>
      )}

      {/* Selected Destination Info */}
      {selectedDestination && (
        <div className="absolute bottom-4 right-4 bg-background rounded-lg shadow-elevation-2 p-4 max-w-xs z-20">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="MapPin" size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{selectedDestination.name}</h4>
              <p className="text-sm text-muted-foreground truncate">{selectedDestination.location}</p>
              <div className="flex items-center mt-1">
                <Icon name="Star" size={14} className="text-accent fill-current mr-1" />
                <span className="text-sm text-foreground">{selectedDestination.rating}</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3"
            onClick={() => onDestinationSelect(selectedDestination)}
          >
            View Details
          </Button>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background rounded-lg shadow-elevation-2 px-4 py-2 z-20 hidden md:block">
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-muted-foreground">Historical</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-muted-foreground">Beach</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Restaurant</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-muted-foreground">Cultural</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
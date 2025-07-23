import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ destinations, onDestinationSelect }) => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleMarkerClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleInfoWindowClose = () => {
    setSelectedDestination(null);
  };

  const handleViewDetails = () => {
    if (selectedDestination) {
      onDestinationSelect(selectedDestination);
    }
  };

  // Mock coordinates for Tanza, Cavite area
  const centerLat = 14.3167;
  const centerLng = 120.9333;

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Tanza Tourism Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=13&output=embed`}
        className="w-full h-full"
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm"
          onClick={() => window.location.reload()}
        >
          <Icon name="RotateCcw" size={18} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-sm"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                console.log('User location:', position.coords);
              });
            }
          }}
        >
          <Icon name="Crosshair" size={18} />
        </Button>
      </div>

      {/* Destination Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {destinations.slice(0, 10).map((destination, index) => {
          // Mock positioning for demonstration
          const left = 20 + (index % 4) * 20;
          const top = 20 + Math.floor(index / 4) * 25;
          
          return (
            <div
              key={destination.id}
              className="absolute pointer-events-auto"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <button
                onClick={() => handleMarkerClick(destination)}
                className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110 ${
                  selectedDestination?.id === destination.id
                    ? 'bg-primary scale-110' :'bg-accent'
                }`}
              >
                <Icon name="MapPin" size={16} />
              </button>
              
              {/* Info Window */}
              {selectedDestination?.id === destination.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-background border border-border rounded-lg shadow-elevation-2 p-3 z-10">
                  <button
                    onClick={handleInfoWindowClose}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={14} />
                  </button>
                  
                  <div className="pr-6">
                    <h4 className="font-heading font-semibold text-foreground mb-1 text-sm">
                      {destination.name}
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      <span>{destination.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-accent fill-current" />
                        <span className="text-xs font-medium">{destination.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{destination.entryFee}</span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleViewDetails}
                      className="w-full text-xs"
                    >
                      View Details
                    </Button>
                  </div>
                  
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3">
        <h4 className="font-heading font-semibold text-foreground text-sm mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent rounded-full border border-white"></div>
            <span className="text-xs text-foreground">Tourist Destinations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full border border-white"></div>
            <span className="text-xs text-foreground">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
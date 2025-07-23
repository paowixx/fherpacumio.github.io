import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ destination, onGetDirections }) => {
  const { coordinates, name, address } = destination;

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative w-full h-64 md:h-80 bg-muted rounded-lg overflow-hidden border border-border">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={`${name} Location`}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
          className="w-full h-full"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={onGetDirections}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Icon name="Navigation" size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => window.open(`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`, '_blank')}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Icon name="ExternalLink" size={16} />
          </Button>
        </div>
      </div>

      {/* Location Details */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={20} className="text-primary mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground mb-1">Location</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{address}</p>
            <div className="flex items-center space-x-4 mt-3 text-xs text-muted-foreground font-data">
              <span>Lat: {coordinates.lat}</span>
              <span>Lng: {coordinates.lng}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Options */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Car" size={20} className="text-primary mr-2" />
          How to Get There
        </h3>
        <div className="space-y-3">
          {destination.transportation?.map((option, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon 
                name={option.type === 'car' ? 'Car' : option.type === 'bus' ? 'Bus' : 'MapPin'} 
                size={16} 
                className="text-muted-foreground mt-1 flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground text-sm">{option.method}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
                {option.duration && (
                  <div className="text-xs text-primary font-medium mt-1">
                    Estimated time: {option.duration}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Landmarks */}
      {destination.nearbyLandmarks && (
        <div className="p-4 bg-card border border-border rounded-lg">
          <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center">
            <Icon name="Compass" size={20} className="text-primary mr-2" />
            Nearby Landmarks
          </h3>
          <div className="space-y-2">
            {destination.nearbyLandmarks.map((landmark, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{landmark.name}</span>
                </div>
                <span className="text-xs text-muted-foreground font-data">{landmark.distance}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="default"
          onClick={onGetDirections}
          className="flex-1"
          iconName="Navigation"
          iconPosition="left"
        >
          Get Directions
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open(`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`, '_blank')}
          className="flex-1"
          iconName="ExternalLink"
          iconPosition="left"
        >
          Open in Maps
        </Button>
      </div>
    </div>
  );
};

export default LocationMap;
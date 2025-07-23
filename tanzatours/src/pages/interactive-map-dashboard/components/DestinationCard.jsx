import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DestinationCard = ({ 
  destination, 
  onSelect, 
  isSelected = false,
  showDistance = false,
  distance = null,
  variant = 'default' // 'default', 'compact', 'list'
}) => {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate('/destination-detail-page', { state: { destination } });
  };

  const handleCardClick = () => {
    onSelect(destination);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Historical': 'Landmark',
      'Beach': 'Waves',
      'Restaurant': 'UtensilsCrossed',
      'Cultural': 'Building2',
      'Nature': 'Trees',
      'Adventure': 'Mountain',
      'Shopping': 'ShoppingBag',
      'Entertainment': 'Music'
    };
    return icons[category] || 'MapPin';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Historical': 'text-red-600 bg-red-50',
      'Beach': 'text-blue-600 bg-blue-50',
      'Restaurant': 'text-green-600 bg-green-50',
      'Cultural': 'text-purple-600 bg-purple-50',
      'Nature': 'text-emerald-600 bg-emerald-50',
      'Adventure': 'text-orange-600 bg-orange-50',
      'Shopping': 'text-pink-600 bg-pink-50',
      'Entertainment': 'text-indigo-600 bg-indigo-50'
    };
    return colors[category] || 'text-gray-600 bg-gray-50';
  };

  if (variant === 'compact') {
    return (
      <div
        onClick={handleCardClick}
        className={`bg-card rounded-lg border border-border p-3 cursor-pointer transition-all duration-200 hover:shadow-elevation-2 ${
          isSelected ? 'ring-2 ring-primary border-primary' : ''
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-card-foreground truncate">{destination.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-accent fill-current" />
                <span className="text-xs text-muted-foreground">{destination.rating}</span>
              </div>
              {showDistance && distance && (
                <span className="text-xs text-muted-foreground">• {distance}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className={`bg-card rounded-lg border border-border p-4 cursor-pointer transition-all duration-200 hover:shadow-elevation-2 ${
          isSelected ? 'ring-2 ring-primary border-primary' : ''
        }`}
      >
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-card-foreground truncate">{destination.name}</h4>
                <p className="text-sm text-muted-foreground truncate mt-1">{destination.location}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(destination.category)}`}>
                <Icon name={getCategoryIcon(destination.category)} size={12} className="inline mr-1" />
                {destination.category}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <span className="text-sm text-foreground">{destination.rating}</span>
                  <span className="text-sm text-muted-foreground">({destination.reviewCount})</span>
                </div>
                {showDistance && distance && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{distance}</span>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewDetails}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <div
      onClick={handleCardClick}
      className={`bg-card rounded-lg border border-border overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-elevation-2 ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      }`}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(destination.category)}`}>
            <Icon name={getCategoryIcon(destination.category)} size={12} className="inline mr-1" />
            {destination.category}
          </div>
        </div>
        {showDistance && distance && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            {distance}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-card-foreground truncate flex-1 mr-2">
            {destination.name}
          </h3>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <Icon name="Star" size={14} className="text-accent fill-current" />
            <span className="text-sm font-medium text-card-foreground">{destination.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Icon name="MapPin" size={14} className="mr-1" />
          <span className="truncate">{destination.location}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {destination.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{destination.openingHours}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{destination.entryFee}</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
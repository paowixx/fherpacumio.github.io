import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DestinationCard = ({ destination, viewMode = 'list' }) => {
  const [isBookmarked, setIsBookmarked] = useState(destination.isBookmarked || false);

  const handleBookmarkToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleDirections = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (destination.coordinates) {
      const { lat, lng } = destination.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Historical': 'bg-amber-100 text-amber-800',
      'Beach': 'bg-blue-100 text-blue-800',
      'Restaurant': 'bg-green-100 text-green-800',
      'Cultural': 'bg-purple-100 text-purple-800',
      'Adventure': 'bg-red-100 text-red-800',
      'Nature': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (viewMode === 'grid') {
    return (
      <Link to={`/destination-detail-page?id=${destination.id}`} className="block">
        <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <div className="relative aspect-video">
            <Image
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmarkToggle}
              className={`absolute top-3 right-3 bg-white/90 hover:bg-white ${
                isBookmarked ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={18} />
            </Button>
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(destination.category)}`}>
              {destination.category}
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-heading font-semibold text-card-foreground mb-2 line-clamp-2">
              {destination.name}
            </h3>
            
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Icon name="MapPin" size={14} className="mr-1" />
              <span className="truncate">{destination.location}</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-accent fill-current" />
                <span className="text-sm font-medium text-card-foreground">{destination.rating}</span>
                <span className="text-sm text-muted-foreground">({destination.reviewCount})</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {destination.distance}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Entry: </span>
                <span className="font-medium text-card-foreground">{destination.entryFee}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDirections}
                iconName="Navigation"
                iconPosition="left"
              >
                Directions
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/destination-detail-page?id=${destination.id}`} className="block">
      <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex space-x-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className={`absolute -top-1 -left-1 px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(destination.category)}`}>
              {destination.category}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-heading font-semibold text-card-foreground line-clamp-1 pr-2">
                {destination.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmarkToggle}
                className={`flex-shrink-0 ${isBookmarked ? 'text-accent' : 'text-muted-foreground'}`}
              >
                <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={18} />
              </Button>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Icon name="MapPin" size={14} className="mr-1" />
              <span className="truncate">{destination.location}</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <span className="text-sm font-medium text-card-foreground">{destination.rating}</span>
                  <span className="text-sm text-muted-foreground">({destination.reviewCount})</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {destination.distance}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Entry: </span>
                <span className="font-medium text-card-foreground">{destination.entryFee}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDirections}
                iconName="Navigation"
                iconPosition="left"
              >
                Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
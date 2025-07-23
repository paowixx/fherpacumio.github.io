import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DestinationHeader = ({ destination, onBookmark, onShare }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(!isBookmarked);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-accent fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-4">
      {/* Title and Actions */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            {destination.name}
          </h1>
          <div className="flex items-center text-muted-foreground mb-3">
            <Icon name="MapPin" size={16} className="mr-1 flex-shrink-0" />
            <span className="text-sm md:text-base">{destination.location}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={isBookmarked ? 'text-accent' : 'text-muted-foreground'}
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="text-muted-foreground"
          >
            <Icon name="Share" size={20} />
          </Button>
        </div>
      </div>

      {/* Rating and Category */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {renderStars(destination.rating)}
            <span className="ml-2 font-medium text-foreground">{destination.rating}</span>
            <span className="text-muted-foreground">({destination.reviewCount} reviews)</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
            {destination.category}
          </div>
          {destination.isOpen && (
            <div className="flex items-center space-x-1 text-success">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium">Open Now</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Entry Fee</div>
          <div className="font-semibold text-foreground">{destination.entryFee}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Duration</div>
          <div className="font-semibold text-foreground">{destination.duration}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Best Time</div>
          <div className="font-semibold text-foreground">{destination.bestTime}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Difficulty</div>
          <div className="font-semibold text-foreground">{destination.difficulty}</div>
        </div>
      </div>
    </div>
  );
};

export default DestinationHeader;
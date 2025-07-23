import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const DestinationModal = ({ isOpen, onClose, destination }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share && destination) {
      navigator.share({
        title: destination.name,
        text: destination.description,
        url: window.location.href,
      });
    }
  };

  const handleDirections = () => {
    if (destination?.coordinates) {
      const { lat, lng } = destination.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  if (!isOpen || !destination) return null;

  const mockImages = [
    '/assets/images/destination-1.jpg',
    '/assets/images/destination-2.jpg',
    '/assets/images/destination-3.jpg'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 md:p-8">
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-background rounded-lg shadow-elevation-3 max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background border-b border-border">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="md:hidden"
                >
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <div>
                  <h2 className="text-lg font-heading font-semibold text-foreground">
                    {destination.name}
                  </h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {destination.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmarkToggle}
                  className={isBookmarked ? 'text-accent' : ''}
                >
                  <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                >
                  <Icon name="Share" size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hidden md:flex"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-video bg-muted">
                  <Image
                    src={mockImages[activeImageIndex]}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Navigation */}
                {mockImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(Math.max(0, activeImageIndex - 1))}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                      disabled={activeImageIndex === 0}
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(Math.min(mockImages.length - 1, activeImageIndex + 1))}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                      disabled={activeImageIndex === mockImages.length - 1}
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {mockImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details */}
              <div className="p-6 space-y-6">
                {/* Rating and Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-accent fill-current" />
                      <span className="font-medium text-foreground">{destination.rating}</span>
                      <span className="text-muted-foreground">({destination.reviewCount} reviews)</span>
                    </div>
                    <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                      {destination.type}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Entry Fee</div>
                    <div className="font-semibold text-foreground">{destination.entryFee}</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                {/* Operating Hours */}
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">Operating Hours</h3>
                  <div className="space-y-2">
                    {destination.operatingHours?.map((hours, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{hours.day}</span>
                        <span className="text-foreground font-data">{hours.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {destination.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-sm text-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">Contact</h3>
                  <div className="space-y-2">
                    {destination.phone && (
                      <div className="flex items-center space-x-3">
                        <Icon name="Phone" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground font-data">{destination.phone}</span>
                      </div>
                    )}
                    {destination.website && (
                      <div className="flex items-center space-x-3">
                        <Icon name="Globe" size={16} className="text-muted-foreground" />
                        <a 
                          href={destination.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-background border-t border-border p-4">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleDirections}
                  className="flex-1"
                  iconName="Navigation"
                  iconPosition="left"
                >
                  Directions
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Plan Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;
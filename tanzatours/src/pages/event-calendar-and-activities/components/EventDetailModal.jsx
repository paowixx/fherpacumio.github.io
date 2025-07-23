import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventDetailModal = ({ isOpen, onClose, event }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-PH', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-PH', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'festival': return 'PartyPopper';
      case 'cultural': return 'Theater';
      case 'food': return 'UtensilsCrossed';
      case 'sports': return 'Trophy';
      default: return 'Calendar';
    }
  };
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'festival': return 'text-accent bg-accent/10';
      case 'cultural': return 'text-secondary bg-secondary/10';
      case 'food': return 'text-warning bg-warning/10';
      case 'sports': return 'text-success bg-success/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleInterestedToggle = () => {
    setIsInterested(!isInterested);
  };

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    }
  };

  const handleAddToCalendar = () => {
    if (!event) return;
    
    const startDate = new Date(`${event.date}T${event.startTime}`);
    const endDate = new Date(`${event.date}T${event.endTime}`);
    
    const calendarData = {
      title: event.title,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      description: event.description,
      location: event.location
    };
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarData.title)}&dates=${calendarData.start}/${calendarData.end}&details=${encodeURIComponent(calendarData.description)}&location=${encodeURIComponent(calendarData.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleGetDirections = () => {
    if (event?.coordinates) {
      const { lat, lng } = event.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  if (!isOpen || !event) return null;

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
                  <h2 className="text-lg font-heading font-semibold text-foreground line-clamp-1">
                    {event.title}
                  </h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {formatDate(event.date)}
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
              {/* Event Image */}
              <div className="relative aspect-video bg-muted">
                <Image
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                    <Icon name={getCategoryIcon(event.category)} size={14} className="mr-1" />
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </div>
                </div>
                
                {/* Free Badge */}
                {event.isFree && (
                  <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-success">
                      Free Entry
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Time</div>
                        <div className="text-sm text-muted-foreground">
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Location</div>
                        <div className="text-sm text-muted-foreground">{event.location}</div>
                      </div>
                    </div>
                    
                    {event.organizer && (
                      <div className="flex items-center space-x-3">
                        <Icon name="User" size={20} className="text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Organizer</div>
                          <div className="text-sm text-muted-foreground">{event.organizer}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {event.price && (
                      <div className="flex items-center space-x-3">
                        <Icon name="DollarSign" size={20} className="text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Price</div>
                          <div className="text-sm text-muted-foreground">{event.price}</div>
                        </div>
                      </div>
                    )}
                    
                    {event.attendeesCount > 0 && (
                      <div className="flex items-center space-x-3">
                        <Icon name="Users" size={20} className="text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Interested</div>
                          <div className="text-sm text-muted-foreground">{event.attendeesCount} people</div>
                        </div>
                      </div>
                    )}
                    
                    {event.weather && (
                      <div className="flex items-center space-x-3">
                        <Icon name={event.weather.icon} size={20} className="text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Weather</div>
                          <div className="text-sm text-muted-foreground">
                            {event.weather.temp}°C, {event.weather.condition}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Additional Info */}
                {event.highlights && event.highlights.length > 0 && (
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">Event Highlights</h3>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Contact Information */}
                {event.contact && (
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      {event.contact.phone && (
                        <div className="flex items-center space-x-3">
                          <Icon name="Phone" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-foreground font-data">{event.contact.phone}</span>
                        </div>
                      )}
                      {event.contact.email && (
                        <div className="flex items-center space-x-3">
                          <Icon name="Mail" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-foreground">{event.contact.email}</span>
                        </div>
                      )}
                      {event.contact.website && (
                        <div className="flex items-center space-x-3">
                          <Icon name="Globe" size={16} className="text-muted-foreground" />
                          <a 
                            href={event.contact.website} 
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
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-background border-t border-border p-4">
              <div className="flex space-x-3">
                <Button
                  variant={isInterested ? "default" : "outline"}
                  onClick={handleInterestedToggle}
                  className="flex-1"
                  iconName={isInterested ? "Check" : "Heart"}
                  iconPosition="left"
                >
                  {isInterested ? "Interested" : "Mark Interested"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToCalendar}
                  iconName="CalendarPlus"
                  iconPosition="left"
                >
                  Add to Calendar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGetDirections}
                  iconName="Navigation"
                  iconPosition="left"
                >
                  Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
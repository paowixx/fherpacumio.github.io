import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedEvents = ({ events, onEventClick }) => {
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

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-foreground">Featured Events</h2>
        <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {events.slice(0, 2).map((event) => (
          <div
            key={event.id}
            onClick={() => onEventClick(event)}
            className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-shadow duration-200 cursor-pointer"
          >
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
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-success bg-success/90 text-white">
                    Free Entry
                  </div>
                </div>
              )}
              
              {/* Weather Info */}
              {event.weather && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name={event.weather.icon} size={14} />
                    <span>{event.weather.temp}°C</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Event Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-heading font-semibold text-card-foreground line-clamp-2">
                  {event.title}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle bookmark toggle
                  }}
                  className="flex-shrink-0 ml-2"
                >
                  <Icon name="Bookmark" size={16} />
                </Button>
              </div>
              
              {/* Date and Time */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {event.description}
              </p>
              
              {/* Event Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {event.attendeesCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{event.attendeesCount} interested</span>
                    </div>
                  )}
                  {event.rating && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-accent fill-current" />
                      <span>{event.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle share
                    }}
                    iconName="Share"
                    iconPosition="left"
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
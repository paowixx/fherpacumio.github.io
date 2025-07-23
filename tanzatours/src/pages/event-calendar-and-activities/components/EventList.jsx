import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventList = ({ events, onEventClick }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-PH', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
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
  
  const handleAddToCalendar = (event, e) => {
    e.stopPropagation();
    
    // Create calendar event data
    const startDate = new Date(`${event.date}T${event.startTime}`);
    const endDate = new Date(`${event.date}T${event.endTime}`);
    
    const calendarData = {
      title: event.title,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      description: event.description,
      location: event.location
    };
    
    // Generate Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarData.title)}&dates=${calendarData.start}/${calendarData.end}&details=${encodeURIComponent(calendarData.description)}&location=${encodeURIComponent(calendarData.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">No Events Found</h3>
        <p className="text-muted-foreground">There are no events scheduled for the selected period.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          onClick={() => onEventClick(event)}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-elevation-1 transition-shadow duration-200 cursor-pointer"
        >
          <div className="flex space-x-4">
            {/* Event Image */}
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted">
              <Image
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-card-foreground truncate">
                    {event.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      <Icon name={getCategoryIcon(event.category)} size={12} className="mr-1" />
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </div>
                    {event.isFree && (
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                        Free
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleAddToCalendar(event, e)}
                  className="flex-shrink-0 ml-2"
                >
                  <Icon name="CalendarPlus" size={16} />
                </Button>
              </div>
              
              {/* Date and Time */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                <Icon name="MapPin" size={14} />
                <span className="truncate">{event.location}</span>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
              
              {/* Attendees Count */}
              {event.attendeesCount > 0 && (
                <div className="flex items-center space-x-1 mt-2 text-sm text-muted-foreground">
                  <Icon name="Users" size={14} />
                  <span>{event.attendeesCount} interested</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
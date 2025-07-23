import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventFilters = ({ selectedCategories, onCategoryToggle, selectedTimeRange, onTimeRangeChange }) => {
  const categories = [
    { id: 'all', label: 'All Events', icon: 'Calendar', color: 'text-primary bg-primary/10' },
    { id: 'festival', label: 'Festivals', icon: 'PartyPopper', color: 'text-accent bg-accent/10' },
    { id: 'cultural', label: 'Cultural', icon: 'Theater', color: 'text-secondary bg-secondary/10' },
    { id: 'food', label: 'Food Events', icon: 'UtensilsCrossed', color: 'text-warning bg-warning/10' },
    { id: 'sports', label: 'Sports', icon: 'Trophy', color: 'text-success bg-success/10' }
  ];
  
  const timeRanges = [
    { id: 'upcoming', label: 'Upcoming', icon: 'Clock' },
    { id: 'today', label: 'Today', icon: 'Calendar' },
    { id: 'week', label: 'This Week', icon: 'CalendarDays' },
    { id: 'month', label: 'This Month', icon: 'CalendarRange' }
  ];

  return (
    <div className="space-y-4">
      {/* Category Filters */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2 md:grid md:grid-cols-1 md:gap-1">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id) || 
                             (category.id === 'all' && selectedCategories.length === 0);
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryToggle(category.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-200 md:justify-start
                  ${isSelected 
                    ? `${category.color} border border-current` 
                    : 'text-muted-foreground bg-muted hover:bg-accent/10 hover:text-foreground'
                  }
                `}
              >
                <Icon name={category.icon} size={16} />
                <span className="hidden md:inline">{category.label}</span>
                <span className="md:hidden">{category.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Time Range Filters */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Time Range</h3>
        <div className="flex flex-wrap gap-2 md:grid md:grid-cols-1 md:gap-1">
          {timeRanges.map((range) => {
            const isSelected = selectedTimeRange === range.id;
            
            return (
              <button
                key={range.id}
                onClick={() => onTimeRangeChange(range.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-200 md:justify-start
                  ${isSelected 
                    ? 'text-primary bg-primary/10 border border-primary' :'text-muted-foreground bg-muted hover:bg-accent/10 hover:text-foreground'
                  }
                `}
              >
                <Icon name={range.icon} size={16} />
                <span>{range.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="pt-4 border-t border-border">
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            iconName="Download"
            iconPosition="left"
          >
            Export Calendar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            iconName="Bell"
            iconPosition="left"
          >
            Event Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
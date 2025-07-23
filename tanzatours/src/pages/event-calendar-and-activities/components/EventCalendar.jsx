import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCalendar = ({ events, selectedDate, onDateSelect, currentMonth, onMonthChange }) => {
  const today = new Date();
  const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  
  // Get calendar grid
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysInPrevMonth = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  
  // Create calendar grid
  const calendarDays = [];
  
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPrevMonth - i)
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    });
  }
  
  // Next month days to fill grid
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day)
    });
  }
  
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };
  
  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };
  
  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };
  
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    onMonthChange(prevMonth);
  };
  
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    onMonthChange(nextMonth);
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevMonth}
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <h2 className="font-heading font-semibold text-lg text-card-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextMonth}
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
      
      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b border-border">
        {dayNames.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground bg-muted">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((calendarDay, index) => {
          const dayEvents = getEventsForDate(calendarDay.date);
          const hasEvents = dayEvents.length > 0;
          
          return (
            <button
              key={index}
              onClick={() => onDateSelect(calendarDay.date)}
              className={`
                relative p-2 md:p-3 h-12 md:h-16 border-r border-b border-border text-sm
                transition-colors duration-200 hover:bg-accent/10
                ${!calendarDay.isCurrentMonth ? 'text-muted-foreground bg-muted/30' : 'text-card-foreground'}
                ${isToday(calendarDay.date) ? 'bg-primary/10 font-semibold' : ''}
                ${isSelected(calendarDay.date) ? 'bg-primary text-primary-foreground' : ''}
              `}
            >
              <span className="block">{calendarDay.day}</span>
              
              {/* Event Indicators */}
              {hasEvents && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {dayEvents.slice(0, 3).map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`w-1.5 h-1.5 rounded-full ${
                        event.category === 'festival' ? 'bg-accent' :
                        event.category === 'cultural' ? 'bg-secondary' :
                        event.category === 'food' ? 'bg-warning' :
                        event.category === 'sports'? 'bg-success' : 'bg-primary'
                      }`}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import EventCalendar from './components/EventCalendar';
import EventList from './components/EventList';
import EventFilters from './components/EventFilters';
import FeaturedEvents from './components/FeaturedEvents';
import EventDetailModal from './components/EventDetailModal';

const EventCalendarAndActivities = () => {
  const [currentView, setCurrentView] = useState('calendar'); // 'calendar' or 'list'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Tanza Heritage Festival",
      description: `Join us for the annual Tanza Heritage Festival celebrating our rich cultural history and traditions.\n\nExperience traditional Filipino dances, local cuisine, and historical exhibits showcasing the heritage of Tanza, Cavite. This family-friendly event features live performances, cultural workshops, and local artisan displays.`,
      category: "festival",
      date: "2025-01-25",
      startTime: "09:00",
      endTime: "18:00",
      location: "Tanza Municipal Plaza, Tanza, Cavite",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
      isFree: true,
      attendeesCount: 245,
      rating: 4.8,
      organizer: "Tanza Municipal Government",
      price: "Free",
      weather: {
        temp: 28,
        condition: "Sunny",
        icon: "Sun"
      },
      highlights: [
        "Traditional Filipino dance performances",
        "Local food festival with authentic Cavite cuisine",
        "Historical exhibits and museum displays",
        "Live music and cultural shows",
        "Children\'s activities and games"
      ],
      contact: {
        phone: "+63 46 437 2345",
        email: "events@tanza.gov.ph",
        website: "https://tanza.gov.ph/events"
      },
      coordinates: { lat: 14.6760, lng: 120.9380 }
    },
    {
      id: 2,
      title: "Sunset Beach Music Festival",
      description: `Experience the magic of live music by the beach as local and visiting artists perform against the backdrop of a stunning Tanza sunset.\n\nThis outdoor music festival features multiple genres including OPM, acoustic, and contemporary Filipino music. Food stalls and local vendors will be available throughout the event.`,
      category: "cultural",
      date: "2025-01-28",
      startTime: "16:00",
      endTime: "22:00",
      location: "Tanza Beach Resort, Tanza, Cavite",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      isFree: false,
      attendeesCount: 156,
      rating: 4.6,
      organizer: "Tanza Tourism Office",
      price: "₱150 - ₱300",
      weather: {
        temp: 26,
        condition: "Partly Cloudy",
        icon: "CloudSun"
      },
      highlights: [
        "Live performances by local and visiting artists",
        "Beachfront venue with sunset views",
        "Food trucks and local delicacies",
        "Family-friendly atmosphere",
        "Photography opportunities"
      ],
      contact: {
        phone: "+63 46 437 2346",
        email: "tourism@tanza.gov.ph"
      },
      coordinates: { lat: 14.6850, lng: 120.9450 }
    },
    {
      id: 3,
      title: "Tanza Food Street Night Market",
      description: `Discover the flavors of Tanza at our weekly night market featuring local street food, traditional delicacies, and modern Filipino fusion cuisine.\n\nEvery Friday night, local vendors gather to showcase the best of Cavite's culinary heritage. From classic kakanin to innovative food creations, there's something for every palate.`,
      category: "food",
      date: "2025-01-31",
      startTime: "18:00",
      endTime: "23:00",
      location: "Tanza Public Market Area, Tanza, Cavite",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      isFree: true,
      attendeesCount: 89,
      rating: 4.7,
      organizer: "Tanza Vendors Association",
      price: "Food prices vary",
      weather: {
        temp: 24,
        condition: "Clear",
        icon: "Moon"
      },
      highlights: [
        "Over 30 local food vendors",
        "Traditional Cavite delicacies",
        "Live acoustic music",
        "Family dining area",
        "Affordable local cuisine"
      ],
      contact: {
        phone: "+63 46 437 2347",
        email: "vendors@tanza.gov.ph"
      },
      coordinates: { lat: 14.6740, lng: 120.9360 }
    },
    {
      id: 4,
      title: "Tanza Basketball Tournament Finals",
      description: `Cheer for your favorite local teams as they compete in the championship finals of the annual Tanza Basketball Tournament.\n\nThis community sports event brings together the best basketball teams from different barangays in Tanza for an exciting championship match.`,
      category: "sports",
      date: "2025-02-02",
      startTime: "14:00",
      endTime: "18:00",
      location: "Tanza Sports Complex, Tanza, Cavite",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
      isFree: true,
      attendeesCount: 312,
      rating: 4.5,
      organizer: "Tanza Sports Council",
      price: "Free",
      weather: {
        temp: 30,
        condition: "Hot",
        icon: "Sun"
      },
      highlights: [
        "Championship finals match",
        "Local team competitions",
        "Community sports celebration",
        "Food and refreshment stalls",
        "Awards ceremony"
      ],
      contact: {
        phone: "+63 46 437 2348",
        email: "sports@tanza.gov.ph"
      },
      coordinates: { lat: 14.6780, lng: 120.9400 }
    },
    {
      id: 5,
      title: "Traditional Arts and Crafts Workshop",
      description: `Learn traditional Filipino arts and crafts from local artisans in this hands-on workshop experience.\n\nParticipants will learn traditional weaving, pottery, and other indigenous crafts that have been passed down through generations in Tanza and Cavite.`,
      category: "cultural",
      date: "2025-02-05",
      startTime: "10:00",
      endTime: "16:00",
      location: "Tanza Cultural Center, Tanza, Cavite",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=600&fit=crop",
      isFree: false,
      attendeesCount: 45,
      rating: 4.9,
      organizer: "Tanza Cultural Heritage Foundation",
      price: "₱200 (includes materials)",
      weather: {
        temp: 27,
        condition: "Partly Cloudy",
        icon: "Cloud"
      },
      highlights: [
        "Hands-on traditional crafts learning",
        "Expert local artisan instructors",
        "Take home your creations",
        "Cultural heritage education",
        "Small group workshop setting"
      ],
      contact: {
        phone: "+63 46 437 2349",
        email: "culture@tanza.gov.ph"
      },
      coordinates: { lat: 14.6720, lng: 120.9340 }
    }
  ];

  // Filter events based on selected criteria
  const getFilteredEvents = () => {
    let filtered = mockEvents;

    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
      filtered = filtered.filter(event => selectedCategories.includes(event.category));
    }

    // Filter by time range
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    switch (selectedTimeRange) {
      case 'today':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.toDateString() === today.toDateString();
        });
        break;
      case 'week':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today && eventDate <= weekFromNow;
        });
        break;
      case 'month':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today && eventDate <= monthFromNow;
        });
        break;
      case 'upcoming':
      default:
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today;
        });
        break;
    }

    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Get events for selected date
  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  };

  // Get featured events
  const getFeaturedEvents = () => {
    return mockEvents
      .filter(event => event.rating >= 4.7 || event.attendeesCount >= 200)
      .slice(0, 2);
  };

  const handleCategoryToggle = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(categoryId)
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (window.innerWidth < 768) {
      setCurrentView('list');
    }
  };

  const filteredEvents = getFilteredEvents();
  const selectedDateEvents = getEventsForSelectedDate();
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <Helmet>
        <title>Event Calendar & Activities - TanzaTours</title>
        <meta name="description" content="Discover festivals, cultural events, and seasonal activities in Tanza, Cavite. Plan your visit with our interactive event calendar and detailed activity listings." />
        <meta name="keywords" content="Tanza events, Cavite festivals, cultural activities, event calendar, tourism activities" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        
        {/* Main Content */}
        <main className="pt-16 md:pt-28 pb-16 md:pb-8">
          <div className="container mx-auto px-4 lg:px-6">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                    Events & Activities
                  </h1>
                  <p className="text-muted-foreground">
                    Discover festivals, cultural events, and seasonal activities in Tanza
                  </p>
                </div>
                
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="md:hidden"
                >
                  <Icon name="Filter" size={20} />
                </Button>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <div className="flex bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setCurrentView('calendar')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'calendar' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Calendar" size={16} />
                    <span className="hidden sm:inline">Calendar</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('list')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="List" size={16} />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <div className="mb-8">
                <FeaturedEvents 
                  events={featuredEvents}
                  onEventClick={handleEventClick}
                />
              </div>
            )}

            {/* Main Content Layout */}
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Filters Sidebar - Desktop */}
              <div className="hidden lg:block">
                <div className="sticky top-32">
                  <EventFilters
                    selectedCategories={selectedCategories}
                    onCategoryToggle={handleCategoryToggle}
                    selectedTimeRange={selectedTimeRange}
                    onTimeRangeChange={setSelectedTimeRange}
                  />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {currentView === 'calendar' ? (
                  <div className="grid gap-6 lg:grid-cols-3">
                    {/* Calendar */}
                    <div className="lg:col-span-2">
                      <EventCalendar
                        events={mockEvents}
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                        currentMonth={currentMonth}
                        onMonthChange={setCurrentMonth}
                      />
                    </div>
                    
                    {/* Selected Date Events */}
                    <div className="lg:col-span-1">
                      <div className="bg-card rounded-lg border border-border p-4">
                        <h3 className="font-heading font-semibold text-card-foreground mb-4">
                          {selectedDate ? (
                            `Events on ${selectedDate.toLocaleDateString('en-PH', { 
                              month: 'long', 
                              day: 'numeric' 
                            })}`
                          ) : (
                            'Select a Date'
                          )}
                        </h3>
                        
                        {selectedDateEvents.length > 0 ? (
                          <div className="space-y-3">
                            {selectedDateEvents.map((event) => (
                              <div
                                key={event.id}
                                onClick={() => handleEventClick(event)}
                                className="p-3 bg-muted rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                              >
                                <h4 className="font-medium text-card-foreground text-sm line-clamp-2 mb-1">
                                  {event.title}
                                </h4>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <Icon name="Clock" size={12} />
                                  <span>
                                    {new Date(`2000-01-01T${event.startTime}`).toLocaleTimeString('en-PH', {
                                      hour: 'numeric',
                                      minute: '2-digit',
                                      hour12: true
                                    })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <Icon name="Calendar" size={32} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              No events scheduled for this date
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <EventList
                    events={filteredEvents}
                    onEventClick={handleEventClick}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Filters Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
            <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-background shadow-elevation-3">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-heading font-semibold text-foreground">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="p-4 overflow-y-auto h-full pb-20">
                <EventFilters
                  selectedCategories={selectedCategories}
                  onCategoryToggle={handleCategoryToggle}
                  selectedTimeRange={selectedTimeRange}
                  onTimeRangeChange={setSelectedTimeRange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Event Detail Modal */}
        <EventDetailModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          event={selectedEvent}
        />
      </div>
    </>
  );
};

export default EventCalendarAndActivities;
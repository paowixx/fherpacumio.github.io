import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Explore',
      path: '/interactive-map-dashboard',
      icon: 'Map',
      tooltip: 'Discover attractions and plan routes'
    },
    {
      label: 'Search',
      path: '/search-and-filter-results',
      icon: 'Search',
      tooltip: 'Find destinations and activities'
    },
    {
      label: 'Events',
      path: '/event-calendar-and-activities',
      icon: 'Calendar',
      tooltip: 'Browse upcoming events and activities'
    },
    {
      label: 'Reviews',
      path: '/reviews-and-ratings-management',
      icon: 'Star',
      tooltip: 'Manage your reviews and ratings'
    },
    {
      label: 'Profile',
      path: '/user-profile-and-settings',
      icon: 'User',
      tooltip: 'Account settings and preferences'
    }
  ];

  const isActive = (path) => {
    if (path === '/interactive-map-dashboard') {
      return location.pathname === '/' || location.pathname === path;
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors duration-200 ${
                isActive(item.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={`mb-1 ${isActive(item.path) ? 'text-primary' : ''}`}
              />
              <span className="text-xs font-caption truncate">{item.label}</span>
            </Link>
          ))}
          
          {/* More Menu for Profile */}
          <Link
            to="/user-profile-and-settings"
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors duration-200 ${
              isActive('/user-profile-and-settings')
                ? 'text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon 
              name="User" 
              size={20} 
              className={`mb-1 ${isActive('/user-profile-and-settings') ? 'text-primary' : ''}`}
            />
            <span className="text-xs font-caption truncate">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Desktop Horizontal Navigation */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="flex items-center h-12 px-6">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item.tooltip}
              >
                <Icon 
                  name={item.icon} 
                  size={16} 
                  className={isActive(item.path) ? 'text-primary' : ''}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default PrimaryNavigation;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search-and-filter-results?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/interactive-map-dashboard" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="MapPin" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">TanzaTours</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="search"
                  placeholder="Search destinations, activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className="md:hidden"
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Language Toggle */}
            <Button variant="ghost" size="sm" className="hidden lg:flex">
              <Icon name="Globe" size={16} className="mr-1" />
              EN
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUserMenuToggle}
                className="relative"
              >
                <Icon name="User" size={20} />
              </Button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-50">
                  <Link
                    to="/user-profile-and-settings"
                    className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Profile & Settings
                  </Link>
                  <Link
                    to="/reviews-and-ratings-management"
                    className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="Star" size={16} className="mr-3" />
                    My Reviews
                  </Link>
                  <div className="border-t border-border my-2"></div>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors">
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex items-center h-16 px-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className="mr-2"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <Input
                type="search"
                placeholder="Search destinations, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                autoFocus
              />
            </form>
          </div>
          
          {/* Search Suggestions */}
          <div className="p-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">Recent Searches</div>
              <div className="space-y-2">
                <button className="flex items-center w-full p-3 text-left bg-muted rounded-lg hover:bg-accent/10 transition-colors">
                  <Icon name="Clock" size={16} className="mr-3 text-muted-foreground" />
                  <span className="text-sm">Cavite Historical Sites</span>
                </button>
                <button className="flex items-center w-full p-3 text-left bg-muted rounded-lg hover:bg-accent/10 transition-colors">
                  <Icon name="Clock" size={16} className="mr-3 text-muted-foreground" />
                  <span className="text-sm">Beach Resorts</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default GlobalHeader;
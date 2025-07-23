import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'distance', label: 'Distance', icon: 'MapPin' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'price_low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price_high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.label : 'Sort by';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="justify-between min-w-[140px]"
      >
        <span className="text-sm">{getCurrentSortLabel()}</span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="ml-2"
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors ${
                currentSort === option.value
                  ? 'bg-primary/10 text-primary' :'text-popover-foreground'
              }`}
            >
              <Icon 
                name={option.icon} 
                size={16} 
                className={`mr-3 ${
                  currentSort === option.value ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span>{option.label}</span>
              {currentSort === option.value && (
                <Icon name="Check" size={16} className="ml-auto text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
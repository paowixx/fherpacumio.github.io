import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterOverlay = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    priceRange: true,
    rating: true,
    accessibility: false,
    amenities: false
  });

  const categories = [
    { id: 'historical', label: 'Historical Sites', count: 12 },
    { id: 'beach', label: 'Beaches & Resorts', count: 8 },
    { id: 'restaurant', label: 'Restaurants', count: 24 },
    { id: 'cultural', label: 'Cultural Sites', count: 6 },
    { id: 'adventure', label: 'Adventure Activities', count: 15 },
    { id: 'nature', label: 'Nature Parks', count: 9 }
  ];

  const priceRanges = [
    { id: 'free', label: 'Free Entry', count: 18 },
    { id: 'budget', label: '₱1 - ₱100', count: 22 },
    { id: 'moderate', label: '₱101 - ₱500', count: 16 },
    { id: 'premium', label: '₱501+', count: 8 }
  ];

  const accessibilityFeatures = [
    { id: 'wheelchair', label: 'Wheelchair Accessible' },
    { id: 'parking', label: 'Accessible Parking' },
    { id: 'restroom', label: 'Accessible Restrooms' },
    { id: 'audio', label: 'Audio Guides Available' },
    { id: 'braille', label: 'Braille Signage' }
  ];

  const amenities = [
    { id: 'parking', label: 'Parking Available' },
    { id: 'wifi', label: 'Free WiFi' },
    { id: 'restaurant', label: 'On-site Restaurant' },
    { id: 'gift_shop', label: 'Gift Shop' },
    { id: 'guided_tours', label: 'Guided Tours' },
    { id: 'family_friendly', label: 'Family Friendly' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter(id => id !== categoryId)
    }));
  };

  const handlePriceRangeChange = (rangeId, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRanges: checked
        ? [...prev.priceRanges, rangeId]
        : prev.priceRanges.filter(id => id !== rangeId)
    }));
  };

  const handleRatingChange = (rating) => {
    setLocalFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };

  const handleAccessibilityChange = (featureId, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      accessibility: checked
        ? [...prev.accessibility, featureId]
        : prev.accessibility.filter(id => id !== featureId)
    }));
  };

  const handleAmenityChange = (amenityId, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter(id => id !== amenityId)
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      categories: [],
      priceRanges: [],
      minRating: 0,
      accessibility: [],
      amenities: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return localFilters.categories.length + 
           localFilters.priceRanges.length + 
           (localFilters.minRating > 0 ? 1 : 0) +
           localFilters.accessibility.length +
           localFilters.amenities.length;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Filters
            </h2>
          </div>
          
          <Button
            variant="ghost"
            onClick={handleClearAll}
            disabled={getActiveFilterCount() === 0}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-semibold text-foreground">Category</h3>
              <Icon 
                name={expandedSections.category ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSections.category && (
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <Checkbox
                      label={category.label}
                      checked={localFilters.categories.includes(category.id)}
                      onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                    />
                    <span className="text-sm text-muted-foreground">({category.count})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('priceRange')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-semibold text-foreground">Price Range</h3>
              <Icon 
                name={expandedSections.priceRange ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSections.priceRange && (
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center justify-between">
                    <Checkbox
                      label={range.label}
                      checked={localFilters.priceRanges.includes(range.id)}
                      onChange={(e) => handlePriceRangeChange(range.id, e.target.checked)}
                    />
                    <span className="text-sm text-muted-foreground">({range.count})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-semibold text-foreground">Minimum Rating</h3>
              <Icon 
                name={expandedSections.rating ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSections.rating && (
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                      localFilters.minRating === rating
                        ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <Icon
                          key={index}
                          name="Star"
                          size={16}
                          className={`${
                            index < rating
                              ? 'text-accent fill-current' :'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-foreground">& up</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('accessibility')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-semibold text-foreground">Accessibility</h3>
              <Icon 
                name={expandedSections.accessibility ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSections.accessibility && (
              <div className="space-y-3">
                {accessibilityFeatures.map((feature) => (
                  <Checkbox
                    key={feature.id}
                    label={feature.label}
                    checked={localFilters.accessibility.includes(feature.id)}
                    onChange={(e) => handleAccessibilityChange(feature.id, e.target.checked)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('amenities')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-semibold text-foreground">Amenities</h3>
              <Icon 
                name={expandedSections.amenities ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSections.amenities && (
              <div className="space-y-3">
                {amenities.map((amenity) => (
                  <Checkbox
                    key={amenity.id}
                    label={amenity.label}
                    checked={localFilters.amenities.includes(amenity.id)}
                    onChange={(e) => handleAmenityChange(amenity.id, e.target.checked)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleApplyFilters}
            className="flex-1"
          >
            Apply Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterOverlay;
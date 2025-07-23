import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryFilters = ({ 
  categories, 
  selectedCategories, 
  onCategoryToggle, 
  onClearFilters 
}) => {
  const categoryIcons = {
    'Historical': 'Landmark',
    'Beach': 'Waves',
    'Restaurant': 'UtensilsCrossed',
    'Cultural': 'Building2',
    'Nature': 'Trees',
    'Adventure': 'Mountain',
    'Shopping': 'ShoppingBag',
    'Entertainment': 'Music'
  };

  const categoryColors = {
    'Historical': 'bg-red-100 text-red-700 border-red-200',
    'Beach': 'bg-blue-100 text-blue-700 border-blue-200',
    'Restaurant': 'bg-green-100 text-green-700 border-green-200',
    'Cultural': 'bg-purple-100 text-purple-700 border-purple-200',
    'Nature': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Adventure': 'bg-orange-100 text-orange-700 border-orange-200',
    'Shopping': 'bg-pink-100 text-pink-700 border-pink-200',
    'Entertainment': 'bg-indigo-100 text-indigo-700 border-indigo-200'
  };

  const selectedCategoryColors = {
    'Historical': 'bg-red-500 text-white border-red-500',
    'Beach': 'bg-blue-500 text-white border-blue-500',
    'Restaurant': 'bg-green-500 text-white border-green-500',
    'Cultural': 'bg-purple-500 text-white border-purple-500',
    'Nature': 'bg-emerald-500 text-white border-emerald-500',
    'Adventure': 'bg-orange-500 text-white border-orange-500',
    'Shopping': 'bg-pink-500 text-white border-pink-500',
    'Entertainment': 'bg-indigo-500 text-white border-indigo-500'
  };

  return (
    <div className="bg-background border-b border-border">
      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex items-center space-x-3 px-4 py-3 overflow-x-auto scrollbar-hide">
          {/* Clear All Button */}
          {selectedCategories.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex-shrink-0 text-xs"
            >
              <Icon name="X" size={14} className="mr-1" />
              Clear
            </Button>
          )}

          {/* Category Chips */}
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            const colorClass = isSelected 
              ? selectedCategoryColors[category] || 'bg-primary text-primary-foreground border-primary'
              : categoryColors[category] || 'bg-muted text-muted-foreground border-border';

            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full border text-xs font-medium transition-all duration-200 flex-shrink-0 ${colorClass} hover:scale-105`}
              >
                <Icon 
                  name={categoryIcons[category] || 'MapPin'} 
                  size={14} 
                />
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:block p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Filter by Category</h3>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} className="mr-1" />
              Clear All ({selectedCategories.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            const colorClass = isSelected 
              ? selectedCategoryColors[category] || 'bg-primary text-primary-foreground border-primary'
              : categoryColors[category] || 'bg-muted text-muted-foreground border-border';

            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className={`flex items-center space-x-3 p-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:scale-105 ${colorClass}`}
              >
                <Icon 
                  name={categoryIcons[category] || 'MapPin'} 
                  size={18} 
                />
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filters Summary */}
        {selectedCategories.length > 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Showing {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilters;
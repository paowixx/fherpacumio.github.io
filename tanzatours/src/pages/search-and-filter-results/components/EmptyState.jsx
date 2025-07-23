import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ searchQuery, onClearFilters, hasActiveFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={48} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
        No destinations found
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {searchQuery 
          ? `We couldn't find any destinations matching "${searchQuery}". Try adjusting your search or filters.`
          : "No destinations match your current filters. Try adjusting your criteria to see more results."
        }
      </p>
      
      <div className="space-y-3">
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All Filters
          </Button>
        )}
        
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Historical Sites', 'Beaches', 'Restaurants', 'Cultural Sites'].map((suggestion) => (
              <button
                key={suggestion}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-accent/10 hover:text-accent transition-colors"
                onClick={() => window.location.href = `/search-and-filter-results?q=${encodeURIComponent(suggestion)}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReviewFilters = ({ 
  sortBy, 
  setSortBy, 
  filterRating, 
  setFilterRating, 
  showPhotosOnly, 
  setShowPhotosOnly,
  searchQuery,
  setSearchQuery 
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rated' },
    { value: 'lowest', label: 'Lowest Rated' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <input
          type="search"
          placeholder="Search reviews by destination or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />
        
        <Select
          label="Filter by rating"
          options={ratingOptions}
          value={filterRating}
          onChange={setFilterRating}
        />
        
        <div className="flex items-end">
          <Button
            variant={showPhotosOnly ? "default" : "outline"}
            onClick={() => setShowPhotosOnly(!showPhotosOnly)}
            iconName="Camera"
            iconPosition="left"
            className="w-full"
          >
            Photos Only
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Quick filters:</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSortBy('newest');
            setFilterRating('all');
            setShowPhotosOnly(false);
            setSearchQuery('');
          }}
          className="text-xs"
        >
          Clear All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilterRating('5')}
          className="text-xs"
        >
          5 Star Reviews
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPhotosOnly(true)}
          className="text-xs"
        >
          With Photos
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSortBy('helpful')}
          className="text-xs"
        >
          Most Helpful
        </Button>
      </div>
    </div>
  );
};

export default ReviewFilters;
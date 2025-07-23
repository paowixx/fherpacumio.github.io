import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchOverlay = ({ isOpen, onClose, onSearch, destinations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('tanzatours-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Filter suggestions based on search query
    if (searchQuery.trim() && destinations) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = destinations.filter(dest =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
        setSuggestions(filtered);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [searchQuery, destinations]);

  const handleSearch = (query) => {
    if (query.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        query,
        ...recentSearches.filter(item => item !== query)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('tanzatours-recent-searches', JSON.stringify(newRecentSearches));
      
      // Perform search
      onSearch(query);
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion.name);
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleAdvancedSearch = () => {
    navigate('/search-and-filter-results', { 
      state: { 
        initialQuery: searchQuery,
        fromMap: true 
      } 
    });
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('tanzatours-recent-searches');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden">
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="mr-2"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search destinations, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
          </div>
        </form>

        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchQuery('')}
            className="ml-2"
          >
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Search Suggestions */}
        {!isLoading && suggestions.length > 0 && (
          <div className="space-y-3 mb-6">
            <div className="text-sm font-medium text-muted-foreground">Suggestions</div>
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-start w-full p-3 text-left bg-card rounded-lg hover:bg-accent/10 transition-colors border border-border"
                >
                  <Icon name="MapPin" size={16} className="mr-3 mt-1 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-card-foreground truncate">{suggestion.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {suggestion.category} • {suggestion.location}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && searchQuery && suggestions.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <div className="text-lg font-medium text-foreground mb-2">No results found</div>
            <div className="text-muted-foreground mb-4">Try searching for destinations, activities, or events</div>
            <Button
              variant="outline"
              onClick={handleAdvancedSearch}
              iconName="SlidersHorizontal"
              iconPosition="left"
            >
              Advanced Search
            </Button>
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Recent Searches</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentSearches}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(query)}
                  className="flex items-center w-full p-3 text-left bg-muted rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <Icon name="Clock" size={16} className="mr-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-foreground truncate">{query}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Searches */}
        {!searchQuery && recentSearches.length === 0 && (
          <div className="space-y-3 mb-6">
            <div className="text-sm font-medium text-muted-foreground">Popular Searches</div>
            <div className="space-y-2">
              {['Historical Sites', 'Beach Resorts', 'Local Restaurants', 'Cultural Centers', 'Nature Parks'].map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(query)}
                  className="flex items-center w-full p-3 text-left bg-muted rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <Icon name="TrendingUp" size={16} className="mr-3 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{query}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground">Quick Actions</div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleAdvancedSearch}
              className="justify-start"
              iconName="SlidersHorizontal"
              iconPosition="left"
            >
              Advanced Search
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigate('/event-calendar-and-activities');
                onClose();
              }}
              className="justify-start"
              iconName="Calendar"
              iconPosition="left"
            >
              Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
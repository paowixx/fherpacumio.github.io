import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedDestinations = ({ destinations, currentDestinationId }) => {
  const filteredDestinations = destinations.filter(dest => dest.id !== currentDestinationId);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-accent fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-foreground">
          You Might Also Like
        </h2>
        <Link to="/search-and-filter-results">
          <Button variant="ghost" size="sm">
            <span className="text-primary">View All</span>
            <Icon name="ArrowRight" size={16} className="ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDestinations.slice(0, 4).map((destination) => (
          <Link
            key={destination.id}
            to={`/destination-detail-page?id=${destination.id}`}
            className="group block"
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200">
              {/* Image */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-3 right-3">
                  <div className="px-2 py-1 bg-black/50 text-white rounded text-xs font-medium">
                    {destination.category}
                  </div>
                </div>
                {destination.distance && (
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 text-white rounded text-xs">
                      <Icon name="MapPin" size={10} />
                      <span>{destination.distance}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    <span className="line-clamp-1">{destination.location}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(destination.rating)}
                    <span className="text-sm font-medium text-foreground ml-1">
                      {destination.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({destination.reviewCount})
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {destination.entryFee}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {destination.shortDescription}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {destination.features?.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {destination.features?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                      +{destination.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {destination.isOpen ? (
                      <div className="flex items-center space-x-1 text-success">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs font-medium">Open Now</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-error">
                        <div className="w-2 h-2 bg-error rounded-full"></div>
                        <span className="text-xs font-medium">Closed</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-primary group-hover:text-primary/80">
                    <span className="text-xs font-medium">Learn More</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-4">
        <Link to="/search-and-filter-results">
          <Button variant="outline" className="w-full md:w-auto">
            <Icon name="Search" size={16} className="mr-2" />
            Explore More Destinations
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedDestinations;
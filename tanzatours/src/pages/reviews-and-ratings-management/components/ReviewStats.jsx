import React from 'react';
import Icon from '../../../components/AppIcon';

const ReviewStats = ({ stats }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const getBarWidth = (count) => {
    const maxCount = Math.max(...Object.values(stats.ratingDistribution));
    return maxCount > 0 ? (count / maxCount) * 100 : 0;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="font-heading font-semibold text-card-foreground mb-4">Review Statistics</h3>
      
      {/* Overall Rating */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-card-foreground mb-2">
          {stats.averageRating.toFixed(1)}
        </div>
        <div className="flex items-center justify-center space-x-1 mb-2">
          {renderStars(Math.round(stats.averageRating))}
        </div>
        <div className="text-sm text-muted-foreground">
          Based on {stats.totalReviews.toLocaleString()} reviews
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground text-sm">Rating Distribution</h4>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 w-12">
              <span className="text-sm text-muted-foreground">{rating}</span>
              <Icon name="Star" size={12} className="text-accent fill-current" />
            </div>
            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${getBarWidth(stats.ratingDistribution[rating])}%` }}
              />
            </div>
            <div className="text-sm text-muted-foreground w-12 text-right">
              {stats.ratingDistribution[rating]}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {stats.reviewsWithPhotos}
          </div>
          <div className="text-xs text-muted-foreground">With Photos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary mb-1">
            {stats.verifiedReviews}
          </div>
          <div className="text-xs text-muted-foreground">Verified</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;
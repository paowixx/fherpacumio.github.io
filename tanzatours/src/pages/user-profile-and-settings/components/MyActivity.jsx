import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MyActivity = ({ activityData }) => {
  const [activeTab, setActiveTab] = useState('bookmarks');

  const tabs = [
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Bookmark' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'photos', label: 'Photos', icon: 'Camera' }
  ];

  const renderBookmarks = () => (
    <div className="space-y-4">
      {activityData.bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={bookmark.image}
              alt={bookmark.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-card-foreground truncate">{bookmark.name}</h4>
            <p className="text-sm text-muted-foreground">{bookmark.location}</p>
            <div className="flex items-center mt-1">
              <Icon name="Star" size={14} className="text-accent fill-current mr-1" />
              <span className="text-sm text-muted-foreground">{bookmark.rating}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View
            </Button>
            <Button variant="ghost" size="sm" iconName="BookmarkX">
              Remove
            </Button>
          </div>
        </div>
      ))}
      
      {activityData.bookmarks.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bookmark" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No bookmarks yet</p>
          <p className="text-sm text-muted-foreground">Start exploring and bookmark your favorite destinations</p>
        </div>
      )}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-4">
      {activityData.reviews.map((review) => (
        <div key={review.id} className="p-4 bg-muted rounded-lg">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-medium text-card-foreground">{review.destinationName}</h4>
              <div className="flex items-center mt-1">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={`${
                        i < review.rating ? 'text-accent fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
          </div>
          
          <p className="text-sm text-card-foreground mb-3">{review.comment}</p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Icon name="ThumbsUp" size={14} className="mr-1" />
                {review.likes}
              </span>
              <span className="flex items-center">
                <Icon name="MessageCircle" size={14} className="mr-1" />
                {review.replies}
              </span>
            </div>
            <Button variant="ghost" size="sm" iconName="Edit">
              Edit
            </Button>
          </div>
        </div>
      ))}
      
      {activityData.reviews.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Star" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No reviews yet</p>
          <p className="text-sm text-muted-foreground">Share your experiences by writing reviews</p>
        </div>
      )}
    </div>
  );

  const renderPhotos = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {activityData.photos.map((photo) => (
        <div key={photo.id} className="relative group">
          <div className="aspect-square rounded-lg overflow-hidden">
            <Image
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 rounded-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Icon name="Eye" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Icon name="Download" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
          
          {/* Caption */}
          <div className="mt-2">
            <p className="text-sm font-medium text-card-foreground truncate">{photo.destinationName}</p>
            <p className="text-xs text-muted-foreground">{photo.date}</p>
          </div>
        </div>
      ))}
      
      {activityData.photos.length === 0 && (
        <div className="col-span-full text-center py-8">
          <Icon name="Camera" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No photos uploaded yet</p>
          <p className="text-sm text-muted-foreground">Share your travel memories by uploading photos</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'bookmarks':
        return renderBookmarks();
      case 'reviews':
        return renderReviews();
      case 'photos':
        return renderPhotos();
      default:
        return renderBookmarks();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
        My Activity
      </h2>
      
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="min-h-[300px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default MyActivity;
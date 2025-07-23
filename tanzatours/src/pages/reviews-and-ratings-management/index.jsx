import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReviewCard from './components/ReviewCard';
import ReviewFilters from './components/ReviewFilters';
import ReviewStats from './components/ReviewStats';
import WriteReviewModal from './components/WriteReviewModal';

const ReviewsAndRatingsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId] = useState('current-user-id');

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userId: 'user-1',
      userName: 'Maria Santos',
      userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      destination: 'Corregidor Island',
      text: `Amazing historical experience! The island tour was incredibly informative and the guides were very knowledgeable about the WWII history. The malinta tunnel was fascinating and the views from the lighthouse are breathtaking. Definitely a must-visit for history buffs and anyone interested in Philippine heritage.`,
      date: '2025-01-15',
      visitDate: '2025-01-10',
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'
      ],
      helpfulCount: 24,
      isHelpful: false,
      isVerified: true,
      replies: [
        {
          id: 101,
          userName: 'Tourism Office',
          userAvatar: 'https://randomuser.me/api/portraits/men/10.jpg',
          text: 'Thank you for visiting Corregidor Island! We\'re glad you enjoyed the historical tour.',
          date: '2025-01-16'
        }
      ]
    },
    {
      id: 2,
      userId: 'current-user-id',
      userName: 'You',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4,
      destination: 'Tagaytay Ridge',
      text: `Great views of Taal Lake and Volcano! The weather was perfect and the cool breeze was very refreshing. There are plenty of restaurants with scenic views. The only downside was the heavy traffic getting there, but it's worth the trip for the panoramic views.`,
      date: '2025-01-12',visitDate: '2025-01-08',
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
      ],
      helpfulCount: 18,
      isHelpful: true,
      isVerified: true,
      replies: []
    },
    {
      id: 3,
      userId: 'user-3',userName: 'John Dela Cruz',userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',rating: 5,destination: 'Aguinaldo Shrine',
      text: `Rich in Philippine history! The museum displays are well-maintained and the guided tour was very educational. Learning about General Aguinaldo's life and the Philippine revolution was fascinating. The shrine itself is beautiful and the grounds are well-kept.`,
      date: '2025-01-10',
      visitDate: '2025-01-05',
      photos: [],
      helpfulCount: 15,
      isHelpful: false,
      isVerified: true,
      replies: []
    },
    {
      id: 4,
      userId: 'user-4',
      userName: 'Anna Reyes',
      userAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      rating: 3,
      destination: 'Ternate Beach',
      text: `Nice beach for a day trip but can get crowded on weekends. The water is clean and the sand is decent. There are several resorts and restaurants along the beach. Parking can be challenging during peak times. Good for families with kids.`,
      date: '2025-01-08',
      visitDate: '2025-01-03',
      photos: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
      ],
      helpfulCount: 12,
      isHelpful: false,
      isVerified: false,
      replies: []
    },
    {
      id: 5,
      userId: 'user-5',
      userName: 'Carlos Mendoza',
      userAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      rating: 4,
      destination: "People\'s Park in the Sky",
      text: `Stunning panoramic views of Taal Lake! The park is well-maintained and there are plenty of spots for photos. The cool mountain air is refreshing. There's a small entrance fee but it's worth it for the views. Best visited during clear weather for optimal visibility.`,
      date: '2025-01-06',
      visitDate: '2025-01-01',
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
      ],
      helpfulCount: 20,
      isHelpful: false,
      isVerified: true,
      replies: []
    },
    {
      id: 6,
      userId: 'user-6',
      userName: 'Lisa Garcia',
      userAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      rating: 2,
      destination: 'Sky Ranch Tagaytay',
      text: `Overpriced for what it offers. The rides are okay but nothing special. Very crowded and long queues for popular attractions. The view is nice but you can get better views elsewhere in Tagaytay for free. Food is expensive and average quality.`,
      date: '2025-01-04',
      visitDate: '2024-12-30',
      photos: [],
      helpfulCount: 8,
      isHelpful: false,
      isVerified: false,
      replies: [
        {
          id: 201,
          userName: 'Sky Ranch Management',
          userAvatar: 'https://randomuser.me/api/portraits/men/11.jpg',
          text: 'Thank you for your feedback. We\'re working on improving our services and managing crowd flow better.',
          date: '2025-01-05'
        }
      ]
    }
  ];

  // Mock stats data
  const mockStats = {
    totalReviews: 1247,
    averageRating: 4.2,
    ratingDistribution: {
      5: 523,
      4: 398,
      3: 201,
      2: 89,
      1: 36
    },
    reviewsWithPhotos: 687,
    verifiedReviews: 892
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...reviews];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(review =>
        review.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply rating filter
    if (filterRating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(filterRating));
    }

    // Apply photos filter
    if (showPhotosOnly) {
      filtered = filtered.filter(review => review.photos && review.photos.length > 0);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpfulCount - a.helpfulCount;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  }, [reviews, searchQuery, filterRating, showPhotosOnly, sortBy]);

  const handleWriteReview = () => {
    setEditingReview(null);
    setIsWriteModalOpen(true);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setIsWriteModalOpen(true);
  };

  const handleSubmitReview = (reviewData) => {
    if (editingReview) {
      // Update existing review
      setReviews(prev => prev.map(review => 
        review.id === editingReview.id ? { ...reviewData } : review
      ));
    } else {
      // Add new review
      setReviews(prev => [reviewData, ...prev]);
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    }
  };

  const handleHelpfulVote = (reviewId) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          isHelpful: !review.isHelpful,
          helpfulCount: review.isHelpful ? review.helpfulCount - 1 : review.helpfulCount + 1
        };
      }
      return review;
    }));
  };

  const handleReply = (reviewId, replyText) => {
    const newReply = {
      id: Date.now(),
      userName: 'You',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      text: replyText,
      date: new Date().toLocaleDateString()
    };

    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          replies: [...(review.replies || []), newReply]
        };
      }
      return review;
    }));
  };

  const handleReport = (reviewId) => {
    alert('Review has been reported for moderation. Thank you for helping maintain our community standards.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <div className="pt-28 md:pt-32 pb-20 md:pb-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Reviews & Ratings - TanzaTours</title>
        <meta name="description" content="Read and share reviews about tourist destinations in Tanza, Cavite. Help fellow travelers discover the best experiences." />
      </Helmet>

      <GlobalHeader />
      <PrimaryNavigation />

      <main className="pt-28 md:pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Reviews & Ratings
                </h1>
                <p className="text-muted-foreground">
                  Share your experiences and discover what others say about Tanza's attractions
                </p>
              </div>
              
              {/* Mobile Write Review Button */}
              <Button
                onClick={handleWriteReview}
                iconName="Plus"
                iconPosition="left"
                className="md:hidden"
              >
                Write
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <ReviewStats stats={mockStats} />
                
                {/* Write Review Button - Desktop */}
                <Button
                  onClick={handleWriteReview}
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                  className="mb-6"
                >
                  Write a Review
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <ReviewFilters
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterRating={filterRating}
                setFilterRating={setFilterRating}
                showPhotosOnly={showPhotosOnly}
                setShowPhotosOnly={setShowPhotosOnly}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* Mobile Stats */}
              <div className="lg:hidden mb-6">
                <ReviewStats stats={mockStats} />
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      currentUserId={currentUserId}
                      onHelpfulVote={handleHelpfulVote}
                      onReply={handleReply}
                      onReport={handleReport}
                      onEdit={handleEditReview}
                      onDelete={handleDeleteReview}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="MessageCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No reviews found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery || filterRating !== 'all' || showPhotosOnly ?'Try adjusting your filters to see more reviews' :'Be the first to share your experience!'}
                    </p>
                    <Button
                      onClick={handleWriteReview}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Write First Review
                    </Button>
                  </div>
                )}
              </div>

              {/* Load More Button */}
              {filteredReviews.length > 0 && filteredReviews.length >= 10 && (
                <div className="text-center mt-8">
                  <Button variant="outline">
                    Load More Reviews
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Write Review Button - Mobile */}
      <Button
        onClick={handleWriteReview}
        className="fixed bottom-20 right-4 z-40 md:hidden rounded-full w-14 h-14 shadow-elevation-3"
        size="icon"
      >
        <Icon name="Plus" size={24} />
      </Button>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => {
          setIsWriteModalOpen(false);
          setEditingReview(null);
        }}
        onSubmit={handleSubmitReview}
        editingReview={editingReview}
      />
    </div>
  );
};

export default ReviewsAndRatingsManagement;
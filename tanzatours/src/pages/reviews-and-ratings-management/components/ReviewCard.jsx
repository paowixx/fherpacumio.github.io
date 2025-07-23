import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewCard = ({ review, onHelpfulVote, onReply, onReport, onEdit, onDelete, currentUserId }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isOwnReview = currentUserId === review.userId;
  const truncatedText = review.text.length > 200 ? review.text.substring(0, 200) + '...' : review.text;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(review.id, replyText);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

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

  const nextImage = () => {
    if (review.photos && review.photos.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % review.photos.length);
    }
  };

  const prevImage = () => {
    if (review.photos && review.photos.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + review.photos.length) % review.photos.length);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={review.userAvatar}
              alt={review.userName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium text-card-foreground truncate">{review.userName}</h4>
              {review.isVerified && (
                <Icon name="CheckCircle" size={16} className="text-primary flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <Icon name="MapPin" size={12} className="inline mr-1" />
              {review.destination}
            </div>
          </div>
        </div>
        
        {/* Actions Menu */}
        <div className="flex items-center space-x-1">
          {isOwnReview && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(review)}
                className="h-8 w-8"
              >
                <Icon name="Edit2" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(review.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onReport(review.id)}
            className="h-8 w-8"
          >
            <Icon name="Flag" size={16} />
          </Button>
        </div>
      </div>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="relative mb-3">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <Image
              src={review.photos[currentImageIndex]}
              alt={`Review photo ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {review.photos.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
              
              {/* Photo indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {review.photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Review Text */}
      <div className="mb-3">
        <p className="text-card-foreground leading-relaxed">
          {showFullText ? review.text : truncatedText}
        </p>
        {review.text.length > 200 && (
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="text-primary text-sm font-medium mt-1 hover:underline"
          >
            {showFullText ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onHelpfulVote(review.id)}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              review.isHelpful ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="ThumbsUp" size={16} className={review.isHelpful ? 'fill-current' : ''} />
            <span>Helpful ({review.helpfulCount})</span>
          </button>
          
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="MessageCircle" size={16} />
            <span>Reply</span>
          </button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {review.visitDate && `Visited ${review.visitDate}`}
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-3 pt-3 border-t border-border">
          <div className="flex space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!replyText.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Replies */}
      {review.replies && review.replies.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border space-y-3">
          {review.replies.map((reply) => (
            <div key={reply.id} className="flex space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={reply.userAvatar}
                  alt={reply.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-foreground">{reply.userName}</span>
                    <span className="text-xs text-muted-foreground">{reply.date}</span>
                  </div>
                  <p className="text-sm text-foreground">{reply.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
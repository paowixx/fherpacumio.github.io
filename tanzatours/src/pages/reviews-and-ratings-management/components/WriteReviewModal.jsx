import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WriteReviewModal = ({ isOpen, onClose, onSubmit, editingReview = null }) => {
  const [rating, setRating] = useState(editingReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [destination, setDestination] = useState(editingReview?.destination || '');
  const [reviewText, setReviewText] = useState(editingReview?.text || '');
  const [visitDate, setVisitDate] = useState(editingReview?.visitDate || '');
  const [photos, setPhotos] = useState(editingReview?.photos || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxCharacters = 1000;
  const remainingCharacters = maxCharacters - reviewText.length;

  const destinationOptions = [
    { value: '', label: 'Select a destination' },
    { value: 'corregidor-island', label: 'Corregidor Island' },
    { value: 'tagaytay-ridge', label: 'Tagaytay Ridge' },
    { value: 'aguinaldo-shrine', label: 'Aguinaldo Shrine' },
    { value: 'ternate-beach', label: 'Ternate Beach' },
    { value: 'peoples-park', label: "People\'s Park in the Sky" },
    { value: 'taal-volcano', label: 'Taal Volcano Viewpoint' },
    { value: 'sky-ranch', label: 'Sky Ranch Tagaytay' },
    { value: 'picnic-grove', label: 'Picnic Grove' }
  ];

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 5) {
      alert('You can upload maximum 5 photos');
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotos(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !destination || !reviewText.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    const reviewData = {
      id: editingReview?.id || Date.now(),
      rating,
      destination: destinationOptions.find(opt => opt.value === destination)?.label || destination,
      text: reviewText.trim(),
      visitDate,
      photos,
      userName: 'Current User',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: editingReview?.date || new Date().toLocaleDateString(),
      helpfulCount: editingReview?.helpfulCount || 0,
      isHelpful: editingReview?.isHelpful || false,
      isVerified: true,
      userId: 'current-user-id'
    };

    try {
      await onSubmit(reviewData);
      onClose();
      // Reset form
      setRating(0);
      setDestination('');
      setReviewText('');
      setVisitDate('');
      setPhotos([]);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-background rounded-lg shadow-elevation-3 max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background border-b border-border">
              <h2 className="text-xl font-heading font-semibold text-foreground">
                {editingReview ? 'Edit Review' : 'Write a Review'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Rating <span className="text-destructive">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, index) => {
                    const starValue = index + 1;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={32}
                          className={
                            starValue <= (hoverRating || rating)
                              ? 'text-accent fill-current' :'text-muted-foreground'
                          }
                        />
                      </button>
                    );
                  })}
                  {rating > 0 && (
                    <span className="ml-3 text-sm text-muted-foreground">
                      {rating === 1 && 'Poor'}
                      {rating === 2 && 'Fair'}
                      {rating === 3 && 'Good'}
                      {rating === 4 && 'Very Good'}
                      {rating === 5 && 'Excellent'}
                    </span>
                  )}
                </div>
              </div>

              {/* Destination */}
              <Select
                label="Destination"
                options={destinationOptions}
                value={destination}
                onChange={setDestination}
                required
                searchable
              />

              {/* Visit Date */}
              <Input
                label="Visit Date"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                description="When did you visit this destination?"
              />

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Review <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience, what you liked, tips for other visitors..."
                  className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={6}
                  maxLength={maxCharacters}
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-muted-foreground">
                    Share details about your experience to help other travelers
                  </div>
                  <div className={`text-sm ${remainingCharacters < 50 ? 'text-warning' : 'text-muted-foreground'}`}>
                    {remainingCharacters} characters remaining
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Photos (Optional)
                </label>
                <div className="space-y-3">
                  {photos.length < 5 && (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Icon name="Camera" size={32} className="text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          Click to upload photos ({photos.length}/5)
                        </div>
                      </label>
                    </div>
                  )}

                  {/* Photo Preview */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                            <Image
                              src={photo}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="sticky bottom-0 bg-background border-t border-border p-6">
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  disabled={!rating || !destination || !reviewText.trim()}
                  className="flex-1"
                >
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewModal;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onEditProfile }) => {
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsImageLoading(true);
      // Mock image upload process
      setTimeout(() => {
        setIsImageLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {isImageLoading ? (
              <div className="w-full h-full bg-white/20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <Image
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {/* Camera Icon for Upload */}
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <Icon name="Camera" size={16} className="text-gray-600" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
            {user.name}
          </h1>
          <p className="text-white/80 mb-4">{user.email}</p>
          
          {/* Stats */}
          <div className="flex justify-center sm:justify-start space-x-6 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{user.stats.reviewsWritten}</div>
              <div className="text-sm text-white/80">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{user.stats.destinationsVisited}</div>
              <div className="text-sm text-white/80">Visited</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{user.stats.photosUploaded}</div>
              <div className="text-sm text-white/80">Photos</div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            variant="outline"
            onClick={onEditProfile}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
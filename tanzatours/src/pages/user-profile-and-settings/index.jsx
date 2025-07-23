import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import ProfileHeader from './components/ProfileHeader';
import AccountInformation from './components/AccountInformation';
import PreferencesSettings from './components/PreferencesSettings';
import PrivacyControls from './components/PrivacyControls';
import SecuritySettings from './components/SecuritySettings';
import MyActivity from './components/MyActivity';
import SettingsNavigation from './components/SettingsNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserProfileAndSettings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 917 123 4567",
    location: "Tanza, Cavite",
    bio: "Travel enthusiast exploring the beautiful destinations of Cavite. Love discovering hidden gems and sharing experiences with fellow travelers.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    stats: {
      reviewsWritten: 24,
      destinationsVisited: 18,
      photosUploaded: 156
    }
  };

  // Mock preferences data
  const mockPreferences = {
    language: 'en',
    currency: 'PHP',
    distanceUnit: 'km',
    notifications: {
      eventAlerts: true,
      reviewResponses: true,
      promotional: false,
      email: true,
      push: true
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reduceMotion: false,
      screenReader: false
    }
  };

  // Mock privacy settings
  const mockPrivacySettings = {
    profileVisibility: 'public',
    reviewVisibility: 'public',
    showRealNameOnReviews: true,
    allowReviewComments: true,
    trackVisitHistory: true,
    shareActivityStatus: false,
    locationServices: true,
    analyticsTracking: true,
    personalizedRecommendations: true,
    marketingCommunications: false
  };

  // Mock activity data
  const mockActivityData = {
    bookmarks: [
      {
        id: 1,
        name: "Corregidor Island",
        location: "Cavite",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "Tagaytay Ridge",
        location: "Tagaytay, Cavite",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "Aguinaldo Shrine",
        location: "Kawit, Cavite",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
      }
    ],
    reviews: [
      {
        id: 1,
        destinationName: "Corregidor Island",
        rating: 5,
        comment: "Amazing historical site with breathtaking views! The guided tour was very informative and the ferry ride was comfortable. Highly recommend visiting during sunset for the best experience.",
        date: "2 days ago",
        likes: 12,
        replies: 3
      },
      {
        id: 2,
        destinationName: "Tagaytay Ridge",
        rating: 4,
        comment: "Beautiful scenery and cool weather. Perfect for a weekend getaway. The local restaurants serve delicious bulalo and the view of Taal Lake is spectacular.",
        date: "1 week ago",
        likes: 8,
        replies: 1
      }
    ],
    photos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        caption: "Sunset at Corregidor",
        destinationName: "Corregidor Island",
        date: "2 days ago"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
        caption: "Taal Lake View",
        destinationName: "Tagaytay Ridge",
        date: "1 week ago"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
        caption: "Historical Architecture",
        destinationName: "Aguinaldo Shrine",
        date: "2 weeks ago"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
        caption: "Nature Trail",
        destinationName: "Mt. Pico de Loro",
        date: "3 weeks ago"
      }
    ]
  };

  // Load language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('tanzatours-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleEditProfile = () => {
    setActiveSection('account');
  };

  const handleSaveAccount = async (accountData) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Account data saved:', accountData);
        resolve();
      }, 1000);
    });
  };

  const handleSavePreferences = async (preferences) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Preferences saved:', preferences);
        if (preferences.language !== currentLanguage) {
          setCurrentLanguage(preferences.language);
        }
        resolve();
      }, 1000);
    });
  };

  const handleSavePrivacy = async (privacySettings) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Privacy settings saved:', privacySettings);
        resolve();
      }, 1000);
    });
  };

  const handleSaveSecurity = async (securityData) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Security settings saved:', securityData);
        resolve();
      }, 1000);
    });
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    // Clear user session and redirect
    localStorage.removeItem('tanzatours-user');
    window.location.href = '/interactive-map-dashboard';
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <AccountInformation
            user={mockUser}
            onSave={handleSaveAccount}
          />
        );
      case 'preferences':
        return (
          <PreferencesSettings
            preferences={mockPreferences}
            onSave={handleSavePreferences}
          />
        );
      case 'privacy':
        return (
          <PrivacyControls
            privacySettings={mockPrivacySettings}
            onSave={handleSavePrivacy}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            onSave={handleSaveSecurity}
          />
        );
      case 'activity':
        return (
          <MyActivity
            activityData={mockActivityData}
          />
        );
      default:
        return (
          <AccountInformation
            user={mockUser}
            onSave={handleSaveAccount}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryNavigation />
      
      {/* Main Content */}
      <main className="pt-28 md:pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Profile Header */}
          <ProfileHeader
            user={mockUser}
            onEditProfile={handleEditProfile}
          />

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Sidebar - Settings Navigation */}
            <div className="lg:col-span-3">
              <div className="sticky top-36">
                <SettingsNavigation
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
                
                {/* Logout Button */}
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full text-destructive border-destructive hover:bg-destructive hover:text-white"
                    iconName="LogOut"
                    iconPosition="left"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-9">
              {renderActiveSection()}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Settings Navigation */}
            <div className="mb-6">
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {[
                  { id: 'account', label: 'Account', icon: 'User' },
                  { id: 'preferences', label: 'Preferences', icon: 'Settings' },
                  { id: 'privacy', label: 'Privacy', icon: 'Shield' },
                  { id: 'security', label: 'Security', icon: 'Lock' },
                  { id: 'activity', label: 'Activity', icon: 'Activity' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary text-white' :'bg-card text-card-foreground border border-border'
                    }`}
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Content */}
            {renderActiveSection()}

            {/* Mobile Logout Button */}
            <div className="mt-8">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-white"
                iconName="LogOut"
                iconPosition="left"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-elevation-3 max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <Icon name="LogOut" size={24} className="text-destructive mr-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Sign Out
              </h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="destructive"
                onClick={confirmLogout}
                className="flex-1"
              >
                Sign Out
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileAndSettings;
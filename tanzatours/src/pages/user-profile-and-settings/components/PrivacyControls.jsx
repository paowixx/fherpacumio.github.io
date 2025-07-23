import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PrivacyControls = ({ privacySettings, onSave }) => {
  const [settings, setSettings] = useState(privacySettings);
  const [isSaving, setIsSaving] = useState(false);

  const profileVisibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
    { value: 'friends', label: 'Friends Only', description: 'Only your connections can view' },
    { value: 'private', label: 'Private', description: 'Only you can view your profile' }
  ];

  const reviewVisibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see your reviews' },
    { value: 'registered', label: 'Registered Users', description: 'Only logged-in users can see' },
    { value: 'private', label: 'Private', description: 'Hide your reviews from others' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckboxChange = (key, checked) => {
    setSettings(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(settings);
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="Eye" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Profile Visibility
          </h3>
        </div>
        
        <Select
          label="Who can view your profile?"
          description="Control who can see your profile information"
          options={profileVisibilityOptions}
          value={settings.profileVisibility}
          onChange={(value) => handleSettingChange('profileVisibility', value)}
        />
      </div>

      {/* Review Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="Star" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Review Settings
          </h3>
        </div>
        
        <div className="space-y-4">
          <Select
            label="Review Visibility"
            description="Control who can see your reviews and ratings"
            options={reviewVisibilityOptions}
            value={settings.reviewVisibility}
            onChange={(value) => handleSettingChange('reviewVisibility', value)}
          />

          <Checkbox
            label="Show Real Name on Reviews"
            description="Display your full name instead of username on reviews"
            checked={settings.showRealNameOnReviews}
            onChange={(e) => handleCheckboxChange('showRealNameOnReviews', e.target.checked)}
          />

          <Checkbox
            label="Allow Review Comments"
            description="Let others comment on your reviews"
            checked={settings.allowReviewComments}
            onChange={(e) => handleCheckboxChange('allowReviewComments', e.target.checked)}
          />
        </div>
      </div>

      {/* Activity Tracking */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="Activity" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Activity Tracking
          </h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Track Visit History"
            description="Save your visited destinations for recommendations"
            checked={settings.trackVisitHistory}
            onChange={(e) => handleCheckboxChange('trackVisitHistory', e.target.checked)}
          />

          <Checkbox
            label="Share Activity Status"
            description="Show when you're currently visiting a destination"
            checked={settings.shareActivityStatus}
            onChange={(e) => handleCheckboxChange('shareActivityStatus', e.target.checked)}
          />

          <Checkbox
            label="Location Services"
            description="Use your location for personalized recommendations"
            checked={settings.locationServices}
            onChange={(e) => handleCheckboxChange('locationServices', e.target.checked)}
          />
        </div>
      </div>

      {/* Data & Analytics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Data & Analytics
          </h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Analytics Tracking"
            description="Help improve the app by sharing anonymous usage data"
            checked={settings.analyticsTracking}
            onChange={(e) => handleCheckboxChange('analyticsTracking', e.target.checked)}
          />

          <Checkbox
            label="Personalized Recommendations"
            description="Use your activity to suggest relevant destinations"
            checked={settings.personalizedRecommendations}
            onChange={(e) => handleCheckboxChange('personalizedRecommendations', e.target.checked)}
          />

          <Checkbox
            label="Marketing Communications"
            description="Receive targeted offers based on your interests"
            checked={settings.marketingCommunications}
            onChange={(e) => handleCheckboxChange('marketingCommunications', e.target.checked)}
          />
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="Database" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Data Management
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="font-medium text-card-foreground">Download Your Data</div>
              <div className="text-sm text-muted-foreground">
                Get a copy of all your data including reviews, photos, and activity
              </div>
            </div>
            <Button variant="outline" size="sm" iconName="Download">
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div>
              <div className="font-medium text-destructive">Delete Account</div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </div>
            </div>
            <Button variant="destructive" size="sm" iconName="Trash2">
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Shield"
          iconPosition="left"
        >
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default PrivacyControls;
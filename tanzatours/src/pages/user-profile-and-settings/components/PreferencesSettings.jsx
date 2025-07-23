import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PreferencesSettings = ({ preferences, onSave }) => {
  const [settings, setSettings] = useState(preferences);
  const [isSaving, setIsSaving] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fil', label: 'Filipino' }
  ];

  const currencyOptions = [
    { value: 'PHP', label: 'Philippine Peso (₱)' },
    { value: 'USD', label: 'US Dollar ($)' }
  ];

  const distanceUnitOptions = [
    { value: 'km', label: 'Kilometers' },
    { value: 'mi', label: 'Miles' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationChange = (key, checked) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked
      }
    }));
  };

  const handleAccessibilityChange = (key, checked) => {
    setSettings(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [key]: checked
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(settings);
      // Update localStorage for language preference
      localStorage.setItem('tanzatours-language', settings.language);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Language & Region */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-card-foreground mb-4">
          Language & Region
        </h3>
        
        <div className="space-y-4">
          <Select
            label="Language"
            options={languageOptions}
            value={settings.language}
            onChange={(value) => handleSettingChange('language', value)}
          />

          <Select
            label="Currency"
            options={currencyOptions}
            value={settings.currency}
            onChange={(value) => handleSettingChange('currency', value)}
          />

          <Select
            label="Distance Unit"
            options={distanceUnitOptions}
            value={settings.distanceUnit}
            onChange={(value) => handleSettingChange('distanceUnit', value)}
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="Bell" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Notification Preferences
          </h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Event Alerts"
            description="Get notified about upcoming events and festivals"
            checked={settings.notifications.eventAlerts}
            onChange={(e) => handleNotificationChange('eventAlerts', e.target.checked)}
          />

          <Checkbox
            label="Review Responses"
            description="Notifications when someone responds to your reviews"
            checked={settings.notifications.reviewResponses}
            onChange={(e) => handleNotificationChange('reviewResponses', e.target.checked)}
          />

          <Checkbox
            label="Promotional Communications"
            description="Receive updates about new destinations and offers"
            checked={settings.notifications.promotional}
            onChange={(e) => handleNotificationChange('promotional', e.target.checked)}
          />

          <Checkbox
            label="Email Notifications"
            description="Receive notifications via email"
            checked={settings.notifications.email}
            onChange={(e) => handleNotificationChange('email', e.target.checked)}
          />

          <Checkbox
            label="Push Notifications"
            description="Receive push notifications on your device"
            checked={settings.notifications.push}
            onChange={(e) => handleNotificationChange('push', e.target.checked)}
          />
        </div>
      </div>

      {/* Accessibility Options */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="Accessibility" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Accessibility Options
          </h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="High Contrast Mode"
            description="Increase contrast for better visibility"
            checked={settings.accessibility.highContrast}
            onChange={(e) => handleAccessibilityChange('highContrast', e.target.checked)}
          />

          <Checkbox
            label="Large Text"
            description="Increase text size throughout the app"
            checked={settings.accessibility.largeText}
            onChange={(e) => handleAccessibilityChange('largeText', e.target.checked)}
          />

          <Checkbox
            label="Reduce Motion"
            description="Minimize animations and transitions"
            checked={settings.accessibility.reduceMotion}
            onChange={(e) => handleAccessibilityChange('reduceMotion', e.target.checked)}
          />

          <Checkbox
            label="Screen Reader Support"
            description="Enhanced compatibility with screen readers"
            checked={settings.accessibility.screenReader}
            onChange={(e) => handleAccessibilityChange('screenReader', e.target.checked)}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PreferencesSettings;
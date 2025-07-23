import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsNavigation = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    {
      id: 'account',
      label: 'Account Information',
      icon: 'User',
      description: 'Personal details and contact info'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      description: 'Language, notifications, and accessibility'
    },
    {
      id: 'privacy',
      label: 'Privacy Controls',
      icon: 'Shield',
      description: 'Profile visibility and data settings'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Lock',
      description: 'Password and authentication settings'
    },
    {
      id: 'activity',
      label: 'My Activity',
      icon: 'Activity',
      description: 'Bookmarks, reviews, and photos'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-heading font-semibold text-card-foreground mb-4">Settings</h3>
      
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors ${
              activeSection === item.id
                ? 'bg-primary/10 text-primary border border-primary/20' :'hover:bg-muted text-card-foreground'
            }`}
          >
            <Icon 
              name={item.icon} 
              size={20} 
              className={`mt-0.5 flex-shrink-0 ${
                activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {item.description}
              </div>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SettingsNavigation;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const FloatingActionButton = ({ onPlanRoute, onBookGuide, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const actions = [
    {
      icon: 'Navigation',
      label: 'Get Directions',
      onClick: onPlanRoute,
      color: 'bg-primary text-primary-foreground'
    },
    {
      icon: 'Users',
      label: 'Book Guide',
      onClick: onBookGuide,
      color: 'bg-secondary text-secondary-foreground'
    },
    {
      icon: 'Share',
      label: 'Share',
      onClick: onShare,
      color: 'bg-accent text-accent-foreground'
    }
  ];

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
      <div className="flex flex-col items-end space-y-3">
        {/* Action Buttons */}
        {isExpanded && (
          <div className="flex flex-col space-y-2 animate-in slide-in-from-bottom-2 duration-200">
            {actions.map((action, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-elevation-2">
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {action.label}
                  </span>
                </div>
                <button
                  onClick={() => {
                    action.onClick();
                    setIsExpanded(false);
                  }}
                  className={`w-12 h-12 rounded-full ${action.color} shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 flex items-center justify-center`}
                >
                  <Icon name={action.icon} size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={toggleExpanded}
          className={`w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-200 flex items-center justify-center ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <Icon name={isExpanded ? 'X' : 'Plus'} size={24} />
        </button>
      </div>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;
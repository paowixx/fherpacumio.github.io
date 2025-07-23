import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const DestinationInfo = ({ destination }) => {
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    hours: false,
    amenities: false,
    tips: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, icon, section, children }) => (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name={icon} size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">{title}</h3>
        </div>
        <Icon 
          name={expandedSections[section] ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {expandedSections[section] && (
        <div className="p-4 border-t border-border bg-background">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Description */}
      <SectionHeader title="About This Place" icon="Info" section="description">
        <p className="text-muted-foreground leading-relaxed">
          {destination.description}
        </p>
        {destination.highlights && (
          <div className="mt-4">
            <h4 className="font-medium text-foreground mb-2">Highlights</h4>
            <ul className="space-y-1">
              {destination.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SectionHeader>

      {/* Operating Hours */}
      <SectionHeader title="Operating Hours" icon="Clock" section="hours">
        <div className="space-y-3">
          {destination.operatingHours?.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground">{schedule.day}</span>
              <span className="font-data text-foreground">{schedule.time}</span>
            </div>
          ))}
          {destination.specialHours && (
            <div className="mt-4 p-3 bg-accent/10 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-accent">Special Hours</div>
                  <div className="text-sm text-muted-foreground">{destination.specialHours}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionHeader>

      {/* Amenities & Facilities */}
      <SectionHeader title="Amenities & Facilities" icon="Wifi" section="amenities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {destination.amenities?.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-foreground">{amenity}</span>
            </div>
          ))}
        </div>
        {destination.accessibility && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Heart" size={16} className="text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-secondary">Accessibility Features</div>
                <div className="text-sm text-muted-foreground">{destination.accessibility}</div>
              </div>
            </div>
          </div>
        )}
      </SectionHeader>

      {/* Travel Tips */}
      <SectionHeader title="Travel Tips & Guidelines" icon="Lightbulb" section="tips">
        <div className="space-y-4">
          {destination.travelTips?.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{tip}</span>
            </div>
          ))}
          {destination.warnings && (
            <div className="p-3 bg-error/10 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-error">Important Notice</div>
                  <div className="text-sm text-muted-foreground">{destination.warnings}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionHeader>

      {/* Contact Information */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Phone" size={20} className="text-primary mr-2" />
          Contact Information
        </h3>
        <div className="space-y-3">
          {destination.phone && (
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <a 
                href={`tel:${destination.phone}`}
                className="text-sm text-primary hover:underline font-data"
              >
                {destination.phone}
              </a>
            </div>
          )}
          {destination.email && (
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <a 
                href={`mailto:${destination.email}`}
                className="text-sm text-primary hover:underline"
              >
                {destination.email}
              </a>
            </div>
          )}
          {destination.website && (
            <div className="flex items-center space-x-3">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <a 
                href={destination.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationInfo;
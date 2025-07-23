import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AccountInformation = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    bio: user.bio
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: user.bio
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Account Information
        </h2>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          disabled={!isEditing}
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={!isEditing}
          error={errors.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={!isEditing}
          error={errors.phone}
          placeholder="+63 9XX XXX XXXX"
        />

        <Input
          label="Location"
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          disabled={!isEditing}
          placeholder="City, Province"
        />

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={!isEditing}
            rows={3}
            className={`w-full px-3 py-2 border border-border rounded-lg text-sm ${
              isEditing 
                ? 'bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent' 
                : 'bg-muted text-muted-foreground'
            }`}
            placeholder="Tell us about yourself..."
          />
        </div>

        {isEditing && (
          <div className="flex space-x-3 pt-4">
            <Button
              variant="default"
              onClick={handleSave}
              loading={isSaving}
              iconName="Check"
              iconPosition="left"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInformation;
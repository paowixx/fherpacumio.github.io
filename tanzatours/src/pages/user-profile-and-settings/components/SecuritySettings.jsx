import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettings = ({ onSave }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
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

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;
    
    setIsChangingPassword(true);
    try {
      await onSave({
        type: 'password',
        data: passwordForm
      });
      
      // Reset form on success
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setErrors({ submit: 'Failed to change password. Please try again.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleTwoFactorToggle = async (enabled) => {
    try {
      await onSave({
        type: 'twoFactor',
        data: { enabled }
      });
      setTwoFactorEnabled(enabled);
    } catch (error) {
      console.error('Failed to update two-factor authentication:', error);
    }
  };

  const handleLoginAlertsToggle = async (enabled) => {
    try {
      await onSave({
        type: 'loginAlerts',
        data: { enabled }
      });
      setLoginAlerts(enabled);
    } catch (error) {
      console.error('Failed to update login alerts:', error);
    }
  };

  const mockLoginSessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Manila, Philippines",
      lastActive: "2 hours ago",
      current: true
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Tanza, Cavite",
      lastActive: "1 day ago",
      current: false
    },
    {
      id: 3,
      device: "Firefox on Android",
      location: "Quezon City, Philippines",
      lastActive: "3 days ago",
      current: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="Lock" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Change Password
          </h3>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
            error={errors.currentPassword}
            required
          />

          <Input
            label="New Password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
            error={errors.newPassword}
            description="Must be at least 8 characters with uppercase, lowercase, and number"
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
          />

          {errors.submit && (
            <div className="text-sm text-destructive">{errors.submit}</div>
          )}

          <Button
            type="submit"
            variant="default"
            loading={isChangingPassword}
            iconName="Key"
            iconPosition="left"
          >
            Change Password
          </Button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Two-Factor Authentication
          </h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            checked={twoFactorEnabled}
            onChange={(e) => handleTwoFactorToggle(e.target.checked)}
          />

          {twoFactorEnabled && (
            <div className="ml-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-card-foreground">Authenticator App</div>
                  <div className="text-sm text-muted-foreground">
                    Use Google Authenticator or similar app
                  </div>
                </div>
                <Button variant="outline" size="sm" iconName="Settings">
                  Configure
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login Alerts */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="AlertTriangle" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Login Alerts
          </h3>
        </div>
        
        <Checkbox
          label="Email me about suspicious login attempts"
          description="Get notified when someone tries to access your account from a new device"
          checked={loginAlerts}
          onChange={(e) => handleLoginAlertsToggle(e.target.checked)}
        />
      </div>

      {/* Active Sessions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon name="Monitor" size={20} className="mr-2 text-primary" />
            <h3 className="text-lg font-heading font-semibold text-card-foreground">
              Active Sessions
            </h3>
          </div>
          <Button variant="outline" size="sm" iconName="LogOut">
            Sign Out All
          </Button>
        </div>
        
        <div className="space-y-4">
          {mockLoginSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Monitor" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-card-foreground flex items-center">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              
              {!session.current && (
                <Button variant="ghost" size="sm" iconName="X">
                  End Session
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Account Recovery */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center mb-4">
          <Icon name="LifeBuoy" size={20} className="mr-2 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground">
            Account Recovery
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="font-medium text-card-foreground">Recovery Email</div>
              <div className="text-sm text-muted-foreground">
                Used to recover your account if you forget your password
              </div>
            </div>
            <Button variant="outline" size="sm" iconName="Mail">
              Update
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="font-medium text-card-foreground">Backup Codes</div>
              <div className="text-sm text-muted-foreground">
                Generate backup codes for account recovery
              </div>
            </div>
            <Button variant="outline" size="sm" iconName="Download">
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
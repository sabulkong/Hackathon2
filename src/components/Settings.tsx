import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  MessageSquare, 
  Bell, 
  Users,
  CreditCard,
  Shield,
  Globe,
  Smartphone,
  Save,
  CheckCircle
} from 'lucide-react';
import { apiService, Settings } from '../services/api';
import { useNotifications } from '../hooks/useNotifications';
import toast from 'react-hot-toast';

const SettingsPanel = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { settings: notificationSettings, updateSettings: updateNotificationSettings } = useNotifications();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSettings();
      setSettings(data);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (updatedSettings: Partial<Settings>) => {
    if (!settings) return;
    
    try {
      setSaving(true);
      const newSettings = await apiService.updateSettings(updatedSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Settings, value: any) => {
    if (!settings) return;
    setSettings(prev => prev ? { ...prev, [field]: value } : null);
  };

  const settingSections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'members', label: 'Member Settings', icon: Users },
    { id: 'payments', label: 'Payment Settings', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  if (loading || !settings) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your chama bot configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <nav className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="space-y-2">
              {settingSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chama Name</label>
                  <input
                    type="text"
                    value={settings.chamaName}
                    onChange={(e) => handleInputChange('chamaName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Contribution Amount</label>
                  <input
                    type="number"
                    value={settings.defaultContribution}
                    onChange={(e) => handleInputChange('defaultContribution', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Due Day</label>
                  <select 
                    value={settings.paymentDueDay}
                    onChange={(e) => handleInputChange('paymentDueDay', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={15}>15th of every month</option>
                    <option value={1}>1st of every month</option>
                    <option value={30}>Last day of every month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select 
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="KES">Kenyan Shilling (KES)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="UGX">Ugandan Shilling (UGX)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                  <select 
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Africa/Nairobi">East Africa Time (EAT)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'whatsapp' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">WhatsApp Configuration</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">WhatsApp Business API Status</h4>
                </div>
                <p className="text-sm text-blue-700 mt-2">Connected and ready to send messages</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Display Name</label>
                  <input
                    type="text"
                    value={settings.whatsappBusinessName}
                    onChange={(e) => handleInputChange('whatsappBusinessName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                  <textarea
                    rows={3}
                    value={settings.welcomeMessage}
                    onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="auto-response"
                    checked={settings.autoResponse}
                    onChange={(e) => handleInputChange('autoResponse', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="auto-response" className="text-sm font-medium text-gray-700">
                    Enable automatic responses to member queries
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="read-receipts"
                    checked={settings.readReceipts}
                    onChange={(e) => handleInputChange('readReceipts', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="read-receipts" className="text-sm font-medium text-gray-700">
                    Send read receipts
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Reminders</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Send reminder 3 days before due date</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.paymentReminders}
                        onChange={(e) => updateNotificationSettings({ paymentReminders: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Send overdue notices</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.overdueAlerts}
                        onChange={(e) => updateNotificationSettings({ overdueAlerts: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Admin Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">New payment received</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.newPayments}
                        onChange={(e) => updateNotificationSettings({ newPayments: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Daily summary reports</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.dailySummary}
                        onChange={(e) => updateNotificationSettings({ dailySummary: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Weekly collection reports</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklySummary}
                        onChange={(e) => updateNotificationSettings({ weeklySummary: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Payment Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">M-Pesa Business Number</label>
                  <input
                    type="text"
                    value={settings.mpesaBusinessNumber}
                    onChange={(e) => handleInputChange('mpesaBusinessNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Details</label>
                  <textarea
                    rows={3}
                    value={settings.bankAccountDetails}
                    onChange={(e) => handleInputChange('bankAccountDetails', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button 
              onClick={() => handleSaveSettings(settings)}
              disabled={saving}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
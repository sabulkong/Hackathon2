import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  Clock,
  Plus,
  Edit,
  Trash2,
  Send,
  Users,
  CheckCircle,
  Save,
  X,
  Play,
  Pause
} from 'lucide-react';
import { apiService, Reminder, Member } from '../services/api';
import { useNotifications } from '../hooks/useNotifications';
import toast from 'react-hot-toast';

const Reminders = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [loading, setLoading] = useState(true);
  const { requestPermission, isEnabled, scheduleReminder } = useNotifications();
  
  const [formData, setFormData] = useState({
    name: '',
    template: '',
    frequency: 'monthly' as 'weekly' | 'monthly' | 'once',
    sendTime: '09:00'
  });

  const [sentReminders] = useState([
    {
      id: 1,
      recipient: 'Jane Wanjiku',
      message: 'Hi Jane, your monthly contribution of KES 5,000 is due on 2024-01-15...',
      sentDate: '2024-01-12 10:30 AM',
      status: 'delivered',
      response: 'Payment made'
    },
    {
      id: 2,
      recipient: 'Peter Kimani',
      message: 'Dear Peter, your payment of KES 5,000 is now overdue...',
      sentDate: '2024-01-16 09:00 AM',
      status: 'delivered',
      response: 'Pending'
    }
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [remindersData, membersData] = await Promise.all([
        apiService.getReminders(),
        apiService.getMembers()
      ]);
      setReminders(remindersData);
      setMembers(membersData);
    } catch (error) {
      toast.error('Failed to load reminder data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newReminder = await apiService.createReminder({
        ...formData,
        nextSend: new Date().toISOString().split('T')[0],
        recipients: members.length,
        status: 'active'
      });
      
      setReminders(prev => [...prev, newReminder]);
      setShowReminderModal(false);
      setFormData({
        name: '',
        template: '',
        frequency: 'monthly',
        sendTime: '09:00'
      });
    } catch (error) {
      console.error('Error creating reminder:', error);
    }
  };

  const handleSendReminder = async (reminderId: string) => {
    try {
      await apiService.sendReminder(reminderId);
      
      // Send WhatsApp messages to all members
      const reminder = reminders.find(r => r.id === reminderId);
      if (reminder) {
        const memberIds = members.map(m => m.id);
        await apiService.sendBulkReminders(memberIds, reminder.template);
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
    }
  };

  const handleToggleReminderStatus = (reminderId: string) => {
    setReminders(prev => prev.map(r => 
      r.id === reminderId 
        ? { ...r, status: r.status === 'active' ? 'paused' : 'active' }
        : r
    ));
    toast.success('Reminder status updated!');
  };

  const handleDeleteReminder = (reminderId: string) => {
    if (!confirm('Are you sure you want to delete this reminder?')) return;
    
    setReminders(prev => prev.filter(r => r.id !== reminderId));
    toast.success('Reminder deleted successfully!');
  };

  const handleEnableNotifications = async () => {
    await requestPermission();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'paused':
        return 'bg-amber-100 text-amber-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reminders</h2>
          <p className="text-gray-600">Manage automated payment reminders</p>
        </div>
        <div className="flex items-center space-x-3">
          {!isEnabled && (
            <button
              onClick={handleEnableNotifications}
              className="flex items-center space-x-2 text-amber-600 border border-amber-200 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>Enable Notifications</span>
            </button>
          )}
          <button
            onClick={() => setShowReminderModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create Reminder</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{reminders.filter(r => r.status === 'active').length}</p>
          <p className="text-sm text-gray-600">Active Reminders</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">18</p>
          <p className="text-sm text-gray-600">Sent This Week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">85%</p>
          <p className="text-sm text-gray-600">Response Rate</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">6</p>
          <p className="text-sm text-gray-600">Pending Responses</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'scheduled'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Scheduled Reminders
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sent'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sent Reminders
          </button>
        </nav>
      </div>

      {/* Scheduled Reminders Tab */}
      {activeTab === 'scheduled' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Reminders</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{reminder.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                          {reminder.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-3 rounded-lg">
                        {reminder.template}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Frequency: {reminder.frequency}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Next: {reminder.nextSend}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{reminder.recipients} recipients</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleToggleReminderStatus(reminder.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        reminder.status === 'active' 
                          ? 'text-amber-600 hover:bg-amber-50' 
                          : 'text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {reminder.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleSendReminder(reminder.id)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sent Reminders Tab */}
      {activeTab === 'sent' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Recipient</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Message</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Sent Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sentReminders.map((reminder) => (
                  <tr key={reminder.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{reminder.recipient}</p>
                    </td>
                    <td className="py-4 px-6 max-w-xs">
                      <p className="text-sm text-gray-600 truncate">{reminder.message}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">{reminder.sentDate}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                        {reminder.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-600">{reminder.response}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Reminder</h3>
              <button
                onClick={() => setShowReminderModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateReminder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Monthly Payment Reminder"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Template</label>
                <textarea
                  rows={4}
                  required
                  value={formData.template}
                  onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Hi {name}, your payment of KES {amount} is due on {date}..."
                />
                <p className="text-xs text-gray-500 mt-1">Use {'{name}'}, {'{amount}'}, and {'{date}'} for personalization</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select 
                  value={formData.frequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as 'weekly' | 'monthly' | 'once' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="once">Send Once</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Send Time</label>
                <input
                  type="time"
                  value={formData.sendTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, sendTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReminderModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Create Reminder</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;
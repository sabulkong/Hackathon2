import React, { useState } from 'react';
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
  CheckCircle
} from 'lucide-react';

const Reminders = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showReminderModal, setShowReminderModal] = useState(false);

  const scheduledReminders = [
    {
      id: 1,
      name: 'Monthly Payment Reminder',
      template: 'Hi {name}, your monthly contribution of KES {amount} is due on {date}. Please make your payment. Thank you!',
      frequency: 'Monthly',
      nextSend: '2024-01-28',
      recipients: 24,
      status: 'active'
    },
    {
      id: 2,
      name: 'Overdue Payment Alert',
      template: 'Dear {name}, your payment of KES {amount} is now overdue. Please settle as soon as possible.',
      frequency: 'Weekly',
      nextSend: '2024-01-22',
      recipients: 6,
      status: 'active'
    },
    {
      id: 3,
      name: 'Pre-Payment Reminder',
      template: 'Hello {name}, just a friendly reminder that your contribution of KES {amount} is due in 3 days.',
      frequency: 'Monthly',
      nextSend: '2024-01-25',
      recipients: 24,
      status: 'paused'
    }
  ];

  const sentReminders = [
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
    },
    {
      id: 3,
      recipient: 'Mary Njeri',
      message: 'Hello Mary, just a friendly reminder that your contribution...',
      sentDate: '2024-01-13 02:00 PM',
      status: 'read',
      response: 'Payment made'
    }
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reminders</h2>
          <p className="text-gray-600">Manage automated payment reminders</p>
        </div>
        <button
          onClick={() => setShowReminderModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Reminder</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">3</p>
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
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Scheduled Reminders
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sent'
                ? 'border-emerald-500 text-emerald-600'
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
            {scheduledReminders.map((reminder) => (
              <div key={reminder.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-emerald-600" />
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
                    <button className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="flex items-center space-x-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Reminder</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Monthly Payment Reminder"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Template</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Hi {name}, your payment of KES {amount} is due on {date}..."
                />
                <p className="text-xs text-gray-500 mt-1">Use {'{name}'}, {'{amount}'}, and {'{date}'} for personalization</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="once">Send Once</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Send Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Create Reminder
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
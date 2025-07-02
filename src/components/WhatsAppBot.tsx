import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  Send, 
  Users, 
  CheckCircle,
  Clock,
  Smartphone,
  Settings,
  Play,
  Pause,
  BarChart3,
  MessageCircle,
  Zap,
  ArrowRight
} from 'lucide-react';

const WhatsAppBot = () => {
  const [botStatus, setBotStatus] = useState('active');
  const [selectedConversation, setSelectedConversation] = useState(null);

  const botStats = [
    {
      label: 'Messages Sent Today',
      value: '47',
      change: '+12 from yesterday',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      label: 'Auto Responses',
      value: '23',
      change: '89% success rate',
      changeType: 'positive',
      icon: Bot,
      color: 'emerald'
    },
    {
      label: 'Payment Confirmations',
      value: '8',
      change: 'This week',
      changeType: 'neutral',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      label: 'Active Conversations',
      value: '6',
      change: '3 pending replies',
      changeType: 'warning',
      icon: MessageCircle,
      color: 'amber'
    }
  ];

  const recentConversations = [
    {
      id: 1,
      member: 'Jane Wanjiku',
      lastMessage: 'Paid KES 5,000 via M-Pesa',
      timestamp: '2 minutes ago',
      status: 'confirmed',
      unread: false
    },
    {
      id: 2,
      member: 'Peter Kimani',
      lastMessage: 'When is the next payment due?',
      timestamp: '15 minutes ago',
      status: 'pending',
      unread: true
    },
    {
      id: 3,
      member: 'Mary Njeri',
      lastMessage: 'Thank you for the reminder!',
      timestamp: '1 hour ago',
      status: 'read',
      unread: false
    },
    {
      id: 4,
      member: 'John Mwangi',
      lastMessage: 'Bot: Your payment is overdue...',
      timestamp: '2 hours ago',
      status: 'delivered',
      unread: false
    }
  ];

  const quickActions = [
    {
      title: 'Send Payment Reminder',
      description: 'Send reminder to all pending members',
      icon: Bell,
      action: 'reminder',
      color: 'blue'
    },
    {
      title: 'Broadcast Message',
      description: 'Send custom message to all members',
      icon: MessageSquare,
      action: 'broadcast',
      color: 'emerald'
    },
    {
      title: 'Update Bot Settings',
      description: 'Configure auto-responses and templates',
      icon: Settings,
      action: 'settings',
      color: 'purple'
    }
  ];

  const messageTemplates = [
    {
      name: 'Payment Reminder',
      template: 'Hi {name}! 👋 Your monthly contribution of KES {amount} is due on {date}. Please make your payment to keep our chama goals on track! 💪',
      usage: 'High'
    },
    {
      name: 'Payment Confirmation',
      template: 'Great news {name}! ✅ We\'ve received your payment of KES {amount}. Thank you for keeping our chama strong! 🙌',
      usage: 'High'
    },
    {
      name: 'Overdue Notice',
      template: 'Hello {name}, your payment of KES {amount} is now {days} days overdue. Please settle as soon as possible to avoid penalties. Need help? Just reply to this message! 💬',
      usage: 'Medium'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">WhatsApp Bot</h2>
          <p className="text-gray-600">Manage automated conversations and member interactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            botStatus === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              botStatus === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium">
              {botStatus === 'active' ? 'Bot Active' : 'Bot Inactive'}
            </span>
          </div>
          <button
            onClick={() => setBotStatus(botStatus === 'active' ? 'inactive' : 'active')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              botStatus === 'active' 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {botStatus === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{botStatus === 'active' ? 'Pause Bot' : 'Start Bot'}</span>
          </button>
        </div>
      </div>

      {/* Bot Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {botStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-emerald-600' :
                  stat.changeType === 'warning' ? 'text-amber-600' :
                  'text-gray-600'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Conversations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Conversations</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentConversations.map((conversation) => (
                <div 
                  key={conversation.id} 
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {conversation.member.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {conversation.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.member}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        conversation.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        conversation.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        conversation.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {conversation.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{conversation.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        action.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{action.title}</p>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Message Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Message Templates</h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              <Settings className="w-4 h-4" />
              <span>Manage Templates</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {messageTemplates.map((template, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.usage === 'High' ? 'bg-emerald-100 text-emerald-700' :
                      template.usage === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {template.usage} Usage
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {template.template}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bot Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Bot Performance</h3>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Last 7 days</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">94%</p>
            <p className="text-sm text-gray-600">Response Rate</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2.3s</p>
            <p className="text-sm text-gray-600">Avg Response Time</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">89%</p>
            <p className="text-sm text-gray-600">Member Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppBot;
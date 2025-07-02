import React from 'react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  Banknote,
  Bot,
  Zap,
  Target,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      label: 'Total Members',
      value: '24',
      change: '+2 this month',
      changeType: 'positive',
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Monthly Target',
      value: 'KES 120,000',
      change: '85% collected',
      changeType: 'positive',
      icon: Target,
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      label: 'Pending Payments',
      value: '6',
      change: 'Due in 3 days',
      changeType: 'warning',
      icon: Clock,
      color: 'amber',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      label: 'Bot Messages',
      value: '142',
      change: 'This week',
      changeType: 'neutral',
      icon: Bot,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const recentActivity = [
    {
      member: 'Jane Wanjiku',
      action: 'Payment confirmed via WhatsApp',
      amount: 'KES 5,000',
      time: '2 hours ago',
      status: 'success',
      type: 'payment'
    },
    {
      member: 'Peter Kimani',
      action: 'Auto-reminder sent',
      amount: 'KES 5,000 due',
      time: '4 hours ago',
      status: 'warning',
      type: 'reminder'
    },
    {
      member: 'Mary Njeri',
      action: 'Replied "Paid" to bot',
      amount: 'KES 5,000',
      time: '1 day ago',
      status: 'success',
      type: 'interaction'
    },
    {
      member: 'John Mwangi',
      action: 'Payment overdue alert',
      amount: 'KES 5,000',
      time: '2 days ago',
      status: 'error',
      type: 'alert'
    }
  ];

  const upcomingReminders = [
    { member: 'Grace Akinyi', amount: 'KES 5,000', dueDate: 'Tomorrow', priority: 'high' },
    { member: 'David Ochieng', amount: 'KES 5,000', dueDate: 'In 2 days', priority: 'medium' },
    { member: 'Sarah Wangari', amount: 'KES 5,000', dueDate: 'In 3 days', priority: 'low' }
  ];

  const botInsights = [
    { metric: 'Response Rate', value: '94%', trend: 'up' },
    { metric: 'Auto-Confirmations', value: '23', trend: 'up' },
    { metric: 'Member Engagement', value: '89%', trend: 'stable' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin</h2>
          <p className="text-blue-100 mb-4">Your ChamaPay Bot is working hard to keep payments on track</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">Bot Active</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">24 Members Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-emerald-500' :
                  stat.changeType === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                } animate-pulse`}></div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Live updates</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-emerald-100' :
                    activity.status === 'warning' ? 'bg-amber-100' :
                    'bg-red-100'
                  }`}>
                    {activity.type === 'payment' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : activity.type === 'reminder' ? (
                      <Clock className="w-5 h-5 text-amber-600" />
                    ) : activity.type === 'interaction' ? (
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.member}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bot Insights & Upcoming Reminders */}
        <div className="space-y-6">
          {/* Bot Performance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Bot Performance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {botInsights.map((insight, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{insight.metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">{insight.value}</span>
                      <TrendingUp className={`w-4 h-4 ${
                        insight.trend === 'up' ? 'text-emerald-500' : 'text-gray-400'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Reminders</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingReminders.map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">{reminder.member}</p>
                      <p className="text-sm text-gray-600">{reminder.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        reminder.priority === 'high' ? 'text-red-600' :
                        reminder.priority === 'medium' ? 'text-amber-600' :
                        'text-blue-600'
                      }`}>
                        {reminder.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                Send All Reminders via Bot
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Payment Progress</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              KES 102,000 / KES 120,000 collected
            </div>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: '85%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>85% Complete</span>
          <span>KES 18,000 remaining</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
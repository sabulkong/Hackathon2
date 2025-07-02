import React from 'react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  Banknote
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      label: 'Total Members',
      value: '24',
      change: '+2 this month',
      changeType: 'positive',
      icon: Users,
      color: 'emerald'
    },
    {
      label: 'Monthly Target',
      value: 'KES 120,000',
      change: '85% collected',
      changeType: 'positive',
      icon: Banknote,
      color: 'blue'
    },
    {
      label: 'Pending Payments',
      value: '6',
      change: 'Due in 3 days',
      changeType: 'warning',
      icon: Clock,
      color: 'amber'
    },
    {
      label: 'Reminders Sent',
      value: '18',
      change: 'This week',
      changeType: 'neutral',
      icon: MessageSquare,
      color: 'purple'
    }
  ];

  const recentActivity = [
    {
      member: 'Jane Wanjiku',
      action: 'Payment received',
      amount: 'KES 5,000',
      time: '2 hours ago',
      status: 'success'
    },
    {
      member: 'Peter Kimani',
      action: 'Reminder sent',
      amount: 'KES 5,000 due',
      time: '4 hours ago',
      status: 'warning'
    },
    {
      member: 'Mary Njeri',
      action: 'Payment received',
      amount: 'KES 5,000',
      time: '1 day ago',
      status: 'success'
    },
    {
      member: 'John Mwangi',
      action: 'Payment overdue',
      amount: 'KES 5,000',
      time: '2 days ago',
      status: 'error'
    }
  ];

  const upcomingReminders = [
    { member: 'Grace Akinyi', amount: 'KES 5,000', dueDate: 'Tomorrow' },
    { member: 'David Ochieng', amount: 'KES 5,000', dueDate: 'In 2 days' },
    { member: 'Sarah Wangari', amount: 'KES 5,000', dueDate: 'In 3 days' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Admin</h2>
        <p className="text-emerald-100">Here's what's happening with your chama today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'
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
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-emerald-100' :
                    activity.status === 'warning' ? 'bg-amber-100' :
                    'bg-red-100'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : activity.status === 'warning' ? (
                      <Clock className="w-5 h-5 text-amber-600" />
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

        {/* Upcoming Reminders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Reminders</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingReminders.map((reminder, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{reminder.member}</p>
                    <p className="text-sm text-gray-600">{reminder.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-amber-600">{reminder.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
              Send All Reminders
            </button>
          </div>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Payment Progress</h3>
          <div className="text-sm text-gray-600">
            KES 102,000 / KES 120,000 collected
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full" style={{ width: '85%' }}></div>
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
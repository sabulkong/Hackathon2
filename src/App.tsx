import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Bell, 
  FileText, 
  Settings, 
  Home,
  Plus,
  Search,
  Filter,
  Download,
  MessageSquare,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Payments from './components/Payments';
import Reminders from './components/Reminders';
import Reports from './components/Reports';
import SettingsPanel from './components/Settings';

type NavigationItem = 'dashboard' | 'members' | 'payments' | 'reminders' | 'reports' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<NavigationItem>('dashboard');

  const navigationItems = [
    { id: 'dashboard' as NavigationItem, label: 'Dashboard', icon: Home },
    { id: 'members' as NavigationItem, label: 'Members', icon: Users },
    { id: 'payments' as NavigationItem, label: 'Payments', icon: CreditCard },
    { id: 'reminders' as NavigationItem, label: 'Reminders', icon: Bell },
    { id: 'reports' as NavigationItem, label: 'Reports', icon: FileText },
    { id: 'settings' as NavigationItem, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <Members />;
      case 'payments':
        return <Payments />;
      case 'reminders':
        return <Reminders />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ChamaBot</h1>
                <p className="text-sm text-gray-500">Payment Reminder System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
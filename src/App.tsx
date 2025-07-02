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
  XCircle,
  Bot,
  Smartphone
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Payments from './components/Payments';
import Reminders from './components/Reminders';
import Reports from './components/Reports';
import SettingsPanel from './components/Settings';
import WhatsAppBot from './components/WhatsAppBot';

type NavigationItem = 'dashboard' | 'members' | 'payments' | 'whatsapp' | 'reminders' | 'reports' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<NavigationItem>('dashboard');

  const navigationItems = [
    { id: 'dashboard' as NavigationItem, label: 'Dashboard', icon: Home },
    { id: 'members' as NavigationItem, label: 'Members', icon: Users },
    { id: 'payments' as NavigationItem, label: 'Payments', icon: CreditCard },
    { id: 'whatsapp' as NavigationItem, label: 'WhatsApp Bot', icon: Bot },
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
      case 'whatsapp':
        return <WhatsAppBot />;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  ChamaPay Bot
                </h1>
                <p className="text-sm text-gray-500">Smart Payment Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-700">WhatsApp Connected</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
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
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg transform scale-[1.02]'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:transform hover:scale-[1.01]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${
                        activeTab === item.id ? 'text-white' : 'group-hover:scale-110'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Quick Stats in Sidebar */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border border-blue-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Active Members</span>
                    <span className="text-sm font-bold text-blue-600">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">This Month</span>
                    <span className="text-sm font-bold text-emerald-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Bot Messages</span>
                    <span className="text-sm font-bold text-purple-600">142</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 min-h-[600px]">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
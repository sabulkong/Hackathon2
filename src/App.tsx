import React, { useState, useEffect } from 'react';
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
  Smartphone,
  LogOut,
  User
} from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { isSupabaseReady } from './lib/supabase';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ProfileModal from './components/auth/ProfileModal';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Payments from './components/Payments';
import Reminders from './components/Reminders';
import Reports from './components/Reports';
import SettingsPanel from './components/Settings';
import WhatsAppBot from './components/WhatsAppBot';

type NavigationItem = 'dashboard' | 'members' | 'payments' | 'whatsapp' | 'reminders' | 'reports' | 'settings';
type AuthView = 'login' | 'signup' | 'forgot-password';

function AuthenticatedApp() {
  const { user, profile, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<NavigationItem>('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Create demo profile when Supabase is not ready or no profile exists
  const effectiveProfile = profile || {
    id: user?.id || 'demo-user',
    email: user?.email || 'demo@chamabot.com',
    full_name: user?.user_metadata?.full_name || 'Demo Admin',
    phone: user?.user_metadata?.phone || '+254712345678',
    role: (user?.user_metadata?.role as 'treasurer' | 'member') || 'treasurer',
    created_at: new Date().toISOString()
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationItems = [
    { id: 'dashboard' as NavigationItem, label: 'Dashboard', icon: Home, roles: ['treasurer', 'member'] },
    { id: 'members' as NavigationItem, label: 'Members', icon: Users, roles: ['treasurer'] },
    { id: 'payments' as NavigationItem, label: 'Payments', icon: CreditCard, roles: ['treasurer', 'member'] },
    { id: 'whatsapp' as NavigationItem, label: 'WhatsApp Bot', icon: Bot, roles: ['treasurer'] },
    { id: 'reminders' as NavigationItem, label: 'Reminders', icon: Bell, roles: ['treasurer'] },
    { id: 'reports' as NavigationItem, label: 'Reports', icon: FileText, roles: ['treasurer'] },
    { id: 'settings' as NavigationItem, label: 'Settings', icon: Settings, roles: ['treasurer'] },
  ].filter(item => item.roles.includes(effectiveProfile.role));

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return effectiveProfile.role === 'treasurer' ? <Members /> : <Dashboard />;
      case 'payments':
        return <Payments />;
      case 'whatsapp':
        return effectiveProfile.role === 'treasurer' ? <WhatsAppBot /> : <Dashboard />;
      case 'reminders':
        return effectiveProfile.role === 'treasurer' ? <Reminders /> : <Dashboard />;
      case 'reports':
        return effectiveProfile.role === 'treasurer' ? <Reports /> : <Dashboard />;
      case 'settings':
        return effectiveProfile.role === 'treasurer' ? <SettingsPanel /> : <Dashboard />;
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
              {!isSupabaseReady && (
                <div className="hidden sm:flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-amber-700">Demo Mode</span>
                </div>
              )}
              {isSupabaseReady && user && (
                <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-emerald-700">Connected</span>
                </div>
              )}
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </button>
              
              {/* User Menu */}
              <div className="relative group">
                <button 
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-medium">
                      {String(effectiveProfile.full_name || '').charAt(0) || String(effectiveProfile.email || '').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">{effectiveProfile.full_name || 'User'}</p>
                    <p className="text-xs text-gray-500 capitalize">{effectiveProfile.role}</p>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </button>
                    {isSupabaseReady && user && (
                      <>
                        <hr className="my-1" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
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

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
    </div>
  );
}

function UnauthenticatedApp() {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const renderAuthForm = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm 
            onSwitchToSignup={() => setCurrentView('signup')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
      case 'signup':
        return (
          <SignupForm 
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm 
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      default:
        return (
          <LoginForm 
            onSwitchToSignup={() => setCurrentView('signup')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            ChamaPay Bot
          </h1>
          <p className="text-gray-600">Smart Payment Management System</p>
        </div>

        {/* Auth Form */}
        {renderAuthForm()}
      </div>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  // Show loading spinner only briefly while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ChamaPay Bot...</p>
        </div>
      </div>
    );
  }

  // Show authenticated app if user is logged in OR if Supabase is not configured (demo mode)
  if (user || !isSupabaseReady) {
    return <AuthenticatedApp />;
  }

  // Show unauthenticated app if no user and Supabase is configured
  return <UnauthenticatedApp />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  Calendar, 
  TrendingUp,
  Users,
  Banknote,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { apiService, Member, Payment } from '../services/api';
import toast from 'react-hot-toast';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersData, paymentsData] = await Promise.all([
        apiService.getMembers(),
        apiService.getPayments()
      ]);
      setMembers(membersData);
      setPayments(paymentsData);
    } catch (error) {
      toast.error('Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const reportData = {
    totalMembers: members.length,
    totalCollected: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    totalPending: payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0),
    collectionRate: payments.length > 0 ? Math.round((payments.filter(p => p.status === 'paid').length / payments.length) * 100) : 0,
    overduePayments: payments.filter(p => p.status === 'overdue').length,
    avgResponseTime: '2.3 days'
  };

  const monthlyData = [
    { month: 'Oct 2023', collected: 95000, target: 120000 },
    { month: 'Nov 2023', collected: 118000, target: 120000 },
    { month: 'Dec 2023', collected: 112000, target: 120000 },
    { month: 'Jan 2024', collected: reportData.totalCollected, target: 120000 },
  ];

  const topPerformers = members
    .map(member => ({
      name: member.name,
      payments: payments.filter(p => p.memberId === member.id && p.status === 'paid').length,
      amount: payments.filter(p => p.memberId === member.id && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      rate: payments.filter(p => p.memberId === member.id).length > 0 
        ? Math.round((payments.filter(p => p.memberId === member.id && p.status === 'paid').length / payments.filter(p => p.memberId === member.id).length) * 100)
        : 0
    }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 4);

  const defaulters = members
    .map(member => {
      const memberPayments = payments.filter(p => p.memberId === member.id);
      const overduePayments = memberPayments.filter(p => p.status === 'overdue');
      return {
        name: member.name,
        missed: overduePayments.length,
        owed: overduePayments.reduce((sum, p) => sum + p.amount, 0),
        lastPayment: member.lastPayment || 'No payments'
      };
    })
    .filter(d => d.missed > 0)
    .sort((a, b) => b.missed - a.missed);

  const availableReports = [
    {
      title: 'Monthly Contribution Report',
      description: 'Detailed breakdown of all member contributions for the month',
      type: 'PDF',
      lastGenerated: new Date().toLocaleDateString(),
      data: payments
    },
    {
      title: 'Payment Defaulters Report',
      description: 'List of members with overdue payments and outstanding amounts',
      type: 'PDF',
      lastGenerated: new Date().toLocaleDateString(),
      data: defaulters
    },
    {
      title: 'Collection Summary',
      description: 'Overview of collection rates and payment trends',
      type: 'Excel',
      lastGenerated: new Date().toLocaleDateString(),
      data: monthlyData
    },
    {
      title: 'Member Activity Report',
      description: 'Individual member payment history and statistics',
      type: 'PDF',
      lastGenerated: new Date().toLocaleDateString(),
      data: members
    }
  ];

  const handleDownloadReport = async (report: typeof availableReports[0]) => {
    try {
      if (report.type === 'PDF') {
        await apiService.exportToPDF(report.data, report.title);
      } else {
        await apiService.exportToExcel(report.data, report.title.toLowerCase().replace(/\s+/g, '-'));
      }
    } catch (error) {
      console.error('Error downloading report:', error);
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
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Track performance and generate detailed reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="current-year">Current Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Banknote className="w-6 h-6 text-emerald-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">KES {reportData.totalCollected.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mb-2">Total Collected</p>
          <p className="text-sm font-medium text-emerald-600">+8.5% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{reportData.collectionRate}%</p>
          <p className="text-sm text-gray-600 mb-2">Collection Rate</p>
          <p className="text-sm font-medium text-blue-600">+2% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{reportData.overduePayments}</p>
          <p className="text-sm text-gray-600 mb-2">Overdue Payments</p>
          <p className="text-sm font-medium text-amber-600">KES {reportData.totalPending.toLocaleString()} pending</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Collection Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Collection Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const percentage = (data.collected / data.target) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <span className="text-sm text-gray-600">
                      KES {data.collected.toLocaleString()} / KES {data.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-600">{percentage.toFixed(1)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-600">{performer.payments} payments</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">KES {performer.amount.toLocaleString()}</p>
                  <p className="text-sm text-emerald-600">{performer.rate}% rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Defaulters */}
      {defaulters.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Defaulters</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Member</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Missed Payments</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount Owed</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {defaulters.map((defaulter, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{defaulter.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        {defaulter.missed} missed
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-red-600">KES {defaulter.owed.toLocaleString()}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-600">{defaulter.lastPayment}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableReports.map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {report.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
                <button 
                  onClick={() => handleDownloadReport(report)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
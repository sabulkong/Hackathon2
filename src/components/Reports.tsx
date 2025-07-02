import React, { useState } from 'react';
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

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const reportData = {
    totalMembers: 24,
    totalCollected: 102000,
    totalPending: 18000,
    collectionRate: 85,
    overduePayments: 6,
    avgResponseTime: '2.3 days'
  };

  const monthlyData = [
    { month: 'Oct 2023', collected: 95000, target: 120000 },
    { month: 'Nov 2023', collected: 118000, target: 120000 },
    { month: 'Dec 2023', collected: 112000, target: 120000 },
    { month: 'Jan 2024', collected: 102000, target: 120000 },
  ];

  const topPerformers = [
    { name: 'Jane Wanjiku', payments: 12, amount: 60000, rate: 100 },
    { name: 'Mary Njeri', payments: 12, amount: 60000, rate: 100 },
    { name: 'Grace Akinyi', payments: 11, amount: 55000, rate: 92 },
    { name: 'Sarah Wangari', payments: 10, amount: 50000, rate: 83 },
  ];

  const defaulters = [
    { name: 'John Mwangi', missed: 3, owed: 15000, lastPayment: '2023-11-15' },
    { name: 'Peter Kimani', missed: 2, owed: 10000, lastPayment: '2023-12-15' },
    { name: 'David Ochieng', missed: 1, owed: 5000, lastPayment: '2024-01-01' },
  ];

  const availableReports = [
    {
      title: 'Monthly Contribution Report',
      description: 'Detailed breakdown of all member contributions for the month',
      type: 'PDF',
      lastGenerated: '2024-01-20'
    },
    {
      title: 'Payment Defaulters Report',
      description: 'List of members with overdue payments and outstanding amounts',
      type: 'PDF',
      lastGenerated: '2024-01-18'
    },
    {
      title: 'Collection Summary',
      description: 'Overview of collection rates and payment trends',
      type: 'Excel',
      lastGenerated: '2024-01-20'
    },
    {
      title: 'Member Activity Report',
      description: 'Individual member payment history and statistics',
      type: 'PDF',
      lastGenerated: '2024-01-19'
    }
  ];

  return (
    <div className="space-y-6">
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
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
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
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
                <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
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
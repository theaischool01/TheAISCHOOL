'use client';

import { useState, useEffect } from 'react';
import { Search, Download, ArrowLeft, Mail, Calendar, Globe } from 'lucide-react';
import Link from 'next/link';

interface Subscriber {
  id: string;
  email: string;
  region: string;
  createdAt: string;
}

export default function NewsletterSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/newsletter');
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (error) {
      console.error('Failed to fetch newsletter subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Email', 'Region', 'Subscription Date'];
    const rows = filteredSubscribers.map(sub => [
      sub.email,
      sub.region.toUpperCase(),
      new Date(sub.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#EE1C25] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-[#171717] tracking-tight mb-2 uppercase">
            Newsletter Subscribers
          </h1>
          <p className="text-gray-500 text-sm font-semibold">
            Track user email subscriptions for news and promotions
          </p>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EE1C25] focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* List Table */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <th className="px-6 py-4">Subscriber Email</th>
                  <th className="px-6 py-4">Locale Region</th>
                  <th className="px-6 py-4">Subscribed Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">Loading data...</td>
                  </tr>
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">No subscribers found.</td>
                  </tr>
                ) : (
                  filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50/75 transition-colors">
                      <td className="px-6 py-4 font-black text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{sub.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-md text-[10px] uppercase font-bold text-gray-600">
                          <Globe className="w-3 h-3 text-gray-400" />
                          <span>{sub.region}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(sub.createdAt).toLocaleString()}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

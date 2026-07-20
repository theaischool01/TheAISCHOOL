'use client';

import { useState, useEffect } from 'react';
import { Search, Download, ArrowLeft, Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  region: string;
  createdAt: string;
}

export default function ContactRequestsPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contact-requests');
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Failed to fetch contact requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.phone && contact.phone.includes(searchTerm)) ||
    (contact.subject && contact.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Region', 'Date'];
    const rows = filteredContacts.map(contact => [
      contact.name,
      contact.email,
      contact.phone || '',
      contact.subject || '',
      contact.message.replace(/,/g, ' '),
      contact.region.toUpperCase(),
      new Date(contact.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-requests.csv';
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
            Contact Requests
          </h1>
          <p className="text-gray-500 text-sm font-semibold">
            View user queries submitted from the Contact Us forms
          </p>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or subject..."
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

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List Table */}
          <div className={`border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white ${selectedContact ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Region</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading data...</td>
                    </tr>
                  ) : filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No contact requests found.</td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr 
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`hover:bg-gray-50/75 cursor-pointer transition-colors ${selectedContact?.id === contact.id ? 'bg-red-50/20' : ''}`}
                      >
                        <td className="px-6 py-4 font-black text-gray-900">{contact.name}</td>
                        <td className="px-6 py-4 text-gray-500">{contact.email}</td>
                        <td className="px-6 py-4 truncate max-w-[200px]">{contact.subject || 'N/A'}</td>
                        <td className="px-6 py-4"><span className="px-2.5 py-1 bg-gray-150 border border-gray-200 rounded-md text-[10px] uppercase font-bold">{contact.region}</span></td>
                        <td className="px-6 py-4 text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Panel */}
          {selectedContact && (
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-md relative animate-in fade-in slide-in-from-right-4 duration-250">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#EE1C25] rounded-t-2xl" />
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-black text-gray-950 uppercase tracking-tight">Inquiry Details</h3>
                <button onClick={() => setSelectedContact(null)} className="text-xs font-bold text-gray-400 hover:text-[#EE1C25] transition-colors">Close</button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Candidate Name</div>
                    <div className="text-sm font-bold text-gray-950">{selectedContact.name}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Email Address</div>
                    <a href={`mailto:${selectedContact.email}`} className="text-sm font-bold text-gray-950 hover:underline">{selectedContact.email}</a>
                  </div>
                </div>

                {selectedContact.phone && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Phone Number</div>
                      <a href={`tel:${selectedContact.phone}`} className="text-sm font-bold text-gray-950 hover:underline">{selectedContact.phone}</a>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Submission Date</div>
                    <div className="text-sm font-bold text-gray-950">{new Date(selectedContact.createdAt).toLocaleString()}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-[#EE1C25]" /> Query Message</div>
                  <p className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-4 leading-relaxed max-h-[250px] overflow-y-auto whitespace-pre-line">{selectedContact.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

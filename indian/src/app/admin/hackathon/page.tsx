'use client';

import { useState, useEffect } from 'react';
import { Search, Download, ArrowLeft, Users, Calendar, Award, User, Phone, Mail, GraduationCap, Lightbulb } from 'lucide-react';
import Link from 'next/link';

interface HackathonRegistration {
  id: string;
  teamName: string;
  leaderName: string;
  email: string;
  phone: string;
  college: string;
  members: any; // array or object
  idea: string | null;
  region: string;
  createdAt: string;
}

export default function HackathonRegistrationsPage() {
  const [registrations, setRegistrations] = useState<HackathonRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReg, setSelectedReg] = useState<HackathonRegistration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/hackathon');
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Failed to fetch hackathon registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Team Name', 'Leader Name', 'Email', 'Phone', 'College', 'Region', 'Date'];
    const rows = filteredRegistrations.map(reg => [
      reg.teamName,
      reg.leaderName,
      reg.email,
      reg.phone,
      reg.college.replace(/,/g, ' '),
      reg.region.toUpperCase(),
      new Date(reg.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hackathon-registrations.csv';
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
            Hackathon Registrations
          </h1>
          <p className="text-gray-500 text-sm font-semibold">
            Manage student registrations for the national hackathon challenges
          </p>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by team, leader, email, or college..."
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main List Table */}
          <div className={`border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white ${selectedReg ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <th className="px-6 py-4">Team Name</th>
                    <th className="px-6 py-4">Leader</th>
                    <th className="px-6 py-4">College</th>
                    <th className="px-6 py-4">Region</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading registrations...</td>
                    </tr>
                  ) : filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No registrations found.</td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((reg) => (
                      <tr 
                        key={reg.id}
                        onClick={() => setSelectedReg(reg)}
                        className={`hover:bg-gray-50/75 cursor-pointer transition-colors ${selectedReg?.id === reg.id ? 'bg-red-50/20' : ''}`}
                      >
                        <td className="px-6 py-4 font-black text-gray-900 flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span>{reg.teamName}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-800">{reg.leaderName}</td>
                        <td className="px-6 py-4 truncate max-w-[200px] text-gray-500">{reg.college}</td>
                        <td className="px-6 py-4"><span className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-md text-[10px] uppercase font-bold text-gray-600">{reg.region}</span></td>
                        <td className="px-6 py-4 text-gray-400">{new Date(reg.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Registration Details Panel */}
          {selectedReg && (
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-md relative animate-in fade-in slide-in-from-right-4 duration-250">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#EE1C25] rounded-t-2xl" />
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-black text-gray-950 uppercase tracking-tight">Team Details</h3>
                <button onClick={() => setSelectedReg(null)} className="text-xs font-bold text-gray-400 hover:text-[#EE1C25] transition-colors">Close</button>
              </div>

              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Team Name</div>
                    <div className="text-sm font-bold text-gray-950">{selectedReg.teamName}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Team Leader</div>
                    <div className="text-sm font-bold text-gray-950">{selectedReg.leaderName}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Contact Email</div>
                    <a href={`mailto:${selectedReg.email}`} className="text-sm font-bold text-gray-950 hover:underline">{selectedReg.email}</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Leader Phone</div>
                    <a href={`tel:${selectedReg.phone}`} className="text-sm font-bold text-gray-950 hover:underline">{selectedReg.phone}</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-5 h-5 text-[#EE1C25] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">College presence</div>
                    <div className="text-sm font-bold text-gray-950">{selectedReg.college}</div>
                  </div>
                </div>

                {selectedReg.idea && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5 text-[#EE1C25]" /> Idea abstract</div>
                    <p className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 leading-relaxed mt-1">{selectedReg.idea}</p>
                  </div>
                )}

                {/* Team Members List */}
                {selectedReg.members && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#EE1C25]" /> Co-Members</div>
                    <ul className="list-disc pl-5 mt-1 text-sm font-semibold text-gray-700 space-y-1">
                      {Array.isArray(selectedReg.members) ? (
                        selectedReg.members.map((member: any, i: number) => (
                          <li key={i}>{typeof member === 'string' ? member : `${member.name || ''} (${member.email || ''})`}</li>
                        ))
                      ) : (
                        <li>{JSON.stringify(selectedReg.members)}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

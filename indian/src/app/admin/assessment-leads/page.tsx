'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Download, Sparkles, Loader2, RefreshCw, BarChart2, ShieldAlert, 
  TrendingUp, Award, Layers, ArrowUpDown
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  graduationYear: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  resumeStatus: string;
  source?: string;
  leadScore?: number;
  status: string;
  createdAt: string;
  sessions: {
    skillsMatrix: any;
    candidateProfile: string;
    interestVector: any;
    overallScore: number;
    results: {
      recommendations: {
        type: string;
        course: {
          title: string;
        };
      }[];
    }[];
  }[];
}

interface Metrics {
  totalAssessments: number;
  averageScore: number;
  hotLeads: number;
  topRecommendedCourse: string;
  enrollmentConversion: number;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    totalAssessments: 0,
    averageScore: 0,
    hotLeads: 0,
    topRecommendedCourse: 'N/A',
    enrollmentConversion: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filter/Sort variables
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [scoreFilter, setScoreFilter] = useState('ALL');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [sortField, setSortField] = useState<keyof Lead>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/assessment');
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setMetrics(data.metrics);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch('/api/assessment/lead-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getFilteredLeads = () => {
    return leads
      .filter((l) => {
        const matchesSearch = 
          l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          l.phone.includes(searchTerm);
        
        const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
        
        const score = l.leadScore || 0;
        const matchesScore = 
          scoreFilter === 'ALL' ||
          (scoreFilter === 'HOT' && score >= 90) ||
          (scoreFilter === 'WARM' && score >= 70 && score < 90) ||
          (scoreFilter === 'COLD' && score < 70);

        const primaryCourse = l.sessions[0]?.results[0]?.recommendations?.find(r => r.type === 'PRIMARY')?.course?.title || '';
        const matchesCourse = courseFilter === 'ALL' || primaryCourse === courseFilter;
        
        const matchesSource = sourceFilter === 'ALL' || l.source === sourceFilter;

        return matchesSearch && matchesStatus && matchesScore && matchesCourse && matchesSource;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === 'createdAt') {
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
        }

        if (valA === undefined) return 1;
        if (valB === undefined) return -1;

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  };

  // CSV Exporter
  const exportToCSV = () => {
    const filtered = getFilteredLeads();
    const headers = [
      'Name', 'Email', 'Phone', 'College', 'Degree', 'Graduation Year', 
      'Lead Score', 'Lead Class', 'Status', 'Source', 'Recommended Track', 
      'Resume Status', 'Resume URL', 'Assessment Date'
    ];
    
    const rows = filtered.map((l) => {
      const primaryCourse = l.sessions[0]?.results[0]?.recommendations?.find(r => r.type === 'PRIMARY')?.course?.title || 'N/A';
      const leadClass = (l.leadScore || 0) >= 90 ? 'HOT' : (l.leadScore || 0) >= 70 ? 'WARM' : 'COLD';
      return [
        l.name,
        l.email,
        l.phone,
        l.college,
        l.degree,
        l.graduationYear,
        l.leadScore || 0,
        leadClass,
        l.status,
        l.source || 'Direct',
        primaryCourse,
        l.resumeStatus,
        l.resumeUrl || 'None',
        new Date(l.createdAt).toLocaleDateString(),
      ];
    });

    const csvContent = 
      'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AI_School_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) {
      return <span className="bg-red-50 text-[#EE1C25] border border-red-200 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">HOT ({score})</span>;
    }
    if (score >= 70) {
      return <span className="bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">WARM ({score})</span>;
    }
    return <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">COLD ({score})</span>;
  };

  const getStatusBadge = (status: string) => {
    const mapping: Record<string, string> = {
      NEW: 'bg-blue-50 text-blue-600 border border-blue-200',
      CONTACTED: 'bg-purple-50 text-purple-600 border border-purple-200',
      QUALIFIED: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
      ENROLLED: 'bg-red-50 text-[#EE1C25] border border-red-200',
      REJECTED: 'bg-gray-100 text-gray-500 border border-gray-200',
    };
    return <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${mapping[status] || ''}`}>{status}</span>;
  };

  const filteredLeads = getFilteredLeads();

  const coursesList = Array.from(new Set(leads.map(l => l.sessions[0]?.results[0]?.recommendations?.find(r => r.type === 'PRIMARY')?.course?.title).filter(Boolean)));
  const sourcesList = Array.from(new Set(leads.map(l => l.source).filter(Boolean)));

  return (
    <main className="w-full bg-white text-gray-900 min-h-screen font-sans">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#EE1C25]" />
              <span>Assessment Leads CRM</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[#171717] uppercase">Lead Intelligence Pipeline</h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchLeads}
              className="p-3 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-950"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={exportToCSV}
              className="bg-[#EE1C25] hover:bg-[#d61920] text-white font-black text-xs uppercase px-5 py-3.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Total Assessments</span>
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-3xl font-black text-gray-950 font-mono">{metrics.totalAssessments}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Average Score</span>
              <BarChart2 className="w-4 h-4 text-[#EE1C25]" />
            </div>
            <p className="text-3xl font-black text-gray-950 font-mono">{metrics.averageScore}%</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-black uppercase tracking-wider">HOT Leads</span>
              <ShieldAlert className="w-4 h-4 text-[#EE1C25]" />
            </div>
            <p className="text-3xl font-black text-[#EE1C25] font-mono">{metrics.hotLeads}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-2 col-span-2 sm:col-span-1">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Top Recommendation</span>
              <Award className="w-4 h-4" />
            </div>
            <p className="text-xs font-black truncate text-gray-700 mt-2">{metrics.topRecommendedCourse}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Conversion %</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-3xl font-black text-gray-950 font-mono">{metrics.enrollmentConversion}%</p>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:border-[#EE1C25] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-xs focus:border-[#EE1C25] focus:outline-none transition-colors"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="ENROLLED">ENROLLED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          <div>
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-xs focus:border-[#EE1C25] focus:outline-none transition-colors"
            >
              <option value="ALL">All Lead Scores</option>
              <option value="HOT">HOT Leads (90+)</option>
              <option value="WARM">WARM Leads (70-89)</option>
              <option value="COLD">COLD Leads (&lt;70)</option>
            </select>
          </div>

          <div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-xs focus:border-[#EE1C25] focus:outline-none transition-colors"
            >
              <option value="ALL">All Courses</option>
              {coursesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-xs focus:border-[#EE1C25] focus:outline-none transition-colors"
            >
              <option value="ALL">All Sources</option>
              {sourcesList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lead Table Container */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-10 h-10 text-[#EE1C25] animate-spin" />
              <span className="text-xs text-gray-400 font-bold">Retrieving assessment leads pipeline...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-24 text-center text-xs text-gray-400 font-bold">
              No leads match your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 border-b border-gray-200 uppercase tracking-wider font-bold">
                    <th className="p-4 cursor-pointer hover:text-gray-900" onClick={() => handleSort('name')}>
                      Candidate <ArrowUpDown className="inline w-3 h-3 ml-1" />
                    </th>
                    <th className="p-4 cursor-pointer hover:text-gray-900" onClick={() => handleSort('leadScore')}>
                      Lead Score <ArrowUpDown className="inline w-3 h-3 ml-1" />
                    </th>
                    <th className="p-4">Resume Status</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Recommended Course</th>
                    <th className="p-4 cursor-pointer hover:text-gray-900" onClick={() => handleSort('createdAt')}>
                      Assessment Date <ArrowUpDown className="inline w-3 h-3 ml-1" />
                    </th>
                    <th className="p-4">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
                  {filteredLeads.map((l) => {
                    const primaryCourse = l.sessions[0]?.results[0]?.recommendations?.find(r => r.type === 'PRIMARY')?.course?.title || 'N/A';
                    return (
                      <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-extrabold text-gray-900">{l.name}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{l.email} • {l.phone}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{l.college} ({l.graduationYear})</p>
                          </div>
                        </td>
                        <td className="p-4">
                          {getScoreBadge(l.leadScore || 0)}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-gray-600 font-bold uppercase">{l.resumeStatus}</span>
                            {l.resumeUrl && (
                              <a 
                                href={l.resumeUrl} 
                                target="_blank" 
                                className="text-[#EE1C25] hover:underline text-[9px] font-bold uppercase tracking-wider"
                              >
                                View File
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">
                          {l.source || 'Direct'}
                        </td>
                        <td className="p-4 text-gray-600">
                          {primaryCourse}
                        </td>
                        <td className="p-4 text-gray-400 font-normal">
                          {new Date(l.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          {updatingId === l.id ? (
                            <Loader2 className="w-4 h-4 text-[#EE1C25] animate-spin" />
                          ) : (
                            <select
                              value={l.status}
                              onChange={(e) => handleStatusChange(l.id, e.target.value)}
                              className="bg-white border border-gray-200 text-gray-700 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-[#EE1C25]"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="QUALIFIED">QUALIFIED</option>
                              <option value="ENROLLED">ENROLLED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

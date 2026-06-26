'use client';

import { useState, useEffect } from 'react';
import { Search, Download, Eye, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

interface AssessmentResult {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  recommendedCourse: string;
  createdAt: string;
  answers?: Array<{
    question: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }>;
}

export default function AssessmentResultsPage() {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/assessment-results');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch assessment results:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results.filter(result =>
    result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.phone.includes(searchTerm)
  );

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Score', 'Recommended Course', 'Date'];
    const rows = filteredResults.map(result => [
      result.name,
      result.email,
      result.phone,
      result.score,
      result.recommendedCourse,
      new Date(result.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessment-results.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#EE1C25] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-[#171717] tracking-tight mb-2">
            Assessment Results
          </h1>
          <p className="text-gray-500 text-sm font-semibold">
            View completed assessment results
          </p>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EE1C25] focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-500 font-semibold">
            Loading assessment results...
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-semibold">
            No assessment results found.
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                      Recommended Course
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {result.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {result.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {result.phone}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-50 text-[#EE1C25]">
                          {result.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#EE1C25]">
                        {result.recommendedCourse}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(result.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedResult(result)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {selectedResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedResult(null)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-[#171717]">Assessment Details</h3>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-6">
                {/* Personal Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#EE1C25]" />
                    Personal Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                        Name
                      </label>
                      <p className="text-sm font-semibold text-gray-900">{selectedResult.name}</p>
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                        Email
                      </label>
                      <p className="text-sm text-gray-600">{selectedResult.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                        Phone
                      </label>
                      <p className="text-sm text-gray-600">{selectedResult.phone}</p>
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                        Date
                      </label>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedResult.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Assessment Score */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                  <h4 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4">
                    Assessment Score
                  </h4>
                  <div className="text-4xl font-black text-[#EE1C25] mb-2">
                    {selectedResult.score}%
                  </div>
                </div>

                {/* Recommended Course */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4">
                    Recommended Course
                  </h4>
                  <p className="text-lg font-black text-[#EE1C25]">
                    {selectedResult.recommendedCourse}
                  </p>
                </div>

                {/* All Answers */}
                {selectedResult.answers && selectedResult.answers.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4">
                      All Answers
                    </h4>
                    <div className="space-y-3">
                      {selectedResult.answers.map((answer, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            Q{idx + 1}: {answer.question}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            Answer: {answer.selectedAnswer}
                          </p>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                            answer.isCorrect
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {answer.isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

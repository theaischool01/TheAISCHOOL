'use client';

import { useState, useEffect } from 'react';
import { Search, Download, Eye, ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
}

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  courseTitle: string;
  createdAt: string;
}

export default function CourseRegistrationsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchRegistrations(selectedCourse.id);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const fetchRegistrations = async (courseId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/course-registrations?courseId=${courseId}`);
      const data = await res.json();
      setRegistrations(data);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.phone.includes(searchTerm)
  );

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Year', 'Course', 'Registration Date'];
    const rows = filteredRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.college,
      reg.year,
      reg.courseTitle,
      new Date(reg.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course-registrations-${selectedCourse?.title || 'all'}.csv`;
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
            Course Registrations
          </h1>
          <p className="text-gray-500 text-sm font-semibold">
            View and manage course registrations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Course List */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-6">
              <h2 className="text-lg font-black text-[#171717] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#EE1C25]" />
                Courses
              </h2>
              <div className="space-y-2">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedCourse?.id === course.id
                        ? 'bg-[#EE1C25] text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="text-xs font-black uppercase tracking-wider mb-1">
                      {course.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Registrations Table */}
          <div className="lg:w-3/4">
            {selectedCourse ? (
              <>
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
                    Loading registrations...
                  </div>
                ) : filteredRegistrations.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-semibold">
                    No registrations found for this course.
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
                              Registration Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredRegistrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                {reg.name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {reg.email}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {reg.phone}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {new Date(reg.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => setSelectedRegistration(reg)}
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
              </>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-black text-gray-700 mb-2">
                  Select a Course
                </h3>
                <p className="text-sm text-gray-500">
                  Choose a course from the sidebar to view its registrations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRegistration(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-[#171717]">Registration Details</h3>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                  Name
                </label>
                <p className="text-sm font-semibold text-gray-900">{selectedRegistration.name}</p>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                  Email
                </label>
                <p className="text-sm text-gray-600">{selectedRegistration.email}</p>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                  Phone
                </label>
                <p className="text-sm text-gray-600">{selectedRegistration.phone}</p>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                  College
                </label>
                <p className="text-sm text-gray-600">{selectedRegistration.college}</p>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                  Year
                </label>
                <p className="text-sm text-gray-600">{selectedRegistration.year}</p>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                  Selected Course
                </label>
                <p className="text-sm font-semibold text-[#EE1C25]">{selectedRegistration.courseTitle}</p>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                  Registration Date
                </label>
                <p className="text-sm text-gray-600">
                  {new Date(selectedRegistration.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

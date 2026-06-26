import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Users, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getAdminSession();
  
  if (!session) {
    redirect('/login');
  }

  // Fetch metrics
  const [totalRegistrations, totalAssessments] = await Promise.all([
    prisma.courseRegistration.count(),
    prisma.assessmentSession.count(),
  ]);

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-[#171717] tracking-tight mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm font-semibold">
            Welcome back, {session.email}
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Course Registrations Card */}
          <Link href="/admin/course-registrations" className="group">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#EE1C25]/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-red-50 text-[#EE1C25] rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#EE1C25] group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-4xl font-black text-[#171717] mb-2">
                {totalRegistrations}
              </div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Total Course Registrations
              </div>
            </div>
          </Link>

          {/* Assessment Results Card */}
          <Link href="/admin/assessment-results" className="group">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#EE1C25]/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-red-50 text-[#EE1C25] rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#EE1C25] group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-4xl font-black text-[#171717] mb-2">
                {totalAssessments}
              </div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Total Assessment Attempts
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-black text-[#171717] mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/course-registrations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
            >
              <span>View Course Registrations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/assessment-results"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-[#171717] text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
            >
              <span>View Assessment Results</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

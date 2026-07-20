import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Users, FileText, ArrowRight, Mail, Send, Award } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getAdminSession();
  
  if (!session) {
    redirect('/login');
  }

  // Fetch metrics
  const [
    totalRegistrations,
    totalAssessments,
    totalContacts,
    totalNewsletters,
    totalHackathons
  ] = await Promise.all([
    prisma.courseRegistration.count(),
    prisma.assessmentSession.count(),
    prisma.contactRequest.count(),
    prisma.newsletterSubscriber.count(),
    prisma.hackathonRegistration.count()
  ]);

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#171717] tracking-tight mb-2 uppercase">
              Ecosystem CRM
            </h1>
            <p className="text-gray-500 text-sm font-semibold">
              Logged in as: {session.email}
            </p>
          </div>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {/* Course Registrations Card */}
          <Link href="/admin/course-registrations" className="group">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#EE1C25]/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-red-50 text-[#EE1C25] rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#EE1C25] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-3xl font-black text-[#171717] mb-1">
                {totalRegistrations}
              </div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Registrations
              </div>
            </div>
          </Link>

          {/* Assessment Results Card */}
          <Link href="/admin/assessment-results" className="group">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#EE1C25]/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-red-50 text-[#EE1C25] rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#EE1C25] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-3xl font-black text-[#171717] mb-1">
                {totalAssessments}
              </div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Assessments
              </div>
            </div>
          </Link>

          {/* Contact Requests Card */}
          <Link href="/admin/contact-requests" className="group">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#EE1C25]/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-red-50 text-[#EE1C25] rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#EE1C25] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-3xl font-black text-[#171717] mb-1">
                {totalContacts}
              </div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Contact Leads
              </div>
            </div>
          </Link>

          {/* Newsletter Card */}
          <Link href="/admin/newsletter" className="group">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#EE1C25]/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-red-50 text-[#EE1C25] rounded-xl">
                  <Send className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#EE1C25] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-3xl font-black text-[#171717] mb-1">
                {totalNewsletters}
              </div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Subscribers
              </div>
            </div>
          </Link>

          {/* Hackathon Card */}
          <Link href="/admin/hackathon" className="group">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#EE1C25]/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-red-50 text-[#EE1C25] rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#EE1C25] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-3xl font-black text-[#171717] mb-1">
                {totalHackathons}
              </div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Hackathon Teams
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions & Navigation Link Matrix */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <h2 className="text-lg font-black text-[#171717] mb-6 uppercase tracking-wider">Gateway Access Control</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/course-registrations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
            >
              <span>Course Registrations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/assessment-results"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-[#171717] text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
            >
              <span>Assessment Results</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/contact-requests"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-[#171717] text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
            >
              <span>Contact Leads</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-[#171717] text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
            >
              <span>Newsletter List</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/hackathon"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-[#171717] text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
            >
              <span>Hackathon Registrations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

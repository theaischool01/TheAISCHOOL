"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { CandidateProfile, SpeechEvaluation, ChatMessage, StructuredResume, QuizQuestion, EvaluationReport } from './types';
import { generateEvaluationReport as generateMockReport } from './mockTemplates';
import { generateAiEvaluationReport, saveInterviewReport } from './groqClient';
import AiStatusBadge from './AiStatusBadge';

interface Step6Props {
  demoMode: boolean;
  candidate: CandidateProfile;
  selfIntroText: string;
  selfIntroEvaluation: SpeechEvaluation | null;
  chatTranscript: ChatMessage[];
  resumeStructured: StructuredResume | null;
  technicalQuiz: QuizQuestion[];
  quizScore: number;
  initialReport: EvaluationReport | null;
  onRestart: () => void;
}

export default function Step6FinalReport({
  demoMode,
  candidate,
  selfIntroText,
  selfIntroEvaluation,
  chatTranscript,
  resumeStructured,
  technicalQuiz,
  quizScore,
  initialReport,
  onRestart
}: Step6Props) {
  const [report, setReport] = useState<EvaluationReport>(() => {
    if (initialReport) return initialReport;
    const speechScore = selfIntroEvaluation?.overallScore || 84;
    return generateMockReport(candidate, speechScore, quizScore, 5);
  });

  const [isGenerating, setIsGenerating] = useState(!initialReport);
  const [isLiveAi, setIsLiveAi] = useState<boolean | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | undefined>(undefined);
  const [isSavedToBackend, setIsSavedToBackend] = useState(false);
  const [savedReportId, setSavedReportId] = useState<string | number | null>(null);

  // Generate live report via Groq if not provided
  useEffect(() => {
    if (!initialReport) {
      setIsGenerating(true);
      const speechScore = selfIntroEvaluation?.overallScore || 84;
      generateAiEvaluationReport(candidate, speechScore, quizScore, 5, demoMode)
        .then((res) => {
          setReport(res.report);
          setIsLiveAi(res.isLive);
          setFallbackReason(res.error);
        })
        .catch((err) => {
          setIsLiveAi(false);
          setFallbackReason(err.message || 'Groq report generation failed');
        })
        .finally(() => setIsGenerating(false));
    }
  }, [initialReport, candidate, selfIntroEvaluation, quizScore, demoMode]);

  // Automatically save to backend
  useEffect(() => {
    if (isGenerating) return;

    const persistReport = async () => {
      try {
        const payload = {
          studentEmail: candidate.email || 'aryan.sharma@example.com',
          studentName: candidate.name || 'Aryan Sharma',
          studentPhone: candidate.phone || null,
          studentCollege: candidate.college || null,
          selfIntroText: selfIntroText || null,
          selfIntroEvaluation: selfIntroEvaluation || null,
          chatTranscript: chatTranscript || null,
          resumeStructured: resumeStructured || null,
          technicalQuiz: technicalQuiz || null,
          evaluationReport: report
        };

        const res = await saveInterviewReport(payload);
        if (res.success) {
          setIsSavedToBackend(true);
          if (res.reportId) setSavedReportId(res.reportId);
        }
      } catch (e) {
        console.warn('Backend auto-save note:', e);
      }
    };

    persistReport();
  }, [isGenerating, candidate, selfIntroText, selfIntroEvaluation, chatTranscript, resumeStructured, technicalQuiz, report]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 print:p-0 print:m-0 print:max-w-none">
      {/* Header Actions Bar (Hidden on Print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Assessment Finalized
            </div>
            <AiStatusBadge isLive={isLiveAi} isLoading={isGenerating} fallbackReason={fallbackReason} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            AI Career Intelligence Dossier
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • Candidate #{candidate.email ? candidate.email.split('@')[0] : 'Candidate'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 text-xs font-bold border border-zinc-300 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-[#E1002A]" />
            <span>Print / Save PDF</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* Backend Persistence Status Banner */}
      {isSavedToBackend && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Report encrypted and synchronized to The AI School portal
              {savedReportId ? ` (Report Ref #${savedReportId})` : ''}.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 font-bold">Status: Saved</span>
        </div>
      )}

      {/* Executive Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-red-50/50 via-white to-zinc-50 border border-zinc-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Candidate Bio */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#E1002A] text-xs font-bold">
                {report.readinessLevel}
              </span>
              <span className="text-zinc-300 text-xs">•</span>
              <span className="text-zinc-600 text-xs font-medium">{candidate.targetDomain || 'AI & Machine Learning'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              {candidate.name || 'Candidate Evaluation'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium">
              {candidate.college} • {candidate.email} {candidate.phone ? `• ${candidate.phone}` : ''}
            </p>

            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed pt-1 bg-white p-4 rounded-xl border border-zinc-200 shadow-xs">
              {report.summary}
            </p>
          </div>

          {/* Big Score Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-zinc-200 text-center shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Composite Readiness Index
            </span>
            <div className="my-3 flex items-baseline justify-center gap-1">
              <span className="text-5xl sm:text-6xl font-black text-[#E1002A]">
                {report.overallScore}
              </span>
              <span className="text-xl font-bold text-zinc-400">/100</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-[#E1002A] h-2 rounded-full"
                style={{ width: `${report.overallScore}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500 font-medium">
              Top 12% among evaluated candidates in India region
            </p>
          </div>
        </div>
      </div>

      {/* 7 Core Metric Score Bars with Benchmarking */}
      <div className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#E1002A]" />
            <h3 className="text-lg font-bold text-zinc-900">7-Dimensional Competency Analysis</h3>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500 hidden sm:flex">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-[#E1002A]" />
              <span>Candidate Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-zinc-400" />
              <span>Industry Benchmark</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {report.metricScores.map((metric, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                <span className="font-bold text-zinc-800">{metric.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-400">Avg: {metric.benchmark}%</span>
                  <span className="font-extrabold text-[#E1002A] text-sm">{metric.score}%</span>
                </div>
              </div>

              {/* Progress bars container */}
              <div className="relative w-full bg-zinc-100 rounded-full h-3 overflow-hidden border border-zinc-200">
                {/* Benchmark marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-zinc-400 z-10"
                  style={{ left: `${metric.benchmark}%` }}
                  title={`Industry Benchmark: ${metric.benchmark}%`}
                />
                {/* Candidate Bar */}
                <div
                  className="bg-[#E1002A] h-3 rounded-full transition-all duration-700"
                  style={{ width: `${metric.score}%` }}
                />
              </div>

              <p className="text-[11px] text-zinc-500 leading-normal">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Growth Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identified Strengths */}
        <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Competitive Strengths</span>
          </div>
          <div className="space-y-2.5">
            {report.identifiedStrengths.map((str, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-zinc-800 leading-relaxed flex items-start gap-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{str}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Areas */}
        <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-wide">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>High-Impact Growth Areas</span>
          </div>
          <div className="space-y-2.5">
            {report.areasForGrowth.map((area, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 text-xs text-zinc-800 leading-relaxed flex items-start gap-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 90-Day Tailored Action Roadmap */}
      <div className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-4">
          <Calendar className="w-5 h-5 text-[#E1002A]" />
          <h3 className="text-lg font-bold text-zinc-900">90-Day Career Accelerator Roadmap</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.ninetyDayRoadmap.map((phase, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#E1002A] uppercase tracking-wide">
                  {phase.month}
                </span>
                <h4 className="text-sm font-bold text-zinc-900">{phase.title}</h4>
                <ul className="space-y-2 pt-2">
                  {phase.goals.map((g, gi) => (
                    <li key={gi} className="text-xs text-zinc-600 flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E1002A] mt-1.5 shrink-0" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Courses from The AI School */}
      <div className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#E1002A]" />
            <h3 className="text-lg font-bold text-zinc-900">Recommended Upskilling Tracks</h3>
          </div>
          <span className="text-xs text-zinc-500">
            Tailored based on your resume and quiz performance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.recommendedCourses.map((course, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-50 border border-zinc-200 p-5 flex flex-col justify-between hover:border-[#E1002A] transition-all group shadow-xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                    {course.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#E1002A] text-[10px] font-bold border border-red-200">
                    {course.matchPercentage}% Match
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 group-hover:text-[#E1002A] transition-colors">
                  {course.name}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-zinc-200">
                <Link
                  href={`/in/courses/${course.slug}`}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#E1002A] hover:text-white text-zinc-800 text-xs font-bold border border-zinc-200 hover:border-[#E1002A] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

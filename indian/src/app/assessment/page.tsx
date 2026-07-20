'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, UploadCloud, FileText, Sparkles, Brain, Cpu, 
  BarChart3, GraduationCap, CheckCircle2, 
  XCircle, Loader2, Globe, Mail, Award, Zap, TrendingUp,
  Star, ChevronRight, Info
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

const slugToTitleMap: Record<string, string> = {
  'building-your-ai-agent-for-coders': 'Building Your AI Agent (For Coders)',
  'building-and-deploying-ai-agents': 'Building & Deploying AI Agents (No-Code)',
  'ai-agent-chatbot-creation': 'AI Agent Chatbot Creation (For All)',
  'prompt-engineering-101': 'Prompt Engineering 101',
  'data-analysis-with-ai-and-powerbi': 'Data Analysis with AI and PowerBI (For All)',
  'python-for-data-analytics': 'Python for Data Analytics (For Coders)',
  'ai-cloud-engineer': 'AI Cloud Engineer (For All)',
  'cyber-security-with-ai': 'Cyber Security with AI (For All)',
  'mobile-app-development': 'Mobile App Development (For Coders)',
  'no-code-ai-web-development': 'No-Code AI Web Development (For All)',
  'digital-marketing-and-lead-generation': 'Digital Marketing & Lead Gen (For All)',
};

const courseSkillsGained: Record<string, string[]> = {
  'building-your-ai-agent-for-coders': ['LangChain / LangGraph', 'Agentic Pipelines', 'API Tool Calling', 'Vector Stores', 'LLM Fine-tuning'],
  'building-and-deploying-ai-agents': ['No-Code Agent Builders', 'Automation Workflows', 'Zapier & Make', 'AI Chatbot Deployment', 'Webhook Integration'],
  'ai-agent-chatbot-creation': ['Chatbot Design', 'Conversation Flows', 'NLP Basics', 'Dialog Management', 'Multi-channel Deployment'],
  'prompt-engineering-101': ['Prompt Design Patterns', 'Chain-of-Thought', 'Few-Shot Learning', 'RAG Techniques', 'LLM Optimization'],
  'data-analysis-with-ai-and-powerbi': ['Power BI Dashboards', 'DAX Formulas', 'AI Insights', 'Data Modeling', 'Report Publishing'],
  'python-for-data-analytics': ['Pandas & NumPy', 'Matplotlib / Seaborn', 'Statistical Analysis', 'Data Cleaning', 'Exploratory Analysis'],
  'ai-cloud-engineer': ['AWS / Azure / GCP', 'Model Deployment', 'Containerization', 'MLOps Pipelines', 'Cloud Security'],
  'cyber-security-with-ai': ['AI Threat Detection', 'Ethical Hacking Basics', 'Network Defense', 'SIEM Tools', 'Incident Response'],
  'mobile-app-development': ['React Native', 'Flutter Basics', 'App Store Deployment', 'Mobile UI/UX', 'Push Notifications'],
  'no-code-ai-web-development': ['Webflow / Framer', 'AI Website Builders', 'SEO Optimization', 'CMS Integration', 'Web Performance'],
  'digital-marketing-and-lead-generation': ['AI Ad Copy', 'Funnel Design', 'CRM Automation', 'Performance Analytics', 'Lead Scoring'],
};

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Question {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  explanation?: string;
  options: { id: string; text: string }[];
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getConfidenceLabel(confidence: number): { label: string; bgClass: string; textClass: string; dotClass: string } {
  if (confidence >= 75) return { label: 'High Match', bgClass: 'bg-emerald-50 border-emerald-200', textClass: 'text-emerald-700', dotClass: 'bg-emerald-500' };
  if (confidence >= 55) return { label: 'Strong Match', bgClass: 'bg-red-50 border-red-200', textClass: 'text-[#EE1C25]', dotClass: 'bg-[#EE1C25]' };
  return { label: 'Moderate Match', bgClass: 'bg-amber-50 border-amber-200', textClass: 'text-amber-700', dotClass: 'bg-amber-500' };
}

// ─── SVG RADAR CHART ─────────────────────────────────────────────────────────

function RadarChart({ scores }: {
  scores: { technicalFoundation: number; aiReadiness: number; industryReadiness: number; learningVelocity: number; overall: number };
}) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 100;
  const labelOffset = 30; // increased for larger font

  const axes = [
    { label: 'AI Readiness', value: scores.aiReadiness },
    { label: 'Tech Foundation', value: scores.technicalFoundation },
    { label: 'Industry Ready', value: scores.industryReadiness },
    { label: 'Learning Velocity', value: scores.learningVelocity },
    { label: 'Overall Score', value: scores.overall },
  ];

  const n = axes.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / 100) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const getOuterPoint = (index: number, extra = 0) => {
    const angle = startAngle + index * angleStep;
    const r = radius + labelOffset + extra;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const rings = [25, 50, 75, 100];

  const dataPath = axes.map((ax, i) => {
    const p = getPoint(i, ax.value);
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }).join(' ') + ' Z';

  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        ref={ref}
        width="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible max-w-[280px]"
        aria-label="Career competency radar chart"
      >
        {/* Ring grids */}
        {rings.map((ring) => {
          const ringPath = axes.map((_, i) => {
            const p = getPoint(i, ring);
            return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
          }).join(' ') + ' Z';
          return (
            <path
              key={ring}
              d={ringPath}
              fill="none"
              stroke={ring === 100 ? '#cbd5e1' : '#e2e8f0'}
              strokeWidth={ring === 100 ? 1.5 : 0.8}
            />
          );
        })}

        {/* Ring % labels at 50 and 100 */}
        {[50, 100].map((ring) => {
          const p = getPoint(0, ring);
          return (
            <text
              key={`ring-label-${ring}`}
              x={cx + 3}
              y={p.y - 3}
              fontSize={9}
              fill="#94a3b8"
              fontWeight="600"
            >
              {ring}%
            </text>
          );
        })}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const outer = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={outer.x} y2={outer.y}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill="#EE1C25"
          fillOpacity={animated ? 0.2 : 0}
          stroke="#EE1C25"
          strokeWidth={2.5}
          style={{ transition: 'fill-opacity 0.9s ease' }}
        />

        {/* Data point circles */}
        {axes.map((ax, i) => {
          const p = getPoint(i, ax.value);
          return (
            <circle
              key={i}
              cx={p.x} cy={p.y} r={5}
              fill="#EE1C25"
              opacity={animated ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${i * 0.12}s` }}
            />
          );
        })}

        {/* Axis labels — 12px minimum */}
        {axes.map((ax, i) => {
          const lp = getOuterPoint(i);
          return (
            <text
              key={i}
              x={lp.x}
              y={lp.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fontWeight="700"
              fill="#64748b"
              letterSpacing="0.03em"
            >
              {ax.label}
            </text>
          );
        })}

        {/* Value labels */}
        {axes.map((ax, i) => {
          const p = getPoint(i, ax.value);
          const angle = startAngle + i * angleStep;
          const offset = 14;
          return (
            <text
              key={i}
              x={p.x + Math.cos(angle) * offset}
              y={p.y + Math.sin(angle) * offset}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={10}
              fontWeight="900"
              fill="#EE1C25"
              opacity={animated ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${i * 0.12 + 0.3}s` }}
            >
              {ax.value}%
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const [step, setStep] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '',
    degree: '', graduationYear: '',
    linkedinUrl: '', githubUrl: '', portfolioUrl: '',
    source: 'Homepage CTA',
  });

  // Resume
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeStatus, setResumeStatus] = useState<'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'>('PENDING');
  const [skillsMatrix, setSkillsMatrix] = useState<Record<string, boolean>>({
    python: false, sql: false, machineLearning: false, react: false,
    generativeAi: false, cloud: false, dataAnalytics: false, problemSolving: false,
  });

  // Interests
  const [interests, setInterests] = useState({
    GenAI: 50, DataScience: 50, Cloud: 50, Coding: 50, Business: 50,
  });

  // Quiz state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  // ── NEW: skip tracking and answer-saved feedback ──
  const [skippedQuestions, setSkippedQuestions] = useState<Set<string>>(new Set());
  const [answerSaved, setAnswerSaved] = useState(false);

  // Results
  const [scores, setScores] = useState({
    technicalFoundation: 0, aiReadiness: 0,
    industryReadiness: 0, learningVelocity: 0, overall: 0,
  });
  const [skillGap, setSkillGap] = useState<{ currentSkills: string[]; missingSkills: string[] }>({
    currentSkills: [], missingSkills: [],
  });
  const [primaryCourse, setPrimaryCourse] = useState({ slug: '', title: '', confidence: 0 });
  const [secondaryCourses, setSecondaryCourses] = useState<{ slug: string; title: string; confidence: number }[]>([]);

  // ── Derived quiz counts ──────────────────────────────────────────────────
  const answeredCount = questions.filter(
    (q) => selectedAnswers[q.id] && !skippedQuestions.has(q.id)
  ).length;
  const skippedCount = skippedQuestions.size;
  const totalQuestions = questions.length || 10;
  const handledCount = answeredCount + skippedCount;
  const remainingCount = Math.max(0, totalQuestions - handledCount);

  // Can submit if on last question OR all questions have been handled
  const canSubmit =
    currentQuestionIndex >= totalQuestions - 1 ||
    handledCount >= totalQuestions;

  // ── Live recommendation preview for Step 5 ───────────────────────────────
  const getLiveRecommendation = (): string => {
    const map: Record<string, number> = {
      'AI Agents & GenAI': interests.GenAI,
      'Data Analytics': interests.DataScience,
      'Cloud & Security': interests.Cloud,
      'Coding & Dev': interests.Coding,
      'Business Growth': interests.Business,
    };
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0][0];
  };

  // ── Recommendation signals for Step 8 ───────────────────────────────────
  const getRecommendationSignals = (): string[] => {
    const signals: string[] = [];
    const detected = Object.entries(skillsMatrix)
      .filter(([, v]) => v)
      .map(([k]) => k.replace(/([A-Z])/g, ' $1').trim());
    if (detected.length > 0) {
      signals.push(`${detected.slice(0, 2).join(' & ')} detected in resume`);
    }
    const topInterest = Object.entries(interests).sort((a, b) => b[1] - a[1])[0];
    if (topInterest[1] >= 65) signals.push(`Strong ${topInterest[0]} interest (${topInterest[1]}%)`);
    else if (topInterest[1] >= 45) signals.push(`Solid ${topInterest[0]} interest`);
    if (scores.technicalFoundation >= 70) signals.push('High quiz performance');
    else if (scores.technicalFoundation >= 40) signals.push('Solid quiz performance');
    if (formData.linkedinUrl || formData.githubUrl) signals.push('Professional profile provided');
    if (resumeUrl) signals.push('Resume successfully analysed');
    if (signals.length === 0) signals.push('Interest profile alignment', 'Career goal assessment');
    return signals;
  };

  // ── Handlers ─────────────────────────────────────────────────────────────

  const getDifficulty = () => {
    if (skillsMatrix.python || skillsMatrix.machineLearning || skillsMatrix.generativeAi) return 'Intermediate';
    return 'Beginner';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
    setUploading(true);
    setResumeStatus('PROCESSING');
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await fetch('/api/assessment/parse', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) {
        setSkillsMatrix(result.skills);
        setResumeStatus('COMPLETED');
        setResumeUrl(`https://uploadthing.com/f/${Math.random().toString(36).substring(7)}_${file.name}`);
      } else {
        setResumeStatus('FAILED');
      }
    } catch {
      setResumeStatus('FAILED');
    } finally {
      setUploading(false);
    }
  };

  const startQuiz = async () => {
    setLoadingQuestions(true);
    setStep(6);
    // Reset quiz state
    setCurrentQuestionIndex(0);
    setSkippedQuestions(new Set());
    setAnswerSaved(false);
    try {
      const res = await fetch(`/api/assessment/questions?difficulty=${getDifficulty()}`);
      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // ── NEW: handle answer selection with feedback ────────────────────────────
  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    // Un-skip if user goes back and answers a skipped question
    setSkippedQuestions((prev) => {
      const next = new Set(prev);
      next.delete(questionId);
      return next;
    });
    setAnswerSaved(true);
    setTimeout(() => setAnswerSaved(false), 1300);
  };

  // ── NEW: skip question ────────────────────────────────────────────────────
  const handleSkipQuestion = () => {
    const qId = questions[currentQuestionIndex].id;
    setSkippedQuestions((prev) => new Set([...prev, qId]));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // ── UNCHANGED: submit & score logic ─────────────────────────────────────
  const submitAssessment = async () => {
    setStep(7);

    const correctAnswersCount = Object.keys(selectedAnswers).filter(() => Math.random() > 0.3).length;
    const technicalFoundation = Math.round((correctAnswersCount / 10) * 100);
    const aiReadiness = Math.round((interests.GenAI * 0.5) + (interests.Coding * 0.2) + (technicalFoundation * 0.3));

    let compScore = 40;
    if (formData.linkedinUrl) compScore += 20;
    if (formData.githubUrl) compScore += 20;
    if (resumeUrl) compScore += 20;
    const industryReadiness = Math.round((compScore * 0.4) + (technicalFoundation * 0.6));
    const learningVelocity = Math.round((interests.Coding * 0.4) + (technicalFoundation * 0.6));
    const overall = Math.round((technicalFoundation + aiReadiness + industryReadiness + learningVelocity) / 4);

    const calculatedScores = { technicalFoundation, aiReadiness, industryReadiness, learningVelocity, overall };

    const categoryScores: Record<string, number> = {
      'AI Agents & GenAI': interests.GenAI * 0.7 + (skillsMatrix.python ? 30 : 0),
      'Data Analytics': interests.DataScience * 0.7 + (skillsMatrix.sql ? 30 : 0),
      'Cloud & Security': interests.Cloud * 0.7 + (skillsMatrix.cloud ? 30 : 0),
      'Programming': interests.Coding * 0.7 + (skillsMatrix.react ? 30 : 0),
      'Business & Growth': interests.Business * 0.7,
    };

    const sortedCats = Object.entries(categoryScores).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCats[0][0];

    let primary = { slug: 'building-your-ai-agent-for-coders', title: slugToTitleMap['building-your-ai-agent-for-coders'], confidence: 91 };
    let secondaries = [
      { slug: 'ai-agent-chatbot-creation', title: slugToTitleMap['ai-agent-chatbot-creation'], confidence: 84 },
      { slug: 'building-and-deploying-ai-agents', title: slugToTitleMap['building-and-deploying-ai-agents'], confidence: 78 },
    ];

    if (topCategory === 'Data Analytics') {
      primary = { slug: 'data-analysis-with-ai-and-powerbi', title: slugToTitleMap['data-analysis-with-ai-and-powerbi'], confidence: Math.round(sortedCats[0][1]) };
      secondaries = [{ slug: 'python-for-data-analytics', title: slugToTitleMap['python-for-data-analytics'], confidence: 80 }];
    } else if (topCategory === 'Cloud & Security') {
      primary = { slug: 'ai-cloud-engineer', title: slugToTitleMap['ai-cloud-engineer'], confidence: Math.round(sortedCats[0][1]) };
      secondaries = [{ slug: 'cyber-security-with-ai', title: slugToTitleMap['cyber-security-with-ai'], confidence: 75 }];
    } else if (topCategory === 'Programming') {
      primary = { slug: 'no-code-ai-web-development', title: slugToTitleMap['no-code-ai-web-development'], confidence: Math.round(sortedCats[0][1]) };
      secondaries = [{ slug: 'mobile-app-development', title: slugToTitleMap['mobile-app-development'], confidence: 79 }];
    } else if (topCategory === 'Business & Growth') {
      primary = { slug: 'digital-marketing-and-lead-generation', title: slugToTitleMap['digital-marketing-and-lead-generation'], confidence: Math.round(sortedCats[0][1]) };
      secondaries = [{ slug: 'ai-agent-chatbot-creation', title: slugToTitleMap['ai-agent-chatbot-creation'], confidence: 74 }];
    }

    setPrimaryCourse(primary);
    setSecondaryCourses(secondaries);

    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q.id,
        selectedAnswer: selectedAnswers[q.id] || '',
        score: Math.random() > 0.3 ? 10 : 0,
      }));
      await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData, resumeUrl, resumeStatus, skillsMatrix,
          candidateProfile: getDifficulty(), interestVector: interests,
          answers: formattedAnswers, scores: calculatedScores,
        }),
      });
    } catch (e) {
      console.error('Failed to record lead in database:', e);
    }

    setTimeout(() => {
      setScores(calculatedScores);
      const skillList = [
        { key: 'python', label: 'Python' }, { key: 'sql', label: 'SQL' },
        { key: 'machineLearning', label: 'Machine Learning' }, { key: 'react', label: 'React / Frontend' },
        { key: 'generativeAi', label: 'Generative AI' }, { key: 'cloud', label: 'Cloud Deployments' },
        { key: 'dataAnalytics', label: 'Data Analytics' },
      ];
      const current: string[] = [];
      const missing: string[] = [];
      skillList.forEach((sk) => {
        if (skillsMatrix[sk.key]) current.push(sk.label);
        else missing.push(sk.label);
      });
      setSkillGap({ currentSkills: current, missingSkills: missing });
      setStep(8);
    }, 2500);
  };

  // ── Progress bar logic ────────────────────────────────────────────────────
  const getProgressStep = () => {
    if (step <= 1 || step >= 8) return 0;
    return step - 1;
  };

  // ── Shared classes ────────────────────────────────────────────────────────
  const inputClass = 'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400';
  const stepBadgeClass = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider mb-3 shadow-sm';
  const backBtnClass = 'border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-sm text-slate-600 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all';
  const nextBtnClass = 'bg-[#EE1C25] hover:bg-[#d61920] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-lg hover:shadow-red-500/20 flex items-center gap-2';

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <main className="relative w-full bg-[#FCFCFD] text-slate-900 min-h-screen font-sans selection:bg-[#EE1C25]/20 overflow-hidden">
      <Header />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 18% 8%, rgba(238,28,37,0.055), transparent 34%), radial-gradient(ellipse at 84% 24%, rgba(238,28,37,0.045), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.96), rgba(252,252,253,1))',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(238,28,37,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(238,28,37,.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] bg-repeat bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-28">

        {/* ── PROGRESS TRACKER ── */}
        {step > 1 && step < 8 && (
          <div className="mb-12 max-w-xl mx-auto">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold uppercase tracking-wider mb-3">
              <span>Step {getProgressStep()} of 6</span>
              <span>{Math.round((getProgressStep() / 6) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-white border border-slate-200 rounded-full overflow-hidden shadow-sm">
              <div
                className="h-full bg-gradient-to-r from-[#EE1C25] to-[#d61920] transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(getProgressStep() / 6) * 100}%` }}
              />
            </div>
            {/* Step label strip — 12px minimum */}
            <div className="flex justify-between mt-2">
              {['Basic Info', 'Profile', 'Skills', 'Interests', 'Quiz', 'Results'].map((label, i) => (
                <span
                  key={label}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors hidden sm:block ${
                    i + 1 <= getProgressStep() ? 'text-[#EE1C25]' : 'text-slate-400'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 1 — WELCOME
        ═══════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="text-center py-12 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#EE1C25] animate-pulse" />
              <span>AI Career Intelligence Portal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tight leading-tight max-w-2xl mx-auto bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#64748B] bg-clip-text text-transparent">
              Discover Your AI Career Path
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
              Receive personalized recommendations based on your skills, interests, and career goals.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setStep(2)}
                className="bg-[#EE1C25] hover:bg-[#d61920] text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-red-500/20 flex items-center gap-2 group cursor-pointer"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto border-t border-slate-200">
              {[
                { icon: Brain, title: 'Resume Intelligence', desc: 'Extract existing skills & tool expertise instantly.' },
                { icon: Cpu, title: 'Adaptive Assessment', desc: 'Adaptive difficulty based on your domain.' },
                { icon: BarChart3, title: 'Career Alignment', desc: 'Mapped to primary/secondary learning paths.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center p-4">
                  <Icon className="w-8 h-8 text-[#EE1C25] mb-3" />
                  <span className="text-sm font-bold text-slate-900 mb-1">{title}</span>
                  <span className="text-xs text-slate-600">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 2 — BASIC INFORMATION
        ═══════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-8 backdrop-blur-md space-y-6">
            <div>
              <div className={stepBadgeClass}>
                <Mail className="w-3 h-3" />
                <span>Step 1 of 6 — Basic Information</span>
              </div>
              <h2 className="text-2xl font-black font-heading text-slate-900">Who are you?</h2>
              <p className="text-sm text-slate-600 mt-1">Quick intro — takes less than a minute.</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">Full Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. John Doe" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">Email Address *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="e.g. john@example.com" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                  Mobile Number *
                  <span className="ml-2 text-slate-600 font-medium normal-case tracking-normal">Used only to share your results</span>
                </label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="e.g. +91 98765 43210" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                  College / Organization *
                  <span className="ml-2 text-slate-600 font-medium normal-case tracking-normal">Personalises your career map</span>
                </label>
                <input type="text" name="college" required value={formData.college} onChange={handleInputChange} placeholder="e.g. IIT Delhi" className={inputClass} />
              </div>
              <div className="md:col-span-2 border-t border-slate-200 pt-6">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">Where did you hear about us? *</label>
                <select name="source" value={formData.source} onChange={handleInputChange} className={inputClass + ' appearance-none'}>
                  <option value="Homepage CTA">Homepage CTA</option>
                  <option value="Assessment CTA">Assessment CTA</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Referral">Referral</option>
                  <option value="Direct">Direct</option>
                </select>
              </div>
              <div className="md:col-span-2 pt-4 flex justify-between">
                <button type="button" onClick={() => setStep(1)} className={backBtnClass}>Back</button>
                <button type="submit" className={nextBtnClass}>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 3 — PROFESSIONAL PROFILE + RESUME
            P1: Two distinct sections — Required vs Optional
        ═══════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-8 backdrop-blur-md space-y-8">
            <div>
              <div className={stepBadgeClass}>
                <GraduationCap className="w-3 h-3" />
                <span>Step 2 of 6 — Professional Profile</span>
              </div>
              <h2 className="text-2xl font-black font-heading text-slate-900">Your academic background</h2>
              <p className="text-sm text-slate-600 mt-1">Helps personalise your career intelligence graph.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep(4); }}>
              {/* ── REQUIRED SECTION ── */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EE1C25]" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Required Information</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">Degree *</label>
                    <input type="text" name="degree" required value={formData.degree} onChange={handleInputChange} placeholder="e.g. B.Tech Computer Science" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">Graduation Year *</label>
                    <input type="text" name="graduationYear" required value={formData.graduationYear} onChange={handleInputChange} placeholder="e.g. 2026" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* ── OPTIONAL SECTION ── */}
              <div className="mt-8 border border-dashed border-slate-200 rounded-2xl p-6 space-y-5 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Optional Profile Boosters</span>
                    </div>
                    <p className="text-xs text-slate-400">These sections are optional and only improve recommendation accuracy.</p>
                  </div>
                  <button
                    type="submit"
                    className="text-xs font-black text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors shrink-0 underline underline-offset-2 decoration-slate-300 hover:decoration-white"
                  >
                    Skip Optional Section
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Social links */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 block">Social Links</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <svg className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                      <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} placeholder="LinkedIn URL" className={inputClass + ' pl-10 text-xs'} />
                    </div>
                    <div className="relative">
                      <svg className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                      <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} placeholder="GitHub URL" className={inputClass + ' pl-10 text-xs'} />
                    </div>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" />
                      <input type="url" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleInputChange} placeholder="Portfolio URL" className={inputClass + ' pl-10 text-xs'} />
                    </div>
                  </div>
                </div>

                {/* Resume upload */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Resume Upload (PDF or DOCX)</span>
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" /> Boosts AI readiness score
                    </span>
                  </div>
                  <div className="border-2 border-dashed border-slate-200 hover:border-[#EE1C25] bg-white rounded-2xl p-5 transition-colors flex flex-col items-center justify-center text-center relative cursor-pointer group">
                    <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-7 h-7 text-[#EE1C25] animate-spin" />
                        <span className="text-sm font-bold text-slate-700">Uploading & extracting skills...</span>
                      </div>
                    ) : resumeFile ? (
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${resumeStatus === 'COMPLETED' ? 'bg-emerald-500/10' : resumeStatus === 'FAILED' ? 'bg-red-500/10' : 'bg-slate-100'}`}>
                          {resumeStatus === 'COMPLETED' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : resumeStatus === 'FAILED' ? <XCircle className="w-5 h-5 text-red-400" /> : <FileText className="w-5 h-5 text-[#EE1C25]" />}
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-black text-slate-900">{resumeFile.name}</p>
                          <p className={`text-xs font-bold mt-0.5 ${resumeStatus === 'COMPLETED' ? 'text-emerald-500' : resumeStatus === 'FAILED' ? 'text-red-400' : 'text-slate-600'}`}>
                            {resumeStatus === 'COMPLETED' ? '✓ Skills extracted successfully' : resumeStatus === 'FAILED' ? '✗ Extraction failed — you can still continue' : `Status: ${resumeStatus}`}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-9 h-9 text-slate-600 group-hover:text-[#EE1C25] transition-colors mb-2" />
                        <span className="text-sm font-bold text-slate-700">Drag and drop or click to upload</span>
                        <span className="text-xs text-slate-400 mt-1">PDF or DOCX — up to 10MB</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button type="button" onClick={() => setStep(2)} className={backBtnClass}>Back</button>
                <button type="submit" className={nextBtnClass}>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 4 — SKILL MATRIX
            P2: Neutral empty state for no-resume users
        ═══════════════════════════════════════════════════════════ */}
        {step === 4 && (
          <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-8 backdrop-blur-md space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <Brain className="w-12 h-12 text-[#EE1C25] mx-auto animate-pulse" />
              <div className={stepBadgeClass + ' justify-center'}>
                <span>Step 3 of 6 — Skill Matrix</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight font-heading">
                {resumeFile ? 'Rule-Based Skill Extraction' : 'Your Starting Point'}
              </h2>
              <p className="text-sm text-slate-600">
                {resumeFile
                  ? 'Our parser has completed reading your profile metadata. Here is your initial skill matrix.'
                  : "No resume uploaded — that's totally fine. We'll build your profile through the assessment."}
              </p>
            </div>

            {/* ── No-resume neutral state ── */}
            {!resumeFile ? (
              <div className="max-w-md mx-auto space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
                    <Brain className="w-7 h-7 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-3">We&apos;ll estimate your strengths through:</p>
                    <div className="space-y-2 text-left">
                      {[
                        'Interest Profile — your career preferences',
                        'Technical Assessment — adaptive quiz results',
                        'Academic Background — degree & experience',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-200">
                    You can still receive an accurate recommendation without a resume.
                  </p>
                </div>
              </div>
            ) : (
              /* ── Resume skill grid ── */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(skillsMatrix).map(([key, val]) => (
                  <div
                    key={key}
                    onClick={() => setSkillsMatrix((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center justify-center gap-2 cursor-pointer select-none ${
                      val ? 'bg-[#EE1C25]/5 border-[#EE1C25]/40 text-slate-900 shadow-lg shadow-red-500/10' : 'bg-white border-slate-200 hover:border-slate-300 text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {val ? <CheckCircle2 className="w-5 h-5 text-[#EE1C25]" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200 transition-colors" />}
                    <span className="text-xs font-extrabold uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Difficulty tier — shown on all screen sizes */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Candidate Difficulty Tier</span>
                <span className="text-sm font-black text-slate-900">{getDifficulty()} Assessment Track</span>
              </div>
              <span className="text-xs font-medium text-slate-600 sm:max-w-xs sm:text-right">
                {getDifficulty() === 'Intermediate'
                  ? 'Python/ML/AI detected — intermediate questions will test logic structures.'
                  : 'Foundational questions will assess core logic and problem-solving aptitude.'}
              </span>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(3)} className={backBtnClass}>Back</button>
              <button onClick={() => setStep(5)} className={nextBtnClass}>
                <span>Continue to Interests</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 5 — INTEREST PROFILE
            P1: Renamed, endpoint labels, live preview
        ═══════════════════════════════════════════════════════════ */}
        {step === 5 && (
          <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-8 backdrop-blur-md space-y-8">
            <div>
              <div className={stepBadgeClass}>
                <span>Step 4 of 6 — Career Interests</span>
              </div>
              <h2 className="text-2xl font-black font-heading text-slate-900">What would you like to learn?</h2>
              <p className="text-sm text-slate-600 mt-1">
                Your selections directly influence your course recommendation. Drag each slider to reflect your interest level.
              </p>
            </div>

            {/* ── Live recommendation preview ── */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200">
              <Sparkles className="w-4 h-4 text-[#EE1C25] shrink-0" />
              <div className="text-sm">
                <span className="text-slate-600 font-medium">Based on current selections: </span>
                <span className="font-black text-slate-900">{getLiveRecommendation()}</span>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { name: 'GenAI', label: 'Generative AI & Agentic Architectures', desc: 'Autonomous agents, Prompt Engineering, LLM setups' },
                { name: 'DataScience', label: 'Data Analytics & Statistics', desc: 'Power BI dashboarding, SQL, database mining' },
                { name: 'Cloud', label: 'Cloud Engineering & Cybersecurity', desc: 'Model containerisation, server scalability, defence triggers' },
                { name: 'Coding', label: 'Software Coding & Development', desc: 'React Native, frontend apps, Python systems' },
                { name: 'Business', label: 'AI Business Automation & Growth', desc: 'AI CRM setups, Growth Marketing, lead scaling' },
              ].map((item) => (
                <div key={item.name} className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-sm font-black text-slate-900 tracking-wide block">{item.label}</span>
                      <span className="text-xs text-slate-600 font-medium block mt-0.5">{item.desc}</span>
                    </div>
                    <span className="font-mono text-sm font-black text-[#EE1C25] shrink-0">
                      {interests[item.name as keyof typeof interests]}%
                    </span>
                  </div>
                  {/* Endpoint labels */}
                  <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
                    <span>Not interested</span>
                    <span>Top priority</span>
                  </div>
                  {/* Larger touch target wrapper */}
                  <div className="py-2">
                    <input
                      type="range" min="0" max="100"
                      value={interests[item.name as keyof typeof interests]}
                      onChange={(e) => setInterests((prev) => ({ ...prev, [item.name]: parseInt(e.target.value) }))}
                      className="w-full accent-[#EE1C25] h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                      style={{ minHeight: '20px' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(4)} className={backBtnClass}>Back</button>
              <button onClick={startQuiz} className={nextBtnClass + ' cursor-pointer'}>
                <span>Start Technical Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 6 — TECHNICAL QUIZ
            P0: Skip, progress counter, answer feedback, bigger bar
        ═══════════════════════════════════════════════════════════ */}
        {step === 6 && (
          <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-8 backdrop-blur-md space-y-6">
            {loadingQuestions ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-10 h-10 text-[#EE1C25] animate-spin" />
                <span className="text-sm text-slate-700 font-bold">Fetching adaptive question bank...</span>
              </div>
            ) : questions.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <span className="text-sm text-slate-600 font-bold">No questions matched. Let&apos;s retry.</span>
                <button onClick={startQuiz} className="bg-[#EE1C25] text-white px-6 py-3.5 rounded-xl font-bold text-sm">Retry</button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={stepBadgeClass}>
                  <span>Step 5 of 6 — Technical Quiz</span>
                </div>

                {/* ── Enhanced progress bar + counter ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                      Topic: {questions[currentQuestionIndex].category}
                    </span>
                  </div>

                  {/* Progress bar — h-3 */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#EE1C25] to-[#d61920] transition-all duration-400 rounded-full"
                      style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% through quiz</span>
                  </div>

                  {/* ── Answered / Skipped / Remaining pills ── */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs font-black text-emerald-400">Answered: {answeredCount}</span>
                    </div>
                    {skippedCount > 0 && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs font-black text-amber-400">Skipped: {skippedCount}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                      <span className="text-xs font-black text-slate-600">Remaining: {remainingCount}</span>
                    </div>
                  </div>
                </div>

                {/* ── Question text ── */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-relaxed">
                    {questions[currentQuestionIndex].question}
                  </h3>
                  {/* Skipped indicator */}
                  {skippedQuestions.has(questions[currentQuestionIndex].id) && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-amber-400 font-bold">
                      <ChevronRight className="w-3.5 h-3.5" />
                      You skipped this question — you can still answer it now
                    </div>
                  )}
                </div>

                {/* ── Answer options ── */}
                <div className="grid grid-cols-1 gap-3 pt-2 relative">
                  {questions[currentQuestionIndex].options.map((opt) => {
                    const isSelected = selectedAnswers[questions[currentQuestionIndex].id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(questions[currentQuestionIndex].id, opt.id)}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-bold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#EE1C25]/5 border-[#EE1C25] text-slate-900 shadow-lg shadow-red-500/15'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-[#EE1C25] bg-[#EE1C25]' : 'border-slate-300'}`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                          </span>
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}

                  {/* ── Answer saved feedback toast ── */}
                  {answerSaved && (
                    <div className="absolute bottom-full right-0 mb-2 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded-xl animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-black text-emerald-400">Answer Saved</span>
                    </div>
                  )}
                </div>

                {/* ── Navigation ── */}
                <div className="pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between gap-4">
                    <button
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                      className="disabled:opacity-30 disabled:cursor-not-allowed border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs uppercase px-5 py-3 rounded-xl transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-3">
                      {/* Skip button — always visible unless on last question with all handled */}
                      {!(canSubmit && currentQuestionIndex >= totalQuestions - 1) && (
                        <button
                          onClick={handleSkipQuestion}
                          className="text-xs font-black text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors underline underline-offset-2 decoration-slate-300 hover:decoration-slate-400"
                        >
                          Skip
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {canSubmit ? (
                        <button
                          onClick={submitAssessment}
                          className="bg-gradient-to-r from-[#EE1C25] to-[#d61920] hover:from-[#d61920] hover:to-[#b91017] text-white font-black text-xs uppercase px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-red-500/20 flex items-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Submit & Generate Results</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                          className="bg-[#EE1C25] hover:bg-[#d61920] text-white font-black text-xs uppercase px-6 py-3 rounded-xl transition-all shadow-md"
                        >
                          Next Question
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Early submit hint */}
                  {handledCount >= totalQuestions && !canSubmit && (
                    <p className="text-xs text-slate-400 text-center mt-3">
                      All questions handled — you can submit any time.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 7 — LOADING
        ═══════════════════════════════════════════════════════════ */}
        {step === 7 && (
          <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-12 backdrop-blur-md text-center space-y-6 py-24">
            <Loader2 className="w-12 h-12 text-[#EE1C25] mx-auto animate-spin" />
            <div className="space-y-2">
              <h2 className="text-2xl font-black font-heading tracking-tight text-slate-900">Analyzing Career Intelligence Metrics</h2>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">Evaluating technical foundation scores, interest alignment, and calculating course recommender weights...</p>
            </div>
            <div className="max-w-xs mx-auto pt-4">
              <div className="w-full h-2 bg-white border border-slate-200 rounded-full overflow-hidden shadow-sm">
                <div className="h-full bg-[#EE1C25] rounded-full animate-[loading_2.5s_ease-in-out_infinite]" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 8 — RESULTS
            P0: Confidence label, recommendation signals, why path
        ═══════════════════════════════════════════════════════════ */}
        {step === 8 && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-8 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-3">
                <span className="bg-[#EE1C25]/10 border border-[#EE1C25]/20 text-[#EE1C25] font-black text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xl inline-block">
                  Assessment Complete
                </span>
                <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-900">Your AI Career Report</h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Hi {formData.name}, based on your technical score of {scores.technicalFoundation}% and career interests, we&apos;ve computed your AI Career Intelligence alignment.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#EE1C25]/5 rounded-full blur-xl pointer-events-none" />
                <span className="text-6xl font-black font-mono text-[#EE1C25]">{scores.overall}</span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">Overall Readiness</span>
              </div>
            </div>

            {/* Radar + Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-8 backdrop-blur-md flex flex-col items-center justify-center">
                <div className="mb-4 text-center">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Career Intelligence Radar</span>
                  <h3 className="text-base font-black text-slate-900">Competency Profile</h3>
                </div>
                <RadarChart scores={scores} />
              </div>

              <div className="grid grid-cols-2 gap-4 content-start">
                {[
                  { label: 'AI Readiness', score: scores.aiReadiness, desc: 'Prompt chains & tech alignment', icon: Brain },
                  { label: 'Tech Foundation', score: scores.technicalFoundation, desc: 'Coding & logic assessment', icon: Cpu },
                  { label: 'Industry Ready', score: scores.industryReadiness, desc: 'Portfolio & experience match', icon: Award },
                  { label: 'Learning Velocity', score: scores.learningVelocity, desc: 'Cognitive speed & adaptability', icon: Zap },
                ].map((item) => {
                  const Icon = item.icon;
                  const color = item.score >= 75 ? '#10b981' : item.score >= 50 ? '#EE1C25' : '#6b7280';
                  return (
                    <div key={item.label} className="bg-white shadow-sm hover:shadow-lg border border-slate-200 p-5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#EE1C25]" />
                        <span className="text-xs font-black text-slate-600 uppercase tracking-wider leading-tight">{item.label}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-2xl font-black" style={{ color }}>{item.score}</span>
                        <span className="text-xs text-slate-400 font-bold">%</span>
                      </div>
                      <div className="w-full h-2 bg-white border border-slate-200 rounded-full overflow-hidden shadow-sm">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.score}%`, backgroundColor: color }} />
                      </div>
                      <span className="text-xs text-slate-400 block leading-normal">{item.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RECOMMENDATION PANEL ── */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-slate-900 relative shadow-sm hover:shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#EE1C25]" />

              <div className="md:col-span-8 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-100 text-[#EE1C25] text-xs font-black uppercase tracking-wider mb-3">
                    <Award className="w-3.5 h-3.5" />
                    <span>Primary Track Recommendation</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black font-heading tracking-tight leading-tight">
                    {primaryCourse.title}
                  </h2>
                </div>

                {/* ── WHY THIS PATH? ── */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-black text-slate-600 uppercase tracking-wider">Why this path?</span>
                  </div>
                  <div className="space-y-2">
                    {getRecommendationSignals().map((signal) => (
                      <div key={signal} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{signal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── SKILL TRANSFORMATION ── */}
                <div className="space-y-4 border-t border-slate-200 pt-5">
                  <span className="text-xs font-black text-slate-600 uppercase tracking-wider block">Your Skill Transformation</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Current Skills</span>
                      </div>
                      <div className="space-y-2">
                        {skillGap.currentSkills.length > 0 ? (
                          skillGap.currentSkills.map((sk) => (
                            <div key={sk} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
                              <span>{sk}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-slate-600 italic">None detected — quiz results used instead</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-2xl p-4 border border-red-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#EE1C25]/5 rounded-full blur-xl pointer-events-none" />
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-[#EE1C25]/10 flex items-center justify-center">
                          <TrendingUp className="w-3.5 h-3.5 text-[#EE1C25]" />
                        </div>
                        <span className="text-xs font-black text-[#EE1C25] uppercase tracking-wider">Skills You&apos;ll Gain</span>
                      </div>
                      <div className="space-y-2">
                        {(courseSkillsGained[primaryCourse.slug] || skillGap.missingSkills.slice(0, 5)).map((sk) => (
                          <div key={sk} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <Sparkles className="w-3.5 h-3.5 text-[#EE1C25] shrink-0" />
                            <span>{sk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-[#EE1C25]/30" />
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EE1C25]/5 border border-[#EE1C25]/20">
                      <span className="text-xs font-black text-[#EE1C25] uppercase tracking-wider">
                        {primaryCourse.title.split('(')[0].trim()} bridges this gap
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-l from-slate-200 to-[#EE1C25]/30" />
                  </div>
                </div>
              </div>

              {/* ── MATCH LABEL (replaces raw %) ── */}
              <div className="md:col-span-4 flex flex-col items-center justify-start p-6 bg-white border border-slate-200 rounded-2xl">
                {(() => {
                  const { label, bgClass, textClass, dotClass } = getConfidenceLabel(primaryCourse.confidence);
                  return (
                    <>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${bgClass} mb-3`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
                        <span className={`text-sm font-black ${textClass}`}>{label}</span>
                      </div>
                      <p className="text-xs text-slate-400 text-center leading-relaxed mb-5">
                        This track aligns with your interest profile, detected skills, and quiz performance.
                      </p>
                    </>
                  );
                })()}
                <a
                  href={`/courses/${primaryCourse.slug}`}
                  className="w-full text-center bg-[#EE1C25] hover:bg-[#d61920] text-white font-black text-xs uppercase py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-red-500/20 cursor-pointer block"
                >
                  Enroll In Track
                </a>
              </div>
            </div>

            {/* Secondary Tracks */}
            <div className="bg-white shadow-sm hover:shadow-lg border border-slate-200 rounded-3xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-black font-heading text-slate-900">Secondary Track Recommendations</h3>
                <p className="text-sm text-slate-600 mt-1">Alternative options matching other elements of your interest alignment.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {secondaryCourses.map((sec) => {
                  const { label, textClass, dotClass } = getConfidenceLabel(sec.confidence);
                  return (
                    <div key={sec.slug} className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <span className="text-sm font-black text-slate-900 block">{sec.title}</span>
                        <span className={`text-xs font-bold mt-1 flex items-center gap-1.5 ${textClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                          {label}
                        </span>
                      </div>
                      <a
                        href={`/courses/${sec.slug}`}
                        className="border border-slate-200 hover:border-[#EE1C25] text-slate-900 hover:text-[#EE1C25] font-black text-xs uppercase py-2 px-3.5 rounded-lg transition-colors shrink-0"
                      >
                        View
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => (window.location.href = `/courses/${primaryCourse.slug}`)}
                className="bg-[#EE1C25] hover:bg-[#d61920] text-white font-black text-sm uppercase py-4 rounded-xl transition-all shadow-lg shadow-red-500/15 text-center block cursor-pointer"
              >
                Enroll In Recommended Course
              </button>
              <button
                onClick={() => window.open('https://calendly.com', '_blank')}
                className="border border-slate-200 hover:bg-slate-50 text-slate-900 font-black text-sm uppercase py-4 rounded-xl transition-all text-center block cursor-pointer"
              >
                Book Career Guidance Session
              </button>
              <button
                onClick={() => window.print()}
                className="border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-black text-sm uppercase py-4 rounded-xl transition-all text-center block cursor-pointer"
              >
                Download Report (PDF)
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

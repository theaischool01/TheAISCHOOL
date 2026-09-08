"use client";

import React, { useState } from 'react';
import {
  User,
  Video,
  MessageSquare,
  FileText,
  Brain,
  Award,
  ToggleLeft,
  ToggleRight,
  CheckCircle2
} from 'lucide-react';
import {
  CandidateProfile,
  SpeechEvaluation,
  ChatMessage,
  StructuredResume,
  QuizQuestion,
  EvaluationReport
} from './types';
import { MOCK_CANDIDATE, MOCK_QUIZ_QUESTIONS } from './mockTemplates';
import Step1Registration from './Step1Registration';
import Step2VideoIntro from './Step2VideoIntro';
import Step3CareerChat from './Step3CareerChat';
import Step4ResumeUpload from './Step4ResumeUpload';
import Step5TechnicalQuiz from './Step5TechnicalQuiz';
import Step6FinalReport from './Step6FinalReport';

const STEPS = [
  { id: 1, label: 'Profile', icon: User },
  { id: 2, label: 'Video Intro', icon: Video },
  { id: 3, label: 'Career Chat', icon: MessageSquare },
  { id: 4, label: 'Resume', icon: FileText },
  { id: 5, label: 'Tech Quiz', icon: Brain },
  { id: 6, label: 'Report', icon: Award }
];

export default function AssessmentContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  // Default to FALSE: real live AI calls on every step
  const [demoMode, setDemoMode] = useState(false);

  // State across all steps
  const [candidate, setCandidate] = useState<CandidateProfile>({
    name: '',
    email: '',
    phone: '',
    college: '',
    targetDomain: 'AI & Machine Learning Engineering',
    experienceLevel: 'Student / Fresher'
  });

  const [selfIntroText, setSelfIntroText] = useState('');
  const [selfIntroEvaluation, setSelfIntroEvaluation] = useState<SpeechEvaluation | null>(null);
  const [chatTranscript, setChatTranscript] = useState<ChatMessage[]>([]);
  const [resumeText, setResumeText] = useState('');
  const [resumeStructured, setResumeStructured] = useState<StructuredResume | null>(null);
  const [technicalQuiz, setTechnicalQuiz] = useState<QuizQuestion[]>(MOCK_QUIZ_QUESTIONS);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(4);
  const [evaluationReport, setEvaluationReport] = useState<EvaluationReport | null>(null);

  // Toggle Demo Mode
  const toggleDemoMode = () => {
    const nextVal = !demoMode;
    setDemoMode(nextVal);
    if (nextVal && !candidate.name) {
      setCandidate(MOCK_CANDIDATE);
    }
  };

  const handleStep1Complete = (data: CandidateProfile) => {
    setCandidate(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Complete = (transcript: string, evalResult: SpeechEvaluation) => {
    setSelfIntroText(transcript);
    setSelfIntroEvaluation(evalResult);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep3Complete = (transcript: ChatMessage[]) => {
    setChatTranscript(transcript);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep4Complete = (rawText: string, structured: StructuredResume) => {
    setResumeText(rawText);
    setResumeStructured(structured);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep5Complete = (quiz: QuizQuestion[], score: number) => {
    setTechnicalQuiz(quiz);
    setQuizScore(score);
    setQuizCompleted(true);
    setCurrentStep(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelfIntroText('');
    setSelfIntroEvaluation(null);
    setChatTranscript([]);
    setResumeText('');
    setResumeStructured(null);
    setQuizCompleted(false);
    setQuizScore(0);
    setEvaluationReport(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Control Bar with Live AI / Demo Mode Switch */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E1002A] animate-pulse" />
            <span className="text-xs font-bold text-zinc-800 tracking-wide uppercase">
              The AI School • Career Intelligence Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDemoMode}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                demoMode
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-white border-zinc-200 text-zinc-700 hover:text-zinc-900 shadow-xs'
              }`}
            >
              {demoMode ? (
                <ToggleRight className="w-4 h-4 text-amber-600" />
              ) : (
                <ToggleLeft className="w-4 h-4 text-zinc-400" />
              )}
              <span>
                {demoMode ? 'Demo Mode: ON (Simulated Mock)' : 'Live Mode: ON (Direct Groq AI Calls)'}
              </span>
            </button>
          </div>
        </div>

        {/* Step Progression Ribbon */}
        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs overflow-x-auto print:hidden">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isPast = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    disabled={currentStep < step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed ${
                      isCurrent
                        ? 'bg-[#E1002A] text-white shadow-md shadow-[#E1002A]/20'
                        : isPast
                        ? 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                        : 'text-zinc-400 hover:text-zinc-500 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-white text-[#E1002A]'
                          : isPast
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-zinc-200 text-zinc-500'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : step.id}
                    </div>
                    <span>{step.label}</span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <div
                      className={`h-[1px] flex-1 min-w-[20px] ${
                        currentStep > step.id ? 'bg-emerald-400' : 'bg-zinc-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Components Switch */}
        <div className="min-h-[500px]">
          {currentStep === 1 && (
            <Step1Registration
              initialData={candidate}
              demoMode={demoMode}
              onComplete={handleStep1Complete}
            />
          )}

          {currentStep === 2 && (
            <Step2VideoIntro
              demoMode={demoMode}
              candidateName={candidate.name}
              initialTranscript={selfIntroText}
              initialEvaluation={selfIntroEvaluation}
              onComplete={handleStep2Complete}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <Step3CareerChat
              demoMode={demoMode}
              candidateName={candidate.name}
              initialMessages={chatTranscript}
              onComplete={handleStep3Complete}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <Step4ResumeUpload
              demoMode={demoMode}
              candidateName={candidate.name}
              initialResumeText={resumeText}
              initialStructuredResume={resumeStructured}
              onComplete={handleStep4Complete}
              onBack={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 5 && (
            <Step5TechnicalQuiz
              demoMode={demoMode}
              candidateSkills={
                resumeStructured?.skills
                  ? [
                      ...resumeStructured.skills.programming,
                      ...resumeStructured.skills.aiAndMl,
                      ...resumeStructured.skills.webAndCloud
                    ]
                  : ['Python', 'PyTorch', 'Transformers', 'FastAPI']
              }
              initialQuiz={technicalQuiz}
              initialCompleted={quizCompleted}
              onComplete={handleStep5Complete}
              onBack={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 6 && (
            <Step6FinalReport
              demoMode={demoMode}
              candidate={candidate}
              selfIntroText={selfIntroText}
              selfIntroEvaluation={selfIntroEvaluation}
              chatTranscript={chatTranscript}
              resumeStructured={resumeStructured}
              technicalQuiz={technicalQuiz}
              quizScore={quizScore}
              initialReport={evaluationReport}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  );
}

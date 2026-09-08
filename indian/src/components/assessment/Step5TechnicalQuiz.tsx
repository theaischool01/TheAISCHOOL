"use client";

import React, { useState, useEffect } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calculator,
  Award
} from 'lucide-react';
import { QuizQuestion } from './types';
import { MOCK_QUIZ_QUESTIONS } from './mockTemplates';
import { generateQuizQuestions } from './groqClient';
import AiStatusBadge from './AiStatusBadge';

interface Step5Props {
  demoMode: boolean;
  candidateSkills: string[];
  initialQuiz: QuizQuestion[];
  initialCompleted: boolean;
  onComplete: (quiz: QuizQuestion[], score: number) => void;
  onBack: () => void;
}

export default function Step5TechnicalQuiz({
  demoMode,
  candidateSkills,
  initialQuiz,
  initialCompleted,
  onComplete,
  onBack
}: Step5Props) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    return initialQuiz && initialQuiz.length === 5 ? initialQuiz : MOCK_QUIZ_QUESTIONS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>(() => {
    const existing: Record<string, string | number> = {};
    if (initialQuiz && initialQuiz.length > 0) {
      initialQuiz.forEach((q) => {
        if (q.userAnswer !== undefined) existing[q.id] = q.userAnswer;
      });
    }
    return existing;
  });

  const [isSubmitted, setIsSubmitted] = useState(initialCompleted || false);
  const [calculatedScore, setCalculatedScore] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isLiveAi, setIsLiveAi] = useState<boolean | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | undefined>(undefined);

  // Generate adaptive questions if not already supplied
  useEffect(() => {
    if ((!initialQuiz || initialQuiz.length < 5) && candidateSkills?.length > 0) {
      setIsLoadingQuestions(true);
      generateQuizQuestions(candidateSkills, demoMode)
        .then((res) => {
          if (res && res.questions?.length === 5) {
            setQuestions(res.questions);
            setIsLiveAi(res.isLive);
            setFallbackReason(res.error);
          }
        })
        .catch((err) => {
          setIsLiveAi(false);
          setFallbackReason(err.message || 'Groq question generation failed');
        })
        .finally(() => setIsLoadingQuestions(false));
    }
  }, [candidateSkills, demoMode, initialQuiz]);

  const handleSelectOption = (questionId: string, option: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNumericalInput = (questionId: string, val: string) => {
    if (isSubmitted) return;
    const num = val === '' ? '' : parseInt(val, 10);
    setAnswers((prev) => ({ ...prev, [questionId]: isNaN(num as number) ? val : num }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    const gradedQuestions = questions.map((q) => {
      const userAns = answers[q.id];
      let isCorrect = false;

      if (q.type === 'mcq') {
        isCorrect = String(userAns).trim() === String(q.correctAnswer).trim();
      } else {
        isCorrect = Number(userAns) === Number(q.correctAnswer);
      }

      if (isCorrect) score += 1;

      return {
        ...q,
        userAnswer: userAns,
        isCorrect
      };
    });

    setQuestions(gradedQuestions);
    setCalculatedScore(score);
    setIsSubmitted(true);
  };

  const currentQ = questions[currentIndex] || questions[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E1002A] text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <Brain className="w-3.5 h-3.5 text-[#E1002A]" />
          Step 5 of 6 • Technical Evaluation
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Adaptive Technical & Problem-Solving Quiz
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          5 questions tailored to your skills profile: 3 Multiple Choice Questions assessing transformer & system design concepts, and 2 quantitative numerical estimation challenges.
        </p>

        <div className="mt-4 flex justify-center">
          <AiStatusBadge
            isLive={isLiveAi}
            isLoading={isLoadingQuestions}
            fallbackReason={fallbackReason}
          />
        </div>
      </div>

      {/* Question Navigation Tabs */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-white border border-zinc-200 max-w-xl mx-auto overflow-x-auto shadow-xs">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
          const isCurrent = currentIndex === idx;

          let badgeColor = 'bg-zinc-50 text-zinc-600 border-zinc-200';
          if (isSubmitted) {
            badgeColor = q.isCorrect
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-red-50 text-red-700 border-red-300';
          } else if (isCurrent) {
            badgeColor = 'bg-[#E1002A] text-white shadow-xs border-[#E1002A]';
          } else if (isAnswered) {
            badgeColor = 'bg-zinc-100 text-zinc-900 border-zinc-300';
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${badgeColor}`}
            >
              {q.type === 'mcq' ? <span>Q{idx + 1}</span> : <Calculator className="w-3 h-3" />}
              {isSubmitted && (
                q.isCorrect ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-600" />
                )
              )}
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Question Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#E1002A] uppercase tracking-wide">
              Question {currentIndex + 1} of 5
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-xs text-zinc-500 font-medium">{currentQ.category}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-semibold border border-zinc-200">
            {currentQ.type === 'mcq' ? 'Multiple Choice' : 'Numerical Estimation'}
          </span>
        </div>

        {/* Question Content */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-relaxed">
            {currentQ.question}
          </h3>
          {currentQ.codeSnippet && (
            <pre className="mt-3 p-4 rounded-xl bg-zinc-900 text-zinc-100 text-xs font-mono overflow-x-auto">
              <code>{currentQ.codeSnippet}</code>
            </pre>
          )}
        </div>

        {/* Options / Input Field */}
        <div className="space-y-3 pt-2">
          {currentQ.type === 'mcq' && currentQ.options ? (
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = answers[currentQ.id] === opt;
                let optionStyle = 'bg-white border-zinc-200 text-zinc-700 hover:border-[#E1002A] hover:bg-red-50/20';

                if (isSubmitted) {
                  if (opt === currentQ.correctAnswer) {
                    optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                  } else if (isSelected && !currentQ.isCorrect) {
                    optionStyle = 'bg-red-50 border-red-400 text-red-900 font-semibold';
                  } else {
                    optionStyle = 'bg-zinc-50 border-zinc-200 text-zinc-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-red-50 border-[#E1002A] text-[#E1002A] font-bold shadow-xs';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(currentQ.id, opt)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {isSubmitted && opt === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-zinc-700">
                Enter your numerical answer:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  disabled={isSubmitted}
                  value={answers[currentQ.id] ?? ''}
                  onChange={(e) => handleNumericalInput(currentQ.id, e.target.value)}
                  placeholder="e.g. 80"
                  className="w-48 px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 font-mono text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 focus:border-[#E1002A]"
                />
                {isSubmitted && (
                  <div className="flex items-center gap-2 text-xs">
                    {currentQ.isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct
                      </span>
                    ) : (
                      <span className="text-red-700 flex items-center gap-1 font-bold">
                        <XCircle className="w-4 h-4 text-red-600" /> Incorrect (Correct: {currentQ.correctAnswer})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Detailed Explanation (When submitted) */}
        {isSubmitted && (
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5 animate-fade-in">
            <p className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#E1002A]" /> Explanation:
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Bottom Pagination & Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-600 hover:text-zinc-900 disabled:opacity-30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </button>

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 rounded-xl bg-[#E1002A] hover:bg-[#c40024] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Submit & Score Quiz</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-[#E1002A]">
              <Award className="w-4 h-4" />
              <span>Score: {calculatedScore} / 5</span>
            </div>
          )}

          <button
            type="button"
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-600 hover:text-zinc-900 disabled:opacity-30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation to Report */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 text-xs font-bold transition-all cursor-pointer"
        >
          Back to Resume
        </button>

        <button
          type="button"
          onClick={() => {
            if (!isSubmitted) handleSubmitQuiz();
            onComplete(questions, isSubmitted ? calculatedScore : 4);
          }}
          className="group py-3 px-6 rounded-xl bg-[#E1002A] hover:bg-[#c40024] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#E1002A]/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Generate Full Career Evaluation Report</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

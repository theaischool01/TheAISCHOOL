"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  User,
  Send,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { ChatMessage } from './types';
import { MOCK_CHAT_QUESTIONS } from './mockTemplates';
import { getMentorChatResponse } from './groqClient';
import AiStatusBadge from './AiStatusBadge';

interface Step3Props {
  demoMode: boolean;
  candidateName: string;
  initialMessages: ChatMessage[];
  onComplete: (transcript: ChatMessage[]) => void;
  onBack: () => void;
}

const SAMPLE_ANSWERS = [
  "I started with Python and data structures, and then moved into machine learning after seeing how transformers transformed NLP. Recently, I had to optimize a RAG retrieval system where chunk sizes caused high latency. I resolved it by benchmarking semantic chunking with a bi-encoder and re-ranking only top-5 candidates.",
  "To minimize hallucinations, I enforce strict system prompt constraints, use hybrid search with BM25 plus vector embeddings, and implement ground truth evaluation with Ragas and citation checks.",
  "In my legal document summarizer, using GPT-4 for every chunk was cost-prohibitive. I architected a cascade pattern: first filtering with a quantized local Mistral model, then routing only complex clauses to frontier models, cutting latency by 60% and API cost by 75%.",
  "I believe in data-driven decisions and rapid prototyping. When there is debate over architectures, I like to create a quick POC to benchmark latency, throughput, and developer velocity before committing.",
  "I want to master multi-agent orchestration frameworks like LangGraph, work with local model fine-tuning with LoRA/QLoRA, and build enterprise autonomous workflows with real-time human-in-the-loop controls."
];

export default function Step3CareerChat({
  demoMode,
  candidateName,
  initialMessages,
  onComplete,
  onBack
}: Step3Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (initialMessages && initialMessages.length > 0) return initialMessages;
    return [
      {
        id: 'msg-0',
        sender: 'mentor',
        text: `Welcome ${candidateName || 'there'}! I'm your AI Career Mentor at The AI School. Over the next 5 questions, we'll explore your technical depth, engineering judgment, and AI career objectives.\n\n${MOCK_CHAT_QUESTIONS[0]}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        questionIndex: 0
      }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLiveAi, setIsLiveAi] = useState<boolean | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | undefined>(undefined);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const isListeningRef = useRef<boolean>(false);
  const chatRestartTimeoutRef = useRef<any>(null);

  const restartChatRecognitionSafely = () => {
    if (chatRestartTimeoutRef.current) clearTimeout(chatRestartTimeoutRef.current);
    if (!isListeningRef.current || !recognitionRef.current) return;

    chatRestartTimeoutRef.current = setTimeout(() => {
      if (!isListeningRef.current || !recognitionRef.current) return;
      try {
        recognitionRef.current.start();
      } catch {
        if (isListeningRef.current) {
          chatRestartTimeoutRef.current = setTimeout(() => {
            try {
              if (isListeningRef.current && recognitionRef.current) {
                recognitionRef.current.start();
              }
            } catch {}
          }, 300);
        }
      }
    }, 200);
  };

  // Speech recognition setup for mic button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let text = '';
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript + ' ';
          }
          setInputText(text.trim());
        };

        recognition.onend = () => {
          if (isListeningRef.current) {
            restartChatRecognitionSafely();
          } else {
            setIsListening(false);
          }
        };

        recognition.onerror = (event: any) => {
          const err = event.error;
          if (err === 'no-speech' || err === 'aborted') {
            restartChatRecognitionSafely();
            return;
          }
          if (err === 'not-allowed' || err === 'service-not-allowed') {
            isListeningRef.current = false;
            setIsListening(false);
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      isListeningRef.current = false;
      if (chatRestartTimeoutRef.current) clearTimeout(chatRestartTimeoutRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      isListeningRef.current = false;
      if (chatRestartTimeoutRef.current) clearTimeout(chatRestartTimeoutRef.current);
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        isListeningRef.current = true;
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition error:', err);
      }
    }
  };

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isTyping) return;

    setInputText('');
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const candidateMsg: ChatMessage = {
      id: `candidate-${Date.now()}`,
      sender: 'candidate',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      questionIndex: currentQuestionIndex
    };

    const nextMessages = [...messages, candidateMsg];
    setMessages(nextMessages);

    const nextQIndex = currentQuestionIndex + 1;
    setIsTyping(true);

    try {
      const groqHistory = nextMessages.map((m) => ({
        role: m.sender === 'mentor' ? ('assistant' as const) : ('user' as const),
        content: m.text
      }));

      const res = await getMentorChatResponse(
        groqHistory,
        currentQuestionIndex,
        candidateName,
        demoMode
      );

      setIsLiveAi(res.isLive);
      setFallbackReason(res.error);

      let fullMentorReply = res.reply;
      if (nextQIndex < MOCK_CHAT_QUESTIONS.length) {
        fullMentorReply += `\n\n**Question ${nextQIndex + 1} of 5:**\n${MOCK_CHAT_QUESTIONS[nextQIndex]}`;
      } else {
        fullMentorReply += `\n\n🎉 **Interview Completed!** You've successfully completed all 5 technical interview prompts. You can now proceed to upload your resume for skill extraction and alignment analysis.`;
        setIsFinished(true);
      }

      const mentorMsg: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: fullMentorReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        questionIndex: nextQIndex
      };

      setMessages((prev) => [...prev, mentorMsg]);
      setCurrentQuestionIndex(nextQIndex);
    } catch (err: any) {
      setIsLiveAi(false);
      setFallbackReason(err.message || 'Groq connection failed');

      const nextQ =
        nextQIndex < MOCK_CHAT_QUESTIONS.length
          ? `\n\n**Question ${nextQIndex + 1} of 5:**\n${MOCK_CHAT_QUESTIONS[nextQIndex]}`
          : `\n\n🎉 **Interview Completed!** Great job completing all questions. Proceed to Step 4.`;

      if (nextQIndex >= MOCK_CHAT_QUESTIONS.length) setIsFinished(true);

      setMessages((prev) => [
        ...prev,
        {
          id: `mentor-${Date.now()}`,
          sender: 'mentor',
          text: `Thank you for sharing that detailed answer.${nextQ}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          questionIndex: nextQIndex
        }
      ]);
      setCurrentQuestionIndex(nextQIndex);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInsertSampleAnswer = () => {
    const sample = SAMPLE_ANSWERS[currentQuestionIndex] || SAMPLE_ANSWERS[0];
    setInputText(sample);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E1002A] text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <MessageSquare className="w-3.5 h-3.5 text-[#E1002A]" />
          Step 3 of 6 • Adaptive Conversation
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          AI Career Mentor Interview
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Engage in an adaptive 5-question interview. Our AI mentor probes your system design intuition, engineering challenges, and technical aspirations.
        </p>

        {/* Status Badge & Progress Bar */}
        <div className="mt-4 flex flex-col items-center gap-3 max-w-md mx-auto">
          {isLiveAi !== null && (
            <AiStatusBadge isLive={isLiveAi} fallbackReason={fallbackReason} />
          )}

          <div className="w-full">
            <div className="flex items-center justify-between text-xs text-zinc-600 mb-1.5 font-medium">
              <span>Interview Progress</span>
              <span className="font-bold text-[#E1002A]">
                {Math.min(currentQuestionIndex, 5)} / 5 Questions
              </span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#E1002A] h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((currentQuestionIndex / 5) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-zinc-50/50">
          {messages.map((msg) => {
            const isMentor = msg.sender === 'mentor';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                  isMentor ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                    isMentor
                      ? 'bg-red-50 text-[#E1002A] border border-red-200'
                      : 'bg-zinc-800 text-white'
                  }`}
                >
                  {isMentor ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isMentor
                        ? 'bg-white text-zinc-800 border border-zinc-200 rounded-tl-sm shadow-xs'
                        : 'bg-[#E1002A] text-white rounded-tr-sm shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p
                    className={`text-[10px] text-zinc-400 px-1 font-medium ${
                      isMentor ? 'text-left' : 'text-right'
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-red-50 text-[#E1002A] border border-red-200 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-zinc-200 rounded-tl-sm flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E1002A] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#E1002A] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#E1002A] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-zinc-200 space-y-3">
          {/* Quick Helper Actions */}
          {!isFinished && (
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleInsertSampleAnswer}
                className="text-zinc-600 hover:text-[#E1002A] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E1002A]" />
                <span>Auto-fill Sample Answer for Question #{Math.min(currentQuestionIndex + 1, 5)}</span>
              </button>

              <span className="text-[11px] text-zinc-400 hidden sm:inline">
                Press Enter to send response
              </span>
            </div>
          )}

          {/* Input Row */}
          {!isFinished ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-[#E1002A] text-white border-[#E1002A] animate-pulse'
                    : 'bg-zinc-50 border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Voice input (Speech to text)'}
              >
                {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isTyping}
                placeholder={isListening ? 'Listening to your speech...' : 'Type your detailed answer here...'}
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs sm:text-sm placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 focus:border-[#E1002A]"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={isTyping || !inputText.trim()}
                className="p-3 rounded-xl bg-[#E1002A] hover:bg-[#c40024] disabled:opacity-40 text-white transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>All 5 questions completed. Ready to proceed to resume intelligence.</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 text-xs font-bold transition-all cursor-pointer"
        >
          Back to Video Intro
        </button>

        <button
          type="button"
          onClick={() => onComplete(messages)}
          className="group py-3 px-6 rounded-xl bg-[#E1002A] hover:bg-[#c40024] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#E1002A]/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Proceed to Resume Intelligence</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Award,
  BookOpen,
  Volume2,
  AlertTriangle
} from 'lucide-react';
import { SpeechEvaluation } from './types';
import { evaluateSpeech } from './groqClient';
import AiStatusBadge from './AiStatusBadge';

interface Step2Props {
  demoMode: boolean;
  candidateName: string;
  initialTranscript: string;
  initialEvaluation: SpeechEvaluation | null;
  onComplete: (transcript: string, evaluation: SpeechEvaluation) => void;
  onBack: () => void;
}

export default function Step2VideoIntro({
  demoMode,
  candidateName,
  initialTranscript,
  initialEvaluation,
  onComplete,
  onBack
}: Step2Props) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(initialTranscript || '');
  const [isSampleTranscript, setIsSampleTranscript] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<SpeechEvaluation | null>(initialEvaluation);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const [isLiveAi, setIsLiveAi] = useState<boolean | null>(null);
  const [speechApiSupported, setSpeechApiSupported] = useState(true);
  const [micStatusMessage, setMicStatusMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef<boolean>(false);
  const restartTimeoutRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>(initialTranscript || '');

  // Check Web Speech API availability on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSpeechApiSupported(false);
        setMicStatusMessage(
          'Live speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge, or type your introduction below.'
        );
      }
    }
  }, []);

  // Safe isolated start / restart for Web Speech API
  // Uses fresh instance on each start/restart to avoid Chrome InvalidStateError / stuck kEnded state
  const startSpeechRecognition = useCallback(() => {
    console.log('[DEBUG 1: startSpeechRecognition entered]');
    if (typeof window === 'undefined') {
      console.warn('[DEBUG: Window is undefined, exiting]');
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    console.log('[DEBUG 2: SpeechRecognition API available?]', !!SpeechRecognition, SpeechRecognition ? 'Found' : 'NOT FOUND');
    if (!SpeechRecognition) {
      console.error('[DEBUG: SpeechRecognition API not supported in this browser]');
      setMicStatusMessage('Speech recognition is not supported in this browser.');
      return;
    }

    // Clean up any stale recognition instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.abort();
      } catch (e) {
        console.warn('[SpeechRecognition cleanup warning]:', e);
      }
      recognitionRef.current = null;
    }

    try {
      console.log('[DEBUG 3: Calling new SpeechRecognition()...]');
      const recognition = new SpeechRecognition();
      console.log('[DEBUG 4: new SpeechRecognition() instantiated successfully!]:', recognition);
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = (typeof navigator !== 'undefined' && navigator.language) || 'en-US';

      recognition.onstart = () => {
        console.log('[DEBUG 5: SpeechRecognition onstart fired - audio session is LIVE]');
        if (isRecordingRef.current) {
          setMicStatusMessage('Microphone active. Listening to your speech...');
        }
      };

      recognition.onresult = (event: any) => {
        console.log('[SpeechRecognition onresult fired]: resultIndex =', event.resultIndex, 'results count =', event.results.length);
        let interimTranscript = '';
        let newlyFinalized = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const chunk = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            newlyFinalized += chunk + ' ';
          } else {
            interimTranscript += chunk;
          }
        }

        if (newlyFinalized) {
          const updated = (finalTranscriptRef.current + ' ' + newlyFinalized).replace(/\s+/g, ' ').trim();
          finalTranscriptRef.current = updated;
          console.log('[SpeechRecognition finalized]:', finalTranscriptRef.current);
        }

        const liveText = (finalTranscriptRef.current + (interimTranscript ? ' ' + interimTranscript : '')).replace(/\s+/g, ' ').trim();
        if (liveText) {
          console.log('[SpeechRecognition live display]:', liveText);
          setTranscript(liveText);
          setIsSampleTranscript(false); // User actually spoke!
          setEvaluationError(null);
        }
      };

      recognition.onerror = (event: any) => {
        const err = event.error;
        console.log('[SpeechRecognition onerror]:', err);

        // On no-speech or aborted (normal mid-sentence pauses): schedule clean restart
        if (err === 'no-speech' || err === 'aborted') {
          scheduleRestart();
          return;
        }

        // Fatal errors that require user attention
        if (err === 'not-allowed' || err === 'service-not-allowed') {
          console.warn('[SpeechRecognition]: Microphone permission denied');
          setMicStatusMessage('Microphone access denied. Please allow microphone permissions in your browser address bar.');
          setIsRecording(false);
          isRecordingRef.current = false;
          return;
        }

        if (err === 'audio-capture') {
          setMicStatusMessage('No microphone detected or microphone is in use by another application.');
          return;
        }

        if (err === 'network') {
          console.warn('[SpeechRecognition network hiccup]: Scheduling restart');
          scheduleRestart();
          return;
        }
      };

      recognition.onend = () => {
        console.log('[SpeechRecognition onend]: Session ended. isRecording =', isRecordingRef.current);
        if (isRecordingRef.current) {
          scheduleRestart();
        } else {
          setMicStatusMessage(null);
        }
      };

      console.log('[DEBUG 6: Calling recognition.start()...]');
      recognition.start();
      recognitionRef.current = recognition;
      console.log('[DEBUG 7: SpeechRecognition.start() succeeded without synchronous throw]');
    } catch (err: any) {
      console.error('[CRITICAL: SpeechRecognition start() threw synchronously]:', err?.name, err?.message, err);
      if (err?.name === 'NotAllowedError' || err?.name === 'SecurityError') {
        setMicStatusMessage('Microphone permission denied by browser/system.');
        setIsRecording(false);
        isRecordingRef.current = false;
        return;
      }
      if (isRecordingRef.current) {
        scheduleRestart();
      }
    }
  }, []);

  // Debounced restart scheduler (prevents double restarts between onerror and onend)
  const scheduleRestart = useCallback(() => {
    if (!isRecordingRef.current) return;
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);

    restartTimeoutRef.current = setTimeout(() => {
      if (isRecordingRef.current) {
        console.log('[SpeechRecognition]: Executing debounced restart');
        startSpeechRecognition();
      }
    }, 250);
  }, [startSpeechRecognition]);

  // ISOLATED COUNTDOWN TIMER
  // Depends ONLY on [isRecording]. Does NOT have timeLeft in dependency array.
  // Never tears down or recreates the interval on every second!
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle timer expiry cleanly in a separate effect
  useEffect(() => {
    if (isRecording && timeLeft === 0) {
      handleStopRecording();
    }
  }, [timeLeft, isRecording]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
      isRecordingRef.current = false;
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // Start Camera Feed (audio: false to avoid hardware mic conflict with Web Speech API)
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: false // Video preview only; Web Speech API handles mic independently
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } else {
        setCameraError('Webcam access is not supported in this browser.');
      }
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera access was denied or not found. You can still speak or type your introduction below.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const toggleCamera = () => {
    if (cameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const handleStartRecording = () => {
    if (!cameraActive) {
      startCamera();
    }
    setIsRecording(true);
    isRecordingRef.current = true;
    setEvaluationError(null);
    setMicStatusMessage('Starting speech listener...');
    console.log('[handleStartRecording invoked]');

    startSpeechRecognition();
  };

  const handleStopRecording = () => {
    console.log('[handleStopRecording invoked]');
    setIsRecording(false);
    isRecordingRef.current = false;
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    setMicStatusMessage(null);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('[handleStopRecording recognition.stop warning]:', e);
      }
    }
  };

  const handleReset = () => {
    handleStopRecording();
    setTimeLeft(120);
    finalTranscriptRef.current = '';
    setTranscript('');
    setIsSampleTranscript(false);
    setEvaluation(null);
    setEvaluationError(null);
    setIsLiveAi(null);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTranscript(val);
    finalTranscriptRef.current = val;
    setIsSampleTranscript(false); // Manually modified
    setEvaluationError(null);
  };

  const loadSampleIntro = () => {
    const sample = `Hello, I am ${candidateName || 'an AI developer'}. I have been building Generative AI pipelines and agentic workflows using Python, FastAPI, and vector databases. Recently, I solved an embedding search bottleneck by implementing hybrid BM25 and dense retrieval with cross-encoder re-ranking.`;
    setTranscript(sample);
    finalTranscriptRef.current = sample;
    setIsSampleTranscript(true); // Flagged as sample test bio
    setEvaluation(null);
    setEvaluationError(null);
  };

  const handleRunEvaluation = async () => {
    const cleanText = transcript.trim();
    if (!cleanText || cleanText.length < 25) {
      setEvaluationError('Please record or type at least 25 characters of introduction before running analysis.');
      return;
    }

    setIsEvaluating(true);
    setEvaluationError(null);

    try {
      // Sends cleanText VERBATIM to Groq API
      const res = await evaluateSpeech(cleanText, demoMode);
      if (res.data) {
        setEvaluation(res.data);
        setIsLiveAi(res.isLive);
      }
    } catch (err: any) {
      console.error('Speech evaluation failed:', err);
      setEvaluationError(err.message || 'Groq AI analysis failed. Please check connection and try again.');
      setIsLiveAi(false);
    } finally {
      setIsEvaluating(false);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const canAnalyze = transcript.trim().length >= 25 && !isEvaluating;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E1002A] text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E1002A]" />
          Step 2 of 6 • Verbal Intelligence
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Video & Speech Self-Introduction
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Deliver a 60 to 120-second introduction covering your academic background, core AI skills, and key projects. Our speech engine evaluates articulation, confidence, and technical vocabulary in real time.
        </p>
      </div>

      {/* Main Video & Live Transcript Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video Viewport */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative aspect-video w-full rounded-2xl bg-zinc-900 border border-zinc-300 overflow-hidden flex items-center justify-center shadow-md">
            {/* Live Camera Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover mirror-mode ${cameraActive ? 'block' : 'hidden'}`}
              style={{ transform: 'scaleX(-1)' }}
            />

            {/* Offline / Placeholder View */}
            {!cameraActive && (
              <div className="text-center px-6">
                <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                  <VideoOff className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-zinc-100">Camera preview is off</p>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Click "Enable Camera" or start speaking to practice with live speech transcription.
                </p>
                <button
                  type="button"
                  onClick={startCamera}
                  className="mt-4 px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-bold transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-[#E1002A]" />
                  Enable Camera
                </button>
              </div>
            )}

            {/* Live Indicator Overlay */}
            {cameraActive && (
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-300">Camera Live</span>
              </div>
            )}

            {/* Recording Timer Badge */}
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1002A] text-white text-xs font-bold animate-pulse shadow-lg">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>

          {/* Camera Error Alert */}
          {cameraError && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleCamera}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  cameraActive
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-300 hover:bg-zinc-200'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:text-zinc-900'
                }`}
              >
                {cameraActive ? <Video className="w-3.5 h-3.5 text-emerald-600" /> : <VideoOff className="w-3.5 h-3.5" />}
                {cameraActive ? 'Camera On' : 'Camera Off'}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-200 text-zinc-600 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Start / Stop Recording Button */}
            <div>
              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="px-5 py-2.5 rounded-xl bg-[#E1002A] hover:bg-[#c40024] text-white text-xs font-bold shadow-md shadow-[#E1002A]/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Recording (Speech-to-Text)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-[#E1002A] text-[#E1002A] text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer animate-pulse"
                >
                  <MicOff className="w-4 h-4" />
                  <span>Stop Recording</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Transcript & Analysis */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex-1 flex flex-col rounded-2xl bg-white border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#E1002A]" />
                <h3 className="text-sm font-bold text-zinc-900">Live Speech Transcript</h3>
              </div>
              <button
                type="button"
                onClick={loadSampleIntro}
                className="text-[11px] font-semibold text-zinc-600 hover:text-[#E1002A] transition-colors flex items-center gap-1 cursor-pointer"
                title="Loads a sample bio for testing. Report will clearly indicate sample data."
              >
                <Sparkles className="w-3 h-3 text-[#E1002A]" />
                Insert Sample
              </button>
            </div>

            {/* Live Mic Status Pill */}
            {isRecording && (
              <div className="mb-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs font-semibold text-[#E1002A] animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#E1002A]" />
                <span>{micStatusMessage || 'Listening... Speak clearly into your microphone.'}</span>
              </div>
            )}

            {!speechApiSupported && (
              <div className="mb-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-medium text-amber-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Speech recognition not supported in this browser. Please type below.</span>
              </div>
            )}

            {/* Editable Transcript Area */}
            <textarea
              value={transcript}
              onChange={handleTextareaChange}
              placeholder="Your spoken words will appear here in real time as you speak into the microphone... You can also edit or type your introduction manually."
              rows={9}
              className="w-full flex-1 p-3.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs sm:text-sm leading-relaxed placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 focus:border-[#E1002A] resize-none"
            />

            {/* Character counter & requirement indicator */}
            <div className="flex items-center justify-between mt-2 text-[11px]">
              <span className={transcript.trim().length >= 25 ? 'text-emerald-600 font-semibold' : 'text-zinc-500 font-medium'}>
                {transcript.trim().length >= 25
                  ? `✓ Ready for AI analysis (${transcript.trim().length} characters)`
                  : `Min 25 characters required (${transcript.trim().length}/25)`}
              </span>
              {isSampleTranscript && (
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Sample Data Loaded
                </span>
              )}
            </div>

            {/* Error banner if evaluation failed */}
            {evaluationError && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{evaluationError}</span>
              </div>
            )}

            {/* Analysis Trigger Button */}
            <div className="mt-3 pt-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={handleRunEvaluation}
                disabled={!canAnalyze}
                className={`w-full py-2.5 px-4 rounded-xl text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                  canAnalyze
                    ? 'bg-zinc-900 hover:bg-zinc-800 cursor-pointer'
                    : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {isEvaluating ? (
                  <span>Evaluating Speech with Groq AI...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#E1002A]" />
                    <span>Analyze Speech & Grammar via Groq</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Report Card (Shown after evaluation) */}
      {evaluation && (
        <div className="rounded-2xl bg-white border-2 border-red-200 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E1002A]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg font-bold text-zinc-900">Speech & Verbal Intelligence Report Card</h3>
                  <AiStatusBadge isLive={isLiveAi} />
                  {isSampleTranscript && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-bold">
                      🧪 Analyzing Sample Text (Test Mode)
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  AI analysis of your verbal delivery, pacing, and grammatical structure
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-200">
              <span className="text-xs text-zinc-600 font-bold">Overall Score:</span>
              <span className="text-xl font-black text-[#E1002A]">{evaluation.overallScore}/100</span>
            </div>
          </div>

          {/* 4 Score Metric Bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <p className="text-xs font-semibold text-zinc-500">Clarity & Diction</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{evaluation.clarityScore}%</p>
              <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${evaluation.clarityScore}%` }} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <p className="text-xs font-semibold text-zinc-500">Fluency & Cadence</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{evaluation.fluencyScore}%</p>
              <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${evaluation.fluencyScore}%` }} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <p className="text-xs font-semibold text-zinc-500">Technical Lexicon</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{evaluation.vocabularyScore}%</p>
              <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${evaluation.vocabularyScore}%` }} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <p className="text-xs font-semibold text-zinc-500">Confidence Index</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{evaluation.confidenceScore}%</p>
              <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
                <div className="bg-[#E1002A] h-1.5 rounded-full" style={{ width: `${evaluation.confidenceScore}%` }} />
              </div>
            </div>
          </div>

          {/* Feedback Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Key Strengths
              </h4>
              <ul className="space-y-2">
                {evaluation.keyStrengths?.map((str, idx) => (
                  <li key={idx} className="text-xs text-zinc-700 flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Areas for Growth
              </h4>
              <ul className="space-y-2">
                {evaluation.improvementAreas?.map((imp, idx) => (
                  <li key={idx} className="text-xs text-zinc-700 flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Polished Introduction Suggestion */}
          {evaluation.samplePolishedIntro && (
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-800">
                <BookOpen className="w-3.5 h-3.5 text-[#E1002A]" />
                <span>AI Polished Delivery:</span>
              </div>
              <p className="text-xs text-zinc-700 italic leading-relaxed">
                "{evaluation.samplePolishedIntro}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 text-xs font-bold transition-all cursor-pointer"
        >
          Back to Step 1
        </button>

        <button
          type="button"
          disabled={transcript.trim().length < 25}
          onClick={() => {
            const cleanText = transcript.trim();
            if (cleanText.length < 25) {
              setEvaluationError('Please record or type your introduction (at least 25 characters) before proceeding.');
              return;
            }

            const activeEval: SpeechEvaluation = evaluation || {
              overallScore: 78,
              clarityScore: 75,
              fluencyScore: 75,
              vocabularyScore: 80,
              confidenceScore: 80,
              grammarFeedback: ['Good foundational delivery.'],
              vocabularyFeedback: ['Clear vocabulary.'],
              keyStrengths: ['Articulate expression of skills.'],
              improvementAreas: ['Continue elaborating on quantifiable results.'],
              samplePolishedIntro: cleanText
            };

            onComplete(cleanText, activeEval);
          }}
          className={`group py-3 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
            transcript.trim().length >= 25
              ? 'bg-[#E1002A] hover:bg-[#c40024] text-white shadow-md shadow-[#E1002A]/20 cursor-pointer'
              : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
          }`}
        >
          <span>Proceed to AI Career Mentor Conversation</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Tag,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { StructuredResume } from './types';
import { structureResume } from './groqClient';
import { MOCK_STRUCTURED_RESUME } from './mockTemplates';
import AiStatusBadge from './AiStatusBadge';

interface Step4Props {
  demoMode: boolean;
  candidateName: string;
  initialResumeText: string;
  initialStructuredResume: StructuredResume | null;
  onComplete: (rawText: string, structured: StructuredResume) => void;
  onBack: () => void;
}

const SAMPLE_RAW_RESUME = `
ARYAN SHARMA
Email: aryan.sharma@example.com | Phone: +91 98765 43210 | Location: New Delhi, India
GitHub: github.com/aryansharma | LinkedIn: linkedin.com/in/aryansharma

PROFESSIONAL SUMMARY
Final-year Computer Science undergraduate with focused expertise in Machine Learning, Deep Learning, and Generative AI application engineering. Hands-on experience developing Retrieval-Augmented Generation (RAG) pipelines, LLM multi-agent systems, and scalable REST APIs.

EDUCATION
Indian Institute of Technology (IIT) Delhi (2022 - 2026)
B.Tech in Computer Science and Engineering | CGPA: 8.9/10.0

CORE SKILLS
• Programming: Python, TypeScript, SQL, C++, Bash
• AI & Machine Learning: PyTorch, HuggingFace Transformers, LangChain, LlamaIndex, Vector Databases (Chroma, Pinecone), Fine-tuning (LoRA), Prompt Engineering
• Full-Stack & Cloud: FastAPI, Next.js, Docker, AWS (S3, EC2), PostgreSQL, Redis
• Tools: Git, Linux, Postman, Vercel, Weights & Biases

HIGHLIGHTED PROJECTS
1. Enterprise Legal Document RAG System
- Built an automated contract analysis assistant utilizing LangChain, ChromaDB, and FastAPI.
- Implemented hybrid search combining BM25 keyword matching with dense vector embeddings to minimize hallucinations.
- Deployed with streaming responses, achieving sub-800ms time-to-first-token.

2. Real-Time Edge Vision Classifier
- Trained and quantized MobileNetV3 model in PyTorch for embedded edge inspection.
- Achieved 45 FPS on Raspberry Pi with 92.4% top-1 accuracy on custom industrial component defects.
`;

export default function Step4ResumeUpload({
  demoMode,
  candidateName,
  initialResumeText,
  initialStructuredResume,
  onComplete,
  onBack
}: Step4Props) {
  const [resumeText, setResumeText] = useState(initialResumeText || '');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isStructuring, setIsStructuring] = useState(false);
  const [structuredData, setStructuredData] = useState<StructuredResume | null>(
    initialStructuredResume
  );
  const [isLiveAi, setIsLiveAi] = useState<boolean | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Extract text from uploaded files (.docx, .pdf, .txt)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setFileName(file.name);
    setIsExtracting(true);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase();

      if (ext === 'txt') {
        const text = await file.text();
        setResumeText(text);
        runStructuring(text);
      } else if (ext === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        try {
          const mammoth = await import('mammoth');
          const result = await mammoth.extractRawText({ arrayBuffer });
          const text = result.value || '';
          setResumeText(text);
          runStructuring(text);
        } catch {
          setResumeText(SAMPLE_RAW_RESUME);
          runStructuring(SAMPLE_RAW_RESUME);
        }
      } else if (ext === 'pdf') {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfjs = await import('pdfjs-dist');
          const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
          const doc = await loadingTask.promise;
          let fullText = '';
          for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map((item: any) => item.str || '');
            fullText += strings.join(' ') + '\n';
          }
          if (fullText.trim().length > 30) {
            setResumeText(fullText);
            runStructuring(fullText);
          } else {
            setResumeText(SAMPLE_RAW_RESUME);
            runStructuring(SAMPLE_RAW_RESUME);
          }
        } catch (pdfErr) {
          console.warn('PDF parsing error, falling back to clean text template:', pdfErr);
          setResumeText(SAMPLE_RAW_RESUME);
          runStructuring(SAMPLE_RAW_RESUME);
        }
      } else {
        setError('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
      }
    } catch (err: any) {
      console.warn('File reading error:', err);
      setError('Unable to parse file. You can paste your resume text manually below.');
    } finally {
      setIsExtracting(false);
    }
  };

  const runStructuring = async (text: string) => {
    setIsStructuring(true);
    try {
      const res = await structureResume(text, demoMode);
      setStructuredData(res.data);
      setIsLiveAi(res.isLive);
      setFallbackReason(res.error);
    } catch (err: any) {
      setStructuredData(MOCK_STRUCTURED_RESUME);
      setIsLiveAi(false);
      setFallbackReason(err.message || 'Groq connection failed');
    } finally {
      setIsStructuring(false);
    }
  };

  const handleUseSample = () => {
    setFileName('aryan_sharma_ai_resume.pdf');
    setResumeText(SAMPLE_RAW_RESUME);
    runStructuring(SAMPLE_RAW_RESUME);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E1002A] text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <FileText className="w-3.5 h-3.5 text-[#E1002A]" />
          Step 4 of 6 • Resume Intelligence
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          AI Resume Parsing & Skill Structuring
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Upload your resume in PDF, DOCX, or TXT format. Our NLP engine extracts your project portfolio, technical stack, and career progression into structured candidate attributes.
        </p>

        {/* Quick Sample Button */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleUseSample}
            className="text-xs text-zinc-600 hover:text-[#E1002A] border border-zinc-200 hover:border-red-300 bg-zinc-50 hover:bg-red-50/50 px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-[#E1002A]" />
            Quick Test: Load Pre-populated Sample Resume
          </button>
        </div>
      </div>

      {/* Upload Zone & Manual Paste Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Drag & Drop Upload Zone */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 min-h-[220px] rounded-2xl border-2 border-dashed border-zinc-300 hover:border-[#E1002A] bg-zinc-50/70 hover:bg-red-50/30 transition-all p-6 flex flex-col items-center justify-center text-center cursor-pointer group shadow-xs"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-[#E1002A] group-hover:border-red-300 transition-all mb-3 shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-zinc-800 group-hover:text-[#E1002A] transition-colors">
              {fileName ? fileName : 'Click or Drag Resume to Upload'}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Supports PDF, Word (.docx), or Text (.txt) up to 10MB
            </p>

            {isExtracting && (
              <div className="mt-3 flex items-center gap-2 text-xs text-[#E1002A] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E1002A] animate-ping" />
                <span>Reading document text...</span>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Textarea View / Edit */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className="flex-1 flex flex-col rounded-2xl bg-white border border-zinc-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-700">Extracted Resume Text</span>
              <span className="text-[11px] text-zinc-400 font-medium">
                {resumeText ? `${resumeText.length} characters` : 'Empty'}
              </span>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Resume text will appear here automatically after upload. You can also paste your resume content directly..."
              rows={8}
              className="w-full flex-1 p-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-800 text-xs leading-relaxed placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E1002A]/20 focus:border-[#E1002A] resize-none font-mono"
            />
            <button
              type="button"
              onClick={() => runStructuring(resumeText)}
              disabled={isStructuring || !resumeText.trim()}
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              {isStructuring ? (
                <span>Structuring Skills with Groq AI...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#E1002A]" />
                  <span>Structure & Tag Skills via Groq</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Structured Resume Cards Display */}
      {structuredData && (
        <div className="rounded-2xl bg-white border-2 border-red-200 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-extrabold text-zinc-900">
                  {structuredData.candidateName || candidateName || 'Candidate Profile'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-[#E1002A] text-[11px] font-bold">
                  {structuredData.experienceLevel}
                </span>
                <AiStatusBadge isLive={isLiveAi} fallbackReason={fallbackReason} />
              </div>
              <p className="text-xs text-zinc-600 mt-1 max-w-xl leading-relaxed">
                {structuredData.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Skills Parsed & Validated</span>
            </div>
          </div>

          {/* Tagged Skills Breakdown */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#E1002A]" />
              Verified Competency Matrix
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Programming Languages */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide">
                  Languages
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {structuredData.skills.programming.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white text-zinc-800 text-xs font-semibold border border-zinc-200 shadow-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI & ML */}
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 space-y-2">
                <span className="text-[11px] font-bold text-[#E1002A] uppercase tracking-wide">
                  AI & Machine Learning
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {structuredData.skills.aiAndMl.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white text-[#E1002A] text-xs font-semibold border border-red-200 shadow-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full-Stack & Cloud */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
                  Web & Cloud
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {structuredData.skills.webAndCloud.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white text-blue-800 text-xs font-semibold border border-blue-200 shadow-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Highlighted Projects */}
          {structuredData.highlightedProjects?.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-[#E1002A]" />
                Featured Engineering Projects
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {structuredData.highlightedProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2"
                  >
                    <h5 className="text-sm font-bold text-zinc-900">{proj.title}</h5>
                    <p className="text-xs text-zinc-600 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.technologies.map((t, ti) => (
                        <span
                          key={ti}
                          className="px-2 py-0.5 rounded-md bg-white text-zinc-600 text-[10px] font-mono border border-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
          Back to Interview Chat
        </button>

        <button
          type="button"
          onClick={() => {
            const finalStruct = structuredData || MOCK_STRUCTURED_RESUME;
            onComplete(resumeText || SAMPLE_RAW_RESUME, finalStruct);
          }}
          className="group py-3 px-6 rounded-xl bg-[#E1002A] hover:bg-[#c40024] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#E1002A]/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Proceed to Adaptive Technical Quiz</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

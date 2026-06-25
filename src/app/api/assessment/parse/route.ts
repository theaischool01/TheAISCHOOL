
import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';
const pdf = require('pdf-parse');

const parseUrlSchema = z.object({
  url: z.string().url('Invalid remote file URL'),
});

export async function POST(req: Request) {
  // 1. Rate Limiting Check
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const limiter = rateLimit(ip, 10, 60000); // 10 parsing requests/min per IP
  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    let buffer: Buffer;
    let fileName = '';

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }
      buffer = Buffer.from(await file.arrayBuffer());
      fileName = file.name;
    } else {
      // JSON payload containing url
      const rawBody = await req.json();
      const parsed = parseUrlSchema.safeParse(rawBody);
      if (!parsed.success) {
        return NextResponse.json({ error: 'Validation failed', details: parsed.error.format() }, { status: 400 });
      }

      const { url } = parsed.data;

      // 2. SSRF Protection: Restrict downloads to UploadThing domains
      try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.toLowerCase();

        // Strict whitelist: must end with utfs.io or uploadthing.com or subdomains
        const isAllowedDomain =
          hostname === 'utfs.io' ||
          hostname.endsWith('.utfs.io') ||
          hostname === 'uploadthing.com' ||
          hostname.endsWith('.uploadthing.com');

        if (!isAllowedDomain) {
          console.warn(`[SSRF Block] Host blocked: ${hostname}`);
          return NextResponse.json({ error: 'Unauthorized file source. Only UploadThing endpoints are allowed.' }, { status: 403 });
        }

        // Reject local or private subnets explicitly
        const localPatterns = [
          'localhost', '127.0.0.1', '::1', '0.0.0.0',
          '10.', '192.168.', '172.16.', '172.17.', '172.18.', '172.19.',
          '172.20.', '172.21.', '172.22.', '172.23.', '172.24.', '172.25.',
          '172.26.', '172.27.', '172.28.', '172.29.', '172.30.', '172.31.'
        ];

        if (localPatterns.some(pat => hostname.startsWith(pat) || hostname.includes(pat))) {
          console.warn(`[SSRF Block] Local host blocked: ${hostname}`);
          return NextResponse.json({ error: 'Access to internal network is prohibited.' }, { status: 403 });
        }
      } catch (urlErr) {
        return NextResponse.json({ error: 'Malformed URL parameter' }, { status: 400 });
      }

      console.log(`[ResumeParser] Downloading resume from URL: ${url}`);
      const fileRes = await fetch(url);
      if (!fileRes.ok) {
        throw new Error(`Failed to download resume file from remote URL: ${fileRes.statusText}`);
      }
      buffer = Buffer.from(await fileRes.arrayBuffer());
      fileName = url.split('/').pop() || 'resume.pdf';
    }

    let text = '';
    console.log(`[ResumeParser] Extracting text from file: ${fileName}`);
    if (fileName.toLowerCase().endsWith('.pdf') || fileName.includes('pdf')) {
      const parsed = await pdf(buffer);
      text = parsed.text;
    } else if (fileName.toLowerCase().endsWith('.docx') || fileName.includes('docx')) {
      const parsed = await mammoth.extractRawText({ buffer });
      text = parsed.value;
    } else {
      return NextResponse.json({ error: 'Unsupported file format' }, { status: 400 });
    }

    // Normalize text
    const lowerText = text.toLowerCase();

    // Defined lists for keyword matching
    const languagesList = [
      { key: 'python', label: 'Python' },
      { key: 'java', label: 'Java' },
      { key: 'javascript', label: 'JavaScript' },
      { key: 'sql', label: 'SQL' },
      { key: 'c', label: 'C' },
      { key: 'c++', label: 'C++' }
    ];

    const techList = [
      { key: 'react', label: 'React' },
      { key: 'node.js', label: 'Node.js' },
      { key: 'next.js', label: 'Next.js' },
      { key: 'tensorflow', label: 'TensorFlow' },
      { key: 'scikit-learn', label: 'Scikit-Learn' },
      { key: 'opencv', label: 'OpenCV' },
      { key: 'docker', label: 'Docker' },
      { key: 'aws', label: 'AWS' }
    ];

    const aiList = [
      { key: 'machine learning', label: 'Machine Learning' },
      { key: 'deep learning', label: 'Deep Learning' },
      { key: 'generative ai', label: 'Generative AI' },
      { key: 'nlp', label: 'NLP' },
      { key: 'computer vision', label: 'Computer Vision' },
      { key: 'prompt engineering', label: 'Prompt Engineering' },
      { key: 'agentic ai', label: 'Agentic AI' }
    ];

    const extractedLanguages: string[] = [];
    languagesList.forEach((lang) => {
      if (lowerText.includes(lang.key)) {
        extractedLanguages.push(lang.label);
      }
    });

    const extractedTech: string[] = [];
    techList.forEach((tech) => {
      if (lowerText.includes(tech.key)) {
        extractedTech.push(tech.label);
      }
    });

    const extractedAi: string[] = [];
    aiList.forEach((ai) => {
      if (lowerText.includes(ai.key)) {
        extractedAi.push(ai.label);
      }
    });

    // Determine profile level
    let profileLevel = 'BEGINNER';
    const totalCount = extractedLanguages.length + extractedTech.length + extractedAi.length;

    const hasAdvancedKeywords = extractedAi.includes('Deep Learning') || extractedAi.includes('Generative AI') || extractedAi.includes('Agentic AI');
    const hasIntermediateKeywords = extractedLanguages.includes('Python') || extractedLanguages.includes('SQL') || extractedAi.includes('Machine Learning');

    if (hasAdvancedKeywords && totalCount >= 5) {
      profileLevel = 'ADVANCED';
    } else if (hasIntermediateKeywords && totalCount >= 2) {
      profileLevel = 'INTERMEDIATE';
    }

    const output = {
      skills: extractedLanguages,
      technologies: extractedTech,
      aiSkills: extractedAi,
      profileLevel,
    };

    console.log(`[ResumeParser] Parse completed. Profile level assigned: ${profileLevel}. Extracted count: ${totalCount}`);
    return NextResponse.json({ success: true, ...output });
  } catch (error: any) {
    console.error('[ResumeParser] Extraction failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

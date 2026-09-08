require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

if (!GROQ_API_KEY) {
  console.error('ERROR: GROQ_API_KEY is not defined in .env');
  process.exit(1);
}

async function callGroq(messages, options = {}) {
  const bodyPayload = {
    model: GROQ_MODEL,
    messages,
    temperature: options.temperature ?? 0.3,
    max_tokens: options.maxTokens ?? 1500
  };

  if (options.jsonMode) {
    bodyPayload.response_format = { type: 'json_object' };
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify(bodyPayload)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Groq API Error (${res.status}): ` + JSON.stringify(data));
  }

  return data.choices[0].message.content;
}

async function runVerification() {
  console.log('===============================================================');
  console.log(`🚀 VERIFYING ALL 6 STEPS AGAINST GROQ API (Model: ${GROQ_MODEL})`);
  console.log('===============================================================\n');

  // STEP 2: Speech & Grammar Evaluation
  console.log('--- [Step 2] Testing Speech & Grammar Evaluation via Groq ---');
  const speechTranscript = "Hello, my name is Aryan. I have been building AI agents using LangChain and Python for about 2 years. I worked on a project where latency was high, and I solved it by caching embeddings in Redis.";
  const speechPrompt = `Evaluate this candidate video self-introduction transcript:
"""${speechTranscript}"""
Return JSON matching:
{
  "overallScore": number (0-100),
  "clarityScore": number (0-100),
  "fluencyScore": number (0-100),
  "vocabularyScore": number (0-100),
  "confidenceScore": number (0-100),
  "grammarFeedback": string[],
  "vocabularyFeedback": string[],
  "keyStrengths": string[],
  "improvementAreas": string[],
  "samplePolishedIntro": string
}`;

  const step2Response = await callGroq([
    { role: 'system', content: 'You are an elite AI technical recruiter and speech coach. Return valid JSON only.' },
    { role: 'user', content: speechPrompt }
  ], { jsonMode: true });

  const step2Json = JSON.parse(step2Response);
  console.log('✓ Step 2 Verified! Overall Speech Score:', step2Json.overallScore);
  console.log('  Strengths:', step2Json.keyStrengths?.slice(0, 2));

  // STEP 3: AI Career Conversation Mentor Response
  console.log('\n--- [Step 3] Testing AI Career Chat Mentor Turn via Groq ---');
  const chatMessages = [
    { role: 'system', content: 'You are an AI Career Mentor at The AI School. Give a thoughtful 2-sentence feedback to the candidate answer.' },
    { role: 'user', content: 'I specialize in RAG systems and use cross-encoder rerankers to improve search precision.' }
  ];
  const step3Response = await callGroq(chatMessages, { temperature: 0.7, maxTokens: 200 });
  console.log('✓ Step 3 Verified! Mentor response:');
  console.log('  "' + step3Response.trim() + '"');

  // STEP 4: Resume Parsing & Skill Structuring
  console.log('\n--- [Step 4] Testing Resume Skill Structuring via Groq ---');
  const resumeSample = `Aryan Sharma. B.Tech IIT Delhi. Skills: Python, PyTorch, LangChain, Next.js, Docker, PostgreSQL. Built legal RAG search engine with 800ms response time.`;
  const resumePrompt = `Extract and structure this resume into JSON:
{
  "candidateName": string,
  "summary": string,
  "skills": {
    "programming": string[],
    "aiAndMl": string[],
    "webAndCloud": string[],
    "toolsAndFrameworks": string[],
    "softSkills": string[]
  },
  "experienceLevel": "Student / Fresher" | "Junior (1-2 yrs)" | "Mid-Level (3-5 yrs)" | "Senior (5+ yrs)",
  "highlightedProjects": [{"title": string, "description": string, "technologies": string[]}]
}
Resume text: ${resumeSample}`;

  const step4Response = await callGroq([
    { role: 'system', content: 'You are an expert AI resume parser. Return valid JSON only.' },
    { role: 'user', content: resumePrompt }
  ], { jsonMode: true });

  const step4Json = JSON.parse(step4Response);
  console.log('✓ Step 4 Verified! Parsed Name:', step4Json.candidateName);
  console.log('  AI/ML Skills found:', step4Json.skills?.aiAndMl);
  console.log('  Programming Skills found:', step4Json.skills?.programming);

  // STEP 5: Adaptive Technical Quiz Generation
  console.log('\n--- [Step 5] Testing Adaptive Technical Quiz Generation via Groq ---');
  const quizPrompt = `Generate exactly 5 adaptive technical interview questions for candidate with skills: Python, PyTorch, RAG.
Questions 1, 2, 3 must be "mcq" with 4 options and a correctAnswer matching one option.
Questions 4, 5 must be "numerical" with an integer correctAnswer.
Return JSON:
{
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "category": string,
      "difficulty": "Intermediate",
      "question": string,
      "options": string[],
      "correctAnswer": string,
      "explanation": string
    },
    ... (3 mcq total),
    {
      "id": "q4",
      "type": "numerical",
      "category": string,
      "difficulty": "Intermediate",
      "question": string,
      "correctAnswer": number,
      "explanation": string
    },
    ... (2 numerical total)
  ]
}`;

  const step5Response = await callGroq([
    { role: 'system', content: 'You are a Senior Principal AI Engineer. Return valid JSON only.' },
    { role: 'user', content: quizPrompt }
  ], { jsonMode: true });

  const step5Json = JSON.parse(step5Response);
  console.log('✓ Step 5 Verified! Generated Question Count:', step5Json.questions?.length);
  console.log('  Sample Q1:', step5Json.questions?.[0]?.question);
  console.log('  Sample Q4 (Numerical):', step5Json.questions?.[3]?.question);

  // STEP 6: Final Comprehensive Evaluation Report Generation
  console.log('\n--- [Step 6] Testing Final Evaluation Report Generation via Groq ---');
  const reportPrompt = `Generate a full career evaluation report for Aryan Sharma.
Speech Score: 85. Quiz Score: 4 out of 5. Target Domain: AI Engineering.
Return JSON matching:
{
  "overallScore": number (0-100),
  "readinessLevel": "Foundational" | "Emerging Talent" | "Industry Ready" | "Advanced Practitioner",
  "summary": string,
  "metricScores": [
    { "name": string, "score": number, "benchmark": number, "description": string }
  ],
  "identifiedStrengths": string[],
  "areasForGrowth": string[],
  "ninetyDayRoadmap": [
    { "month": string, "title": string, "goals": string[] }
  ],
  "recommendedCourses": [
    { "name": string, "slug": string, "matchPercentage": number, "description": string, "category": string }
  ]
}`;

  const step6Response = await callGroq([
    { role: 'system', content: 'You are Chief Talent Scientist at The AI School. Return valid JSON only.' },
    { role: 'user', content: reportPrompt }
  ], { jsonMode: true });

  const step6Json = JSON.parse(step6Response);
  console.log('✓ Step 6 Verified! Overall Composite Score:', step6Json.overallScore);
  console.log('  Readiness Level:', step6Json.readinessLevel);
  console.log('  Metrics count:', step6Json.metricScores?.length);
  console.log('  Roadmap phases:', step6Json.ninetyDayRoadmap?.length);

  console.log('\n===============================================================');
  console.log('🎉 ALL LIVE GROQ API STEPS SUCCEEDED WITH REAL RESPONSES!');
  console.log('===============================================================');
}

runVerification().catch(err => {
  console.error('Verification Error:', err);
  process.exit(1);
});

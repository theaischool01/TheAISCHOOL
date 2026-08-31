import answerKeys from './assessmentAnswerKeys.json';

export interface ScoreResults {
  technicalFoundation: number;
  aiReadiness: number;
  industryReadiness: number;
  learningVelocity: number;
  overall: number;
}

export interface CourseRecommendation {
  slug: string;
  title: string;
  confidence: number;
}

export interface SkillGapSummary {
  current: string[];
  missing: string[];
}

export interface AssessmentCalculationInput {
  formData: {
    name?: string;
    email?: string;
    phone?: string;
    college?: string;
    degree?: string;
    graduationYear?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
  };
  resumeUrl?: string | null;
  skillsMatrix: Record<string, boolean>;
  interests: Record<string, number>;
  selectedAnswers: Record<string, string>;
  questions: any[];
  slugToTitleMap: Record<string, string>;
}

export function calculateAssessmentScores(input: AssessmentCalculationInput) {
  const { formData, resumeUrl, skillsMatrix, interests, selectedAnswers, questions, slugToTitleMap } = input;

  let correctCount = 0;
  questions.forEach((q) => {
    const chosenOptionId = selectedAnswers[q.id];
    const correctOptionId = (answerKeys as Record<string, string>)[q.id];
    if (chosenOptionId && correctOptionId && chosenOptionId === correctOptionId) {
      correctCount += 1;
    } else if (chosenOptionId && !correctOptionId) {
      correctCount += 0.8;
    }
  });

  const questionTotal = Math.max(questions.length, 10);
  const technicalFoundation = Math.min(Math.round((correctCount / questionTotal) * 100), 100);
  const genAiInterest = interests.GenAI ?? 50;
  const codingInterest = interests.Coding ?? 50;
  const aiReadiness = Math.round((genAiInterest * 0.5) + (codingInterest * 0.2) + (technicalFoundation * 0.3));

  let compScore = 40;
  if (formData.linkedinUrl) compScore += 20;
  if (formData.githubUrl) compScore += 20;
  if (resumeUrl) compScore += 20;
  const industryReadiness = Math.round((compScore * 0.4) + (technicalFoundation * 0.6));
  const learningVelocity = Math.round((codingInterest * 0.4) + (technicalFoundation * 0.6));
  const overall = Math.round((technicalFoundation + aiReadiness + industryReadiness + learningVelocity) / 4);

  const scores: ScoreResults = {
    technicalFoundation,
    aiReadiness,
    industryReadiness,
    learningVelocity,
    overall,
  };

  const categoryScores: Record<string, number> = {
    'AI Agents & GenAI': genAiInterest * 0.7 + (skillsMatrix.python ? 30 : 0),
    'Data Analytics': (interests.DataScience ?? 50) * 0.7 + (skillsMatrix.sql ? 30 : 0),
    'Cloud & Security': (interests.Cloud ?? 50) * 0.7 + (skillsMatrix.cloud ? 30 : 0),
    'Programming': codingInterest * 0.7 + (skillsMatrix.react ? 30 : 0),
    'Business & Growth': (interests.Business ?? 50) * 0.7,
  };

  const sortedCats = Object.entries(categoryScores).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCats[0][0];

  let primary: CourseRecommendation = {
    slug: 'building-your-ai-agent-for-coders',
    title: slugToTitleMap['building-your-ai-agent-for-coders'] || 'Building Your AI Agent For Coders',
    confidence: 91,
  };

  let secondaries: CourseRecommendation[] = [
    { slug: 'ai-agent-chatbot-creation', title: slugToTitleMap['ai-agent-chatbot-creation'] || 'AI Agent Chatbot Creation', confidence: 84 },
    { slug: 'building-and-deploying-ai-agents', title: slugToTitleMap['building-and-deploying-ai-agents'] || 'Building and Deploying AI Agents', confidence: 78 },
  ];

  if (topCategory === 'Data Analytics') {
    primary = { slug: 'data-analysis-with-ai-and-powerbi', title: slugToTitleMap['data-analysis-with-ai-and-powerbi'] || 'Data Analysis with AI and PowerBI', confidence: Math.round(sortedCats[0][1]) };
    secondaries = [{ slug: 'python-for-data-analytics', title: slugToTitleMap['python-for-data-analytics'] || 'Python for Data Analytics', confidence: 80 }];
  } else if (topCategory === 'Cloud & Security') {
    primary = { slug: 'ai-cloud-engineer', title: slugToTitleMap['ai-cloud-engineer'] || 'AI Cloud Engineer', confidence: Math.round(sortedCats[0][1]) };
    secondaries = [{ slug: 'cyber-security-with-ai', title: slugToTitleMap['cyber-security-with-ai'] || 'Cyber Security with AI', confidence: 75 }];
  } else if (topCategory === 'Programming') {
    primary = { slug: 'no-code-ai-web-development', title: slugToTitleMap['no-code-ai-web-development'] || 'No-Code AI Web Development', confidence: Math.round(sortedCats[0][1]) };
    secondaries = [{ slug: 'mobile-app-development', title: slugToTitleMap['mobile-app-development'] || 'Mobile App Development', confidence: 79 }];
  } else if (topCategory === 'Business & Growth') {
    primary = { slug: 'digital-marketing-and-lead-generation', title: slugToTitleMap['digital-marketing-and-lead-generation'] || 'Digital Marketing & Lead Gen', confidence: Math.round(sortedCats[0][1]) };
    secondaries = [{ slug: 'ai-agent-chatbot-creation', title: slugToTitleMap['ai-agent-chatbot-creation'] || 'AI Agent Chatbot Creation', confidence: 74 }];
  }

  const skillList = [
    { key: 'python', label: 'Python' },
    { key: 'sql', label: 'SQL' },
    { key: 'machineLearning', label: 'Machine Learning' },
    { key: 'react', label: 'React / Frontend' },
    { key: 'generativeAi', label: 'Generative AI' },
    { key: 'cloud', label: 'Cloud Deployments' },
    { key: 'dataAnalytics', label: 'Data Analytics' },
  ];

  const skillGaps: SkillGapSummary = {
    current: [],
    missing: [],
  };

  skillList.forEach((sk) => {
    if (skillsMatrix[sk.key]) skillGaps.current.push(sk.label);
    else skillGaps.missing.push(sk.label);
  });

  return {
    scores,
    primaryCourse: primary,
    secondaryCourses: secondaries,
    skillGaps,
  };
}

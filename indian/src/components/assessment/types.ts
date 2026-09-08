export interface CandidateProfile {
  name: string;
  email: string;
  phone: string;
  college: string;
  targetDomain?: string;
  experienceLevel?: string;
}

export interface SpeechEvaluation {
  overallScore: number;
  clarityScore: number;
  fluencyScore: number;
  vocabularyScore: number;
  confidenceScore: number;
  grammarFeedback: string[];
  vocabularyFeedback: string[];
  keyStrengths: string[];
  improvementAreas: string[];
  samplePolishedIntro?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'mentor' | 'candidate';
  text: string;
  timestamp: string;
  questionIndex?: number;
}

export interface StructuredResume {
  candidateName: string;
  email?: string;
  phone?: string;
  summary: string;
  skills: {
    programming: string[];
    aiAndMl: string[];
    webAndCloud: string[];
    toolsAndFrameworks: string[];
    softSkills: string[];
  };
  experienceLevel: 'Student / Fresher' | 'Junior (1-2 yrs)' | 'Mid-Level (3-5 yrs)' | 'Senior (5+ yrs)';
  highlightedProjects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year?: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'numerical';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number;
  userAnswer?: string | number;
  explanation: string;
  isCorrect?: boolean;
}

export interface MetricScore {
  name: string;
  score: number; // 0 - 100
  benchmark: number; // industry avg
  description: string;
}

export interface EvaluationReport {
  overallScore: number; // 0 - 100
  readinessLevel: 'Foundational' | 'Emerging Talent' | 'Industry Ready' | 'Advanced Practitioner';
  summary: string;
  metricScores: MetricScore[];
  identifiedStrengths: string[];
  areasForGrowth: string[];
  ninetyDayRoadmap: {
    month: string;
    title: string;
    goals: string[];
  }[];
  recommendedCourses: {
    name: string;
    slug: string;
    matchPercentage: number;
    description: string;
    category: string;
  }[];
}

export interface AssessmentState {
  currentStep: number;
  demoMode: boolean;
  candidate: CandidateProfile;
  selfIntroText: string;
  selfIntroEvaluation: SpeechEvaluation | null;
  chatTranscript: ChatMessage[];
  resumeText: string;
  resumeStructured: StructuredResume | null;
  technicalQuiz: QuizQuestion[];
  quizCompleted: boolean;
  quizScore: number;
  evaluationReport: EvaluationReport | null;
  isSaving: boolean;
  savedReportId?: string | number;
}

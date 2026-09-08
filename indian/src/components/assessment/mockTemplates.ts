import { SpeechEvaluation, StructuredResume, QuizQuestion, EvaluationReport, CandidateProfile } from './types';

export const MOCK_CANDIDATE: CandidateProfile = {
  name: 'Aryan Sharma',
  email: 'aryan.sharma@example.com',
  phone: '+91 98765 43210',
  college: 'IIT Delhi / B.Tech Computer Science',
  targetDomain: 'AI & Machine Learning Engineering',
  experienceLevel: 'Student / Fresher'
};

export const MOCK_SPEECH_EVALUATION: SpeechEvaluation = {
  overallScore: 84,
  clarityScore: 86,
  fluencyScore: 82,
  vocabularyScore: 80,
  confidenceScore: 88,
  grammarFeedback: [
    'Good subject-verb agreement throughout your technical explanations.',
    'Slight tendency to use filler phrases ("like", "you know") when transitioning between project ideas.'
  ],
  vocabularyFeedback: [
    'Strong deployment of domain-specific terminology (e.g., "fine-tuning", "vector embeddings", "latency").',
    'Consider replacing colloquial phrasing like "made a chatbot" with "architected an agentic workflow".'
  ],
  keyStrengths: [
    'Confident voice modulation and clear articulation of personal motivation in AI.',
    'Concise narrative structuring from academic background to hands-on projects.'
  ],
  improvementAreas: [
    'Structure your project summaries using the STAR method (Situation, Task, Action, Result).',
    'Maintain consistent eye contact with the camera when discussing quantifiable metrics.'
  ],
  samplePolishedIntro:
    "Hello, I am Aryan Sharma, a final-year Computer Science undergraduate specializing in Artificial Intelligence. Over the past two years, I have built production-grade LLM applications, including a RAG-based code assistant and multi-agent systems using LangChain and FastAPI. I am passionate about optimizing inference throughput and designing scalable AI solutions that solve real-world problems."
};

export const MOCK_CHAT_QUESTIONS = [
  "Welcome Aryan! Let's dive in. What motivated you to specialize in Artificial Intelligence, and what was the most challenging technical roadblock you solved recently?",
  "That's insightful. When deploying modern LLM or GenAI applications, how do you approach hallucination mitigation and data freshness?",
  "Could you walk me through an end-to-end project where you had to evaluate trade-offs between model accuracy, inference speed, and API compute costs?",
  "In collaborative engineering environments, how do you handle differing architectural opinions or ambiguous project requirements?",
  "Finally, looking ahead at the rapid evolution of autonomous AI agents, where do you see your skill set growing in the next 12 to 24 months?"
];

export const MOCK_CHAT_MENTOR_RESPONSES: Record<number, string> = {
  0: "Excellent context! Overcoming that integration roadblock demonstrates strong problem-solving tenacity.",
  1: "Spot-on explanation. Grounding via hybrid search and semantic chunking is crucial for enterprise-grade reliability.",
  2: "Great practical appreciation of latency vs cost constraints. That pragmatic engineering mindset is what tier-1 teams value.",
  3: "Clear communication and empathetic alignment are hallmarks of high-performing technical contributors.",
  4: "Inspiring vision. Staying ahead of agentic autonomy and multi-modal tool use will position you at the cutting edge."
};

export const MOCK_STRUCTURED_RESUME: StructuredResume = {
  candidateName: 'Aryan Sharma',
  email: 'aryan.sharma@example.com',
  phone: '+91 98765 43210',
  summary:
    'Aspiring AI Engineer with a solid foundation in Python, Machine Learning, Deep Learning, and Full-Stack Engineering. Proven experience building RAG architectures, prompt pipelines, and REST APIs.',
  skills: {
    programming: ['Python', 'TypeScript', 'SQL', 'C++'],
    aiAndMl: ['PyTorch', 'Transformers', 'LangChain', 'LlamaIndex', 'Vector Databases (Pinecone/Chroma)', 'RAG'],
    webAndCloud: ['Next.js', 'FastAPI', 'Docker', 'AWS (S3, EC2)', 'PostgreSQL'],
    toolsAndFrameworks: ['Git', 'HuggingFace', 'Postman', 'Linux', 'Vercel'],
    softSkills: ['Analytical Problem Solving', 'Technical Communication', 'System Design', 'Agile Collaboration']
  },
  experienceLevel: 'Student / Fresher',
  highlightedProjects: [
    {
      title: 'Enterprise Legal Document RAG System',
      description: 'Engineered an end-to-end RAG pipeline processing 10,000+ page contracts with semantic chunking and reranking.',
      technologies: ['Python', 'FastAPI', 'ChromaDB', 'OpenAI API', 'Streamlit']
    },
    {
      title: 'Real-Time Vision Edge Classifier',
      description: 'Optimized MobileNetV3 for edge deployment achieving 45 FPS with 92.4% top-1 accuracy on custom industrial dataset.',
      technologies: ['PyTorch', 'ONNX', 'OpenCV', 'Raspberry Pi']
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Indian Institute of Technology (IIT) Delhi',
      year: '2022 - 2026'
    }
  ]
};

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'mcq',
    category: 'AI & Deep Learning',
    difficulty: 'Intermediate',
    question: 'In modern Transformer models, what is the computational complexity of the standard scaled dot-product self-attention mechanism with respect to input sequence length N?',
    options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(2^N)'],
    correctAnswer: 'O(N²)',
    explanation: 'Standard self-attention computes an attention weight matrix comparing every token with every other token, resulting in quadratic O(N²) time and memory complexity with sequence length N.'
  },
  {
    id: 'q2',
    type: 'mcq',
    category: 'RAG & Vector Retrieval',
    difficulty: 'Intermediate',
    question: 'When implementing a Retrieval-Augmented Generation (RAG) system, what is the primary role of a "cross-encoder re-ranker" placed after initial bi-encoder vector retrieval?',
    options: [
      'To generate vector embeddings 10x faster',
      'To perform joint cross-attention over query and candidate chunks for precise semantic relevance scoring',
      'To compress document text into a smaller token window',
      'To convert vector embeddings directly into SQL queries'
    ],
    correctAnswer: 'To perform joint cross-attention over query and candidate chunks for precise semantic relevance scoring',
    explanation: 'While bi-encoders enable fast approximate nearest-neighbor search across millions of vectors, a cross-encoder scores candidate document-query pairs jointly, capturing nuanced semantic interaction at higher accuracy.'
  },
  {
    id: 'q3',
    type: 'mcq',
    category: 'Python & Data Engineering',
    difficulty: 'Intermediate',
    question: 'In Python, what is the primary architectural difference between a generator function using `yield` and a standard function returning a list?',
    options: [
      'Generators execute on a separate CPU thread automatically',
      'Generators evaluate lazily, yielding items one by one with O(1) memory allocation rather than building the entire list in memory',
      'Generators can only be iterated over exactly two times',
      'Generators are compiled directly into C machine code'
    ],
    correctAnswer: 'Generators evaluate lazily, yielding items one by one with O(1) memory allocation rather than building the entire list in memory',
    explanation: 'Generators produce values on the fly and preserve state between yields, consuming minimal memory even when processing millions of data rows.'
  },
  {
    id: 'q4',
    type: 'numerical',
    category: 'Machine Learning Mathematics',
    difficulty: 'Intermediate',
    question: 'A binary classification model on an evaluation set of 100 samples produces 40 True Positives, 10 False Positives, 10 False Negatives, and 40 True Negatives. What is the Precision of this model as a percentage (enter integer 0-100)?',
    correctAnswer: 80,
    explanation: 'Precision = TP / (TP + FP) = 40 / (40 + 10) = 40 / 50 = 0.80 = 80%.'
  },
  {
    id: 'q5',
    type: 'numerical',
    category: 'System Design & Token Economics',
    difficulty: 'Intermediate',
    question: 'An enterprise LLM agent processes 1,000 user requests per hour. Each request averages 500 prompt tokens and 250 completion tokens. Input tokens cost $2 per million, and output tokens cost $6 per million. What is the total LLM API cost for 24 hours in USD (rounded to the nearest whole dollar integer)?',
    correctAnswer: 60,
    explanation: 'Per hour: Input = 1000 * 500 = 500,000 tokens ($1.00). Output = 1000 * 250 = 250,000 tokens ($1.50). Total per hour = $2.50. For 24 hours = 24 * $2.50 = $60.'
  }
];

export function generateEvaluationReport(
  candidate: CandidateProfile,
  speechScore: number,
  quizScore: number,
  totalQuiz: number
): EvaluationReport {
  const quizPct = Math.round((quizScore / totalQuiz) * 100);
  const techReadiness = Math.round(quizPct * 0.7 + 25);
  const commReadiness = speechScore || 82;
  const overall = Math.round((techReadiness * 0.45) + (commReadiness * 0.35) + 85 * 0.20);

  let readinessLevel: EvaluationReport['readinessLevel'] = 'Emerging Talent';
  if (overall >= 85) readinessLevel = 'Industry Ready';
  else if (overall >= 92) readinessLevel = 'Advanced Practitioner';
  else if (overall < 70) readinessLevel = 'Foundational';

  return {
    overallScore: overall,
    readinessLevel,
    summary: `${candidate.name || 'The candidate'} demonstrates a robust combination of software fundamentals, articulate technical communication, and practical interest in modern Generative AI. With targeted mentorship in agentic deployment and distributed systems, ${candidate.name ? candidate.name.split(' ')[0] : 'they'} will excel in high-growth AI engineering roles.`,
    metricScores: [
      {
        name: 'AI & Deep Learning Foundations',
        score: techReadiness,
        benchmark: 68,
        description: 'Conceptual grasp of neural architectures, transformer mechanisms, and model lifecycle.'
      },
      {
        name: 'Verbal Articulation & Presence',
        score: commReadiness,
        benchmark: 70,
        description: 'Clarity, pacing, professional vocabulary, and confidence under interview scrutiny.'
      },
      {
        name: 'Algorithmic Problem Solving',
        score: Math.min(100, Math.round(quizPct * 0.85 + 15)),
        benchmark: 65,
        description: 'Quantitative aptitude, mathematical logic, and analytical problem breakdown.'
      },
      {
        name: 'Production & System Design Readiness',
        score: 78,
        benchmark: 62,
        description: 'Awareness of API economics, latency budgets, caching, and scalable architectures.'
      },
      {
        name: 'Learning Velocity & Adaptability',
        score: 89,
        benchmark: 72,
        description: 'Speed of absorbing cutting-edge AI frameworks and pivoting across technical stacks.'
      },
      {
        name: 'Code & Software Craftsmanship',
        score: 80,
        benchmark: 69,
        description: 'Code modularity, clean documentation, type safety, and debugging discipline.'
      },
      {
        name: 'Industry & Corporate Alignment',
        score: 84,
        benchmark: 71,
        description: 'Readiness for cross-functional collaboration, agile sprints, and enterprise expectations.'
      }
    ],
    identifiedStrengths: [
      'Strong grasp of LLM orchestration concepts (RAG, embeddings, vector indexing).',
      'Articulate and structured communication style with clear technical storytelling.',
      'Sound analytical reasoning and accurate quantitative estimation under timed pressure.',
      'Demonstrated proactive initiative in building hands-on portfolio projects.'
    ],
    areasForGrowth: [
      'Deepen knowledge of distributed model training and quantization techniques (AWQ, GGUF, vLLM).',
      'Adopt the STAR methodology systematically when discussing project trade-offs.',
      'Strengthen enterprise testing discipline (integration tests, CI/CD pipelines, latency benchmarking).'
    ],
    ninetyDayRoadmap: [
      {
        month: 'Month 1: Advanced Agent Architecture',
        title: 'Multi-Agent Orchestration & Tool Calling',
        goals: [
          'Master LangGraph / CrewAI for stateful autonomous agents',
          'Implement recursive function calling and error-recovery loops',
          'Deploy local models using Ollama and vLLM inference engines'
        ]
      },
      {
        month: 'Month 2: Enterprise RAG & Evaluations',
        title: 'Production Data Pipelines & RAG Triad',
        goals: [
          'Build hybrid search with dense (BM25) and sparse embeddings',
          'Implement automated RAG evaluation metrics using Ragas / TruLens',
          'Optimize vector database partitioning and metadata filtering'
        ]
      },
      {
        month: 'Month 3: Capstone Deployment & Career Launch',
        title: 'Cloud Production, Portfolio Review & Mock Panels',
        goals: [
          'Containerize AI services with Docker and deploy to AWS / GCP',
          'Complete end-to-end multi-modal capstone with full telemetry',
          'Undergo 3 rigorous technical interview simulations with FAANG mentors'
        ]
      }
    ],
    recommendedCourses: [
      {
        name: 'Building Your AI Agent (For Coders)',
        slug: 'building-your-ai-agent-for-coders',
        matchPercentage: 96,
        description: 'Hands-on live engineering track building production multi-agent systems, custom tools, and self-correcting workflows.',
        category: 'AI Engineering'
      },
      {
        name: 'Advanced AI Architectures & RAG Systems',
        slug: 'advanced-ai-architectures-rag',
        matchPercentage: 92,
        description: 'Master enterprise-grade retrieval augmented generation, fine-tuning, vector indexes, and evaluation frameworks.',
        category: 'Specialization'
      },
      {
        name: 'AI Cloud Engineer Bootcamp',
        slug: 'ai-cloud-engineer',
        matchPercentage: 88,
        description: 'Deploy, scale, and monitor AI workloads on cloud infrastructure with GPU optimization and Kubernetes.',
        category: 'Cloud & Infrastructure'
      }
    ]
  };
}

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const courses = [
  {
    slug: 'building-your-ai-agent-for-coders',
    title: 'Building Your AI Agent (For Coders)',
    category: 'AI Agents & GenAI',
    description: 'Transform your skills into building next-generation AI systems with Python and LLM integrations.',
    difficulty: 'Intermediate',
  },
  {
    slug: 'building-and-deploying-ai-agents',
    title: 'Building & Deploying AI Agents (No-Code)',
    category: 'AI Agents & GenAI',
    description: 'Build autonomous software agents without writing a single line of code using Flowise and n8n.',
    difficulty: 'Beginner',
  },
  {
    slug: 'ai-agent-chatbot-creation',
    title: 'AI Agent Chatbot Creation (For All)',
    category: 'AI Agents & GenAI',
    description: 'Design, build, and deploy conversational customer service agents on WhatsApp and Telegram.',
    difficulty: 'Beginner',
  },
  {
    slug: 'prompt-engineering-101',
    title: 'Prompt Engineering 101',
    category: 'AI Agents & GenAI',
    description: 'Master prompting methodologies, prompt chaining, and embedding retrievals.',
    difficulty: 'Beginner',
  },
  {
    slug: 'data-analysis-with-ai-and-powerbi',
    title: 'Data Analysis with AI and PowerBI (For All)',
    category: 'Data Analytics',
    description: 'Uncover insights and drive business growth using AI-powered analytics and PowerBI dashboards.',
    difficulty: 'Beginner',
  },
  {
    slug: 'python-for-data-analytics',
    title: 'Python for Data Analytics (For Coders)',
    category: 'Data Analytics',
    description: 'Unlock insights from complex datasets with pandas, numpy, and Jupyter notebooks.',
    difficulty: 'Intermediate',
  },
  {
    slug: 'ai-cloud-engineer',
    title: 'AI Cloud Engineer (For All)',
    category: 'Cloud & Security',
    description: 'Deploy and optimize machine learning models at scale in AWS and GCP.',
    difficulty: 'Intermediate',
  },
  {
    slug: 'cyber-security-with-ai',
    title: 'Cyber Security with AI (For All)',
    category: 'Cloud & Security',
    description: 'Protect modern digital networks using AI-driven threat intelligence and vulnerability scanning.',
    difficulty: 'Beginner',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development (For Coders)',
    category: 'Programming',
    description: 'Build stunning cross-platform mobile apps using React Native and Expo.',
    difficulty: 'Intermediate',
  },
  {
    slug: 'no-code-ai-web-development',
    title: 'No-Code AI Web Development (For All)',
    category: 'Programming',
    description: 'Create and launch beautiful, interactive web apps using modern AI builders like Webflow and Framer.',
    difficulty: 'Beginner',
  },
  {
    slug: 'digital-marketing-and-lead-generation',
    title: 'Digital Marketing & Lead Gen (For All)',
    category: 'Business & Growth',
    description: 'Scale customer acquisition with AI-driven marketing campaigns, SEO copies, and CRM pipelines.',
    difficulty: 'Beginner',
  },
];

const questions = [
  // Beginner Questions
  {
    category: 'Python',
    difficulty: 'Beginner',
    question: 'Which of the following is the correct syntax to create a list in Python?',
    explanation: 'Python lists are created by placing elements inside square brackets `[]`.',
    options: [
      { text: 'my_list = [1, 2, 3]', isCorrect: true },
      { text: 'my_list = (1, 2, 3)', isCorrect: false },
      { text: 'my_list = {1, 2, 3}', isCorrect: false },
      { text: 'my_list = <1, 2, 3>', isCorrect: false },
    ],
  },
  {
    category: 'SQL',
    difficulty: 'Beginner',
    question: 'Which SQL statement is used to retrieve data from a database?',
    explanation: 'The SELECT statement is used to select data from a database.',
    options: [
      { text: 'SELECT', isCorrect: true },
      { text: 'GET', isCorrect: false },
      { text: 'EXTRACT', isCorrect: false },
      { text: 'OPEN', isCorrect: false },
    ],
  },
  {
    category: 'AI Fundamentals',
    difficulty: 'Beginner',
    question: 'What is supervised learning?',
    explanation: 'Supervised learning is where the model is trained on labeled training data containing both inputs and target outputs.',
    options: [
      { text: 'Training a model with labeled data containing inputs and targets', isCorrect: true },
      { text: 'Training a model without any human intervention or targets', isCorrect: false },
      { text: 'Running an algorithm purely in the cloud without internet', isCorrect: false },
      { text: 'A process of writing code templates using visual drag-and-drop tools', isCorrect: false },
    ],
  },
  {
    category: 'Machine Learning',
    difficulty: 'Beginner',
    question: 'What type of machine learning problem is predicting a housing price based on square footage?',
    explanation: 'Predicting continuous numerical values is a Regression problem.',
    options: [
      { text: 'Regression', isCorrect: true },
      { text: 'Classification', isCorrect: false },
      { text: 'Clustering', isCorrect: false },
      { text: 'Dimensionality Reduction', isCorrect: false },
    ],
  },
  {
    category: 'Generative AI',
    difficulty: 'Beginner',
    question: 'What does LLM stand for in the context of Generative AI?',
    explanation: 'LLM stands for Large Language Model.',
    options: [
      { text: 'Large Language Model', isCorrect: true },
      { text: 'Logical Learning Machine', isCorrect: false },
      { text: 'Linear Logic Method', isCorrect: false },
      { text: 'Language Layout Map', isCorrect: false },
    ],
  },
  {
    category: 'Data Analytics',
    difficulty: 'Beginner',
    question: 'Which tool is most commonly used by non-coders for interactive business dashboards and reporting?',
    explanation: 'PowerBI is a leading visual business intelligence dashboarding tool.',
    options: [
      { text: 'PowerBI', isCorrect: true },
      { text: 'Pandas', isCorrect: false },
      { text: 'Kubernetes', isCorrect: false },
      { text: 'Wireshark', isCorrect: false },
    ],
  },
  {
    category: 'Cloud',
    difficulty: 'Beginner',
    question: 'What does GCP stand for?',
    explanation: 'GCP stands for Google Cloud Platform.',
    options: [
      { text: 'Google Cloud Platform', isCorrect: true },
      { text: 'General Computing Process', isCorrect: false },
      { text: 'Global Cloud Partition', isCorrect: false },
      { text: 'Graphical Container Protocol', isCorrect: false },
    ],
  },
  {
    category: 'Problem Solving',
    difficulty: 'Beginner',
    question: 'If a sequence goes: 2, 4, 8, 16, ... what is the next number?',
    explanation: 'Each number is multiplied by 2. 16 * 2 = 32.',
    options: [
      { text: '32', isCorrect: true },
      { text: '24', isCorrect: false },
      { text: '20', isCorrect: false },
      { text: '64', isCorrect: false },
    ],
  },

  // Intermediate Questions
  {
    category: 'Python',
    difficulty: 'Intermediate',
    question: 'What is a list comprehension in Python?',
    explanation: 'List comprehension offers a shorter syntax to create a new list based on values of an existing list.',
    options: [
      { text: 'A concise way to create lists using a single line loop', isCorrect: true },
      { text: 'A debugging tool to check list elements in memory', isCorrect: false },
      { text: 'A library for parsing JSON objects', isCorrect: false },
      { text: 'A method to compress lists to gzip format', isCorrect: false },
    ],
  },
  {
    category: 'SQL',
    difficulty: 'Intermediate',
    question: 'Which clause is used to filter group results after grouping with GROUP BY?',
    explanation: 'HAVING is used to filter groups, whereas WHERE filters individual rows before grouping.',
    options: [
      { text: 'HAVING', isCorrect: true },
      { text: 'WHERE', isCorrect: false },
      { text: 'FILTER', isCorrect: false },
      { text: 'SELECT', isCorrect: false },
    ],
  },
  {
    category: 'AI Fundamentals',
    difficulty: 'Intermediate',
    question: 'What is a neural network "activation function" used for?',
    explanation: 'Activation functions introduce non-linearity into the network, allowing it to learn complex patterns.',
    options: [
      { text: 'To introduce non-linearity into the network', isCorrect: true },
      { text: 'To save the network parameters to disk', isCorrect: false },
      { text: 'To adjust the learning rate during backpropagation', isCorrect: false },
      { text: 'To connect the network to a GPU compiler', isCorrect: false },
    ],
  },
  {
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    question: 'Which of the following is commonly used to prevent model overfitting?',
    explanation: 'Regularization (like L1/L2) adds a penalty parameter to discourage complex models, reducing overfitting.',
    options: [
      { text: 'Regularization', isCorrect: true },
      { text: 'Increasing model layers indefinitely', isCorrect: false },
      { text: 'Using unlabelled validation data', isCorrect: false },
      { text: 'Removing all bias nodes', isCorrect: false },
    ],
  },
  {
    category: 'Generative AI',
    difficulty: 'Intermediate',
    question: 'What is the role of Temperature in LLM generation?',
    explanation: 'Temperature controls the randomness/creativity of generations. Lower values are deterministic; higher values are more creative.',
    options: [
      { text: 'It controls the randomness and creativity of the output text', isCorrect: true },
      { text: 'It measures the physical heat of the server GPU runs', isCorrect: false },
      { text: 'It sets the context window limit in bytes', isCorrect: false },
      { text: 'It limits the api tokens allowed per minute', isCorrect: false },
    ],
  },
  {
    category: 'Data Analytics',
    difficulty: 'Intermediate',
    question: 'In Pandas, which function is used to load a CSV file into a DataFrame?',
    explanation: '`read_csv()` is used to read CSV files into Pandas DataFrames.',
    options: [
      { text: 'read_csv()', isCorrect: true },
      { text: 'load_csv()', isCorrect: false },
      { text: 'get_csv()', isCorrect: false },
      { text: 'import_csv()', isCorrect: false },
    ],
  },
  {
    category: 'Cloud',
    difficulty: 'Intermediate',
    question: 'What does Docker do?',
    explanation: 'Docker packages an application and its dependencies into virtual containers that can run on any server.',
    options: [
      { text: 'Packages applications into self-contained runtime containers', isCorrect: true },
      { text: 'Compiles C++ files to binary formats', isCorrect: false },
      { text: 'Provides automated DNS route resolving features', isCorrect: false },
      { text: 'Encrypts database fields using KMS key blocks', isCorrect: false },
    ],
  },
  {
    category: 'Problem Solving',
    difficulty: 'Intermediate',
    question: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    explanation: 'Let ball = x. Bat = x + 1. Total = 2x + 1 = 1.10 => 2x = 0.10 => x = 0.05 (5 cents).',
    options: [
      { text: '5 cents', isCorrect: true },
      { text: '10 cents', isCorrect: false },
      { text: '1 cent', isCorrect: false },
      { text: '15 cents', isCorrect: false },
    ],
  },

  // Advanced Questions
  {
    category: 'Python',
    difficulty: 'Advanced',
    question: 'What is a decorator in Python?',
    explanation: 'A decorator is a design pattern in Python that allows a user to add new functionality to an existing object without modifying its structure.',
    options: [
      { text: 'A function that takes another function and extends its behavior without modifying it', isCorrect: true },
      { text: 'A CSS class mapping pattern used inside visual widgets', isCorrect: false },
      { text: 'A formatting function that structures printing lists', isCorrect: false },
      { text: 'A memory clean utility running in garbage collectors', isCorrect: false },
    ],
  },
  {
    category: 'SQL',
    difficulty: 'Advanced',
    question: 'What is the purpose of a database Index?',
    explanation: 'Indexes speed up data retrieval operations at the cost of additional storage and write speed.',
    options: [
      { text: 'To speed up query data retrieval operations', isCorrect: true },
      { text: 'To guarantee data normalization rules are followed', isCorrect: false },
      { text: 'To link tables in a schema model automatically', isCorrect: false },
      { text: 'To prevent duplicate key injections', isCorrect: false },
    ],
  },
  {
    category: 'AI Fundamentals',
    difficulty: 'Advanced',
    question: 'What is the "vanishing gradient problem" in deep learning?',
    explanation: 'In deep networks, gradients can shrink exponentially during backpropagation, making training very slow or ineffective.',
    options: [
      { text: 'Gradients shrinking exponentially during backpropagation in deep networks', isCorrect: true },
      { text: 'Gradients becoming infinitely large, causing model overflows', isCorrect: false },
      { text: 'A database connectivity timeout during training epochs', isCorrect: false },
      { text: 'The failure of loss parameters to update due to incorrect activation', isCorrect: false },
    ],
  },
  {
    category: 'Machine Learning',
    difficulty: 'Advanced',
    question: 'Which of the following describes the difference between Bagging and Boosting?',
    explanation: 'Bagging trains models in parallel (e.g. Random Forest), whereas Boosting trains models sequentially (e.g. XGBoost).',
    options: [
      { text: 'Bagging runs estimators in parallel; Boosting runs estimators sequentially', isCorrect: true },
      { text: 'Bagging reduces bias; Boosting reduces variance', isCorrect: false },
      { text: 'Bagging uses deep trees; Boosting uses wide neural clusters', isCorrect: false },
      { text: 'Bagging only works on text; Boosting only works on images', isCorrect: false },
    ],
  },
  {
    category: 'Generative AI',
    difficulty: 'Advanced',
    question: 'What is Retrieval-Augmented Generation (RAG)?',
    explanation: 'RAG retrieves relevant external documents matching a query and passes them to the LLM as context for generation.',
    options: [
      { text: 'Augmenting LLMs with external query-retrieved document contexts', isCorrect: true },
      { text: 'Running fine-tuning pipelines over large CSV datasets', isCorrect: false },
      { text: 'A parsing mechanism to clean PDF resume documents', isCorrect: false },
      { text: 'A technique to compile Python model checkpoints to cloud buckets', isCorrect: false },
    ],
  },
  {
    category: 'Data Analytics',
    difficulty: 'Advanced',
    question: 'What does a high p-value (typically > 0.05) indicate in statistical hypothesis testing?',
    explanation: 'A high p-value indicates that you fail to reject the null hypothesis.',
    options: [
      { text: 'You fail to reject the null hypothesis', isCorrect: true },
      { text: 'You reject the null hypothesis in favor of the alternative', isCorrect: false },
      { text: 'The sample size is too small for accurate findings', isCorrect: false },
      { text: 'The correlation coefficient is exactly equal to zero', isCorrect: false },
    ],
  },
  {
    category: 'Cloud',
    difficulty: 'Advanced',
    question: 'What is the primary benefit of Kubernetes in microservices architectures?',
    explanation: 'Kubernetes provides automated container deployment, scaling, healing, and management.',
    options: [
      { text: 'Automated container deployment, scaling, and orchestration management', isCorrect: true },
      { text: 'Visual database diagram creation templates', isCorrect: false },
      { text: 'Hosting git version control structures in local environments', isCorrect: false },
      { text: 'Speeding up JavaScript builds during client bundler compilation', isCorrect: false },
    ],
  },
  {
    category: 'Problem Solving',
    difficulty: 'Advanced',
    question: 'In a room of 30 people, what is the approximate probability that at least two share the same birthday?',
    explanation: 'By the Birthday Paradox formula, for 30 people, the probability is approximately 70%.',
    options: [
      { text: 'Approximately 70%', isCorrect: true },
      { text: 'Approximately 10%', isCorrect: false },
      { text: 'Approximately 50%', isCorrect: false },
      { text: 'Approximately 3%', isCorrect: false },
    ],
  },
];

async function main() {
  console.log('Seeding courses...');
  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }

  console.log('Seeding assessment questions...');
  for (const q of questions) {
    const existing = await prisma.assessmentQuestion.findFirst({
      where: { question: q.question },
    });

    if (!existing) {
      await prisma.assessmentQuestion.create({
        data: {
          category: q.category,
          difficulty: q.difficulty,
          question: q.question,
          explanation: q.explanation,
          options: {
            create: q.options,
          },
        },
      });
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });

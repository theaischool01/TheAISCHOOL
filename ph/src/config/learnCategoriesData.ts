// Central Source of Truth for Learn Categories & Category Detail Pages
// TODO: confirm with content team - All category modules, tools, outcomes & FAQs verified for PH cohort

export interface CategoryCourseItem {
  name: string;
  url: string;
  duration?: string;
  summary?: string;
}

export interface CategoryModuleItem {
  moduleNumber: string;
  title: string;
  duration: string;
  summary: string;
  bulletTopics: string[];
}

export interface CategoryOutcome {
  title: string;
  description: string;
}

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface LearnCategoryData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortTeaser: string;
  quickFacts: {
    mode: string;
    level: string;
    effort: string;
    guidedProjects: string;
  };
  theme: {
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    borderHover: string;
    accentBarBg: string;
  };
  coursesCount: number;
  courses: CategoryCourseItem[];
  detailedModules: CategoryModuleItem[];
  tools: { name: string; category: string; description: string }[];
  outcomes: CategoryOutcome[];
  certificate: {
    title: string;
    skills: string[];
    description: string;
  };
  faqs: CategoryFAQ[];
}

export const LEARN_CATEGORIES_DATA: LearnCategoryData[] = [
  {
    id: "gamer",
    slug: "gamer",
    name: "GAMER",
    tagline: "Generative AI, Algorithms, Machine Learning & Engineering Mastery",
    shortTeaser:
      "The complete flagship track combining GenAI fundamentals, Python programming, DSA, machine learning, and agent architecture.",
    quickFacts: {
      mode: "Hybrid / Online Live",
      level: "Beginner to Advanced",
      effort: "8–10 hrs/week",
      guidedProjects: "7+ Portfolio Projects",
    },
    theme: {
      accentColor: "#EE1C25",
      badgeBg: "bg-red-500/10",
      badgeText: "text-[#EE1C25]",
      borderHover: "hover:border-red-500/50",
      accentBarBg: "bg-[#EE1C25]",
    },
    coursesCount: 7,
    // TODO: confirm with content team for GAMER courses
    courses: [
      { name: "Essentials Generative AI, Prompt Engineering & ChatGPT", url: "/learn/gamer#module-1", duration: "3 Wks", summary: "LLMs, prompt patterns & multimodality" },
      { name: "Programming Refreshers – Python", url: "/learn/gamer#module-2", duration: "2 Wks", summary: "Python 3 core syntax, OOP & data structures" },
      { name: "Data Structure & Algorithms with Python", url: "/learn/gamer#module-3", duration: "4 Wks", summary: "Arrays, trees, graphs & algorithmic complexity" },
      { name: "Applied Data Science with Python", url: "/learn/gamer#module-4", duration: "3 Wks", summary: "Pandas, NumPy, EDA & data visualization" },
      { name: "Machine Learning", url: "/learn/gamer#module-5", duration: "4 Wks", summary: "Supervised, unsupervised & regression models" },
      { name: "Deep Learning", url: "/learn/gamer#module-6", duration: "4 Wks", summary: "Neural networks, PyTorch & Transformers" },
      { name: "Build Your Own Agent", url: "/learn/gamer#module-7", duration: "4 Wks", summary: "LangChain, RAG pipelines & autonomous agents" },
    ],
    // TODO: confirm with content team for GAMER modules
    detailedModules: [
      {
        moduleNumber: "01",
        title: "Essentials Generative AI, Prompt Engineering & ChatGPT",
        duration: "3 Weeks",
        summary: "Understand transformer architectures, prompt engineering patterns, and multimodal tools.",
        bulletTopics: [
          "LLM architecture, tokens, and context window mechanics",
          "Zero-shot, few-shot, and chain-of-thought prompting",
          "Multimodal creation with Midjourney, DALL-E 3 & ElevenLabs",
        ],
      },
      {
        moduleNumber: "02",
        title: "Programming Refreshers – Python 3",
        duration: "2 Weeks",
        summary: "Build clean, object-oriented Python code for data processing and AI development.",
        bulletTopics: [
          "Python data types, control flow, functions, and modules",
          "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
          "File handling, exception management, and Virtual Environments",
        ],
      },
      {
        moduleNumber: "03",
        title: "Data Structures & Algorithms with Python",
        duration: "4 Weeks",
        summary: "Master core computer science algorithms and technical interview problem solving.",
        bulletTopics: [
          "Arrays, Linked Lists, Stacks, Queues, Hash Tables",
          "Trees, Binary Search Trees, Heaps, and Graph Traversals (BFS/DFS)",
          "Sorting, Searching, Dynamic Programming, and Big-O Notation",
        ],
      },
      {
        moduleNumber: "04",
        title: "Applied Data Science with Python",
        duration: "3 Weeks",
        summary: "Manipulate, clean, analyze, and visualize real-world datasets with Python.",
        bulletTopics: [
          "Data wrangling with Pandas DataFrames and NumPy arrays",
          "Exploratory Data Analysis (EDA) and handling missing values",
          "Data visualization using Matplotlib and Seaborn statistical plots",
        ],
      },
      {
        moduleNumber: "05",
        title: "Machine Learning Foundations",
        duration: "4 Weeks",
        summary: "Train and evaluate supervised and unsupervised machine learning algorithms.",
        bulletTopics: [
          "Linear & Logistic Regression, Decision Trees, Random Forests",
          "K-Means Clustering, PCA dimension reduction, Scikit-Learn pipelines",
          "Model evaluation metrics (Precision, Recall, F1-Score, ROC-AUC)",
        ],
      },
      {
        moduleNumber: "06",
        title: "Deep Learning & Neural Networks",
        duration: "4 Weeks",
        summary: "Construct deep neural networks and transformer models using PyTorch.",
        bulletTopics: [
          "Perceptrons, backpropagation, and activation functions",
          "Building Artificial Neural Networks (ANNs) in PyTorch",
          "Introduction to Convolutional (CNN) and Transformer models",
        ],
      },
      {
        moduleNumber: "07",
        title: "Build Your Own Autonomous AI Agent",
        duration: "4 Weeks",
        summary: "Architect end-to-end tool-calling agents and vector search RAG systems.",
        bulletTopics: [
          "LangChain and LlamaIndex agentic workflows",
          "Vector databases (Pinecone/ChromaDB) and RAG indexing",
          "Deploying stateful multi-agent systems to production cloud APIs",
        ],
      },
    ],
    tools: [
      { name: "ChatGPT (GPT-4o)", category: "LLM", description: "Advanced conversational reasoning" },
      { name: "Claude 3.5 Sonnet", category: "LLM", description: "Complex document & code analysis" },
      { name: "Python 3", category: "Language", description: "Core AI programming language" },
      { name: "PyTorch", category: "Framework", description: "Deep learning neural network library" },
      { name: "Scikit-Learn", category: "ML Library", description: "Supervised & unsupervised ML algorithms" },
      { name: "LangChain", category: "Agent Framework", description: "Agent orchestration & RAG pipelines" },
    ],
    outcomes: [
      { title: "Autonomous AI System Architecture", description: "Design and deploy multi-step agents that execute tools, query vector search, and run autonomously." },
      { title: "Full-Stack Machine Learning Pipelines", description: "Clean raw datasets, engineer features, train ML models, and evaluate predictive accuracy." },
      { title: "Algorithmic Problem-Solving Mastery", description: "Solve complex data structure and algorithm challenges confidently for technical roles." },
      { title: "Verifiable Senior AI Engineering Credentials", description: "Display official digital certificates backed by live portfolio code on GitHub." },
    ],
    certificate: {
      title: "Certified GAMER AI Engineer",
      skills: ["GenAI & Prompting", "Python DSA", "Machine Learning", "PyTorch", "AI Agents"],
      description: "Official flagship credential validating full-spectrum AI engineering proficiency.",
    },
    // TODO: confirm with content team for GAMER FAQs
    faqs: [
      {
        question: "What does the GAMER acronym stand for?",
        answer: "GAMER stands for Generative AI, Algorithms, Machine Learning, Engineering & Reasoning.",
      },
      {
        question: "Do I need prior coding experience to join the GAMER track?",
        answer: "No prior programming experience is required. The track starts with foundational Python refreshers before moving to algorithms, ML, and AI agents.",
      },
      {
        question: "How many hours per week should I dedicate to labs?",
        answer: "We recommend dedicating 8–10 hours per week (combination of live sessions and hands-on coding exercises).",
      },
      {
        question: "Are real industry projects included in the curriculum?",
        answer: "Yes, you will build 7+ portfolio projects including RAG search engines, fine-tuned ML models, and autonomous AI agents.",
      },
      {
        question: "What happens if I miss a live cohort session?",
        answer: "All live cohort sessions are recorded in high-definition and uploaded to your student dashboard within 2 hours.",
      },
      {
        question: "Is the certificate verifiable on LinkedIn?",
        answer: "Yes! Every graduate receives a digital certificate with a unique cryptographic verification URL suitable for LinkedIn.",
      },
    ],
  },
  {
    id: "build-agent",
    slug: "build-your-own-agent",
    name: "Build Your Own Agent",
    tagline: "Architect Autonomous AI Systems, RAG Pipelines & Multi-Agent Teams",
    shortTeaser:
      "Master LangChain, LlamaIndex, vector search, tool execution, and stateful multi-agent workflows.",
    quickFacts: {
      mode: "Interactive Live Bootcamp",
      level: "Intermediate to Advanced",
      effort: "6–8 hrs/week",
      guidedProjects: "5+ Agent Architectures",
    },
    theme: {
      accentColor: "#3B82F6",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-500",
      borderHover: "hover:border-blue-500/50",
      accentBarBg: "bg-blue-500",
    },
    coursesCount: 9,
    // TODO: confirm with content team for Agent courses
    courses: [
      { name: "Foundations of LLMs", url: "/learn/build-your-own-agent#module-1", duration: "1 Wk", summary: "Transformer primitives & API calls" },
      { name: "Setting Up Dev Environment", url: "/learn/build-your-own-agent#module-2", duration: "1 Wk", summary: "Python virtualenvs, API keys & VS Code" },
      { name: "Core Concepts of LLM", url: "/learn/build-your-own-agent#module-3", duration: "1 Wk", summary: "Context windows, temperature & token limits" },
      { name: "Intro to Intelligent Agents", url: "/learn/build-your-own-agent#module-4", duration: "2 Wks", summary: "ReAct loops & function calling mechanics" },
      { name: "Building Basic LLM Agents", url: "/learn/build-your-own-agent#module-5", duration: "2 Wks", summary: "Stateful memory & single-tool execution" },
      { name: "Advanced Agent Features", url: "/learn/build-your-own-agent#module-6", duration: "2 Wks", summary: "Sub-agents, planning & self-reflection" },
      { name: "Integrating Agents with APIs", url: "/learn/build-your-own-agent#module-7", duration: "2 Wks", summary: "Connecting agents to external REST services" },
      { name: "Reinforcement Learning for Agents", url: "/learn/build-your-own-agent#module-8", duration: "2 Wks", summary: "Agent alignment & policy evaluation" },
      { name: "AI Agents Market", url: "/learn/build-your-own-agent#module-9", duration: "1 Wk", summary: "Deploying commercial agent microservices" },
    ],
    detailedModules: [
      {
        moduleNumber: "01",
        title: "Foundations of LLMs & API Integration",
        duration: "1 Week",
        summary: "Understand API interactions, temperature settings, and model responses.",
        bulletTopics: [
          "Connecting to OpenAI, Anthropic, and open-source API endpoints",
          "Managing API key security and rate limits",
          "Handling JSON structured outputs from LLMs",
        ],
      },
      {
        moduleNumber: "02",
        title: "Intelligent Agent Mechanics & Tool Calling",
        duration: "2 Weeks",
        summary: "Build ReAct loops where models choose and execute external tools.",
        bulletTopics: [
          "Designing custom Python tool definitions for agents",
          "Parsing model tool calls and returning execution results",
          "Handling tool execution errors and fallback loops",
        ],
      },
      {
        moduleNumber: "03",
        title: "Stateful Agent Memory & Vector RAG Pipelines",
        duration: "2 Weeks",
        summary: "Give agents persistent memory and private document retrieval.",
        bulletTopics: [
          "Short-term vs long-term vector memory storage",
          "Building RAG search using ChromaDB and Pinecone",
          "Managing chat history and context pruning",
        ],
      },
      {
        moduleNumber: "04",
        title: "Multi-Agent Systems & Production Deployment",
        duration: "2 Weeks",
        summary: "Orchestrate teams of specialized agents and deploy to FastAPI cloud endpoints.",
        bulletTopics: [
          "Supervisor and sub-agent team architectures",
          "Building REST API servers with FastAPI for agent communication",
          "Deploying agent containers to Vercel/Render with monitoring",
        ],
      },
    ],
    tools: [
      { name: "LangChain", category: "Agent Framework", description: "Agent orchestration & chain management" },
      { name: "LlamaIndex", category: "RAG Engine", description: "Data indexing & retrieval augmentation" },
      { name: "Pinecone", category: "Vector DB", description: "Managed cloud vector similarity search" },
      { name: "ChromaDB", category: "Vector DB", description: "Lightweight open-source vector database" },
      { name: "FastAPI", category: "Backend", description: "High-performance Python API framework" },
      { name: "Tavily Search API", category: "Search Tool", description: "Real-time web search for AI agents" },
    ],
    outcomes: [
      { title: "Production Agent Engineering", description: "Build agents capable of using tools, searching vector databases, and running autonomously." },
      { title: "Enterprise RAG Architecture", description: "Index private PDFs, databases, and APIs into searchable vector embeddings." },
      { title: "Multi-Agent Orchestration", description: "Configure manager and sub-agent hierarchies to solve complex multi-step workflows." },
      { title: "Cloud Deployment Mastery", description: "Package agent code into containerized microservices hosted on modern cloud infrastructure." },
    ],
    certificate: {
      title: "Certified AI Agent Architect",
      skills: ["LangChain", "LlamaIndex", "Vector Search RAG", "Tool Calling", "FastAPI"],
      description: "Credential validating expertise in building and deploying autonomous AI agents.",
    },
    faqs: [
      {
        question: "What is the difference between a standard chatbot and an AI Agent?",
        answer: "A chatbot only generates text responses. An AI Agent autonomously reasons, selects tools (like web search or database queries), and executes actions to solve multi-step tasks.",
      },
      {
        question: "Which programming language is used in this track?",
        answer: "All coding exercises and agent architectures are built in Python 3.10+ using LangChain and LlamaIndex.",
      },
      {
        question: "Do we build vector search RAG systems?",
        answer: "Yes! You will index private documents into ChromaDB and Pinecone and connect them to agent tool calls.",
      },
      {
        question: "Will we learn to deploy agents to live web servers?",
        answer: "Yes, you will package agents into FastAPI REST servers and deploy them to cloud hosting platforms.",
      },
      {
        question: "Can I customize the agent tools for my company's software?",
        answer: "Absolutely. We teach how to convert custom Python functions and external REST APIs into tools your agent can call.",
      },
    ],
  },
  {
    id: "python-prog",
    slug: "python-programming",
    name: "Python & Programming",
    tagline: "From Core Syntax & Time Series Analysis to Enterprise Databricks",
    shortTeaser:
      "Build a rock-solid programming foundation in Python for AI, data pipelines, time series forecasting, and big data processing.",
    quickFacts: {
      mode: "Practical Code-Along",
      level: "Beginner to Intermediate",
      effort: "5–7 hrs/week",
      guidedProjects: "4+ Code Libraries",
    },
    theme: {
      accentColor: "#6366F1",
      badgeBg: "bg-indigo-500/10",
      badgeText: "text-indigo-500",
      borderHover: "hover:border-indigo-500/50",
      accentBarBg: "bg-indigo-500",
    },
    coursesCount: 4,
    courses: [
      { name: "Python Powerhouse Gen AI", url: "/learn/python-programming#module-1", duration: "2 Wks", summary: "Python 3 fundamentals & AI integration" },
      { name: "Mastering Time Series Analysis", url: "/learn/python-programming#module-2", duration: "3 Wks", summary: "ARIMA, Prophet & trend forecasting" },
      { name: "Data Diving (Databricks Beginner)", url: "/learn/python-programming#module-3", duration: "2 Wks", summary: "Databricks workspace & Spark basics" },
      { name: "Advanced Databricks", url: "/learn/python-programming#module-4", duration: "3 Wks", summary: "Distributed Spark processing & Lakehouse" },
    ],
    detailedModules: [
      {
        moduleNumber: "01",
        title: "Python Powerhouse & Object-Oriented Code",
        duration: "2 Weeks",
        summary: "Write clean, modular Python 3 scripts with object-oriented standards.",
        bulletTopics: [
          "Data types, control structures, functions, and lambda expressions",
          "Object-Oriented Programming (Classes, Methods, Inheritance)",
          "Virtual environments, pip package management, and debugging",
        ],
      },
      {
        moduleNumber: "02",
        title: "Time Series Analysis & Forecasting",
        duration: "3 Weeks",
        summary: "Analyze temporal data trends, seasonality, and predictive forecasting.",
        bulletTopics: [
          "Stationarity testing, autocorrelation (ACF/PACF) plots",
          "ARIMA, SARIMAX, and Facebook Prophet forecasting models",
          "Evaluating forecast accuracy (RMSE, MAPE, MAE)",
        ],
      },
      {
        moduleNumber: "03",
        title: "Databricks & Apache Spark Distributed Processing",
        duration: "3 Weeks",
        summary: "Process massive datasets using Apache Spark on Databricks Lakehouse.",
        bulletTopics: [
          "Databricks workspace setup and PySpark DataFrames",
          "Distributed transformations, actions, and Spark SQL",
          "Delta Lake architecture and ACID data management",
        ],
      },
    ],
    tools: [
      { name: "Python 3", category: "Language", description: "Core programming language for data & AI" },
      { name: "Apache Spark", category: "Engine", description: "Distributed big data processing framework" },
      { name: "Databricks", category: "Platform", description: "Unified cloud data lakehouse platform" },
      { name: "Pandas", category: "Library", description: "Data manipulation & DataFrame processing" },
      { name: "Prophet", category: "Forecasting", description: "Time series forecasting library" },
      { name: "VS Code", category: "IDE", description: "Modern developer code editor" },
    ],
    outcomes: [
      { title: "Clean Modular Python Syntax", description: "Write reusable, production-ready Python code adhering to OOP and PEP8 standards." },
      { title: "Predictive Time Series Forecasting", description: "Model temporal business metrics like sales, web traffic, and stock demand." },
      { title: "Big Data Processing with Spark", description: "Transform gigabytes of raw data using Apache Spark on Databricks." },
      { title: "Software Engineering Foundations", description: "Master version control, environment isolation, and clean project architecture." },
    ],
    certificate: {
      title: "Certified Python & Data Engineering Specialist",
      skills: ["Python 3 OOP", "Time Series Forecasting", "PySpark", "Databricks"],
      description: "Credential validating software development and big data engineering in Python.",
    },
    faqs: [
      {
        question: "Is Python difficult to learn for programming beginners?",
        answer: "Python is designed with clean, readable syntax and is considered the best language for beginners entering software and AI.",
      },
      {
        question: "Do we cover Databricks and big data processing?",
        answer: "Yes, both introductory and advanced Databricks operations with PySpark are included in the curriculum.",
      },
      {
        question: "What software tools do I need to install?",
        answer: "We use VS Code, Anaconda (Jupyter), and Databricks Community Edition (which is free in the cloud).",
      },
      {
        question: "Will I learn time series forecasting models like ARIMA and Prophet?",
        answer: "Yes, you will build predictive time series forecasting models for sales and financial metrics.",
      },
      {
        question: "How are coding assignments reviewed?",
        answer: "Assignments are tested with automated unit test suites and reviewed by senior software engineers.",
      },
    ],
  },
  {
    id: "data-science",
    slug: "data-science-analytics",
    name: "Data Science and Analytics",
    tagline: "Statistical Modeling, SQL Pipelines, EDA & Power BI AI Integration",
    shortTeaser:
      "Transform unstructured raw data into business intelligence using statistics, SQL queries, automated EDA, and Power BI dashboards.",
    quickFacts: {
      mode: "Interactive Analytics Lab",
      level: "All Levels",
      effort: "6–8 hrs/week",
      guidedProjects: "5+ Analytical Dashboards",
    },
    theme: {
      accentColor: "#F59E0B",
      badgeBg: "bg-amber-500/10",
      badgeText: "text-amber-500",
      borderHover: "hover:border-amber-500/50",
      accentBarBg: "bg-amber-500",
    },
    coursesCount: 4,
    courses: [
      { name: "Power BI + AI Integration", url: "/learn/data-science-analytics#module-1", duration: "3 Wks", summary: "DAX, Power Query & Copilot visuals" },
      { name: "Applied Statistics", url: "/learn/data-science-analytics#module-2", duration: "2 Wks", summary: "Hypothesis testing & p-values" },
      { name: "SQL for Data Engineers", url: "/learn/data-science-analytics#module-3", duration: "3 Wks", summary: "Multi-table JOINs, GROUP BY & CTEs" },
      { name: "UCI Data Preprocessing & EDA", url: "/learn/data-science-analytics#module-4", duration: "2 Wks", summary: "Automated data profiling & cleaning" },
    ],
    detailedModules: [
      {
        moduleNumber: "01",
        title: "Power BI + AI Integration & Executive Dashboards",
        duration: "3 Weeks",
        summary: "Build dynamic interactive dashboards with DAX formulas and AI visual components.",
        bulletTopics: [
          "Connecting data sources and Power Query data transformation",
          "Writing DAX metrics (CALCULATE, YTD growth, rolling averages)",
          "Integrating AI Copilot visual cards and publishing cloud reports",
        ],
      },
      {
        moduleNumber: "02",
        title: "Applied Statistics & Hypothesis Testing",
        duration: "2 Weeks",
        summary: "Apply statistical methods to validate business decisions and experiment results.",
        bulletTopics: [
          "Probability distributions, mean, median, standard deviation",
          "Hypothesis testing (t-tests, ANOVA, Chi-Square)",
          "A/B testing experimentation and p-value evaluation",
        ],
      },
      {
        moduleNumber: "03",
        title: "SQL for Data Engineers & Query Optimization",
        duration: "3 Weeks",
        summary: "Extract, join, aggregate, and transform relational enterprise database tables.",
        bulletTopics: [
          "Writing complex multi-table SQL JOIN queries",
          "GROUP BY aggregations, HAVING clauses, and subqueries",
          "Window functions (ROW_NUMBER, RANK, LEAD, LAG) for analytics",
        ],
      },
    ],
    tools: [
      { name: "Power BI Desktop", category: "BI Tool", description: "Interactive dashboard design platform" },
      { name: "PostgreSQL", category: "Database", description: "Relational enterprise database engine" },
      { name: "Pandas", category: "Python", description: "Data manipulation & DataFrame wrangling" },
      { name: "DAX", category: "Calculations", description: "Data Analysis Expressions metric formulas" },
      { name: "DBeaver", category: "SQL Tool", description: "Universal database management client" },
    ],
    outcomes: [
      { title: "Enterprise SQL Extraction", description: "Query relational database tables with complex joins, window functions, and aggregations." },
      { title: "Applied Statistical Rigor", description: "Conduct hypothesis testing and A/B test evaluation to make data-driven decisions." },
      { title: "Executive Power BI Dashboards", description: "Publish automated interactive dashboards with DAX metric calculations." },
      { title: "AI-Assisted EDA", description: "Use AI tools to rapidly profile raw datasets and spot hidden trends." },
    ],
    certificate: {
      title: "Certified Data Science & Analytics Specialist",
      skills: ["SQL Extraction", "Applied Statistics", "Power BI DAX", "EDA"],
      description: "Credential validating relational SQL querying, statistical testing, and BI dashboard creation.",
    },
    faqs: [
      {
        question: "Do I need an advanced mathematics degree for this track?",
        answer: "No. Basic algebra is sufficient. We cover applied statistics intuitively using practical software tools.",
      },
      {
        question: "Which database management systems will we learn?",
        answer: "We focus heavily on PostgreSQL and SQL Server using real relational business datasets.",
      },
      {
        question: "Is Power BI Desktop free for students?",
        answer: "Yes! Power BI Desktop is 100% free to download and use on Windows computers.",
      },
      {
        question: "How does AI fit into data analytics in this course?",
        answer: "We use AI code interpreters to automate Exploratory Data Analysis (EDA) and generate chart code rapidly.",
      },
      {
        question: "Will this track help prepare me for Data Analyst roles?",
        answer: "Yes, every module includes portfolio-ready project work directly applicable to Data Analyst job applications.",
      },
    ],
  },
  {
    id: "tools-tech",
    slug: "tools-technologies",
    name: "Tools & Technologies",
    tagline: "Containerization with Docker, AWS Cloud Security & Unit Testing Standards",
    shortTeaser:
      "Master essential DevOps and software engineering tooling to containerize, secure, and test production AI applications.",
    quickFacts: {
      mode: "Hands-on Infrastructure Lab",
      level: "Intermediate",
      effort: "4–6 hrs/week",
      guidedProjects: "3+ Cloud Containers",
    },
    theme: {
      accentColor: "#10B981",
      badgeBg: "bg-emerald-500/10",
      badgeText: "text-emerald-500",
      borderHover: "hover:border-emerald-500/50",
      accentBarBg: "bg-emerald-500",
    },
    coursesCount: 3,
    courses: [
      { name: "Docker", url: "/learn/tools-technologies#module-1", duration: "2 Wks", summary: "Dockerfiles, images, containers & compose" },
      { name: "AWS-Security", url: "/learn/tools-technologies#module-2", duration: "2 Wks", summary: "AWS IAM, security groups & cloud policies" },
      { name: "Unit Testing", url: "/learn/tools-technologies#module-3", duration: "2 Wks", summary: "PyTest, mocks & CI/CD GitHub Actions" },
    ],
    detailedModules: [
      {
        moduleNumber: "01",
        title: "Docker Containerization & Multi-Container Compose",
        duration: "2 Weeks",
        summary: "Package software and AI applications into isolated, repeatable Docker containers.",
        bulletTopics: [
          "Writing optimized Dockerfiles for Python & Node environments",
          "Managing container volumes, port mapping, and image layers",
          "Orchestrating multi-container apps with Docker Compose",
        ],
      },
      {
        moduleNumber: "02",
        title: "AWS Cloud Security & IAM Governance",
        duration: "2 Weeks",
        summary: "Enforce least privilege access control across AWS services.",
        bulletTopics: [
          "AWS IAM Users, Roles, Policies, and MFA enforcement",
          "Configuring Security Groups and Virtual Private Clouds (VPC)",
          "Securing S3 buckets and API Gateway endpoints",
        ],
      },
      {
        moduleNumber: "03",
        title: "Automated Unit Testing & CI/CD Pipelines",
        duration: "2 Weeks",
        summary: "Write automated tests and build continuous integration deployment pipelines.",
        bulletTopics: [
          "Writing unit tests and integration tests with PyTest",
          "Mocking external API calls and database connections",
          "Building automated CI/CD workflows using GitHub Actions",
        ],
      },
    ],
    tools: [
      { name: "Docker", category: "Containers", description: "Application containerization platform" },
      { name: "Docker Compose", category: "Orchestration", description: "Multi-container app runner" },
      { name: "AWS IAM", category: "Cloud Security", description: "Identity & access management" },
      { name: "PyTest", category: "Testing", description: "Python unit testing framework" },
      { name: "GitHub Actions", category: "CI/CD", description: "Automated integration & delivery pipelines" },
    ],
    outcomes: [
      { title: "Containerized Application Deployment", description: "Package AI code and dependencies into portable Docker containers that run identically anywhere." },
      { title: "AWS Cloud Security Mastery", description: "Implement strict Identity Access Management (IAM) controls to secure cloud resources." },
      { title: "Automated Unit Testing & CI/CD", description: "Write PyTest test suites and trigger automated GitHub Actions build checks on code push." },
      { title: "DevOps Infrastructure Standards", description: "Enforce modern DevOps best practices for production reliability." },
    ],
    certificate: {
      title: "Certified Cloud Infrastructure & DevOps Practitioner",
      skills: ["Docker Containers", "AWS Security IAM", "PyTest Unit Testing", "GitHub Actions"],
      description: "Credential validating practical containerization, AWS cloud security, and automated testing capabilities.",
    },
    faqs: [
      {
        question: "Why is Docker essential for AI application development?",
        answer: "Docker eliminates 'it works on my machine' bugs by packaging model dependencies, Python versions, and tools into portable containers.",
      },
      {
        question: "Do I need a paid AWS account for the cloud security module?",
        answer: "No, all exercises fit within the AWS Free Tier, and step-by-step setup guides are provided.",
      },
      {
        question: "Which testing frameworks are used?",
        answer: "We focus on PyTest for unit and integration testing alongside GitHub Actions for continuous integration.",
      },
      {
        question: "Is previous Linux terminal experience required?",
        answer: "Basic terminal command familiarity is helpful, but we cover command syntax step-by-step.",
      },
      {
        question: "Does this certification cover CI/CD automation?",
        answer: "Yes, building automated build-and-test GitHub Actions pipelines is a required project.",
      },
    ],
  },
  {
    id: "business-prof",
    slug: "business-professional",
    name: "Business & Professional",
    tagline: "Advanced Excel Mastery, Aptitude Excellence & Strategic AI Management",
    shortTeaser:
      "Upgrade management, analytical, and strategic capabilities for corporate leadership in the age of AI.",
    quickFacts: {
      mode: "Executive Masterclass",
      level: "All Levels",
      effort: "4–5 hrs/week",
      guidedProjects: "4+ Executive Case Studies",
    },
    theme: {
      accentColor: "#14B8A6",
      badgeBg: "bg-teal-500/10",
      badgeText: "text-teal-500",
      borderHover: "hover:border-teal-500/50",
      accentBarBg: "bg-teal-500",
    },
    coursesCount: 3,
    courses: [
      { name: "Advanced Excel Techniques", url: "/learn/business-professional#module-1", duration: "2 Wks", summary: "XLOOKUP, Power Pivot & financial models" },
      { name: "Mastering Aptitude", url: "/learn/business-professional#module-2", duration: "2 Wks", summary: "Quantitative reasoning & logical problem-solving" },
      { name: "Professional Business Strategy", url: "/learn/business-professional#module-3", duration: "2 Wks", summary: "AI corporate strategy & business cases" },
    ],
    detailedModules: [
      {
        moduleNumber: "01",
        title: "Advanced Excel Techniques & Financial Modeling",
        duration: "2 Weeks",
        summary: "Build dynamic, error-free financial spreadsheets and automated reports in Excel.",
        bulletTopics: [
          "Mastering XLOOKUP, INDEX/MATCH, and dynamic array formulas",
          "Building interactive Pivot Tables, Slicers, and Power Pivot data models",
          "Automating repetitive spreadsheet tasks with macros & formulas",
        ],
      },
      {
        moduleNumber: "02",
        title: "Mastering Quantitative Aptitude & Problem Solving",
        duration: "2 Weeks",
        summary: "Sharpen logical reasoning and numerical problem solving for corporate assessments.",
        bulletTopics: [
          "Data interpretation, ratios, percentages, and profit-loss calculations",
          "Logical deduction, analytical reasoning, and pattern recognition",
          "Speed math techniques for high-pressure corporate evaluations",
        ],
      },
      {
        moduleNumber: "03",
        title: "Professional Business Strategy & AI Frameworks",
        duration: "2 Weeks",
        summary: "Formulate corporate strategy and leverage AI for executive decision making.",
        bulletTopics: [
          "Applying strategic management frameworks (SWOT, PESTLE, Porter's 5 Forces)",
          "Integrating AI tools into corporate market sizing and pitch decks",
          "Evaluating ROI and risk for enterprise AI initiatives",
        ],
      },
    ],
    tools: [
      { name: "Advanced Excel", category: "Spreadsheet", description: "Financial modeling & Power Pivot analytics" },
      { name: "PitchDeck AI", category: "Strategy", description: "Rapid corporate deck & proposal creation" },
      { name: "Strategic Frameworks", category: "Methodology", description: "SWOT, PESTLE & Porter's 5 Forces" },
      { name: "Logic & Math Models", category: "Aptitude", description: "Quantitative assessment models" },
    ],
    outcomes: [
      { title: "Advanced Excel & Financial Automation", description: "Build dynamic, error-free financial models using XLOOKUP and Power Pivot." },
      { title: "Sharp Quantitative Aptitude", description: "Master analytical problem solving required for corporate leadership and assessment tests." },
      { title: "AI-Driven Corporate Strategy", description: "Apply strategic frameworks enhanced by AI for market research and business proposals." },
      { title: "Executive Presentation Capability", description: "Structure data-backed pitch decks and present strategic recommendations." },
    ],
    certificate: {
      title: "Certified Business Strategy & Analytics Specialist",
      skills: ["Advanced Excel", "Financial Modeling", "Aptitude Problem Solving", "AI Business Strategy"],
      description: "Credential validating advanced financial spreadsheet automation, quantitative aptitude, and AI strategy formulation.",
    },
    faqs: [
      {
        question: "Is this track designed for non-technical corporate professionals?",
        answer: "Yes! This track is built specifically for managers, analysts, and business professionals seeking to upgrade spreadsheet and strategic capabilities.",
      },
      {
        question: "Which advanced Excel functions will we learn?",
        answer: "We cover XLOOKUP, INDEX/MATCH, Power Pivot, dynamic arrays, custom formatting, and financial modeling shortcuts.",
      },
      {
        question: "How does AI integrate with corporate strategy in this course?",
        answer: "We demonstrate how to use AI for rapid competitor research, market sizing estimation, and proposal deck generation.",
      },
      {
        question: "Will this help with corporate recruitment aptitude tests?",
        answer: "Yes, Module 2 specifically focuses on quantitative aptitude, data interpretation, and logical reasoning.",
      },
      {
        question: "Is an official completion certificate provided?",
        answer: "Yes, an official digital certificate endorsed by The AI School Philippines is issued upon completion.",
      },
    ],
  },
];

export function getLearnCategoryBySlug(slug: string): LearnCategoryData | undefined {
  return LEARN_CATEGORIES_DATA.find((c) => c.slug === slug || c.id === slug);
}

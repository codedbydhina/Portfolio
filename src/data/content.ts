export const profile = {
  name: "Dhinakaran",
  firstName: "Dhinakaran",
  role: "Aspiring Software Engineer",
  location: "Nagapattinam, Tamilnadu",
  email: "dhinakaransivam2004@gmail.com",
  tagline:
    "I create clean, scalable applications with thoughtful engineering, intuitive interfaces, and a relentless focus on continuous improvement.",
  intro:
    "Aspiring software engineer specializing in product engineering, systems design, and interface craft. Currently building developer tools that people actually enjoy using.",
  socials: {
    github: "https://github.com/codedbydhina?tab=repositories",
    linkedin: "https://www.linkedin.com/in/dhinakaranp2004/",
    twitter: "https://x.com/dhinaaoff",
  },
  available: true,
}

export type Project = {
  id: string
  name: string
  year: string
  role: string
  timeline: string
  summary: string
  problem: string
  solution: string
  results: string[]
  tech: string[]
  image: string
  accent: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: "CampusGPT",
    name: "CampusGPT",
    year: "2026",
    role: "Creator & Full-Stack Developer",
    timeline: "8 months",
    summary:
      "AI-Powered Multi-Tenant College Assistant",
    problem:
      "Students and faculty often spend time searching across scattered documents, notices, and academic resources with no centralized intelligent search.",
    solution:
      "Built a full-stack AI platform using Java Spring Boot, React, MySQL, LangChain4j,RAG ,Vector Database and Gemini AI with secure authentication, document management, semantic search, and role-based access for multiple colleges.",
    results: [
      "✓ Multi-Tenant SaaS Platform",
      "✓ AI-Powered Knowledge Retrieval",
      "✓ Secure Role-Based Access",
    ],
    tech: ["⚛️ React", "🍃 Spring Boot (Java)", "🧠 LangChain4j", "✨ Gemini AI-LLM", "🗄️ MySQL"],
    image: "/project-campusGPT.png",
    accent: "#635BFF",
    githubUrl: "https://github.com/codedbydhina/CampusGPT",
  },
  {
    id: "WoodCraft",
    name: "WoodCraft ",
    year: "2026",
    role: "Creator & Full-Stack Developer",
    timeline: "14 months",
    summary:
      "A modern e-commerce platform designed to simplify furniture discovery, secure purchasing, and efficient product management through a scalable Java-based architecture.",
    problem:
      "Customers needed a seamless shopping experience, while administrators required an efficient way to manage products, inventory, and customer orders.",
    solution:
      "Developed a full-stack e-commerce platform using Java, JSP, Servlets, JDBC, and MySQL, following the MVC architecture. Implemented secure authentication, product and inventory management, shopping cart, order processing, and a responsive user interface to deliver a reliable shopping experience.",
    results: [
      "✓ MVC-Based Architecture",
      "✓ Secure Authentication System",
      "✓ Product & Order Management",
    ],
    tech: ["☕ Java", "🌐 Servlets", "📄 JSP", "🗄️ MySQL", "🔗 JDBC", "🖥️ Apache Tomcat"],
    image: "/project-woodcraft.png",
    accent: "#111111",
    githubUrl: "https://github.com/codedbydhina/WoodCraft-Furniture-Ecommerce",
  },
  {
    id: "Fake News Detector",
    name: "Fake News Detector",
    year: "2026",
    role: "AI & Machine Learning Developer",
    timeline: "6 months",
    summary:
      "An AI-powered news classification system built with NLP and Machine Learning to deliver fast, accurate, and reliable fake news detection.",
    problem:
      "The rapid spread of misinformation makes it difficult to identify trustworthy news. The goal was to build an AI-powered system capable of accurately detecting fake news from textual content.",
    solution:
      "Developed an NLP-based news classification system using Python, TF-IDF Vectorization, and Logistic Regression. Implemented text preprocessing, feature extraction, and a trained machine learning model to deliver fast, reliable predictions through a simple desktop interface.",
    results: [
      "✓ 98.8% Model Accuracy",
      "✓ TF-IDF Feature Extraction",
      "✓ Logistic Regression Classifier",
    ],
    tech: ["🐍 Python", "🤖 Scikit-learn", "🧠 NLTK", "📊 TF-IDF", "📑 Pandas"],
    image: "/project-fakenewsdetection.png",
    accent: "#635BFF",
    githubUrl: "https://github.com/codedbydhina/Fake-news-Detection",
  },
]

export type SkillGroup = {
  category: string
  items: { name: string; description: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", description: "Semantic web structure" },
      { name: "CSS3", description: "Utility-first styling" },
      { name: "React-Foundation", description: "Modern component-based UI" },
      { name: "JavaScript", description: "Interactive web applications" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Java", description: "Object-oriented development" },
      { name: "Spring Boot", description: "RESTful backend services" },
      { name: "Servlets", description: "MVC request handling" },
      { name: "JDBC", description: "Database connectivity" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", description: "Relational database" },
      { name: "Firebase", description: "Cloud-hosted database" },
      { name: "SQL", description: "Data querying & management" },
      { name: "Database Design", description: "Schema & relationships" },
    ],
  },
  {
    category: "Cloud",
    items: [
      { name: "AWS-Foundation", description: "basic infrastructure" },
      { name: "Vercel", description: "Edge delivery" },
      { name: "Docker", description: "Reproducible builds" },

    ],
  },
  {
    category: "AI",
    items: [
      { name: "LangChain4j", description: "LLM orchestration" },
      { name: "Gemini AI", description: "Generative AI integration" },
      { name: "RAG", description: "Context-aware retrieval" },
      { name: "Semantic Search", description: "Vector-based document search" },
      { name: "Scikit-learn", description: "Machine learning models" },
      { name: "NLTK", description: "Natural language processing" },
      { name: "Pandas", description: "Data analysis & preprocessing" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", description: "Version control" },
      { name: "GitHub", description: "Code collaboration" },
      { name: "Postman", description: "API testing" },
      { name: "Maven", description: "Build automation" },
      { name: "Apache TOMCAT", description: "Java application server" },
      { name: "Eclipse IDE ,VS code", description: "IDE for Software Building" }

    ],
  },
]

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}
export const experiences: Experience[] = [
  {
    company: "Techvolt Software - Coimbatore",
    role: "Data Analyst Intern",
    period: "DEC 2024 - JAN 2025",
    description: [
      "Worked with Excel, SQL, and Power BI to clean, transform, and visualize business data.",
      "Built interactive dashboards to present meaningful business insights.",
      "Applied Python, Pandas, and Matplotlib for data preprocessing and exploratory data analysis (EDA).",
      "Generated analytical reports and visualizations to support data-driven decision making.",
    ],
  },
  {
    company: "TAP Academy - Bangalore",
    role: "Software Developer Intern",
    period: "JAN 2026 - JULY 2026",
    description: [
      "Strengthened core Java fundamentals including OOP, Collections, JDBC, Exception Handling, and SQL.",
      "Built full-stack applications using Spring Boot, React, REST APIs, MySQL, HTML, CSS, and JavaScript.",
      "Used Git and Maven for version control and project management.",
      "Developed AI-powered applications by integrating modern LLM technologies into full-stack solutions.",
    ],
  },
];

export const education = [
  { year: "2020-21", label: "St. Xavier's Higher Secondary School | SSLC | 82.3%" },
  { year: "2021-22", label: "St. Xavier's Higher Secondary School | HSC | 77.2%" },
  { year: "2022–26", label: "B.Tech-Artificial Intelligence and Data Science - CGPA- 8.22" },
]

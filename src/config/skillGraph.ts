export interface SkillNode {
  id: string;
  name: string;
  category: string;
}

export interface SkillConnection {
  from: string;
  to: string;
}

export const skillNodes: SkillNode[] = [
  // Programming
  { id: "python", name: "Python", category: "programming" },
  { id: "c", name: "C", category: "programming" },
  { id: "sql", name: "SQL", category: "programming" },
  { id: "r", name: "R", category: "programming" },
  { id: "typescript", name: "TypeScript", category: "programming" },

  // AI/ML
  { id: "ml", name: "Machine Learning", category: "aiml" },
  { id: "dl", name: "Deep Learning", category: "aiml" },
  { id: "genai", name: "Generative AI", category: "aiml" },
  { id: "rag", name: "RAG", category: "aiml" },
  { id: "langchain", name: "LangChain", category: "aiml" },
  { id: "langgraph", name: "LangGraph", category: "aiml" },
  { id: "mcp", name: "MCP", category: "aiml" },
  { id: "gnns", name: "GNNs", category: "aiml" },
  { id: "transformers", name: "Transformers", category: "aiml" },

  // Analytics
  { id: "powerbi", name: "Power BI", category: "analytics" },
  { id: "tableau", name: "Tableau", category: "analytics" },
  { id: "excel", name: "Excel", category: "analytics" },
  { id: "stats", name: "Statistical Analysis", category: "analytics" },
  { id: "eda", name: "EDA", category: "analytics" },

  // Frameworks
  { id: "fastapi", name: "FastAPI", category: "frameworks" },
  { id: "react", name: "React.js", category: "frameworks" },
  { id: "nodejs", name: "Node.js", category: "frameworks" },
  { id: "nestjs", name: "NestJS", category: "frameworks" },
  { id: "tensorflow", name: "TensorFlow", category: "frameworks" },
  { id: "scikit", name: "Scikit-Learn", category: "frameworks" },
  { id: "pandas", name: "Pandas", category: "frameworks" },

  // Databases
  { id: "mysql", name: "MySQL", category: "databases" },
  { id: "postgresql", name: "PostgreSQL", category: "databases" },
  { id: "mongodb", name: "MongoDB", category: "databases" },
  { id: "firebase", name: "Firebase", category: "databases" },
  { id: "postgis", name: "PostGIS", category: "databases" },

  // DevOps
  { id: "docker", name: "Docker", category: "devops" },
  { id: "k8s", name: "Kubernetes", category: "devops" },
  { id: "oci", name: "OCI (Oracle Cloud)", category: "devops" },
  { id: "aws", name: "AWS", category: "devops" },
  { id: "githubactions", name: "GitHub Actions", category: "devops" },
  { id: "mlflow", name: "MLflow", category: "devops" },
  { id: "airflow", name: "Airflow", category: "devops" },
  { id: "kafka", name: "Kafka", category: "devops" },
  { id: "terraform", name: "Terraform", category: "devops" },

  // Concepts
  { id: "dsa", name: "DSA", category: "concepts" },
  { id: "nlp", name: "NLP", category: "concepts" },
  { id: "cv", name: "Computer Vision", category: "concepts" },
  { id: "geospatial", name: "Geospatial AI", category: "concepts" },
];

export const skillConnections: SkillConnection[] = [
  // Programming to AI/ML & Frameworks
  { from: "python", to: "ml" },
  { from: "python", to: "dl" },
  { from: "python", to: "tensorflow" },
  { from: "python", to: "scikit" },
  { from: "python", to: "pandas" },
  { from: "python", to: "fastapi" },
  { from: "typescript", to: "react" },
  { from: "typescript", to: "nodejs" },
  { from: "typescript", to: "nestjs" },
  { from: "sql", to: "postgresql" },
  { from: "sql", to: "mysql" },

  // AI/ML to Frameworks & Concepts
  { from: "ml", to: "scikit" },
  { from: "ml", to: "stats" },
  { from: "dl", to: "tensorflow" },
  { from: "dl", to: "transformers" },
  { from: "dl", to: "gnns" },
  { from: "genai", to: "transformers" },
  { from: "genai", to: "rag" },
  { from: "genai", to: "langchain" },
  { from: "rag", to: "langchain" },
  { from: "langchain", to: "langgraph" },
  { from: "langgraph", to: "mcp" },
  { from: "nlp", to: "transformers" },
  { from: "cv", to: "dl" },

  // Geospatial
  { from: "geospatial", to: "postgis" },
  { from: "postgresql", to: "postgis" },
  { from: "geospatial", to: "ml" },

  // Databases to Frameworks
  { from: "postgresql", to: "fastapi" },
  { from: "mongodb", to: "nodejs" },
  { from: "mysql", to: "nestjs" },

  // DevOps to Frameworks & Tools
  { from: "docker", to: "k8s" },
  { from: "docker", to: "nestjs" },
  { from: "k8s", to: "terraform" },
  { from: "githubactions", to: "docker" },
  { from: "mlflow", to: "ml" },
  { from: "airflow", to: "kafka" },
  { from: "aws", to: "oci" },
];

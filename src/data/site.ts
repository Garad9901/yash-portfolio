// Every fact on the site lives in this file. Edit here; the components only render it.

export const person = {
  name: 'Yash Rajesh Garad',
  short: 'Yash Garad',
  tagline: 'Building AI that earns trust, one verified result at a time.',
  intro:
    'AI engineering student at St. Vincent Pallotti College of Engineering & Technology, Nagpur. I write research papers and ship working systems, and I hold both to the same rule: every claim has to be checkable.',
  location: 'Nagpur, India',
  email: 'yash.garad27@gmail.com',
  github: 'https://github.com/Garad9901',
  githubUser: 'Garad9901',
  linkedin: 'https://www.linkedin.com/in/yash-garad-23a315255/',
  orcid: 'https://orcid.org/0009-0007-3929-9248',
  orcidId: '0009-0007-3929-9248',
  resume: '/Yash_Garad_Resume.pdf',
  site: 'https://tensor-os-garad9901.vercel.app',
  photo: '/profile.jpg',
};

export const education = {
  degree: 'B.E. Artificial Intelligence',
  school: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
  span: '2023 – 2027',
  cgpa: '8.32',
};

export type PaperStatus = 'in-preparation' | 'submitted' | 'under-revision' | 'presented' | 'published';

export const statusLabel: Record<PaperStatus, string> = {
  'in-preparation': 'In preparation',
  submitted: 'Submitted',
  'under-revision': 'Under revision',
  presented: 'Presented',
  published: 'Published',
};

export type Paper = {
  title: string;
  authors: string; // Yash's name is bolded by the renderer
  venue?: string;
  status: PaperStatus;
  area: string;
  note?: string;
  code?: string;
};

export const papers: Paper[] = [
  {
    title: 'Skill Sphere: an AI-driven platform for personalized skill assessment and career-oriented learning',
    authors: 'Vikas G. Bhowate, Dinesh S. Banabakode, Yash Rajesh Garad, Prasun C. Shamkule, Somesh U. Ninawe',
    venue: 'International Conference on Applied Probability and Statistical Analysis (ICAPSAS-26), Trivandrum, 23 Aug 2026',
    status: 'presented',
    area: 'AI in education, secure mobile assessment',
  },
  {
    title: 'Verification-guided agentic AI tutoring for linear algebra: a review and framework',
    authors: 'Yash Rajesh Garad, Atish M. Gour, Om P. Gawande, Stanly Wilson',
    venue: 'Education and Information Technologies (target)',
    status: 'in-preparation',
    area: 'Agentic AI, Education',
    note: 'Corresponding author',
    code: 'https://github.com/Garad9901/agentic-linear-algebra-tutor',
  },
  {
    title: 'Agentic, offline, and private: a local RAG–SQL system for university data management',
    authors: 'Aditi A. Parshivanikar, Harshal S. Ninawe, Aanchal N. Kalambe, Om P. Gawande, Yash Rajesh Garad, Vikas G. Bhowate',
    status: 'in-preparation',
    area: 'Agentic RAG, Text-to-SQL',
    code: 'https://github.com/Garad9901/agentic-rag-simulator',
  },
  {
    title: 'AI-driven predictive analytics and supply chain resilience in Indian organized retail',
    authors: 'Vikas G. Bhowate, Aditi A. Parshivanikar, Om P. Gawande, Yash Rajesh Garad',
    venue: 'International Journal of Management and Decision Making (Inderscience)',
    status: 'submitted',
    area: 'Applied ML, PLS-SEM',
  },
  {
    title: 'A hybrid deep learning framework for intelligent forest fire detection and surveillance (FireVisionNet)',
    authors: 'Vikas Bhowate, Vishal Tiwari, Rihal Kalbende, Yash Rajesh Garad, Aanchal Kalambe, Harshal Ninawe',
    venue: 'Kufa Journal of Engineering',
    status: 'under-revision',
    area: 'Computer vision, YOLOv11',
  },
  {
    title: 'CLARITY-CT: explainable artificial intelligence for chest CT, a review',
    authors: 'Vikas G. Bhowate, Aditi A. Parshivanikar, Om P. Gawande, Yash Rajesh Garad',
    status: 'in-preparation',
    area: 'Explainable AI, Medical imaging',
    code: 'https://github.com/Garad9901/clarity-ct-evidence',
  },
  {
    title: 'Physics as structural architecture: a leakage-controlled cold-start evaluation of physics-assisted renewable power forecasting',
    authors: 'Vikas Bhowate, Aditi Parshivanikar, Om Gawande, Yash Rajesh Garad',
    status: 'in-preparation',
    area: 'Physics-informed ML, Energy',
  },
  {
    title: 'EEG-based depth of anaesthesia estimation using Bi-LSTM and RAG models',
    authors: 'Dinesh S. Banabakode, Thawakar, Patne, Lokhande, Yash Rajesh Garad, Om P. Gawande',
    status: 'in-preparation',
    area: 'Biomedical signals, Deep learning',
  },
  {
    title: 'An agentic AI layer for SME ERP: the RIM ai ERP case study',
    authors: 'Pooja Wagh, Nitin Mohane, Yash Rajesh Garad, Om Gawande, Harshal Ninawe, Somesh Ninawe',
    status: 'in-preparation',
    area: 'Agentic AI, Enterprise systems',
  },
  {
    title: 'BioShield-Rail: AI bot detection and fair queuing for Tatkal railway booking',
    authors: 'Vikrant P. Katekar, Dinesh S. Banabakode, Om P. Gawande, Yash Rajesh Garad, Harshal S. Ninawe, Palak V. Khonde, Aanchal N. Kalambe',
    status: 'in-preparation',
    area: 'Security ML, Behavioural biometrics',
  },
  {
    title: 'A pluvial-flood nowcasting digital twin for Kolhapur city',
    authors: 'Yash Rajesh Garad, with co-authors from MRSAC and SVPCET',
    venue: 'Modeling Earth Systems and Environment (target)',
    status: 'in-preparation',
    area: 'Digital twins, geospatial ML',
    code: 'https://github.com/Garad9901/kolhapur-flood-digital-twin',
  },
  {
    title: 'Cooperative vehicle-to-vehicle collision-risk prediction over a LoRa mesh: a feasibility study',
    authors: 'Yash Rajesh Garad, with co-authors from the Department of AI, SVPCET',
    status: 'in-preparation',
    area: 'V2V safety, IoT',
    code: 'https://github.com/Garad9901/lora-v2v-adas',
  },
  {
    title: 'Hybrid agentic RAG and Text-to-SQL systems: a review-derived taxonomy, comparative analysis and research agenda',
    authors: 'Yash Rajesh Garad, with co-authors from the Department of AI, SVPCET',
    status: 'in-preparation',
    area: 'Agentic RAG, survey',
  },
  {
    title: 'PPE compliance monitoring with YOLOv11',
    authors: 'Yash Rajesh Garad, with co-authors from SVPCET',
    venue: 'ICSIT 2026',
    status: 'submitted',
    area: 'Computer vision, workplace safety',
    code: 'https://github.com/Garad9901/ppe-compliance-vision',
  },
];

export type Project = {
  name: string;
  repo?: string;
  summary: string;
  stack: string[];
  track: 'research' | 'system';
  demo?: string;
  featured?: boolean;
};

const gh = (r: string) => `https://github.com/Garad9901/${r}`;

export const projects: Project[] = [
  { name: 'Skill Sphere', track: 'system', featured: true,
    summary: 'A mobile learning and assessment platform with adaptive testing, generative AI question generation and an anti-cheating layer: screenshot blocking, behavioural anomaly detection and auto-submit on suspicious activity. Presented at ICAPSAS-26.',
    stack: ['Mobile app', 'Generative AI', 'Adaptive testing', 'OTP auth'] },
  { name: 'Agentic linear algebra tutor', repo: gh('agentic-linear-algebra-tutor'), track: 'research', featured: true,
    summary: 'A multi-agent tutor where a SymPy verifier checks every mathematical claim before a student sees it, benchmarked against unverified LLM baselines.',
    stack: ['Python', 'SymPy', 'LLM agents'] },
  { name: 'EdgeSeiz-Net', repo: gh('edgeseiz-net'), track: 'research', featured: true,
    summary: 'A lightweight EEG seizure detector sized for ESP32 and Raspberry Pi, evaluated patient-independently on CHB-MIT.',
    stack: ['TensorFlow', 'TFLite Micro', 'EEG'] },
  { name: 'Kolhapur flood digital twin', repo: gh('kolhapur-flood-digital-twin'), track: 'research', featured: true,
    summary: 'A seven-layer pluvial-flood nowcasting twin for Kolhapur on open data, reporting its back-tested skill honestly.',
    stack: ['Python', 'Geospatial', 'Streamlit'] },
  { name: 'IntruShield', repo: gh('intrushield'), track: 'research',
    summary: 'Network intrusion detection on NSL-KDD with a leak-free, two-protocol evaluation and SHAP explanations.',
    stack: ['scikit-learn', 'XGBoost', 'SHAP'] },
  { name: 'PPE compliance vision', repo: gh('ppe-compliance-vision'), track: 'research',
    summary: 'YOLO-based PPE compliance monitoring with alerting and a staged, honest evaluation.',
    stack: ['YOLO', 'OpenCV', 'Python'] },
  { name: 'Multilingual sarcasm detection', repo: gh('multilingual-sarcasm-detection'), track: 'research',
    summary: 'Sarcasm detection for Indian code-mixed text, comparing BiLSTM with attention against XLM-R.',
    stack: ['PyTorch', 'XLM-R', 'FastAPI'] },
  { name: 'CLARITY-CT evidence', repo: gh('clarity-ct-evidence'), track: 'research',
    summary: 'The screened records, charting table and claim checks behind the CLARITY-CT review.',
    stack: ['Python', 'Systematic review'] },
  { name: 'College Assistant', repo: gh('agentic-rag-simulator'), track: 'system', featured: true,
    summary: 'An offline agentic RAG and Text-to-SQL assistant over university data. Recognised as the 2nd best project in the software category.',
    stack: ['Ollama', 'Qdrant', 'Django', 'React'] },
  { name: 'AadhaarX', repo: gh('AadhaarX'), track: 'system', featured: true,
    summary: 'A digital identity verification prototype with face matching, liveness checks and an audit trail.',
    stack: ['Next.js', 'NestJS', 'TypeScript'] },
  { name: 'AgroSense AI', repo: gh('AgroSense-AI'), track: 'system', featured: true,
    summary: 'District-level rainfall, crop-yield and climate-risk forecasting for 11 districts of Vidarbha.',
    stack: ['XGBoost', 'LSTM', 'FastAPI'] },
  { name: 'MathGPT', repo: gh('mathgpt'), track: 'system', demo: 'https://mathgpt-enterprise.vercel.app',
    summary: 'A neuro-symbolic maths workspace that pairs Gemini with Lean 4 and SymPy for proofs and symbolic computation.',
    stack: ['React', 'FastAPI', 'Lean 4'] },
  { name: 'ADHYAYAN', repo: gh('adhyayan'), track: 'system',
    summary: 'A study assistant agent that runs fully offline: local LLM plus retrieval, no API key, no internet.',
    stack: ['Ollama', 'RAG', 'FastAPI'] },
  { name: 'SwarKavach', repo: gh('swarkavach'), track: 'system', demo: 'https://clone-detector.vercel.app',
    summary: 'An on-device voice-clone detection workflow for phone calls, built for Smart India Hackathon 2026.',
    stack: ['JavaScript', 'Audio ML'] },
  { name: 'RouteIQ', repo: gh('routeiq'), track: 'system',
    summary: 'A smart-city road health platform with a Next.js front end, API gateway and AI service.',
    stack: ['Next.js', 'Docker', 'Kubernetes'] },
  { name: 'PolicyPulse', repo: gh('PolicyPulse'), track: 'system',
    summary: 'Analytics on a decade of MGNREGA district data and the transition to the new rural employment framework.',
    stack: ['Python', 'NLP', 'Streamlit'] },
  { name: 'UrduGuard', repo: gh('urduguard-moderation-suite'), track: 'system', demo: 'https://urduguard-moderation-suite.vercel.app',
    summary: 'Urdu social-media moderation for violence-incitation detection, with LIME explanations and a retro desktop interface.',
    stack: ['FastAPI', 'React', 'NLP'] },
  { name: 'Accident detection', repo: gh('Accident-Detection-System'), track: 'system',
    summary: 'Real-time road accident detection from video streams with YOLOv4-tiny and YOLOv8.',
    stack: ['YOLO', 'FastAPI', 'React'] },
  { name: 'MedBridge AI', repo: gh('medbridge-ai'), track: 'system',
    summary: 'Rural healthcare triage linking community health workers with doctors through AI symptom screening.',
    stack: ['MERN', 'Gemini', 'Socket.io'] },
];

export type Role = {
  role: string;
  org: string;
  span: string;
  detail: string;
};

// Experience: titles and dates only until each detail is confirmed.
export const flightPath: Role[] = [
  { role: 'AI Developer Intern', org: 'RNR Innotech', span: 'Jun 2026 – present',
    detail: 'Building AI modules for RIM ai ERP: invoice scanning, inventory forecasting, a business chat assistant and analytics reports.' },
  { role: 'ML Engineer Intern', org: 'Acube AI', span: 'Jun 2026 – present',
    detail: 'Machine learning engineering on applied AI products.' },
  { role: 'Research Intern', org: 'Maharashtra Remote Sensing Applications Centre (MRSAC)', span: 'Aug 2026 – Sep 2026',
    detail: 'Built a pluvial-flood nowcasting digital twin for Kolhapur city on open remote-sensing data.' },
  { role: 'AI Developer Lead', org: 'St. Vincent Pallotti College of Engineering & Technology', span: '2024 – present',
    detail: 'Leads student AI builds in the Department of Artificial Intelligence.' },
];

export const honors = [
  { place: '1st', event: 'Microsoft Nirmaan AI Hackathon', detail: 'Winner, first rank' },
  { place: '2nd', event: 'College Assistant: offline agentic RAG', detail: 'Recognised as the second best project in the software category' },
  { place: '3rd', event: 'Webbotix national departmental hackathon', detail: 'Organised by the Department of Artificial Intelligence, SVPCET' },
];

export const toolkit = [
  { group: 'Machine learning', items: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'Transformers'] },
  { group: 'Agents & LLMs', items: ['RAG', 'Text-to-SQL', 'LangGraph', 'Ollama', 'MCP', 'SymPy', 'Lean 4'] },
  { group: 'Vision & signals', items: ['YOLO', 'OpenCV', 'EEG pipelines', 'TFLite Micro'] },
  { group: 'Geospatial', items: ['GeoPandas', 'Rasterio', 'PostGIS', 'Sentinel data'] },
  { group: 'Engineering', items: ['FastAPI', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'GitHub Actions'] },
];

export const credentials = [
  { title: 'OCI 2025 Certified Generative AI Professional', issuer: 'Oracle', date: 'Oct 2025' },
  { title: 'Fundamentals of Deep Learning', issuer: 'NVIDIA Deep Learning Institute', date: 'Jan 2026' },
  { title: 'Introduction to Machine Learning', issuer: 'NPTEL', date: 'Sep 2025' },
  { title: 'Overview of Geocomputation and Geo-web Services', issuer: 'IIRS, ISRO', date: 'Nov 2025' },
  { title: 'Foundation: Introduction to LangGraph', issuer: 'LangChain Academy', date: 'Jan 2026' },
  { title: 'Agent Observability & Evaluations', issuer: 'LangChain Academy', date: 'Jun 2026' },
  { title: 'Claude with the Anthropic API', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', date: 'May 2026' },
  { title: 'Career Essentials in Generative AI', issuer: 'Microsoft & LinkedIn', date: 'May 2026' },
  { title: 'Foundations of Prompt Engineering', issuer: 'AWS', date: 'Dec 2025' },
  { title: 'AI Security & Governance', issuer: 'Securiti AI', date: 'Jun 2026' },
  { title: 'Introduction to Modern AI', issuer: 'Cisco Networking Academy', date: 'Jun 2026' },
];

export const site = {
  name: "Asrith Reddy Velireddy",
  shortName: "Asrith Reddy",
  title: "AI/ML Engineer",
  location: "New Jersey, USA",
  availability: "Open to AI/ML roles",
  email: "velireddy.asrithreddy@gmail.com",
  phone: "+1 (973) 391-5451",
  phoneHref: "tel:+19733915451",
  github: "https://github.com/Asrith2913",
  githubLabel: "github.com/Asrith2913",
  linkedin: "https://www.linkedin.com/in/asrith-reddy-v",
  linkedinLabel: "linkedin.com/in/asrith-reddy-v",
  resumeHref: "/Asrith_AIML_Resume.pdf",
  photo: "/asrith.jpg",
  photoAlt: "Portrait of Asrith Reddy Velireddy",
  pitch:
    "I design, fine-tune, and ship production ML systems — vision, RAG, and multi-agent pipelines that have to hold up under real traffic.",
  about: [
    "I build machine learning systems that have to survive contact with production. Training is the interesting part. The work is getting a model behind an API, on a GPU budget, without the latency or the answers falling apart.",
    "Lately that has meant RAG over 100,000+ messy corporate documents, LoRA/QLoRA on Llama-3 and Mistral, and LangGraph agents that actually finish multi-step jobs. Before LLMs ate the calendar, I lived in computer vision — OCR, document extraction, license plates, retinal scans.",
    "I care about the unglamorous numbers: retrieval precision, hallucination rate, milliseconds per request, frames per second.",
    "I finished my M.S. at NJIT in 2025 after a few years of vision work in Chennai. I'm in New Jersey now, looking for an AI/ML team where the model has to ship — and still work on Tuesday.",
  ],
};

export const experience = [
  {
    role: "AI/ML Engineering Intern (CPT)",
    company: "LeewayHertz",
    location: "East Coast, USA",
    dates: "Jan 2025 — Dec 2025",
    href: "https://www.leewayhertz.com/",
    stack: ["LangChain", "LangGraph", "LoRA / QLoRA", "Pinecone", "FastAPI", "AWS SageMaker"],
    bullets: [
      "Built an enterprise RAG pipeline over 100,000+ unstructured documents — +32% retrieval precision, −18% hallucinations — with LangChain, OpenAI, and Pinecone hybrid search.",
      "Fine-tuned Llama-3-8B and Mistral-7B with LoRA/QLoRA, cutting GPU memory 65% and lifting domain intent accuracy 14%.",
      "Shipped LangGraph multi-agent workflows and FastAPI inference on SageMaker at sub-120ms under 250+ rps.",
    ],
  },
  {
    role: "Associate AI/ML Engineer",
    company: "Vue.ai",
    location: "Chennai, India",
    dates: "2023",
    href: "https://vue.ai/",
    stack: ["YOLOv4", "SSD-MobileNet", "OpenCV", "FastAPI", "Docker"],
    bullets: [
      "Built document and visual extraction with YOLOv4, SSD-MobileNet, and custom OCR — +12% parsing accuracy on messy real-world inputs.",
      "Annotated 10,000+ images and containerized inference to hold sub-150ms for live document analysis.",
    ],
  },
  {
    role: "Data Scientist",
    company: "SRET",
    location: "Chennai, India",
    dates: "2022 — 2023",
    stack: ["YOLO", "SSD-MobileNet", "OpenCV", "OCR"],
    bullets: [
      "Shipped license-plate recognition at 84% detection accuracy across lighting and motion, with sub-100ms per-frame edge tests.",
      "Raised OCR character precision 9.5% with custom post-processing on 5,000+ annotated frames.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "The Sparks Foundation",
    location: "Chennai, India",
    dates: "2021",
    stack: ["Python", "SQL", "Pandas"],
    bullets: [
      "Cut reporting query time 25% and report turnaround 40% with SQL and automated Pandas pipelines.",
    ],
  },
];

export const projects = [
  {
    short: "Fraud Investigation",
    name: "LLM-Powered Fraud Investigation System",
    stack: ["PyTorch", "LangChain", "FAISS", "SageMaker", "FastAPI"],
    summary:
      "Anomaly detection that pairs BERT embeddings with FAISS and Pinecone, plus structured JSON extractors for financial documents.",
    results: [
      "22% higher anomalous transaction detection accuracy",
      "30% fewer unstructured document processing errors",
    ],
  },
  {
    short: "Market Intelligence",
    name: "Autonomous Multi-Agent Market Intelligence",
    stack: ["LangGraph", "LlamaIndex", "vLLM", "Docker", "FastAPI"],
    summary:
      "A research pipeline that orchestrates search, aggregation, and synthesis — with quantized local inference on Mistral-7B.",
    results: [
      "Industry deep-dives reduced from 4 hours to 3 minutes",
      "3.5× token throughput via vLLM and 4-bit AWQ",
    ],
  },
  {
    short: "Guarded RAG",
    name: "Enterprise Multi-Tenant RAG with Guardrails",
    stack: ["LlamaIndex", "NeMo Guardrails", "ChromaDB", "FastAPI"],
    summary:
      "Production RAG with semantic chunking, Cohere re-ranking, and NeMo Guardrails against prompt injection and off-domain answers.",
    results: [
      "95% fewer out-of-domain hallucinations",
      "50+ concurrent queries under 450ms average",
    ],
  },
  {
    short: "Retinopathy Grading",
    name: "Automated Diabetic Retinopathy Severity Grading",
    stack: ["PyTorch", "ResNet-50", "OpenCV", "Docker"],
    summary:
      "Transfer-learned ResNet-50 on Kaggle APTOS retinal images, with class-balanced loss and photometric augmentation.",
    results: [
      "83% multi-class accuracy, QWK 0.8712",
      "16% higher minority-class sensitivity",
    ],
  },
  {
    short: "Edge Vision",
    name: "Real-Time Edge Computer Vision & Tracking",
    stack: ["YOLOv8", "DeepSORT", "OpenCV", "FastAPI"],
    summary:
      "Object detection and multi-object tracking for live video, served as a FastAPI microservice with automated alerts.",
    results: [
      "30+ FPS with sub-50ms per-frame inference",
    ],
  },
];

export const skills = [
  {
    label: "Languages",
    items: ["Python", "SQL", "Bash", "R"],
  },
  {
    label: "AI / ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "OpenCV",
      "YOLO",
      "ResNet",
      "XGBoost",
      "LightGBM",
    ],
  },
  {
    label: "Generative AI",
    items: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Hugging Face",
      "LoRA / QLoRA",
      "vLLM",
      "RAG",
      "Pinecone",
      "FAISS",
      "NeMo Guardrails",
    ],
  },
  {
    label: "MLOps & Cloud",
    items: [
      "FastAPI",
      "Docker",
      "Kubernetes",
      "MLflow",
      "AWS SageMaker",
      "EC2",
      "S3",
      "GitHub Actions",
    ],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "Pandas", "NumPy", "Spark"],
  },
];

export const education = [
  {
    degree: "M.S. Computer Science",
    school: "New Jersey Institute of Technology",
    location: "Newark, NJ",
    dates: "2024 — 2025",
  },
  {
    degree: "B.Tech Computer Science",
    school: "Sri Ramachandra Engineering and Technology",
    location: "India",
    dates: "2019 — 2023",
  },
];

export const nav = [
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#contact", label: "Contact", id: "contact" },
];

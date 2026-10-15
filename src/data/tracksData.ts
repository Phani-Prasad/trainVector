// =========================================================
// trainVector Academy � Complete Track Taxonomy
// 9 Role-Specific Tracks � 4 Delivery Formats
// =========================================================

export type TrackCategory = "tech" | "domain" | "academic";

export interface CurriculumWeek {
  week: string;
  title: string;
  subtitle: string;
  skills: string[];
}

export interface TrackData {
  id: string;
  category: TrackCategory;
  title: string;
  roleBadge: string;
  shortDesc: string;
  iconName: string;
  color: string;
  bgGlow: string;
  targetAudience: string;
  tools: string[];
  capstone: string;
  weeks: CurriculumWeek[];
}

export interface DeliveryFormat {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  duration: string;
  schedule: string;
  features: string[];
  ctaText: string;
  color: string;
}

const techTracks: TrackData[] = [
  {
    id: "ai-strategy", category: "tech",
    title: "AI Strategy & Transformation", roleBadge: "Leadership & Advisory",
    shortDesc: "Drive enterprise AI adoption, evaluate ROI, and structure build-vs-buy transformation roadmaps.",
    iconName: "Briefcase", color: "#f97316", bgGlow: "rgba(249, 115, 22, 0.12)",
    targetAudience: "CXOs, VPs, Enterprise PMs, Transformation Leads",
    tools: ["Executive Dashboards", "ROI Valuation Models", "Enterprise Architecture Blueprints", "Gartner AI Radar"],
    capstone: "Enterprise AI 3-Year Transformation Roadmap & ROI Investment Dossier",
    weeks: [
      { week: "Week 1", title: "Enterprise AI Opportunity Mapping", subtitle: "From Business Pain-Points to AI Feasibility", skills: ["High-impact use case identification & value-pool prioritization", "AI Suitability Matrix: When GenAI outperforms traditional heuristics", "Assessing data maturity, API readiness, and enterprise compliance", "Scoping Phase-1 quick wins vs. long-term strategic moats"] },
      { week: "Week 2", title: "Build vs. Buy vs. Fine-Tune Frameworks", subtitle: "TCO & Infrastructure Architecture Planning", skills: ["Evaluating proprietary APIs vs. open-weight hosting (Llama/Mistral)", "TCO modeling: compute, tokens, licensing & headcount", "Vendor risk assessment, data lock-in prevention, and exit strategies", "Security posture and private cloud deployment governance"] },
      { week: "Week 3", title: "AI Value Realization & Unit Economics", subtitle: "Measurable ROI & KPI Benchmarks", skills: ["Designing AI OKRs, efficiency metrics, and cost-per-query limits", "Quantifying productivity gains, deflection rates, and revenue uplift", "Monitoring token spend vs. generated business value", "Executive steering committee dashboards and board pitch decks"] },
      { week: "Week 4", title: "AI Adoption & Change Management", subtitle: "Scaling AI Culture & Responsible Governance", skills: ["Workforce upskilling pathways and AI Center of Excellence (CoE)", "Change management for non-technical business units", "Establishing AI acceptable use policies and audit protocols", "Ethical risk management, IP protection, and copyright safety"] }
    ]
  },
  {
    id: "ai-architecture", category: "tech",
    title: "AI Solution Architecture", roleBadge: "System Architects & Tech Leads",
    shortDesc: "Design scalable multi-agent systems, hybrid RAG topologies, and resilient enterprise LLM gateways.",
    iconName: "Layers", color: "#f97316", bgGlow: "rgba(249, 115, 22, 0.12)",
    targetAudience: "Principal Architects, Tech Leads, Cloud Architects, Solutions Engineers",
    tools: ["LangGraph", "Milvus", "LiteLLM Gateway", "Redis Semantic Cache", "vLLM"],
    capstone: "Production Architecture Blueprint for a Fault-Tolerant Enterprise GenAI System",
    weeks: [
      { week: "Week 1", title: "Enterprise LLM Gateway & Topology", subtitle: "High Availability, Fallbacks & Rate Limiting", skills: ["Multi-provider LLM gateways with automated failover routing", "Semantic caching topologies using Redis to slash token costs 60%+", "Dynamic load balancing, token rate-limiting, and tenant isolation", "Context window management, token compression, and prompt caching"] },
      { week: "Week 2", title: "Advanced Enterprise RAG Architectures", subtitle: "Hybrid Retrieval & Knowledge Graph RAG", skills: ["Hybrid search: Dense vector + BM25 sparse keyword ranking", "Hierarchical document chunking and contextual metadata enrichment", "GraphRAG: Entity extraction & multi-hop knowledge graph queries", "Cross-encoder re-ranking pipelines with Cohere and local BGE models"] },
      { week: "Week 3", title: "Stateful Multi-Agent Orchestration", subtitle: "Supervisor Patterns & Message Buses", skills: ["Stateful agent architecture: Plan-and-Execute, ReAct, Reflexion", "Supervisor-Worker communication via async event streams", "Standardized tool calling with MCP and OpenAPI schemas", "Human-in-the-loop validation checkpoints and transactional rollbacks"] },
      { week: "Week 4", title: "Hybrid & Private Cloud AI Hosting", subtitle: "Infrastructure, Security & Edge Topologies", skills: ["Private LLM hosting with vLLM and TensorRT-LLM on Kubernetes", "VPC peering, private endpoints, and data perimeter isolation", "Zero-trust data sanitization and KMS token encryption", "Disaster recovery, regional model replication, multi-tenant partitioning"] }
    ]
  },
  {
    id: "ai-engineering", category: "tech",
    title: "AI Engineering & Delivery", roleBadge: "Developers & Software Engineers",
    shortDesc: "Build and deploy production multi-agent applications, custom tools, and real-time RAG APIs.",
    iconName: "Terminal", color: "#f97316", bgGlow: "rgba(249, 115, 22, 0.12)",
    targetAudience: "Full-Stack Devs, Backend Engineers, Data Engineers, Python Devs",
    tools: ["FastAPI", "LangGraph", "LlamaIndex", "Pinecone/Qdrant", "DSPy", "Ollama"],
    capstone: "Full-Stack Multi-Agent Application with Real-Time Tool Execution & Sandboxed APIs",
    weeks: [
      { week: "Week 1", title: "Modern AI Engineering & Model APIs", subtitle: "Structured Outputs, Tool Calling & Streaming", skills: ["OpenAI, Anthropic, Gemini & Groq SDKs with async execution", "Structured JSON generation using Pydantic, Instructor, tool calling", "Real-time streaming responses and Server-Sent Events (SSE)", "Local model development and prototyping using Ollama & vLLM"] },
      { week: "Week 2", title: "Hands-On RAG Pipeline Engineering", subtitle: "Embeddings, Vector Stores & Retrieval Tuning", skills: ["Vector search pipelines with Pinecone, Qdrant, and Milvus", "Embedding model selection, benchmarks, and dimension reduction", "Semantic search with metadata filters and dynamic chunk routing", "Context distillation and prompt injection prevention"] },
      { week: "Week 3", title: "Multi-Agent Systems with LangGraph", subtitle: "State Trees, Memory & Tool Sandboxes", skills: ["Stateful agent graphs, cyclical nodes, and edge conditions", "Custom Python tool-calling modules with sandboxed execution", "Agent memory persistence with Postgres & Redis checkpoints", "Multi-agent collaboration: researcher, coder, and reviewer agents"] },
      { week: "Week 4", title: "Production API Deployment & Optimization", subtitle: "FastAPI, Docker & Observability Integration", skills: ["AI backends into production FastAPI async worker pools", "Containerizing agent microservices with Docker to AWS/GCP", "Telemetry with OpenTelemetry, Langfuse, and structured logging", "Optimizing API latency, connection pooling, and payload validation"] }
    ]
  },
  {
    id: "ai-operations", category: "tech",
    title: "AI Operations & Optimization (LLMOps)", roleBadge: "MLOps, DevOps & SREs",
    shortDesc: "Automate model serving, GPU infrastructure, fine-tuning CI/CD, and token cost reduction at scale.",
    iconName: "Activity", color: "#f97316", bgGlow: "rgba(249, 115, 22, 0.12)",
    targetAudience: "DevOps Engineers, MLOps, Platform Engineers, SREs, Cloud Infra Leads",
    tools: ["vLLM", "Docker", "Kubernetes", "Prometheus/Grafana", "Unsloth/LoRA", "LiteLLM"],
    capstone: "Automated LLMOps Pipeline with GPU Auto-Scaling, Semantic Cache & Real-Time Evals",
    weeks: [
      { week: "Week 1", title: "High-Throughput Model Serving & Inference", subtitle: "vLLM, PagedAttention & Quantization", skills: ["vLLM inference servers with PagedAttention and continuous batching", "Model quantization: AWQ, GPTQ, GGUF to reduce VRAM by 70%", "Benchmarking TTFT and tokens-per-second (TPS) throughput", "Multi-GPU inference: Tensor and pipeline parallelism"] },
      { week: "Week 2", title: "Semantic Caching & Token Cost Optimization", subtitle: "Slashing API Costs at Scale", skills: ["Distributed semantic caching with GPTCache / Redis", "Dynamic threshold tuning: cache hit rates vs. response accuracy", "Token budgeting, hard quotas, and tier-based rate limiters", "Prompt optimization to reduce context size without losing fidelity"] },
      { week: "Week 3", title: "CI/CD Pipelines for Prompts & Evals", subtitle: "Automated Testing & Release Gates", skills: ["Automated regression testing for system prompts and agent behaviors", "Continuous evaluation with synthetic test suites and Golden Datasets", "Fine-tuning CI/CD: LoRA/QLoRA training triggers on new data", "Blue/Green and Canary model deployments with automated rollback"] },
      { week: "Week 4", title: "Observability, Telemetry & SRE for AI", subtitle: "Monitoring Drift, Latency & Error Budgets", skills: ["Prometheus & Grafana dashboards for GPU utilization and queue depth", "Tracing distributed LLM spans with OpenTelemetry", "Detecting concept drift, hallucination spikes, and embedding shifts", "SRE incident playbooks for provider outages and runaway loops"] }
    ]
  },
  {
    id: "ai-governance", category: "tech",
    title: "AI Governance & Observability", roleBadge: "Security & Compliance | Powered by AgentClamp",
    shortDesc: "Protect AI systems with real-time guardrails, automated PII redaction, evaluation, and audit compliance.",
    iconName: "ShieldCheck", color: "#f97316", bgGlow: "rgba(249, 115, 22, 0.12)",
    targetAudience: "Security Architects, AI Compliance Officers, Risk & Legal Teams, AI Safety Engineers",
    tools: ["AgentClamp Guardrails", "Ragas", "TruLens", "Presidio PII", "NIST AI RMF"],
    capstone: "Enterprise Guardrail Dashboard with Live Audit Telemetry & Automated Safety Gates",
    weeks: [
      { week: "Week 1", title: "Threat Modeling & Attack Vectors in GenAI", subtitle: "Prompt Injection, Jailbreaks & Exfiltration", skills: ["OWASP Top 10 for LLM Applications", "Direct/indirect prompt injection, role-play bypasses, multi-turn jailbreaks", "Data exfiltration via tool-calling hooks and markdown image injection", "Model inversion risks and system prompt extraction defense"] },
      { week: "Week 2", title: "Real-Time Interception & Safety Guardrails", subtitle: "AgentClamp Engine & Multi-Tier Filter Pipelines", skills: ["Sub-15ms input/output guardrail interceptors in front of LLM calls", "Real-time automated PII masking, tokenization, and de-anonymization", "Toxicity, hate speech, competitor mention, and policy violation enforcement", "Deterministic regex, heuristic, and neural safety classifiers"] },
      { week: "Week 3", title: "Automated Evaluation & Faithfulness Metrics", subtitle: "Ragas, TruLens & LLM-as-a-Judge", skills: ["Measuring RAG faithfulness, answer relevance, and context precision", "Automated Golden Dataset benchmarking during release cycles", "Cost-effective LLM-as-a-judge evaluation with structured rubrics", "Tracking hallucination drift and grounding score baselines"] },
      { week: "Week 4", title: "Regulatory Compliance & Audit Trails", subtitle: "EU AI Act, NIST AI RMF & ISO 42001", skills: ["EU AI Act risk tier mapping and conformity assessments", "NIST AI RMF and ISO/IEC 42001 implementation standards", "Immutable audit logging for compliance and regulatory investigations", "Incident response protocols for AI-generated output disclosures"] }
    ]
  }
,
  {
    id: "ai-agent-swarms", category: "tech",
    title: "Autonomous Multi-Agent Swarms & Automation", roleBadge: "AI & Automation Engineers",
    shortDesc: "Architect multi-agent swarms with LangGraph, AutoGen, CrewAI, persistent memory, and tool execution.",
    iconName: "Cpu", color: "#f97316", bgGlow: "rgba(249, 115, 22, 0.12)",
    targetAudience: "Backend Developers, AI Engineers, RPA Developers, System Architects",
    tools: ["LangGraph", "CrewAI", "AutoGen", "Temporal", "Redis", "FastAPI"],
    capstone: "Self-Healing Multi-Agent Autonomous Research & Execution Swarm with Human-in-the-Loop",
    weeks: [
      { week: "Week 1", title: "Agentic Paradigms & State Graphs", subtitle: "Beyond Simple Prompt Chains", skills: ["ReAct framework, planning loops, and reflection mechanisms", "State graphs with LangGraph: nodes, conditional edges, and cycles", "Managing short-term and persistent episodic memory in Redis", "Error recovery, fallback routing, and deterministic guardrails"] },
      { week: "Week 2", title: "Tool Execution & External API Integration", subtitle: "Empowering Agents with Real-World Actions", skills: ["Building type-safe tool schemas with Pydantic and OpenAPI", "Sandboxed code execution environments (E2B / Docker)", "Database querying agents with dynamic SQL generation and validation", "Web search and multi-source document retrieval agents"] },
      { week: "Week 3", title: "Multi-Agent Swarm Architectures", subtitle: "Hierarchical & Collaborative Workflows", skills: ["Orchestrating supervisor-worker and peer-to-peer agent topologies", "Role-based delegation and consensus algorithms in CrewAI & AutoGen", "Handling inter-agent communication, token budget caps, and deadlocks", "Building a multi-agent software development and QA team"] },
      { week: "Week 4", title: "Production Orchestration & Human-in-the-Loop", subtitle: "Reliability, Tracing & Deployment", skills: ["Temporal / Celery workflow engines for long-running agentic tasks", "Human-in-the-loop approval workflows and state resumption", "Distributed tracing with OpenTelemetry, LangSmith, and AgentClamp", "Deploying scalable agent microservices on Kubernetes"] }
    ]
  }
];

const domainTracks: TrackData[] = [
  {
    id: "ai-marketing", category: "domain",
    title: "AI for Marketing & Growth Teams", roleBadge: "Marketing & Brand Leaders",
    shortDesc: "Scale multi-channel campaigns, automate hyper-personalized content, and build custom brand AI agents.",
    iconName: "TrendingUp", color: "#6366f1", bgGlow: "rgba(99, 102, 241, 0.12)",
    targetAudience: "CMOs, Growth Marketers, Content Strategists, Brand & SEO Directors",
    tools: ["Make.com / n8n", "Midjourney", "Vector Knowledge Vaults", "Brand Automation Agents"],
    capstone: "Automated Multi-Channel Content & Campaign Engine with Custom Brand Voice",
    weeks: [
      { week: "Week 1", title: "Brand Voice Mastery & Knowledge Bases", subtitle: "Eliminating Generic AI Copywriting", skills: ["Reverse-engineering brand tone into reusable prompt templates", "Building private brand vaults and contextual knowledge repositories", "Crafting high-converting copy: PAS, AIDA, and storytelling hooks", "Multi-format templates: Blogs, LinkedIn, email newsletters"] },
      { week: "Week 2", title: "Multi-Modal Creative Workflows", subtitle: "AI Image, Video & Visual Asset Generation", skills: ["Advanced prompting for brand-consistent visuals and asset suites", "Short-form video scripting, storyboards, and AI voice cloning (ElevenLabs)", "Creating presentation decks and infographics with AI design tools", "Repurposing 1 podcast into 20+ viral social assets automatically"] },
      { week: "Week 3", title: "Autonomous Marketing Automation Pipelines", subtitle: "Zero-Code Workflows with Make & n8n", skills: ["Automated competitor tracking and social media sentiment monitor bots", "RSS feeds, scrapers, and AI synthesizers to auto-draft newsletters", "SEO keyword clustering, intent analysis, and outline generators", "Integrating AI workflows into Notion, HubSpot, and Webflow"] },
      { week: "Week 4", title: "AI-Driven Conversion Rate Optimization", subtitle: "A/B Testing & Personalization at Scale", skills: ["Generating 50+ landing page headline and CTA variants for testing", "Dynamic audience segmentation and hyper-personalized email sequences", "Analyzing feedback and heatmaps with AI analytical synthesis", "Building an AI Marketing Ops playbook and measuring campaign ROI"] }
    ]
  },
  {
    id: "ai-legal", category: "domain",
    title: "AI for Legal, Lawyers & Advocates", roleBadge: "Legal Counsel & Law Firms",
    shortDesc: "Automate contract redlining, synthesize case law, and conduct risk audits with full data privacy.",
    iconName: "Scale", color: "#6366f1", bgGlow: "rgba(99, 102, 241, 0.12)",
    targetAudience: "Lawyers, In-House Counsel, Compliance Officers, Law Firm Partners",
    tools: ["Legal Workspaces", "AgentClamp PII Redactor", "Private RAG", "Contract Auditing Engines"],
    capstone: "Private Legal Research & Automated Contract Redlining Assistant – Zero Data Leakage",
    weeks: [
      { week: "Week 1", title: "Legal Prompt Engineering & Hallucination Defense", subtitle: "Precision Prompting for High-Stakes Documents", skills: ["Zero-hallucination prompting and strict source citation grounding", "Extracting defined terms, covenants, indemnities, and termination clauses", "Synthesizing complex trial transcripts and regulatory filings in minutes", "Token security, zero-retention APIs, and confidentiality rules"] },
      { week: "Week 2", title: "Automated Contract Review & Redlining", subtitle: "Standardizing Commercial Agreements", skills: ["Custom clause playbooks and automated fallback negotiators", "Automated redline comparisons against standard templates (NDAs, MSAs, SLAs)", "Identifying non-standard liability caps, ambiguous wording, and compliance risks", "Generating executive summary memos on major negotiation points"] },
      { week: "Week 3", title: "Case Law Synthesis & Precedent Research", subtitle: "Private Vector Knowledge Vaults", skills: ["Private, local document search for historic firm precedents", "Synthesizing jurisdictional statutes, precedents, and legislative amendments", "Drafting legal briefs, demand letters, and discovery interrogatories with AI", "Verifying case citations and preventing fictitious citation generation"] },
      { week: "Week 4", title: "Client Confidentiality & Ethical Compliance", subtitle: "PII Redaction & Bar Ethics Guidelines", skills: ["Automated redaction of sensitive client identifiers, financial data, and PII", "Aligning firm AI usage with Bar Council / ABA ethics opinions on GenAI", "Establishing client disclosure policies and AI engagement letter clauses", "Building a firm-wide Legal AI Standard Operating Procedure (SOP)"] }
    ]
  },
  {
    id: "ai-sales", category: "domain",
    title: "AI for B2B Sales & RevOps Teams", roleBadge: "Sales Leaders & Revenue Ops",
    shortDesc: "Supercharge pipeline with hyper-personalized outreach, real-time call coaching, and deal intelligence.",
    iconName: "Target", color: "#6366f1", bgGlow: "rgba(99, 102, 241, 0.12)",
    targetAudience: "Account Executives, SDR Managers, VP of Sales, Revenue Operations Leads",
    tools: ["Clay", "Apollo", "Fathom/Gong AI", "Sales Copilots", "Make.com"],
    capstone: "Automated Inbound/Outbound Lead Enrichment & Dynamic Deal Intelligence Engine",
    weeks: [
      { week: "Week 1", title: "Deep Account Intelligence & Signal Scraping", subtitle: "Moving Beyond Generic Cold Emails", skills: ["Scraping 10-Ks, executive podcasts, and hiring signals for buyer pain points", "Synthesizing prospect LinkedIn profiles into tailored hook points", "Building account dossier summaries for enterprise discovery calls", "Hyper-personalized 1-to-1 outreach snippets with >25% reply rates"] },
      { week: "Week 2", title: "Sales Automation Workflows with AI & Clay", subtitle: "Automating Lead Research at Scale", skills: ["Multi-step enrichment waterfalls using Clay, Apollo, and LLM filters", "Scoring and qualifying inbound leads automatically based on ICP criteria", "Contextual follow-up sequences based on prospect tech stacks", "Syncing enriched AI intelligence directly into Salesforce and HubSpot"] },
      { week: "Week 3", title: "Live Call Intelligence & Objection Handling", subtitle: "Post-Call Synthesis & Coaching", skills: ["Analyzing sales call transcripts to extract buyer objections and next steps", "Building real-time battle-card assistants for competitor objections", "Automating CRM deal note entry and MEDDPICC scorecards from call audio", "Identifying winning talk-to-listen ratios and buyer sentiment inflection points"] },
      { week: "Week 4", title: "Revenue Operations & Pipeline Forecasting", subtitle: "Win/Loss Synthesis & Quota Acceleration", skills: ["Synthesizing closed-lost/won transcripts to uncover product gaps", "Predictive pipeline hygiene: detecting stalled deals with AI", "Drafting tailored mutual action plans (MAPs) and executive business reviews", "Building the ultimate AI Sales Playbook for your sales organization"] }
    ]
  }
];

const academicTracks: TrackData[] = [
  {
    id: "ai-faculty", category: "academic",
    title: "AI for Faculty & Higher Education (FDPs)", roleBadge: "Professors, Deans & Academic Institutions",
    shortDesc: "Empower faculty with AI pedagogy, Socratic tutoring bots, automated grading, and research accelerators.",
    iconName: "GraduationCap", color: "#0ea5e9", bgGlow: "rgba(14, 165, 233, 0.12)",
    targetAudience: "Professors, HODs, Deans, Academic Researchers, Faculty Development Leads",
    tools: ["Socratic AI Framework", "Overleaf + AI", "Curriculum Generators", "Assessment Engines"],
    capstone: "Subject-Specific AI Teaching Assistant & Institutional FDP Accreditation Portfolio",
    weeks: [
      { week: "Week 1", title: "Generative AI in Modern Pedagogy", subtitle: "From Plagiarism Panic to Collaborative Learning", skills: ["Redesigning assignments for the AI era beyond plagiarism prevention", "Building custom Socratic AI tutors that guide without giving answers", "Designing case studies, scenario simulations, and debate prompts", "Establishing institutional AI syllabus guidelines and disclosure policies"] },
      { week: "Week 2", title: "Automated Curriculum & Lesson Plan Design", subtitle: "10x Faster Courseware Preparation", skills: ["Generating course syllabi, reading guides, and lecture slide decks", "Creating differentiated materials for mixed-ability cohorts", "Generating complex problem sets, quizzes, and project briefs", "Developing interactive lab exercises and coding sandboxes"] },
      { week: "Week 3", title: "Automated Rubrics & Formative Feedback", subtitle: "Scalable, High-Quality Student Grading", skills: ["Structured evaluation rubrics and automated first-pass grading", "Detailed constructive feedback on essays, code, and lab reports", "Detecting student misconception patterns across entire cohorts", "Balancing automated grading efficiency with human instructor empathy"] },
      { week: "Week 4", title: "Academic Research & Literature Synthesis", subtitle: "Accelerating Scholarly Publications", skills: ["Comprehensive literature reviews across hundreds of papers with semantic synthesis", "Synthesizing statistical data and drafting journal abstracts with AI", "LaTeX equations, bibliography management, and citation formatting", "Research ethics, peer review norms, and grant proposal drafting"] }
    ]
  },
  {
    id: "ai-students", category: "academic",
    title: "Student & Fresh Graduate AI Launchpad", roleBadge: "Campus Students & Early Career",
    shortDesc: "Master Python, ML, RAG, and Multi-Agent frameworks to launch a high-growth AI engineering career.",
    iconName: "Sparkles", color: "#0ea5e9", bgGlow: "rgba(14, 165, 233, 0.12)",
    targetAudience: "Engineering Students, Fresh Graduates, Junior Developers, Career Switchers",
    tools: ["Python/Pandas", "Inference APIs", "LangChain", "ChromaDB", "Ollama", "GitHub"],
    capstone: "End-to-End Deployed AI Portfolio Project with GitHub Sandbox & Live Demo URL",
    weeks: [
      { week: "Week 1", title: "AI Foundations & Modern Python", subtitle: "From ML Basics to Vibe Coding", skills: ["Evolution from ML and Deep Learning to Generative AI & LLMs", "Python for AI: NumPy, Pandas & structured schemas", "Modern AI dev: cursor, prompt-driven iteration & vibe coding", "Environment setup: virtualenvs, Git workflows & package management"] },
      { week: "Week 2", title: "Generative AI & Large Language Models", subtitle: "Prompt Mechanics & API Integrations", skills: ["Transformer architectures, tokenization, embeddings & context windows", "Advanced prompt engineering: few-shot, chain-of-thought, system rules", "Connecting to high-speed inference APIs and local models via Ollama", "Building your first interactive terminal and web chatbot from scratch"] },
      { week: "Week 3", title: "Building Real-World RAG Applications", subtitle: "Grounding AI in Custom Data", skills: ["RAG architecture: connecting LLMs to PDF/Doc knowledge bases", "Vector databases (ChromaDB / Pinecone) & similarity search mechanics", "Document chunking, metadata enrichment, and embedding model selection", "Building a full Q&A assistant over textbooks and research papers"] },
      { week: "Week 4", title: "Agentic AI & Portfolio Deployment", subtitle: "Multi-Agent Workflows & Career Showcase", skills: ["What makes systems agentic: decision loops, memory, tool execution", "Building autonomous agents using LangChain / CrewAI", "Deploying your AI web app on cloud (Vercel, Render) with a public URL", "AI GitHub portfolio, resume highlights, and interview prep"] }
    ]
  },
  {
    id: "ai-campus-incubation", category: "academic",
    title: "Campus AI Center of Excellence & Incubation", roleBadge: "University Leaders & Innovation Cells",
    shortDesc: "Establish accredited campus AI Centers of Excellence, student incubators, industry capstone hackathons, and placement pipelines.",
    iconName: "Award", color: "#0ea5e9", bgGlow: "rgba(14, 165, 233, 0.12)",
    targetAudience: "Vice Chancellors, Deans, Placement Directors, TPO Cells, Student AI Clubs",
    tools: ["AgentClamp Academic", "Hugging Face Spaces", "Google Colab Pro", "GitHub Enterprise"],
    capstone: "Turnkey Campus AI Center of Excellence Setup, Student Incubator Blueprint & Industry Placement MOU",
    weeks: [
      { week: "Week 1", title: "Campus AI Strategy & Infrastructure Blueprint", subtitle: "Building Next-Gen Academic Testbeds", skills: ["Designing on-campus GPU clusters and cloud lab architectures", "Formulating campus-wide AI governance, privacy, and integrity charters", "Setting up collaborative institutional GitHub & Hugging Face hubs", "Securing academic grants and GPU cloud compute credits"] },
      { week: "Week 3", title: "Student AI Hackathons & Startup Incubation", subtitle: "From Classroom Projects to Funded Startups", skills: ["Organizing 48-hour sponsored campus AI hackathons with enterprise problem statements", "Incubating high-potential student agentic AI projects into viable startups", "Intellectual property (IP) guidance and patent filing frameworks", "Connecting student founder teams with venture capital and angel investors"] },
      { week: "Week 4", title: "Placement Acceleration & Industry MOUs", subtitle: "Guaranteed Enterprise Hiring Pipelines", skills: ["Structuring hiring partnerships and MOUs with leading AI product companies", "Technical interview preparation: live coding, system design, and AI portfolio reviews", "Tracking graduate placement metrics and career progression milestones", "Building an active alumni network of AI engineers and researchers"] }
    ]
  }
];

export const ACADEMY_TRACKS: TrackData[] = [...techTracks, ...domainTracks, ...academicTracks];

export const DELIVERY_FORMATS: DeliveryFormat[] = [
  { id: "cohort", title: "24-Hour Live Cohort", badge: "Most Popular", tagline: "Cohort-Based Interactive Mastery", duration: "24 Total Hours � 4�6 Weeks", schedule: "Interactive Weekend Live Sessions", features: ["Live workshops led by Senior AI Practitioners", "Hands-on collaborative labs & real-world debugging sessions", "Dedicated mentor office hours & peer breakout rooms", "Live Capstone Showcase & Verified Certificate of Mastery", "Lifetime access to session recordings & updated curriculum"], ctaText: "Apply for Next Cohort", color: "#f97316" },
  { id: "mentorship", title: "30-Hour 1:1 Executive Mentorship", badge: "Exclusive", tagline: "Personalized 1:1 Architecture & Build Guidance", duration: "30 Total Hours � Flexible Pace", schedule: "Custom 1:1 Scheduled Sessions", features: ["1:1 sessions customized to your enterprise use case", "Direct architecture reviews & private codebase co-authoring", "Private cloud / local model deployment consultation", "Executive roadmap guidance & corporate budget justification", "Priority direct Slack/WhatsApp access with instructors"], ctaText: "Book 1:1 Mentorship", color: "#8b5cf6" },
  { id: "enterprise-fdp", title: "Corporate & University FDPs", badge: "Institutional", tagline: "Tailored Cohorts for Teams & Academic Faculty", duration: "Custom � 2-Day to 6-Week FDP", schedule: "On-Premises or Private Virtual Delivery", features: ["Curriculum customized to your tech stack or academic domain", "FDP accredited modules & lesson templates", "Enterprise security & AgentClamp governance workshop", "Bulk licensing & organizational capability assessment report", "Ongoing post-training advisory & faculty mentorship"], ctaText: "Request Institutional Proposal", color: "#a855f7" }
];

export const CATEGORY_LABELS: Record<string, string> = {
  all: "All 12 Tracks",
  tech: "Tech & Engineering (6)",
  domain: "Enterprise Domains (3)",
  academic: "Faculty & Academic (3)"
};

'use client';
import { useState } from 'react';
import { FaHome, FaFileAlt, FaTachometerAlt, FaRobot, FaTimes, FaCopy, FaCheck } from "react-icons/fa";

const LLM_PROMPT_TEMPLATE = `I want you to help me create a professional CV/Resume in JSON format. Please follow this exact structure and replace the example data with information relevant to my background.

Here is the JSON template you must follow:

{
  "name": "Mama Baba",
  "position": "Cyber Security Specialist",
  "contactInformation": "+201022332222",
  "email": "mama@gmail.com",
  "address": "Oklahoma, United States",
  "socialMedia": [
    { "socialMedia": "LinkedIn", "link": "https://linkedin.com/mamababa", "displayName": "linkedin.com/mamababa" },
    { "socialMedia": "Github", "link": "https://github.com/mamababa", "displayName": "github.com/mamababa" }
  ],
  "summary": [
    {
      "text": "Cyber Security Specialist with strong academic grounding and hands-on experience in artificial intelligence training, data analysis, and secure model development. Proven ability to work with large-scale datasets, improve model accuracy, and support AI systems through structured data labeling and validation. Academic background from a top-tier institution with a GPA of 3.9/4.0, complemented by real-world freelance experience in AI operations. Demonstrated strengths in Python, Java, machine learning frameworks, and applied risk analysis. Career focus centers on securing intelligent systems, improving model reliability, and supporting data-driven security decisions across scalable platforms.",
      "isShownInPreview": true
    }
  ],
  "educations": [
    {
      "school": "Harvard University",
      "degree": "Bachelor of Science in Cyber Security",
      "startYear": "2022",
      "endYear": "2026",
      "notes": "GPA: 3.9 / 4.0",
      "isShownInPreview": true
    }
  ],
  "courses": [],
  "workExperience": [
    {
      "company": "Scale AI",
      "position": "AI Trainer",
      "startYear": "2022-01-01",
      "endYear": "2026-01-01",
      "workType": "Remote",
      "location": "San Francisco, United States",
      "companyField": "Artificial Intelligence and Data Services",
      "technologies": ["Python", "Java", "Data Labeling", "Machine Learning Pipelines"],
      "achievements": [
        { "text": "Labeled and validated 50,000+ data samples to support supervised learning models used in production AI systems.", "isShownInPreview": true },
        { "text": "Improved model training accuracy by 18% through consistent annotation standards and error reduction techniques.", "isShownInPreview": true },
        { "text": "Reduced data inconsistency rates by 22% by applying structured quality control checks across datasets.", "isShownInPreview": true },
        { "text": "Supported training of 5+ machine learning models by preparing clean, security-aware datasets.", "isShownInPreview": true },
        { "text": "Collaborated with distributed engineering teams to meet 100% of delivery deadlines for labeled data batches.", "isShownInPreview": true }
      ],
      "isPartTime": false,
      "isShownInPreview": true
    }
  ],
  "projects": [
    {
      "title": "JAJA",
      "description": "Machine learning project focused on detecting physical bruises and assessing medical risk levels using image-based analysis. The system was designed with accuracy, data integrity, and model evaluation as core objectives.",
      "technologies": [
        { "text": "TensorFlow", "isShownInPreview": true },
        { "text": "Python", "isShownInPreview": true },
        { "text": "Computer Vision", "isShownInPreview": true }
      ],
      "link": "https://github.com/mamababa/mama",
      "startYear": "2024",
      "endYear": "2024",
      "achievements": [
        { "text": "Achieved 95% detection accuracy through optimized model architecture and dataset preprocessing.", "isShownInPreview": true },
        { "text": "Trained and evaluated the model on 10,000+ labeled images to ensure consistent performance.", "isShownInPreview": true },
        { "text": "Reduced false positive rates by 20% through iterative testing and hyperparameter tuning.", "isShownInPreview": true }
      ],
      "isShownInPreview": true
    }
  ],
  "skills": [
    {
      "title": "Programming Languages",
      "skills": [
        { "text": "Python", "isShownInPreview": true },
        { "text": "Java", "isShownInPreview": true }
      ],
      "isShownInPreview": true
    },
    {
      "title": "Machine Learning & AI",
      "skills": [
        { "text": "TensorFlow", "isShownInPreview": true },
        { "text": "Data Labeling", "isShownInPreview": true },
        { "text": "Model Training", "isShownInPreview": true },
        { "text": "Model Evaluation", "isShownInPreview": true }
      ],
      "isShownInPreview": true
    },
    {
      "title": "Cyber Security & Data Practices",
      "skills": [
        { "text": "Data Integrity", "isShownInPreview": true },
        { "text": "Risk Analysis", "isShownInPreview": true },
        { "text": "Secure Data Handling", "isShownInPreview": true }
      ],
      "isShownInPreview": true
    },
    {
      "title": "Professional Skills",
      "skills": [
        { "text": "Analytical Thinking", "isShownInPreview": true },
        { "text": "Problem Solving", "isShownInPreview": true },
        { "text": "Technical Documentation", "isShownInPreview": true },
        { "text": "Remote Collaboration", "isShownInPreview": true }
      ],
      "isShownInPreview": true
    }
  ],
  "languages": [
    { "title": "English", "level": "Professional", "isShownInPreview": true },
    { "title": "German", "level": "Native", "isShownInPreview": true }
  ],
  "titles": {
    "profile": "PROFILE",
    "experience": "WORK EXPERIENCE",
    "education": "EDUCATION",
    "certification": "ACHIEVEMENTS & LEADERSHIP",
    "skills": "TECHNICAL SKILLS",
    "languages": "LANGUAGES",
    "projects": "PROJECTS"
  },
  "order": ["contactInformation", "profile", "workExperience", "projects", "education", "courses", "skills", "languages"]
}

Please ask me about my:
1. Personal information (name, contact, location)
2. Professional summary
3. Work experience
4. Education
5. Projects
6. Skills
7. Languages

Then generate a JSON in the exact same format above with my information.`;

export default function BuilderSideBar() {
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(LLM_PROMPT_TEMPLATE);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            alert('Failed to copy. Please select and copy manually.');
        }
    };

    return (
        <>
            <div id={"SideBar"}
                className="z-7 sidebar:flex sidebar:h-screen
                sidebar:w-30 sidebar:pt-8 sidebar:flex-col
                 sticky top-0 hidden w-full xl:w-[130px]">
                <div className="sidebar:top-8 sticky top-0 w-full">
                    <nav
                        className="sidebar:rounded-large sidebar:shadow-themeShadow
                sidebar:pb-4 flex w-full flex-col
                items-center bg-[#111316]
                shadow-[rgb(0_0_0)_0px_0px_10px_0px]">
                        <div className="sidebar:grid-cols-1 sidebar:grid-rows-[min-content_min-content_min-content_min-content_min-content]
                 grid w-full max-w-full
                 grid-cols-[min-content_1fr_0px]
                 md:grid-cols-[60px_1fr_60px]">

                            {/* Home Icon - Goes to Homepage */}
                            <a className="sidebar:justify-center sidebar:pb-2 sidebar:pl-0
                    sidebar:pt-6 group relative flex w-full
                     items-center pl-4 hover:cursor-pointer md:pl-6"
                                href={"/"}
                                aria-label="Go to Home">
                                <div
                                    className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full group-hover:bg-[#1a1d21]">
                                    <div className="text-[#2EFF8A] text-3xl">
                                        <FaHome />
                                    </div>
                                </div>
                                <div
                                    className="bg-[#2EFF8A] sidebar:group-hover:flex absolute top-[90px] hidden min-w-fit flex-col items-center rounded-full border-solid p-1 px-2 text-xs font-bold text-[#0f1113]">
                                    Home
                                    <div
                                        className="after:border-b-[#2EFF8A] h-0 w-0 after:absolute after:-top-[15px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-b-[8px] after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"></div>
                                </div>
                            </a>

                            {/* Dashboard Icon - Goes to Dashboard */}
                            <a className="sidebar:justify-center sidebar:pb-2 sidebar:pl-0
                    sidebar:pt-2 group relative flex w-full
                     items-center pl-4 hover:cursor-pointer md:pl-6"
                                href={"/dashboard"}
                                aria-label="Go to Dashboard">
                                <div
                                    className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full group-hover:bg-[#1a1d21]">
                                    <div className="text-[#9AA3A8] group-hover:text-[#2EFF8A] text-3xl transition-colors">
                                        <FaTachometerAlt />
                                    </div>
                                </div>
                                <div
                                    className="bg-[#2EFF8A] sidebar:group-hover:flex absolute top-[90px] hidden min-w-fit flex-col items-center rounded-full border-solid p-1 px-2 text-xs font-bold text-[#0f1113]">
                                    Dashboard
                                    <div
                                        className="after:border-b-[#2EFF8A] h-0 w-0 after:absolute after:-top-[15px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-b-[8px] after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"></div>
                                </div>
                            </a>

                            {/* AI Prompt Helper Button */}
                            <button
                                onClick={() => setIsPromptOpen(true)}
                                className="sidebar:justify-center sidebar:pb-2 sidebar:pl-0
                                sidebar:pt-2 group relative flex w-full
                                items-center pl-4 hover:cursor-pointer md:pl-6"
                                aria-label="AI CV Generator Prompt">
                                <div
                                    className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full group-hover:bg-[#1a1d21] transition-colors">
                                    <div className="text-[#9AA3A8] group-hover:text-[#2EFF8A] text-3xl transition-colors">
                                        <FaRobot />
                                    </div>
                                </div>
                                <div
                                    className="bg-[#2EFF8A] sidebar:group-hover:flex absolute top-[90px] hidden min-w-fit flex-col items-center rounded-full border-solid p-1 px-2 text-xs font-bold text-[#0f1113] z-50">
                                    AI Helper
                                    <div
                                        className="after:border-b-[#2EFF8A] h-0 w-0 after:absolute after:-top-[15px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-b-[8px] after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"></div>
                                </div>
                            </button>

                            {/* Content Section - Currently Active */}
                            <a
                                className="sidebar:grid-cols-1 sidebar:grid-rows-[min-content_min-content]
                         grid grid-cols-[min-content_min-content_min-content]
                          items-stretch justify-center">
                                <div className="sidebar:pt-2 sidebar:pb-2 flex w-full flex-col
                         items-center justify-center pl-2 pr-2
                          bg-transparent sidebar:bg-transparent active"
                                    href="" aria-current="page">
                                    <span
                                        className="text-[#E6E9EB] sidebar:rounded-large sidebar:w-[100px]
                          sidebar:h-[90px] flex cursor-pointer flex-col
                           items-center justify-center px-6 py-1.5
                           no-underline hover:opacity-80 xl:w-[110px] bg-[#1a1d21] rounded-lg">
                                        <span
                                            className="flex items-center justify-center text-[#2EFF8A] text-3xl">
                                            <FaFileAlt />
                                        </span>
                                        <span
                                            className="text-[14px] mt-[6px] font-bold text-[#2EFF8A]">Content</span>
                                    </span>
                                </div>

                            </a>
                        </div>

                    </nav>
                </div>
            </div>

            {/* AI Prompt Modal */}
            {isPromptOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsPromptOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-[#111316] border border-[#2a2d32] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#2a2d32]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#2EFF8A]/10 flex items-center justify-center">
                                    <FaRobot className="text-[#2EFF8A] text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#E6E9EB]">AI CV Generator</h2>
                                    <p className="text-xs text-[#9AA3A8]">Copy this prompt and paste it in ChatGPT, Claude, or any LLM</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsPromptOpen(false)}
                                className="w-10 h-10 flex items-center justify-center text-[#9AA3A8] hover:text-white hover:bg-[#2a2d32] rounded-lg transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-4">
                            <div className="bg-[#0a0b0d] rounded-xl p-4 border border-[#2a2d32]">
                                <pre className="text-sm text-[#9AA3A8] whitespace-pre-wrap font-mono leading-relaxed">
                                    {LLM_PROMPT_TEMPLATE}
                                </pre>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-[#2a2d32] flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleCopyPrompt}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-[#2EFF8A] text-[#0f1113] hover:bg-[#26d975]'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <FaCheck className="text-lg" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <FaCopy className="text-lg" />
                                        Copy Prompt
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setIsPromptOpen(false)}
                                className="flex-1 py-3 px-4 rounded-xl font-bold border border-[#2a2d32] text-[#E6E9EB] hover:bg-[#1a1d21] transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
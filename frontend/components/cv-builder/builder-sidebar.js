'use client';
import { useState } from 'react';
import { FaHome, FaFileAlt, FaTachometerAlt, FaRobot, FaTimes, FaCopy, FaCheck } from "react-icons/fa";

const LLM_PROMPT_TEMPLATE = `Act as a Professional Resume Strategist and ATS (Applicant Tracking System) Expert. Your goal is to help me create a perfect, 100% ATS-compliant CV that will be exported as a specific JSON object compatible with my website's parser.

### STEP 1: THE DATA GATHERING
To begin, please provide all the following information in one go (don't worry about formatting, just provide the raw details):

1. **Basic Info**: Full Name, Job Position, Phone (with country code), Email, and Location (City, Country).
2. **Links**: LinkedIn and GitHub URLs.
3. **Education**: School name, Degree, GPA, and Graduation Date.
4. **Work & Projects**: List your jobs and projects. For each, include the name, your role, dates, tools used, and what you accomplished. 
5. **Skills**: List all your technical tools, languages, and soft skills.
6. **Languages**: What languages do you speak and at what level?

### STEP 2: ATS OPTIMIZATION RULES (INTERNAL)
Once you receive my data, you must transform it using these strict guidelines:
- **No Personal Pronouns**: Never use "I", "me", or "my".
- **Numericized Data**: Always use digits (e.g., "5", "25%") instead of words.
- **Quantified Results**: Create at least 5 measurable achievements (e.g., "Reduced latency by 15%" or "Managed 10+ people").
- **Dynamic Skill Categorization**: Do NOT just use "Hard/Soft Skills." Group skills logically based on my data (e.g., "Programming Languages," "DevOps Tools," "Management").
- **Skills Ratio**: Ensure the total count of technical skills exceeds soft skills.
- **Vocabulary**: Maintain a professional vocabulary and reading level (Level 6+).
- **Word Count**: The final text should be between 300 and 1200 words.

### STEP 3: THE JSON OUTPUT (STRICT STRUCTURE)
Your final response must be ONLY the JSON object. Follow this structure exactly:

{
  "name": "",
  "position": "",
  "contactInformation": "",
  "email": "",
  "address": "",
  "socialMedia": [
    { "socialMedia": "LinkedIn", "link": "", "displayName": "" },
    { "socialMedia": "Github", "link": "", "displayName": "" }
  ],
  "summary": [{ "text": "Professional summary reflecting career goals...", "isShownInPreview": true }],
  "educations": [
    { "school": "", "degree": "", "startYear": "", "endYear": "", "notes": "GPA: X.X / 4.0", "isShownInPreview": true }
  ],
  "courses": [],
  "workExperience": [
    {
      "company": "", "position": "", "startYear": "YYYY-MM-DD", "endYear": "YYYY-MM-DD", "workType": "Remote/On-site", "location": "", "companyField": "",
      "technologies": ["Skill1", "Skill2"], 
      "achievements": [{ "text": "Action verb + Task + Result with numbers...", "isShownInPreview": true }],
      "isPartTime": false, "isShownInPreview": true
    }
  ],
  "projects": [
    {
      "title": "", "description": "", 
      "technologies": [{ "text": "Skill Name", "isShownInPreview": true }], 
      "link": "", "startYear": "", "endYear": "", 
      "achievements": [{ "text": "Quantifiable achievement...", "isShownInPreview": true }], 
      "isShownInPreview": true
    }
  ],
  "skills": [
    {
      "title": "Category Name (e.g. Programming Languages)",
      "skills": [{ "text": "Skill Name", "isShownInPreview": true }],
      "isShownInPreview": true
    }
  ],
  "languages": [
    { "title": "English", "level": "Fluent", "isShownInPreview": true },
    { "title": "Arabic", "level": "Native", "isShownInPreview": true }
  ],
  "titles": {
    "profile": "PROFILE", "experience": "WORK EXPERIENCE", "education": "EDUCATION", "certification": "ACHIEVEMENTS & LEADERSHIP", "skills": "TECHNICAL SKILLS", "languages": "LANGUAGES", "projects": "PROJECTS"
  },
  "order": ["contactInformation", "profile", "workExperience", "projects", "education", "courses", "skills", "languages"]
}

I am ready. Please ask me for all my information now in one shot.`;

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
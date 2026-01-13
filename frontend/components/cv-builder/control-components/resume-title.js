'use client';
import RoundedBtnWithIcon from "@/components/general/rounded-btn-with-icon";
import { FaEdit, FaArrowLeft, FaRobot, FaTimes, FaCopy, FaCheck } from "react-icons/fa";
import { MdSystemUpdateAlt } from "react-icons/md";
import WinPrint from "@/lib/pdf-save";
import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";
import WinPrintPDF from "@/lib/prepare-pdf";
import PdfSave from "@/lib/pdf-save";
import { useRouter } from "next/navigation";

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

const ResumeTitleDownload = () => {
    const router = useRouter();
    const { resumeData, setResumeData, syncResumeData } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(resumeData.title || "Untitled");
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSaveTitle = () => {
        const newData = { ...resumeData, title }
        setResumeData(newData);
        setIsEditing(false);
        syncResumeData(newData);
    };

    const syncAndSave = async () => {
        await PdfSave({ printDivId: "resume" });
    }

    // Save and go back to dashboard
    const handleBackToDashboard = () => {
        syncResumeData(resumeData);
        router.push('/dashboard');
    };

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
            <div className="bg-[#0f1113] sidebar:rounded-b-large sidebar:pt-8
            sidebar:shadow-[0_-25px_15px_15px_#0f1113] sidebar:shadow-[#0f1113]
            sticky top-0 z-[6] mb-6 w-full shadow-sm">
                <div
                    className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 sm:gap-4
                    bg-[#111316] px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-9 lg:py-5 rounded-lg"
                >
                    {/* Back Button - Now saves before navigating */}
                    <button
                        onClick={handleBackToDashboard}
                        className="flex items-center justify-center p-2 rounded-full bg-[#1a1d21] hover:bg-[#2a2d32] transition-colors"
                        title="Save and go back to Dashboard"
                    >
                        <FaArrowLeft className="text-[#9AA3A8] hover:text-[#E6E9EB]" size={16} />
                    </button>

                    {/* Title Section */}
                    <div className="flex items-center mr-2 sm:mr-8 min-w-0">
                        {isEditing ? (
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                onBlur={handleSaveTitle}
                                className="text-[#E6E9EB] bg-transparent truncate text-base sm:text-xl md:text-2xl font-extrabold border-b border-[#2a2d32] focus:outline-none focus:border-[#2EFF8A] max-w-[120px] sm:max-w-[200px] md:max-w-[300px] w-full"
                                autoFocus
                            />
                        ) : (
                            <p
                                className="text-[#E6E9EB] truncate text-base sm:text-xl md:text-2xl font-extrabold cursor-pointer hover:opacity-80 max-w-[120px] sm:max-w-[200px] md:max-w-[300px] w-full"
                                onClick={handleEditToggle}
                            >
                                {resumeData.title || "Untitled"}
                            </p>
                        )}
                        {!isEditing && (
                            <RoundedBtnWithIcon
                                iconSize={16}
                                icon={FaEdit}
                                iconColor={"#7d8189"}
                                onClick={handleEditToggle}
                                className="ml-1 sm:ml-2 flex-shrink-0"
                            />
                        )}
                    </div>

                    {/* AI Helper Button - Prominent */}
                    <button
                        onClick={() => setIsPromptOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all text-white font-bold text-sm shadow-lg"
                        title="Use AI to generate your CV"
                    >
                        <FaRobot className="text-lg" />
                        <span className="hidden sm:inline">AI Helper</span>
                    </button>

                    {/* Download Button */}
                    <RoundedBtnWithIcon
                        iconSize={12}
                        className={
                            "bg-[#2EFF8A] text-[#0f1113] py-10 h-12 w-12 md:h-10 md:w-full md:min-w-[120px] md:px-7 md:py-2 font-bold"
                        }
                        text={"Download"}
                        icon={MdSystemUpdateAlt}
                        onClick={syncAndSave}
                    />


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
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                                    <FaRobot className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#E6E9EB]">AI CV Generator</h2>
                                    <p className="text-xs text-[#9AA3A8]">Copy this prompt → Paste in ChatGPT/Claude → Get your CV JSON</p>
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
                                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500'
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
};

export default ResumeTitleDownload;

import RoundedBtnWithIcon from "@/components/general/rounded-btn-with-icon";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { MdSystemUpdateAlt } from "react-icons/md";
import WinPrint from "@/lib/pdf-save";
import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";
import WinPrintPDF from "@/lib/prepare-pdf";
import PdfSave from "@/lib/pdf-save";
import { useRouter } from "next/navigation";

const ResumeTitleDownload = () => {
    const router = useRouter();
    const { resumeData, setResumeData, syncResumeData } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(resumeData.title || "Untitled");

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

    const syncAndSave = () => {
        PdfSave({ printDivId: "resume" });
    }

    // Save and go back to dashboard
    const handleBackToDashboard = () => {
        syncResumeData(resumeData);
        router.push('/dashboard');
    };

    return (
        <div className="bg-[#0f1113] sidebar:rounded-b-large sidebar:pt-8
        sidebar:shadow-[0_-25px_15px_15px_#0f1113] sidebar:shadow-[#0f1113]
        sticky top-0 z-[6] mb-6 w-full shadow-sm">
            <div
                className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4
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
    );
};

export default ResumeTitleDownload;

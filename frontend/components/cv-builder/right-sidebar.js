import CircularButton from "@/components/general/circle-btn";
import { FaDownload, FaCopy, FaUpload, FaPaste, FaSyncAlt } from "react-icons/fa";
import useAppContext from "@/hooks/useAppContext";
import { DownloadIcon } from "@/components/svgs/svgs";


export default function RightSidebar() {
    const { resumeData, setResumeData, syncResumeData } = useAppContext();
    const downloadAsJson = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(resumeData.data)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = `resume-${resumeData.title}.json`;
        document.body.appendChild(element);
        element.click();
    };

    const copyAsJson = () => {
        navigator.clipboard.writeText(JSON.stringify(resumeData.data));
    };
    const triggerFileInput = () => {
        document.getElementById("json-upload-input").click();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    setResumeData({
                        ...resumeData,
                        data: jsonData,
                    });
                } catch (err) {
                    alert("Invalid JSON file format.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();

            try {
                const jsonData = JSON.parse(text);
                setResumeData({
                    ...resumeData,
                    data: jsonData,
                });
            } catch (err) {
                alert("Invalid JSON format.");
            }
        } catch (err) {
            alert("Failed to read clipboard content.");
        }
    };

    const handleSync = () => {
        syncResumeData(resumeData);

    }

    return <div className="fixed right-4 top-1/4 flex flex-col gap-4 z-10">
        {/* Hidden input for file upload */}
        <input
            id="json-upload-input"
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
            className="hidden"
        />


        {/* Download - Blue for export/download action */}
        <CircularButton
            tooltipText="Download JSON"
            onClick={() => {
                downloadAsJson();
            }}
            icon={DownloadIcon}
            bgColor="bg-blue-500 hover:bg-blue-600"
        />
        <div className="h-1"></div>

        {/* Copy - Orange/Amber for copy action */}
        <CircularButton
            tooltipText="Copy As JSON"
            onClick={() => {
                copyAsJson();
            }}
            icon={FaCopy}
            bgColor="bg-amber-500 hover:bg-amber-600"
        />
        <div className="h-1"></div>

        {/* Upload - Cyan for import/upload action */}
        <CircularButton
            tooltipText="Upload JSON"
            onClick={triggerFileInput}
            icon={FaUpload}
            bgColor="bg-cyan-500 hover:bg-cyan-600"
        />
        <div className="h-1"></div>


        {/* Paste - Green for paste (matching our theme) */}
        <CircularButton
            tooltipText="Upload Via Clipboard"
            onClick={handlePaste}
            icon={FaPaste}
            bgColor="bg-[#2EFF8A] hover:bg-[#26cc70]"
        />

        <div className="h-1"></div>

        {/* Sync - Yellow/Gold for sync/refresh action */}
        <CircularButton
            tooltipText="Sync"
            onClick={handleSync}
            icon={FaSyncAlt}
            bgColor="bg-yellow-500 hover:bg-yellow-600"
        />
    </div>

}
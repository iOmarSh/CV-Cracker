'use client';
import { useState } from 'react';
import CircularButton from "@/components/general/circle-btn";
import { FaDownload, FaCopy, FaUpload, FaPaste, FaSyncAlt, FaEllipsisV, FaTimes, FaTools } from "react-icons/fa";
import useAppContext from "@/hooks/useAppContext";
import { DownloadIcon } from "@/components/svgs/svgs";


export default function RightSidebar() {
    const { resumeData, setResumeData, syncResumeData } = useAppContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const downloadAsJson = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(resumeData.data)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = `resume-${resumeData.title}.json`;
        document.body.appendChild(element);
        element.click();
        showNotification('JSON downloaded!');
        setIsExpanded(false);
    };

    const copyAsJson = () => {
        navigator.clipboard.writeText(JSON.stringify(resumeData.data));
        showNotification('Copied to clipboard!');
        setIsExpanded(false);
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
                    showNotification('JSON uploaded!');
                    setIsExpanded(false);
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
                showNotification('Pasted from clipboard!');
                setIsExpanded(false);
            } catch (err) {
                alert("Invalid JSON format in clipboard.");
            }
        } catch (err) {
            alert("Failed to read clipboard. Please allow clipboard access.");
        }
    };

    const handleSync = () => {
        syncResumeData(resumeData);
        showNotification('Synced to cloud!');
        setIsExpanded(false);
    };

    const actions = [
        { label: 'Download JSON', icon: DownloadIcon, onClick: downloadAsJson, color: 'bg-blue-500' },
        { label: 'Copy JSON', icon: FaCopy, onClick: copyAsJson, color: 'bg-amber-500' },
        { label: 'Upload JSON', icon: FaUpload, onClick: triggerFileInput, color: 'bg-cyan-500' },
        { label: 'Paste JSON', icon: FaPaste, onClick: handlePaste, color: 'bg-[#2EFF8A]' },
        { label: 'Sync to Cloud', icon: FaSyncAlt, onClick: handleSync, color: 'bg-yellow-500' },
    ];

    return (
        <>
            {/* Hidden input for file upload */}
            <input
                id="json-upload-input"
                type="file"
                accept="application/json"
                onChange={handleFileUpload}
                className="hidden"
            />

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[200] bg-[#2EFF8A] text-[#0f1113] px-4 py-2 rounded-lg font-bold shadow-lg animate-pulse">
                    {toastMessage}
                </div>
            )}

            {/* Desktop View - Traditional vertical buttons */}
            <div className="hidden sidebar:flex fixed right-4 top-1/4 flex-col gap-3 z-10">
                {actions.map((action, index) => (
                    <CircularButton
                        key={index}
                        tooltipText={action.label}
                        onClick={action.onClick}
                        icon={action.icon}
                        bgColor={`${action.color} hover:opacity-80`}
                    />
                ))}
            </div>

            {/* Mobile View - Expandable FAB */}
            <div className="sidebar:hidden fixed right-4 bottom-36 z-[60]">
                {/* Expanded Menu */}
                {isExpanded && (
                    <div className="absolute bottom-16 right-0 bg-[#111316] border border-[#2a2d32] rounded-2xl p-3 shadow-2xl mb-2 min-w-[180px]">
                        <div className="space-y-2">
                            {actions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={index}
                                        onClick={action.onClick}
                                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#1a1d21] transition-colors text-left"
                                    >
                                        <div className={`p-2 rounded-lg ${action.color}`}>
                                            <Icon className="text-white text-sm" />
                                        </div>
                                        <span className="text-[#E6E9EB] text-sm font-medium">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* FAB Toggle Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${isExpanded
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-[#2a2d32] hover:bg-[#3a3d42] border border-[#3a3d42]'
                        }`}
                >
                    {isExpanded ? (
                        <FaTimes className="text-white text-xl" />
                    ) : (
                        <FaTools className="text-[#2EFF8A] text-xl" />
                    )}
                </button>
            </div>
        </>
    );
}
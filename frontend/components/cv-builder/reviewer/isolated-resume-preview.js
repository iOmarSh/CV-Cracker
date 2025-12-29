'use client';
import { useRef, useState } from "react";
import useAppContext from "@/hooks/useAppContext";
import CVIframePreview from "@/components/cv-builder/cv-iframe-preview";

/**
 * IsolatedResumePreviewer - Uses iframe for completely isolated CV rendering
 * 
 * CRITICAL: This component ensures CV styles are completely isolated from app shell.
 * Use this instead of ResumePreviewer for ATS-safe, pixel-perfect exports.
 */
export function IsolatedResumePreviewer({ data }) {
    const { resumeData } = useAppContext();
    const cvData = data || resumeData;
    const [isRendered, setIsRendered] = useState(false);

    const handleRenderComplete = () => {
        setIsRendered(true);
    };

    if (!cvData?.data) {
        return (
            <div className="flex items-center justify-center h-full min-h-[600px] text-shell-muted">
                <span>No CV data available</span>
            </div>
        );
    }

    return (
        <div className="cv-preview-wrapper">
            <div className="cv-page-shadow">
                <CVIframePreview
                    cvData={cvData.data}
                    templateId="minimal"
                    scale={0.75}
                    onRenderComplete={handleRenderComplete}
                />
            </div>
        </div>
    );
}

/**
 * IsolatedResumeContainer - Container for the isolated CV preview
 */
export function IsolatedResumeContainer({ children }) {
    return (
        <div
            className="sidebar:flex sticky top-0 hidden h-screen max-h-screen grow overflow-auto scroll-smooth pb-4 pt-8 bg-shell-surface"
            id="resumePreview"
        >
            <div className="flex justify-center w-full px-4">
                {children}
            </div>
        </div>
    );
}

/**
 * Full isolated previewer with container
 */
export function IsolatedCVPreviewer({ data }) {
    return (
        <IsolatedResumeContainer>
            <IsolatedResumePreviewer data={data} />
        </IsolatedResumeContainer>
    );
}

export default IsolatedCVPreviewer;

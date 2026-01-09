'use client';
import useAppContext from "@/hooks/useAppContext";
import BuilderSideBar from "@/components/cv-builder/builder-sidebar";
import ControlPanel from "@/components/cv-builder/control-panel";
import { useEffect, useState } from "react";
import { ResumePreviewer, ResumePreview } from "@/components/cv-builder/reviewer/resume-preview";
import { onDragEnd } from "@/lib/drag-drop-handler"
import useDndContext from "@/context/dnd-context";
import CircularButton from "@/components/general/circle-btn";
import { DownloadIcon } from "@/components/svgs/svgs";
import RightSidebar from "@/components/cv-builder/right-sidebar";
import { FaEye, FaTimes } from "react-icons/fa";


export default function BuilderPage({ id, data }) {
    const { resumeList, setResumeData, getResumeWithId, resumeData, syncResumeData } = useAppContext();
    const [loading, setLoading] = useState(resumeData === null);
    const { DragDropContext, Droppable, Draggable } = useDndContext();
    const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
    const cvData = resumeData || data;



    useEffect(() => {
        const fetchData = async () => {
            if (cvData)
                return;


            setLoading(true);
            await getResumeWithId(id);
            setLoading(false);
        };

        fetchData();
    }, [id]);

    // Prevent body scroll when mobile preview is open
    useEffect(() => {
        if (isMobilePreviewOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobilePreviewOpen]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-lg font-semibold">Loading...</span>
            </div>
        );
    }

    if (!cvData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-lg font-semibold">Resume not found...</span>
            </div>
        );
    }

    return (
        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, resumeData, setResumeData, syncResumeData)}>
            <div
                className={"bg-[#0f1113] px-6 scrollbar-hide relative min-h-screen w-full max-w-full xl:px-8 2xl:px-10"}>
                <div className="
                  sidebar:grid-cols-[min-content_max(550px)_auto] sidebar:justify-center
                  lgxl:grid-cols-[min-content_max(570px)_auto] 3xl:grid-cols-[min-content_max(700px)_auto]
                  grid w-full max-w-full grid-cols-1
                  xl:grid-cols-[min-content_max(600px)_auto] 2xl:grid-cols-[min-content_max(650px)_auto]
                  ">
                    <BuilderSideBar />
                    <ControlPanel id={id} />
                    <ResumePreviewer />

                </div>

                {/* Mobile Preview Button - Only on mobile */}
                <button
                    onClick={() => setIsMobilePreviewOpen(true)}
                    className="sidebar:hidden fixed bottom-20 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#2EFF8A] text-[#0f1113] rounded-full shadow-lg font-bold hover:bg-[#26d975] transition-all"
                >
                    <FaEye className="text-lg" />
                    <span>Preview CV</span>
                </button>

                {/* Mobile Preview Modal */}
                {isMobilePreviewOpen && (
                    <div className="sidebar:hidden fixed inset-0 z-[100] bg-[#0f1113]">
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 bg-[#111316] border-b border-[#2a2d32]">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMobilePreviewOpen(false)}
                                    className="w-9 h-9 flex items-center justify-center text-[#9AA3A8] hover:text-white bg-[#2a2d32] rounded-lg transition-colors"
                                >
                                    <FaTimes className="text-lg" />
                                </button>
                                <h3 className="text-base font-bold text-[#E6E9EB]">CV Preview</h3>
                            </div>
                            <span className="text-xs text-[#6b7280]">Pinch to zoom</span>
                        </div>

                        {/* Preview Content - Full width scrollable */}
                        <div
                            className="h-[calc(100vh-56px)] overflow-auto touch-pan-x touch-pan-y"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            <div className="p-2">
                                <div
                                    id="mobile-resume-preview"
                                    className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
                                    style={{
                                        width: '100%',
                                        maxWidth: '400px',
                                    }}
                                >
                                    <div style={{
                                        transform: 'scale(0.5)',
                                        transformOrigin: 'top left',
                                        width: '200%',
                                    }}>
                                        <ResumePreview data={resumeData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <RightSidebar />
            </div>
        </DragDropContext>
    );
}

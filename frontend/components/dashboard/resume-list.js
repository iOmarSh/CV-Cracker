'use client';

import { AddIcon, LoadMoreIcon } from "@/components/svgs/svgs";
import EmptyCvBox from "@/components/dashboard/empty-cv-box";
import useAppContext from "@/hooks/useAppContext";
import { useEffect, useRef, useState } from "react";
import { cvListAction, cvDeleteAction } from "@/actions/cvs";
import { showErrorAlert, showSuccessAlert } from "@/lib/alerts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResumeContainer, { ListContainer, ResumePreview } from "@/components/cv-builder/reviewer/resume-preview";
import { ControlPanelView } from "@/components/cv-builder/control-components/utils/enums";
import { FaFileAlt, FaTrash, FaCheckSquare, FaRegSquare } from "react-icons/fa";

export const ResumeList = ({ ...props }) => {
    const router = useRouter();
    const { user, resumeList, setResumeList, setResumeData, defaultCv, emptyCv, setControlPanelIndex } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const containerRef = useRef(null);

    // Selection state for bulk delete
    const [selectMode, setSelectMode] = useState(false);
    const [selectedCvs, setSelectedCvs] = useState([]);

    const fetchCvList = async (currentPage) => {
        try {
            setLoading(true);
            const res = await cvListAction({ page: currentPage });

            if (!res.success) {
                showErrorAlert(res.message);
                return;
            }
            if (currentPage === 1) {
                setResumeList(res.cvList.results);
            } else {
                setResumeList((prevCvList) => [...prevCvList, ...res.cvList.results]);
            }

            setNextPage(res.cvList.next);
            setControlPanelIndex(ControlPanelView.MainView)
        } catch (error) {
            console.error('Error fetching CV list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCvList(page);
    }, [page]);

    const loadMoreCv = () => {
        if (nextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // Generate a unique CV title based on existing CVs
    const generateUniqueCvTitle = (baseTitle) => {
        const existingTitles = resumeList.map(cv => cv.title || '');
        let counter = 1;
        let newTitle = `${baseTitle} ${counter}`;

        while (existingTitles.includes(newTitle)) {
            counter++;
            newTitle = `${baseTitle} ${counter}`;
        }

        return newTitle;
    };

    // Create a blank CV
    const onClickNewCv = () => {
        const uniqueTitle = generateUniqueCvTitle('My Resume');
        setResumeData({ ...emptyCv, title: uniqueTitle });
        router.push('/dashboard/cvnew');
    }

    // Create CV from template
    const onClickTemplateCv = () => {
        const uniqueTitle = generateUniqueCvTitle('Template Resume');
        setResumeData({ ...defaultCv, title: uniqueTitle });
        router.push('/dashboard/cvnew');
    }

    const onClickEditCv = (cv) => {
        if (selectMode) {
            // Toggle selection when in select mode
            toggleSelection(cv.id);
            return;
        }
        setResumeData(cv);
        router.push(`/dashboard/${cv.id}`);
    }

    // Toggle CV selection
    const toggleSelection = (cvId) => {
        setSelectedCvs(prev =>
            prev.includes(cvId)
                ? prev.filter(id => id !== cvId)
                : [...prev, cvId]
        );
    };

    // Delete single CV
    const onDeleteCv = async (e, cv) => {
        e.stopPropagation();

        if (!confirm(`Are you sure you want to delete "${cv.title || 'Untitled'}"?`)) {
            return;
        }

        try {
            const res = await cvDeleteAction(cv.id);
            if (res.success) {
                setResumeList(resumeList.filter(item => item.id !== cv.id));
                showSuccessAlert("CV deleted successfully");
            } else {
                showErrorAlert(res.message);
            }
        } catch (error) {
            console.error('Error deleting CV:', error);
            showErrorAlert("Failed to delete CV");
        }
    }

    // Delete selected CVs
    const deleteSelectedCvs = async () => {
        if (selectedCvs.length === 0) return;

        if (!confirm(`Are you sure you want to delete ${selectedCvs.length} CV(s)?`)) {
            return;
        }

        try {
            for (const cvId of selectedCvs) {
                await cvDeleteAction(cvId);
            }
            setResumeList(resumeList.filter(item => !selectedCvs.includes(item.id)));
            setSelectedCvs([]);
            setSelectMode(false);
            showSuccessAlert(`${selectedCvs.length} CV(s) deleted successfully`);
        } catch (error) {
            console.error('Error deleting CVs:', error);
            showErrorAlert("Failed to delete some CVs");
        }
    };

    // Cancel selection mode
    const cancelSelectMode = () => {
        setSelectMode(false);
        setSelectedCvs([]);
    };

    const handleWheel = (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            e.currentTarget.scrollLeft += e.deltaY * 4;
        }
    };
    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);
    return <div {...props}>
        {/* Selection Controls Bar */}
        <div className="dbpx mb-4 flex items-center gap-4">
            {!selectMode ? (
                <button
                    onClick={() => setSelectMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1d21] border border-[#2a2d32] text-[#9AA3A8] hover:text-[#E6E9EB] hover:border-[#2EFF8A] transition-colors text-sm"
                >
                    <FaCheckSquare className="text-[#2EFF8A]" />
                    Select to Delete
                </button>
            ) : (
                <div className="flex items-center gap-3">
                    <button
                        onClick={deleteSelectedCvs}
                        disabled={selectedCvs.length === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                            ${selectedCvs.length > 0
                                ? 'bg-red-500/80 hover:bg-red-600 text-white'
                                : 'bg-[#2a2d32] text-[#6b7280] cursor-not-allowed'
                            } transition-colors`}
                    >
                        <FaTrash />
                        Delete Selected ({selectedCvs.length})
                    </button>
                    <button
                        onClick={cancelSelectMode}
                        className="px-4 py-2 rounded-lg bg-[#1a1d21] border border-[#2a2d32] text-[#9AA3A8] hover:text-[#E6E9EB] transition-colors text-sm"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className={"xl:dbpx relative h-auto w-full max-w-full"}>
            {/* Container with explicit scrollbar styles */}
            <div
                ref={containerRef}
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#2EFF8A #1a1d21'
                }}
                className="dbpx h-auto w-full overflow-x-auto scroll-smooth xl:px-0 grid max-w-full
                 auto-cols-min grid-flow-col gap-4 lg:min-w-0 p-8">

                {/* Blank Resume Button */}
                {!selectMode && (
                    <button onClick={onClickNewCv}
                        className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex">
                        <div
                            className="h-[254px] lg:w-38 flex w-38 items-center justify-center rounded-md border-2 border-dashed border-[#2EFF8A] bg-[#111316] hover:bg-[#1a1d21]">
                            <AddIcon />
                        </div>
                        <span className="mt-[10px] text-xs font-bold uppercase text-[#E6E9EB]">Add resume</span>
                    </button>
                )}

                {/* Template Resume Button */}
                {!selectMode && (
                    <button onClick={onClickTemplateCv}
                        className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex">
                        <div
                            className="h-[254px] lg:w-38 flex w-38 flex-col items-center justify-center rounded-md border-2 border-solid border-[#2EFF8A]/50 bg-[#111316] hover:bg-[#1a1d21] hover:border-[#2EFF8A] transition-colors">
                            <FaFileAlt className="text-[#2EFF8A] text-4xl mb-3" />
                            <span className="text-[#9AA3A8] text-xs font-medium px-3 text-center">AI Engineer<br />Template</span>
                        </div>
                        <span className="mt-[10px] text-xs font-bold uppercase text-[#9AA3A8]">Use Template</span>
                    </button>
                )}



                {resumeList.map((cv, index) => (
                    <div key={index} className="relative group">
                        <ListContainer
                            cv={{ title: cv.title }}
                            className={`hover:scale-105 transition-transform cursor-pointer ${selectMode && selectedCvs.includes(cv.id)
                                    ? 'ring-2 ring-[#2EFF8A] ring-offset-2 ring-offset-[#0f1113]'
                                    : ''
                                }`}
                            onClick={() => onClickEditCv(cv)}
                        >
                            <ResumePreview data={cv} isListItemPreview={true} />
                        </ListContainer>

                        {/* Selection Checkbox - visible in select mode */}
                        {selectMode && (
                            <div className="absolute top-2 left-2 z-10">
                                {selectedCvs.includes(cv.id) ? (
                                    <FaCheckSquare className="text-[#2EFF8A] text-xl" />
                                ) : (
                                    <FaRegSquare className="text-[#9AA3A8] text-xl" />
                                )}
                            </div>
                        )}

                        {/* Delete Button - appears on hover (only when not in select mode) */}
                        {!selectMode && (
                            <button
                                onClick={(e) => onDeleteCv(e, cv)}
                                className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                title="Delete CV"
                            >
                                <FaTrash className="text-white text-sm" />
                            </button>
                        )}
                    </div>
                ))}

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center items-center w-full h-[254px] ml-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#2EFF8A]"></div>
                    </div>
                )}

                {/* Load More Button */}
                {nextPage && !loading && (
                    <div
                        onClick={loadMoreCv}
                        className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex cursor-pointer">
                        <div
                            className="h-[254px] lg:w-38 flex w-38 items-center justify-center rounded-md border-2 border-dashed border-[#9AA3A8] bg-[#111316] hover:border-[#2EFF8A] hover:bg-[#1a1d21]">
                            <LoadMoreIcon />
                        </div>

                        <span className="mt-[10px] text-xs font-bold uppercase text-[#E6E9EB]" onClick={loadMoreCv}>Load More</span>
                    </div>
                )}
            </div>
        </div>
    </div>

}
'use client';

import { AddIcon, LoadMoreIcon } from "@/components/svgs/svgs";
import EmptyCvBox from "@/components/dashboard/empty-cv-box";
import useAppContext from "@/hooks/useAppContext";
import { useEffect, useRef, useState } from "react";
import { cvListAction, cvDeleteAction } from "@/actions/cvs";
import { showErrorAlert, showSuccessAlert } from "@/lib/alerts";
import Link from "next/link";
import { redirect } from "next/navigation";
import ResumeContainer, { ListContainer, ResumePreview } from "@/components/cv-builder/reviewer/resume-preview";
import { ControlPanelView } from "@/components/cv-builder/control-components/utils/enums";
import { FaFileAlt, FaTrash } from "react-icons/fa";

export const ResumeList = ({ ...props }) => {
    const { user, resumeList, setResumeList, setResumeData, defaultCv, emptyCv, setControlPanelIndex } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const containerRef = useRef(null);

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
        redirect('/dashboard/cvnew')
    }

    // Create CV from template
    const onClickTemplateCv = () => {
        const uniqueTitle = generateUniqueCvTitle('Template Resume');
        setResumeData({ ...defaultCv, title: uniqueTitle });
        redirect('/dashboard/cvnew')
    }

    const onClickEditCv = (cv) => {
        setResumeData(cv);
        redirect(`/dashboard/${cv.id}`)
    }

    // Delete CV
    const onDeleteCv = async (e, cv) => {
        e.stopPropagation(); // Prevent triggering edit

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

        <div className={"xl:dbpx relative h-auto w-full max-w-full"}>
            {/* Container */}
            <div
                ref={containerRef}

                className="dbpx h-auto w-full overflow-x-auto scroll-smooth xl:px-0 grid max-w-full
                 auto-cols-min grid-flow-col gap-4 lg:min-w-0 p-8 scrollbar-thin
                 scrollbar-thumb-[#2EFF8A] scrollbar-track-[#1a1d21]">

                {/* Blank Resume Button */}
                <button onClick={onClickNewCv}
                    className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex">
                    <div
                        className="h-[254px] lg:w-38 flex w-38 items-center justify-center rounded-md border-2 border-dashed border-[#2EFF8A] bg-[#111316] hover:bg-[#1a1d21]">
                        <AddIcon />
                    </div>
                    <span className="mt-[10px] text-xs font-bold uppercase text-[#E6E9EB]">Add resume</span>
                </button>

                {/* Template Resume Button */}
                <button onClick={onClickTemplateCv}
                    className="flex appearance-none flex-col items-center hover:opacity-70 lg:flex">
                    <div
                        className="h-[254px] lg:w-38 flex w-38 flex-col items-center justify-center rounded-md border-2 border-solid border-[#2EFF8A]/50 bg-[#111316] hover:bg-[#1a1d21] hover:border-[#2EFF8A] transition-colors">
                        <FaFileAlt className="text-[#2EFF8A] text-4xl mb-3" />
                        <span className="text-[#9AA3A8] text-xs font-medium px-3 text-center">AI Engineer<br />Template</span>
                    </div>
                    <span className="mt-[10px] text-xs font-bold uppercase text-[#9AA3A8]">Use Template</span>
                </button>



                {resumeList.map((cv, index) => (
                    <div key={index} className="relative group">
                        <ListContainer
                            cv={{ title: cv.title }}
                            className="hover:scale-105 transition-transform"
                            onClick={() => onClickEditCv(cv)}
                        >
                            <ResumePreview data={cv} isListItemPreview={true} />
                        </ListContainer>

                        {/* Delete Button - appears on hover */}
                        <button
                            onClick={(e) => onDeleteCv(e, cv)}
                            className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            title="Delete CV"
                        >
                            <FaTrash className="text-white text-sm" />
                        </button>
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
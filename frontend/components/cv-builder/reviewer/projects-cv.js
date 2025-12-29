import React, { useEffect, useState } from "react";
import useAppContext from "@/hooks/useAppContext";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import DraggableUtil from "@/components/cv-builder/utils/draggable-util";
import { toTitleCase } from "@/lib/helpers";

export default function ProjectsCv({ data, isListItemPreview, className, droppableId, type }) {
    // Note: The parent component or higher-level context provides the DragDropContext
    // We just provide the Droppable area and Draggable items.

    // Derived state or data
    const { resumeData, OnEditSectionTitle, updateResumeData } = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const isDraggable = !isListItemPreview;

    // Handler for project-level updates (description)
    // Note: We need to pass updateResumeData down to the item wrapper

    // Check if there are any visible projects
    const visibleProjects = (item.data.projects || []).filter(p => p.isShownInPreview);

    // Don't render anything if no visible projects
    if (visibleProjects.length === 0) {
        return null;
    }

    if (!isDraggable) {
        return (
            <div className={`w-full flex-col break-words ${className}`}>
                <h2
                    onBlur={(e) => OnEditSectionTitle(e, "projects")}
                    className="section-title mb-1 border-b-2 border-gray-300 editable"
                    contentEditable
                    suppressContentEditableWarning
                >
                    {toTitleCase(item.data.titles.projects)}
                </h2>
                {(item.data.projects || []).map((project, index) => {
                    if (!project.isShownInPreview) return null;
                    return <ProjectItemWrapper
                        key={`${type}-${index}`}
                        project={project}
                        index={index}
                        isDraggable={false}
                        type={type}
                        updateResumeData={null}
                    />
                })}
            </div>
        );
    }

    return (
        <DroppableUtil droppableId={droppableId} type={type} className={`w-full flex-col break-words ${className}`}>
            <h2
                onBlur={(e) => OnEditSectionTitle(e, "projects")}
                className="section-title mb-1 border-b-2 border-gray-300 editable"
                contentEditable
                suppressContentEditableWarning
            >
                {toTitleCase(item.data.titles.projects)}
            </h2>
            {(item.data.projects || []).map((project, index) => {
                if (!project.isShownInPreview) return null;
                return <ProjectItemWrapper
                    key={`${type}-${index}`}
                    project={project}
                    index={index}
                    isDraggable={true}
                    type={type}
                    updateResumeData={updateResumeData}
                />
            })}
        </DroppableUtil>
    );
}

function ProjectItemWrapper({ project, index, isDraggable, type, updateResumeData }) {
    if (isDraggable) {
        return (
            <DraggableUtil draggableId={`${type}-${index}`} index={index} keyData={`${type}-${index}`}>
                <ProjectItemContent project={project} index={index} updateResumeData={updateResumeData} />
            </DraggableUtil>
        );
    }
    return <ProjectItemContent project={project} index={index} updateResumeData={updateResumeData} />;
}

function ProjectItemContent({ project, index, updateResumeData }) {

    const handleDescriptionChange = (val) => {
        if (!updateResumeData) return;
        updateResumeData((prev) => {
            const newProjects = [...prev.data.projects];
            newProjects[index].description = val;
            return { ...prev, data: { ...prev.data, projects: newProjects } };
        });
    }

    const handleAchievementChange = (achIndex, val) => {
        if (!updateResumeData) return;
        updateResumeData((prev) => {
            const newProjects = [...prev.data.projects];
            // Ensure achievements array exists and index is valid
            if (newProjects[index].achievements && newProjects[index].achievements[achIndex]) {
                newProjects[index].achievements[achIndex].text = val;
                return { ...prev, data: { ...prev.data, projects: newProjects } };
            }
            return prev;
        });
    }

    return (
        <div>
            <div className="flex flex-row justify-between space-y-1">
                {/* Title and Link */}
                <div className="flex items-center gap-1">
                    <p className="content i-bold ">{project.title}</p>
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center content justify-center i-bold underline text-blue-500 hover:text-blue-700"
                            style={{
                                wordWrap: 'break-word',
                                display: 'inline-flex',
                                fontSize: '.9rem',
                                padding: '2px 0',
                                lineHeight: '1.2',
                            }}
                        >
                            [Link]
                        </a>
                    )}
                </div>

                {/* Date Range */}
                <p className="content i-bold ">{(project.startYear ? project.startYear : "") + (project.endYear ? ` - ${project.endYear}` : "")}</p>
            </div>


            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
                <p className="content i-bold pl-1 mt-1">
                    <span>Technologies: </span>
                    <span className="content hyphens-auto">{project.technologies.map(t => typeof t === 'string' ? t : t.text).join(", ")}</span>
                </p>
            )}

            {/* Description / Achievements */}
            {project.achievements && project.achievements.length > 0 ? (
                <ul className="list-disc ul-padding content">
                    {project.achievements
                        .map((achievement, achIndex) => {
                            if (!achievement.isShownInPreview) return null;
                            return (
                                <li
                                    key={achIndex}
                                    dangerouslySetInnerHTML={{ __html: achievement.text }}
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleAchievementChange(achIndex, e.target.innerText)}
                                ></li>
                            )
                        })}
                </ul>
            ) : (
                project.description && (
                    <p
                        className="content i-bold pl-1 mt-1"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleDescriptionChange(e.target.innerText)}
                    >
                        {project.description}
                    </p>
                )
            )}
        </div>
    );
}

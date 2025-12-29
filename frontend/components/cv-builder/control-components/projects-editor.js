import React from "react";
import useAppContext from "@/hooks/useAppContext";
import { FaProjectDiagram } from "react-icons/fa";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import NormalDraggable from "@/components/cv-builder/utils/normal-draggable";
import ListComponent from "@/components/cv-builder/control-components/utils/list-component";
import EyeComponent from "@/components/cv-builder/control-components/utils/eye-component";
import DeleteComponent from "@/components/cv-builder/control-components/utils/delete-component";
import { ControlPanelView, ControlPanelMode } from "@/components/cv-builder/control-components/utils/enums";
import { formatDateRange } from "@/lib/helpers";

const ProjectListItem = ({ itemProject, index, OnEditItem, OnRemoveItem, OnDisableItem, draggableId, keyData, type }) => {
    return (
        <NormalDraggable draggableId={draggableId} index={index} keyData={keyData} isScaled={false}>
            <div
                className={"border-[#2a2d32] group grid w-full max-w-full cursor-pointer items-center border-b-[3px] border-solid px-4 py-3 md:px-6 md:py-4 grid-cols-[min-content_1fr_min-content]"}
            >
                <ListComponent />

                <div
                    onClick={(e) => OnEditItem(e, index)}
                    className={"flex w-full min-w-0 items-center pr-2 hover:opacity-70"}
                >
                    <div>
                        <div className="flex flex-col">
                            <div className="whitespace-pre-wrap">
                                <span className="text-[#E6E9EB] text-base font-bold">
                                    {itemProject.title || "Untitled Project"}
                                </span>
                                {itemProject.link && (
                                    <span className="text-[#2EFF8A] text-sm ml-2">🔗</span>
                                )}
                            </div>
                        </div>

                        <p className="text-[#6b7280] whitespace-pre-wrap text-[13px]">
                            {formatDateRange(itemProject.startYear, itemProject.endYear)}
                            {itemProject.technologies?.length > 0 && (
                                <span> • {itemProject.technologies.slice(0, 3).map(t => typeof t === 'string' ? t : t.text).join(", ")}</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Eye Icon */}
                <div className={"flex content-end items-center"}>
                    <EyeComponent onClick={() => OnDisableItem(index)} isVisible={itemProject.isShownInPreview} />
                    <DeleteComponent onClick={() => OnRemoveItem(index)} />
                </div>
            </div>
        </NormalDraggable>
    );
};


const ProjectsEditor = ({ }) => {
    const { setResumeData, resumeData, setControlPanelIndex, setCurrentEditIndex, syncResumeData } = useAppContext();
    const title = "Projects";
    const draggableId = "projects";
    const type = "PROJECTS";
    const item = resumeData;


    const OnClickAddButton = () => {
        const newProjectItem = {
            title: "",
            link: "",
            startYear: "",
            endYear: "",
            description: "",
            technologies: [],
            achievements: [],
            isShownInPreview: true,
        };

        const newProjects = [...(item.data.projects || []), newProjectItem];

        finalState({
            ...item,
            data: {
                ...item.data,
                projects: newProjects,
            },
        });

        setCurrentEditIndex({ index: newProjects.length - 1, mode: ControlPanelMode.Add });
        setControlPanelIndex(ControlPanelView.ProjectsItemEditor);
    };

    const OnRemoveItem = (index) => {
        const newProjects = [...item.data.projects];
        newProjects.splice(index, 1);

        finalState({
            ...item,
            data: {
                ...item.data,
                projects: newProjects,
            },
        });
    };

    const OnDisableItem = (index) => {
        const newProjects = [...item.data.projects];
        newProjects[index].isShownInPreview = !newProjects[index].isShownInPreview;

        finalState({
            ...item,
            data: {
                ...item.data,
                projects: newProjects,
            },
        });
    };

    const OnEditItem = (e, index) => {
        setCurrentEditIndex({ index: index, mode: ControlPanelMode.Edit });
        setControlPanelIndex(ControlPanelView.ProjectsItemEditor);
    };

    const finalState = (state) => {
        setResumeData(state);
        syncResumeData(state);
    }

    return <MinimizedCard
        titleSection={"projects"}
        OnClickAddButton={OnClickAddButton}
        btnAddTitle={title}
        item={item}
        Icon={FaProjectDiagram} haveAddButton={true}
        viewIndex={ControlPanelView.ProjectsEditor}
    >
        {/*Main Content*/}
        <DroppableUtil type={type} droppableId={draggableId}>
            {(item.data.projects || []).map((projectItem, index) => {
                return <ProjectListItem
                    key={`${type}-${index}`}
                    keyData={`${type}-${index}`}
                    draggableId={`${type}-${index}`}
                    type={type}
                    OnDisableItem={OnDisableItem}
                    OnRemoveItem={OnRemoveItem}
                    OnEditItem={OnEditItem}
                    index={index}
                    itemProject={projectItem}
                />
            })}
        </DroppableUtil>
    </MinimizedCard>

}

export default ProjectsEditor;

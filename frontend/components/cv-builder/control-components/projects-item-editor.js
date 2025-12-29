
import React, { useState } from "react";
import useAppContext from "@/hooks/useAppContext";
import TextInput from "@/components/general/text-input";
import Card from "@/components/general/card";
import { ControlPanelView } from "@/components/cv-builder/control-components/utils/enums";
import { MdDone } from "react-icons/md";

export default function ProjectsItemEditor() {
    const {
        resumeData,
        setResumeData,
        setControlPanelIndex,
        currentEditIndex,
        syncResumeData
    } = useAppContext();

    const [item, setItem] = useState(
        currentEditIndex.index >= 0
            ? resumeData.data.projects[currentEditIndex.index]
            : {
                title: "",
                link: "",
                startYear: "",
                endYear: "",
                description: "",
                technologies: [],
                achievements: [],
                isShownInPreview: true,
            }
    );

    const onchange = (e) => {
        setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAchievementChange = (value, index) => {
        const newAchievements = [...item.achievements];
        if (!newAchievements[index]) {
            newAchievements[index] = { text: "", isShownInPreview: true }
        }
        newAchievements[index].text = value;
        setItem((prev) => ({ ...prev, achievements: newAchievements }));
    };

    const addAchievement = () => {
        setItem((prev) => ({
            ...prev,
            achievements: [...(prev.achievements || []), { text: "", isShownInPreview: true }]
        }));
    }

    const removeAchievement = (index) => {
        const newAchievements = [...item.achievements];
        newAchievements.splice(index, 1);
        setItem((prev) => ({ ...prev, achievements: newAchievements }));
    };

    const onSave = () => {
        const newProjects = [...resumeData.data.projects];
        if (currentEditIndex.index >= 0) {
            newProjects[currentEditIndex.index] = item;
        } else {
            newProjects.push(item);
        }

        const newState = {
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: newProjects,
            },
        };

        setResumeData(newState);
        syncResumeData(newState);
        setControlPanelIndex(ControlPanelView.MainView);
    };

    const onCancel = () => {
        setControlPanelIndex(ControlPanelView.MainView);
    };

    return (
        <div className="sidebar:max-w-none sidebar:px-0 w-full max-w-[800px] px-3 pb-16">
            <div className="w-full pb-8">
                <Card className="px-5 md:px-7 lg:px-9 py-5 pb-5 md:py-7 md:pb-9 lg:py-9 lg:pb-10 relative">
                    <h3 className="text-xl font-extrabold md:text-2xl text-[#E6E9EB] mb-6">
                        {currentEditIndex.index >= 0 ? "Edit Project" : "Add Project"}
                    </h3>

                    <TextInput
                        onChange={onchange}
                        value={item.title}
                        className="mb-4"
                        name="title"
                        type="text"
                        title="Project Title"
                        hint="e.g. E-commerce Platform"
                        isRequired={true}
                    />

                    <TextInput
                        onChange={onchange}
                        value={item.link}
                        className="mb-4"
                        name="link"
                        type="text"
                        title="Link (Optional)"
                        hint="e.g. github.com/username/project"
                        isRequired={false}
                    />

                    <div className="flex w-full space-x-4">
                        <TextInput
                            onChange={onchange}
                            value={item.startYear}
                            className="mb-4 w-1/2"
                            name="startYear"
                            type="text"
                            title="Start Date"
                            hint="e.g. Jan 2023"
                            isRequired={false}
                        />
                        <TextInput
                            onChange={onchange}
                            value={item.endYear}
                            className="mb-4 w-1/2"
                            name="endYear"
                            type="text"
                            title="End Date"
                            hint="e.g. Present"
                            isRequired={false}
                        />
                    </div>

                    <TextInput
                        title="Technologies"
                        hint="Add technologies separated by comma"
                        name="technologies"
                        value={Array.isArray(item.technologies)
                            ? item.technologies.map(t => typeof t === 'string' ? t : t.text).join(", ")
                            : item.technologies || ""}
                        onChange={(e) => {
                            const val = e.target.value;
                            const techArray = val.split(",").map(t => t.trim());
                            const techObjects = techArray.map(t => ({ text: t, isShownInPreview: true }));
                            setItem((prev) => ({ ...prev, technologies: techObjects }));
                        }}
                        className="mb-4"
                        isRequired={false}
                    />

                    {/* Description / Achievements */}
                    <div className="mt-6">
                        <h4 className="text-lg font-bold text-[#E6E9EB] mb-4">Description / Key Features</h4>
                        {item.achievements && item.achievements.map((achievement, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <span className="text-[#9AA3A8] text-sm">Bullet Point {index + 1}</span>
                                    <button
                                        onClick={() => removeAchievement(index)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <TextInput
                                    value={achievement.text}
                                    onChange={(e) => handleAchievementChange(e.target.value, index)}
                                    hint="Type feature or achievement..."
                                    name={`achievement-${index}`}
                                    title=""
                                    isRequired={false}
                                />
                            </div>
                        ))}
                        <button
                            onClick={addAchievement}
                            className="w-full rounded-lg border-2 border-dashed border-[#2a2d32] py-3 text-[#9AA3A8] hover:border-[#2EFF8A] hover:text-[#2EFF8A] transition-colors"
                        >
                            + Add Description Bullet Point
                        </button>
                    </div>
                </Card>

                {/* Action Buttons */}
                <Card className="fixed bottom-0 left-0 right-0 z-[20] flex justify-between gap-2 bg-[#111316] p-4 px-5 sm:sticky sm:left-auto sm:right-auto sm:mb-6 sm:mt-6 sm:gap-4 md:px-7 lg:px-9 border-t border-[#2a2d32]">
                    <div className="flex items-center justify-start"></div>
                    <div className="flex space-x-1 sm:space-x-7">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 hover:opacity-80 py-2 rounded-full text-[#9AA3A8] font-extrabold h-12 min-w-min px-4 text-[16px]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="border-none cursor-pointer appearance-none touch-manipulation flex items-center focus-visible:outline-blue-600 hover:opacity-80 px-7 py-2 rounded-full font-extrabold min-w-[120px] text-[#0f1113] bg-[#2EFF8A] h-12 justify-between pl-4 text-[16px]"
                        >
                            <span className="border-r border-solid border-[#0f1113]/30 pr-3">
                                <MdDone sx={{ fontSize: 20 }} className="text-[#0f1113]" />
                            </span>
                            <span className="pr flex justify-center pl-5">Save</span>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

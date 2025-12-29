import useAppContext from "@/hooks/useAppContext";
import { useEffect, useState } from "react";
import { ControlPanelMode, ControlPanelView } from "@/components/cv-builder/control-components/utils/enums";
import Card from "@/components/general/card";
import { FaCheckCircle } from "react-icons/fa";
import NotesEditor from "@/components/cv-builder/control-components/notes-editor";

const CertificationItemEditor = ({ }) => {
    const { resumeData, setResumeData, setControlPanelIndex, currentEditIndex, syncResumeData } = useAppContext();
    const [originalCertification, setOriginalCertification] = useState({});
    const index = currentEditIndex.index;
    const certification = resumeData.data.courses[index];
    const mode = currentEditIndex.mode;

    useEffect(() => {
        setOriginalCertification(JSON.parse(JSON.stringify(certification)));
    }, [certification]);

    const handleCancel = () => {
        let oldState = resumeData;
        if (mode === ControlPanelMode.Add) {
            const certifications = [...resumeData.data.courses];
            certifications.pop();
            oldState = {
                ...resumeData,
                data: {
                    ...resumeData.data,
                    courses: certifications,
                },
            }
        } else {
            const certifications = [...resumeData.data.courses];
            certifications[index] = originalCertification;
            oldState = {
                ...resumeData,
                data: {
                    ...resumeData.data,
                    courses: certifications,
                },
            }
        }
        syncResumeData(oldState);
        setResumeData(oldState);
        setControlPanelIndex(ControlPanelView.MainView);
    };

    const handleSave = () => {
        setControlPanelIndex(ControlPanelView.MainView);
        syncResumeData(resumeData);
    };

    return (
        <div className={"sidebar:max-w-none sidebar:px-0 w-full max-w-[800px] px-3 pb-16"}>
            <div className={"w-full pb-8"}>

                {/* Notes Editor acting as main Contribution list */}
                <NotesEditor
                    type={"courses-notes"}
                    index={index}
                    draggableId={"certification-notes"}
                    section={"courses"}
                    titleSection="Activity or Contribution"
                    addTitle="Add Activity"
                    IsCardExpanded={true}
                />

                {/*Save Cancel*/}
                <Card
                    className={"fixed bottom-0 left-0 right-0 z-[20] flex justify-between gap-2 bg-[#111316] p-4 px-5 sm:sticky sm:left-auto sm:right-auto sm:mb-6 sm:mt-6 sm:gap-4 md:px-7 lg:px-9 border-t border-[#2a2d32]"}>
                    <div className="flex items-center justify-start"></div>
                    <div className="flex space-x-1 sm:space-x-7">
                        <button type="button" onClick={handleCancel}
                            className="border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 hover:opacity-80 py-2 rounded-full text-[#9AA3A8] font-extrabold h-12 min-w-min px-4 text-[16px]">Cancel
                        </button>
                        <button onClick={handleSave}
                            className="border-none cursor-pointer appearance-none touch-manipulation flex items-center focus-visible:outline-blue-600 hover:opacity-80 px-7 py-2 rounded-full font-extrabold min-w-[120px] text-[#0f1113] bg-[#2EFF8A] h-12 justify-between pl-4 text-[16px]">
                            <span className="border-r border-solid border-[#0f1113]/30 pr-3">
                                <FaCheckCircle sx={{ fontSize: 20 }} className="text-[#0f1113]" />
                            </span><span
                                className="pr flex justify-center pl-5">Save</span></button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CertificationItemEditor;
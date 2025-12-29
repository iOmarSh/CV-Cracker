import React, { useRef } from "react";
import NormalDraggable from "@/components/cv-builder/utils/normal-draggable";
import EyeComponent from "@/components/cv-builder/control-components/utils/eye-component";
import DeleteComponent from "@/components/cv-builder/control-components/utils/delete-component";
import ListComponent from "@/components/cv-builder/control-components/utils/list-component";

const SkillItem = ({
    draggableId,
    index, skillItem, type, keyData,
    OnDisableItem = (index) => { },
    OnRemoveItem = (index) => { },
    OnEditItem = (e, index) => { }
}) => {

    return <NormalDraggable draggableId={draggableId} index={index} keyData={keyData} isScaled={false}>
        <div key={index}
            className={"border-[#2a2d32] group grid w-full max-w-full cursor-pointer items-center border-b-[3px] border-solid px-4 py-3 md:px-6 md:py-4 grid-cols-[min-content_1fr_min-content]"}>
            <ListComponent />

            <div
                onClick={(e) => OnEditItem(e, index)}
                className={"flex w-full min-w-0 items-center pr-2 hover:opacity-70"}>
                <div>
                    <div className="flex flex-col">
                        <div className="whitespace-pre-wrap">
                            <span className="text-[#E6E9EB] text-base font-bold">{skillItem.title}</span>
                        </div>
                    </div>

                    <p className="text-[#6b7280] whitespace-pre-wrap text-[13px]">
                        {skillItem.skills.map(skill => skill.text).join(', ')}

                    </p>
                </div>
            </div>

            {/* Eye Icon */}
            <div className={"flex content-end items-center"}>
                <EyeComponent onClick={() => OnDisableItem(index)} isVisible={skillItem.isShownInPreview} />
                <DeleteComponent onClick={() => OnRemoveItem(index)} />
            </div>
        </div>


    </NormalDraggable>
};

export default SkillItem;
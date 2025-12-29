import React, { useContext } from 'react';
import DraggableUtil from "@/components/cv-builder/utils/draggable-util";
import DateComponent from "@/components/general/date-component";
import useAppContext from "@/hooks/useAppContext";


const EducationItemBody = ({ item, index }) => {
    const { updateResumeData } = useAppContext();

    // We need to define update handlers for each field
    const handleUpdate = (field, value) => {
        updateResumeData((prev) => {
            const newEducations = [...prev.data.educations];
            if (newEducations[index]) {
                newEducations[index][field] = value;
            }
            return { ...prev, data: { ...prev.data, educations: newEducations } };
        });
    }

    return <>
        <div className="flex flex-row justify-between space-y-1">
            <p className="content">
                <span
                    className="i-bold"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleUpdate('degree', e.target.innerText)}
                > {item.degree}</span>
                <span className="pl-1">(
                    <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleUpdate('school', e.target.innerText)}
                    >{item.school}</span>
                    )</span>

            </p>
            <DateComponent
                startYear={item.startYear}
                endYear={item.endYear}
                id={`education-start-end-date`}
            />
        </div>

        {item.notes && item.notes.length > 0 &&

            <p className="content i-bold pl-2 mt-0 mb-2">
                <span
                    className="content hyphens-auto"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleUpdate('notes', e.target.innerText)}
                >{item.notes}</span>
            </p>}
    </>;
}

const EducationItem = ({ draggableId, index, item, type, keyData, isDraggable }) => {

    if (!isDraggable) {
        return <EducationItemBody item={item} index={index} />;
    }


    return <DraggableUtil draggableId={draggableId} index={index} keyData={keyData}>
        <EducationItemBody item={item} index={index} />
    </DraggableUtil>
};

export default EducationItem;
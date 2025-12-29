import React, { useContext } from 'react';
import useDndContext from "@/context/dnd-context";
import { toTitleCase } from "@/lib/helpers";
import useAppContext from "@/hooks/useAppContext";

function LanguagesHeader(props) {
    return <h2
        className="section-title mb-1 border-b-2 border-gray-300 editable"
        contentEditable
        suppressContentEditableWarning
    >
        {toTitleCase(props.item.data.titles.languages)}
    </h2>;
}


const LanguagesSection = ({ droppableId, type, data, isListItemPreview, ...props }) => {
    const { Droppable, Draggable } = useDndContext();
    const { resumeData, updateResumeData } = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const filteredLanguages = item.data.languages.filter(item => item.isShownInPreview);
    const isDraggable = !isListItemPreview;

    const handleUpdate = (index, field, value) => {
        updateResumeData((prev) => {
            const newLanguages = [...prev.data.languages];
            // We need to find the correct item since the loop is over filtered items
            // However, since we're assuming the filtered array matches the visual order...
            // Wait, resumeData has all languages. We need the original index.
            // For now, let's assume we can map the filtered index back or just update by finding standard match?
            // No, let's just make the language span editable. But we need the correct index in the MAIN array.
            // To be safe, we might need to map over the main array and return nulls, but here the loop is explicit.
            // Let's rely on finding the item that matches the current one being rendered?
            // Or better, since `filteredLanguages` items are references to `item.data.languages` objects?
            // Actually, spreading/filtering often creates shallow copies but if we filter an array of objects the objects are references.
            // So modifying `filteredLanguages[index]` should ideally point to the same object? 
            // No, React state needs to be updated with new object references.
            // The safest way here without refactoring the whole loop: find the index in the original array.
            const originalIndex = prev.data.languages.findIndex(l => l === filteredLanguages[index]);
            if (originalIndex !== -1) {
                newLanguages[originalIndex][field] = value;
            }
            return { ...prev, data: { ...prev.data, languages: newLanguages } };
        });
    }

    if (!item.data.languages || !filteredLanguages.length) return null;

    if (!isDraggable) {
        return <div {...props}>
            <LanguagesHeader item={item} />
            {filteredLanguages.map((langItem, index) => {
                return <LanguageItemSpan key={`${langItem.title}-${index}`} item={langItem} index={index} isLast={index < filteredLanguages.length - 1} handleUpdate={handleUpdate} />;
            })}
        </div>
    }


    return <Droppable
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
        type={type}

        droppableId={droppableId} direction="horizontal">
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} {...props}>
                <LanguagesHeader item={item} />
                {filteredLanguages.map((langItem, index) => {
                    return <Draggable
                        key={`${langItem.title}-${index}`}
                        draggableId={`${droppableId}-${index}`}
                        index={index}
                    >
                        {(provided, snapshot) => (
                            <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${snapshot.isDragging
                                    ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                    : ""
                                    } inline-flex items-center`}
                            >
                                <LanguageItemSpan item={langItem} index={index} isLast={index < filteredLanguages.length - 1} handleUpdate={handleUpdate} />
                            </span>
                        )}
                    </Draggable>

                })}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
}

const LanguageItemSpan = ({ item, index, isLast, handleUpdate }) => (
    <span className={`inline-flex items-center`}>
        <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleUpdate(index, 'title', e.target.innerText)}
        >{item.title}</span>
        <span>&nbsp;(</span>
        <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleUpdate(index, 'level', e.target.innerText)}
        >{item.level}</span>
        <span>)</span>
        {isLast && <span>,&nbsp;</span>}
    </span>
);

export default LanguagesSection;
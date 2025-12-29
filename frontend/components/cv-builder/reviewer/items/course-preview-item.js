import DroppableDraggableList from "@/components/cv-builder/utils/droppable-draggable-list";
import useAppContext from "@/hooks/useAppContext";
import DraggableUtil from "@/components/cv-builder/utils/draggable-util";
import DateComponent from "@/components/general/date-component";


const NotesItem = ({ item, onBlur }) => (
    <div
        onBlur={onBlur}
        dangerouslySetInnerHTML={{ __html: item.text }}
        contentEditable
    />
);
const DraggableNotesList = DroppableDraggableList(NotesItem);


function CourseItemNotesList(item) {
    return <ul className="list-disc ul-padding content">
        {item.notes.map((note, index) => (
            <li key={index}>
                <NotesItem item={note} />
            </li>
        ))}

    </ul>
}

function CourseItemBody(item, isDroppable, type, index, handleNoteChanged, updateResumeData) {
    return <>
        <div className="flex flex-col space-y-1">
            {isDroppable ?
                <DraggableNotesList
                    isDroppable={isDroppable}
                    items={item.notes.filter((note) => note.isShownInPreview)}
                    type={`${type}_KEY_COURSES_NOTES`}
                    droppableId={`${type}_KEY_COURSES_NOTES-${index}`}
                    OnBlurEvent={(e, noteIndex) =>
                        handleNoteChanged(index, noteIndex, e.target.innerText)
                    }
                /> :
                CourseItemNotesList(item)
            }
        </div>
    </>;
}


const CourseItem = ({ draggableId, isDroppable, index, item, type, keyData }) => {
    const { updateResumeData } = useAppContext();

    const handleNoteChanged = (index, noteIndex, value) => {
        updateResumeData((prevData) => ({
            ...prevData,
            data: {
                ...prevData.data,
                courses: prevData.data.courses.map((item, i) =>
                    i === index ? {
                        ...item,
                        notes: item.notes.map((ach, j) =>
                            j === noteIndex ? { ...ach, text: value } : ach
                        )
                    } : item
                )
            }
        }));
    };

    if (!isDroppable)
        return CourseItemBody(item, isDroppable, type, index, handleNoteChanged, updateResumeData);

    return <DraggableUtil type={type} draggableId={draggableId} index={index} keyData={keyData}>
        {CourseItemBody(item, isDroppable, type, index, handleNoteChanged, updateResumeData)}
    </DraggableUtil>
};

export default CourseItem;
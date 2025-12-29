import { MdExpandMore, MdExpandLess } from 'react-icons/md';

import { capitalizeFirstLetter } from "@/lib/helpers";
import { useEffect, useRef, useState } from "react";
import useAppContext from "@/hooks/useAppContext";


const MinimizedCard = ({
    Icon, haveAddButton = false, children,
    btnAddTitle = "Add New",
    OnClickAddButton = () => { },
    titleSection,
    item,
    viewIndex = 0,
    canHaveOnBackMinimize = true,
    canEditTitle = true,
    IsCardExpanded = false
}) => {
    const [isExpanded, setIsExpanded] = useState(IsCardExpanded);
    const inputRef = useRef();
    const { setResumeData, globalRefs } = useAppContext();
    const [titleState, setTitlesState] = useState(canHaveOnBackMinimize ?
        item.data.titles[titleSection]
        : titleSection
    );
    const { lastControlPanel } = useAppContext();


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const OnChangeTitle = (e) => {
        const { value } = e.target;
        const newResumeData = { ...item, data: { ...item.data, titles: { ...item.data.titles, [titleSection]: value.toUpperCase() } } };
        setResumeData(newResumeData);
        if (canHaveOnBackMinimize)
            setTitlesState(value);
    }

    useEffect(() => {
        if (viewIndex !== 0 && lastControlPanel === viewIndex) {
            setIsExpanded(true);
        }


    }, [lastControlPanel]);




    return <div ref={(el) => globalRefs.current[titleSection] = el}


        className={"shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-large mt-4 max-w-full break-words bg-[#111316] md:mt-6 mb-6"}>
        <div
            onClick={!isExpanded ? toggleExpand : null}
            className={!isExpanded ?
                "rounded-large flex w-full cursor-pointer justify-between bg-[#111316] p-4 md:p-6 " :
                "rounded-large flex w-full cursor-pointer justify-between bg-[#111316] p-4 md:p-6 border-[#2a2d32] rounded-b-none border-b-[3px] border-solid"
            }>

            <div className={"flex flex-grow items-center space-x-4 pr-2"}>
                {/* Icon */}
                <div onClick={toggleExpand}
                    className={`flex items-center justify-center rounded-lg p-2 text-[#2EFF8A]`}>
                    <div className={"w-full"}>
                        <div className={"w-8 text-2xl"}>
                            <span>
                                <Icon sx={{ fontSize: 24 }} />
                            </span>
                        </div>
                    </div>
                </div>
                {/* Title   */}
                <div className={"w-10/12"}>
                    {
                        !isExpanded ? <p className="truncate text-xl font-bold text-[#E6E9EB]">{titleState.capitalize()}</p> :
                            <div className={"flex space-x-3"}>
                                <div
                                    className={"border-[#2a2d32] bg-[#1a1d21] group flex h-12 max-w-[320px] grow items-center rounded-lg border border-solid pr-2"}>
                                    <input type="text" placeholder={titleState.capitalize()}
                                        ref={inputRef}
                                        onChange={canEditTitle ? OnChangeTitle : null}
                                        className="h-12 w-full appearance-none rounded-lg text-base leading-normal shadow-none outline-none md:text-[17px] font-sans m-0 placeholder-[#6b7280] bg-[#1a1d21] border border-solid border-[#2a2d32] text-[#E6E9EB] p-2.5 js-resumeContentSectionNameForm"
                                        autoComplete="off" value={titleState.capitalize()
                                        } />
                                </div>
                            </div>
                    }
                </div>

            </div>
            {/*Minimized Button*/}
            <div onClick={toggleExpand} className={"flex content-end items-center text-[#9AA3A8] hover:text-[#E6E9EB]"}>
                <div
                    className={"flex h-[22px] w-[22px] origin-center items-center justify-end pb-[1px] text-[22px]"}>
                    {isExpanded ?
                        <MdExpandLess sx={{ fontSize: 22 }} /> :
                        <MdExpandMore sx={{ fontSize: 22 }} />
                    }
                </div>
            </div>
        </div>
        {/* Content */}
        <div className={"overflow-hidden"} style={{ height: isExpanded ? "auto" : "0px" }}>
            <div className={"w-full"}>
                {children}
                {/* Add Button  */}
                {haveAddButton &&
                    <div className={"flex w-full items-center justify-center p-4"}>
                        <button onClick={OnClickAddButton}
                            className={"cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-[#2EFF8A] hover:bg-[#2EFF8A] hover:text-[#0f1113] px-7 py-2 rounded-full font-extrabold h-10 text-[15px] text-[#2EFF8A] border border-solid border-[#2EFF8A] min-w-36 transition-colors"}>
                            <span className={"flex items-center justify-center mr-2 -ml-1 md:mr-3 md:-ml-[6px]"}>
                                +
                            </span>
                            {btnAddTitle}
                        </button>
                    </div>
                }


            </div>
        </div>
    </div>

}

export default MinimizedCard;
import { MdAdd } from "react-icons/md";

const OptionsItem = ({ title, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={"bg-[#1a1d21] text-[#9AA3A8] flex w-auto cursor-pointer items-center justify-center rounded-lg p-2 pr-[10px] text-sm hover:opacity-80 hover:text-[#2EFF8A] mb-2 mr-2 border border-solid border-[#2a2d32]"}>
            <MdAdd className={""} style={{ fontSize: "16px", color: "#2EFF8A" }} />
            <span className={"ml-1 whitespace-nowrap"}>{title}</span>
        </div>
    );
};

export default OptionsItem;
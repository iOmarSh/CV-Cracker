import useAppContext from "@/hooks/useAppContext";

const TextInput = ({
    isRequired = true,
    hint,
    type = "text",
    title,
    name,
    onChange,
    value,
    ...props
}) => {

    const { globalRefs } = useAppContext();

    return (
        <div {...props}>
            <label
                htmlFor={name}
                className="text-[#E6E9EB] mb-[2.5px] ml-[11px] inline-block w-full text-[14px] font-bold md:text-[15px]"
            >
                <span>{title}</span>
                <span className="ml-2 text-[11px] text-[#6b7280]">
                    {isRequired ? "*" : "optional"}
                </span>
            </label>

            <div className="relative flex items-center">
                <input
                    name={name}
                    id={name}
                    type={type}
                    placeholder={hint}
                    ref={(el) => {
                        globalRefs.current[name] = el;
                    }}
                    value={value}
                    onChange={onChange}
                    className="h-12 w-full appearance-none rounded-lg text-base leading-normal shadow-none outline-none md:text-[17px] font-sans m-0 placeholder-[#6b7280] bg-[#1a1d21] border border-solid border-[#2a2d32] text-[#E6E9EB] p-2.5 focus:border-[#2EFF8A] focus:ring-1 focus:ring-[#2EFF8A]/30"
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default TextInput;

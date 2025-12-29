import useAppContext from "@/hooks/useAppContext";

const TextArea = ({
    isRequired = true,
    hint,
    title,
    name,
    onChange,
    value,
    rows = 4,
    ...props
}) => {

    const { globalRefs } = useAppContext();

    return (
        <div {...props}>
            <label
                htmlFor={name}
                className="text-primaryBlack mb-[2.5px] ml-[11px] inline-block w-full text-[14px] font-bold md:text-[15px]"
            >
                <span>{title}</span>
                <span className="ml-2 text-[11px] text-gray-400">
                    {isRequired ? "*" : "optional"}
                </span>
            </label>

            <div className="relative flex items-center">
                <textarea
                    name={name}
                    id={name}
                    placeholder={hint}
                    rows={rows}
                    ref={(el) => {
                        if (globalRefs.current) globalRefs.current[name] = el;
                    }}
                    value={value}
                    onChange={onChange}
                    className="w-full appearance-none rounded-lg text-base leading-normal shadow-none outline-none md:text-[17px] font-sans m-0 placeholder-inputPlaceholder bg-inputBackground border border-solid border-inputBorder text-inputText p-2.5 resize-y"
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default TextArea;

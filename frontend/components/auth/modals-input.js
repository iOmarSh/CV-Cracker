export default function InputField({ id, type, value, onChange, label, Icon, ...props }) {
    return (
        <div className="relative mt-6">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="peer h-14 w-full cursor-text appearance-none
                border-b-2 border-[#2a2d32] bg-transparent text-base
                text-[#E6E9EB] placeholder-transparent focus:outline-none focus:border-[#2EFF8A] md:text-xl"
                placeholder={``}
                {...props}
            />
            <label
                htmlFor={id}
                className="absolute left-0 -top-4 cursor-text text-sm text-[#9AA3A8] transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-placeholder-shown:text-[#6b7280] peer-focus:-top-4 peer-focus:text-sm
                peer-focus:text-[#2EFF8A] md:text-base md:peer-placeholder-shown:text-xl md:peer-focus:text-base"
            >
                <span className="flex items-center space-x-3">
                    <Icon />
                    <span className="font-semibold">{label}</span>
                </span>
            </label>
        </div>
    );
}
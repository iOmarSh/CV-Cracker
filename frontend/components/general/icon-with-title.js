const IconWithTitle = ({ Icon, title, iconSize = 12, iconColor = "black"
    , className
}) => {
    return <span className={`flex items-center text-[#9AA3A8] ${className}`}>
        <Icon
            className="mr-2"
            style={{
                fontSize: `${iconSize}px`, color: iconColor
            }}
        />
        {title}
    </span>


};

export default IconWithTitle;
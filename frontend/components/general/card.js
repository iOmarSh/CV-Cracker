const Card = ({ className, children, ...props }) => {
    return <div className={`p-4 w-full rounded-large bg-[#111316] shadow-[0_0_15px_rgba(0,0,0,0.3)] ${className}`} {...props}>
        {children}
    </div>


}

export default Card;
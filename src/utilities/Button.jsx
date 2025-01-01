export default function Button({BtnStyle,children,...props}) {
    return(
        <div className="flex">
            <button
            {...props}
             className={`${BtnStyle} flex-1 bg-blue-700 py-2 rounded font-medium `}>
                {children}
            </button>
        </div>
    )
}
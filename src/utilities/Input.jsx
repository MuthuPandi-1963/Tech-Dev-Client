import { useEffect, useState } from "react";

export default function Input({name,id,type,cssClass,placeholder,Icon,error,setError,...props}) {
    const [isFocused, setIsFocused] = useState(false);
    useEffect(()=>{
        if(isFocused){
            setError({
                name : "",
                message :""
            })
        }
    },[isFocused])
    return(
        <div className="grid gap-1">
            <label htmlFor={id} className={`text-sm font-medium ${error.name === id ? "text-red-800" :  "text-black"} `}>{name}</label>
            <div  className={`flex border-2 ${error.name === id ? "border-red-800" :  "border-gray-600"} border-3 py-2 px-4 rounded  items-center gap-x-4  focus-within:border-blue-900`}>
                {Icon && <Icon color={error.name === id ? "red" : (isFocused ? "blue" : "black")}  className="w-5 h-5 text-gray-600 group-focus-within:text-blue-500"/> }
            <input
             type={type} 
             id={id}
             placeholder={placeholder}
             {...props}
             name={id}
             className="text-sm outline-none flex-1 overflow-hidden placeholder-shown:bg-transparent"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
             />
             </div>
             {error.name === id && <p className="text-red-700 text-sm ">{error.message}</p> }
        </div>
    )
}
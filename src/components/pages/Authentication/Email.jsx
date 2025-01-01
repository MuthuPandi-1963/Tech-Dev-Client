import { useContext, useState } from "react";
import Button from "../../../utilities/Button";
import Input from "../../../utilities/Input";
import { verifyEmail } from "./FormData/Data";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../store/Context/AuthContext";
import EmailThunk from "../../../store/Thunks/Authentication/EmailThunk";

const EmailData = {
  email :"",
}
export default function VerifyEmail() {
  const {user,isAuthenticated,success,error :err,message,isLoading} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const { authDispatch } = useContext(AuthContext)
  const [error , setError ] =useState({name : "",message : ""})
  const [userFormData,setUserFormData] = useState(EmailData);

  function HandleChange(event){
    const name = event.target.name
    const value = event.target.value
    setUserFormData((prevData)=>({
      ...prevData,[name]:value
    }))
    console.log(userFormData);
  }

  async function HandleSubmit(event){
    event.preventDefault()
    const { email  } = userFormData;
    
    if(!email){
    setError({name:"email",message:"email is required"})
    return;
    }
    if(!email.includes("@gmail.com")){
      setError({name:"email",message:"Invalid Email address"})
      return;
    }
    try {
      const EmailResponse = await dispatch(EmailThunk(userFormData))
      if (EmailResponse.payload?.success) {
        console.log("OTP send successful:", EmailResponse.payload);
        // Handle successful registration
        setUserFormData(EmailData)
        authDispatch({type:"verifyOTP"})
      } else {
        console.error("OTP send failed:", EmailResponse.payload?.message);
      }
    } catch (error) {
      console.error("Error during OTP send:", err);
    }
  }
  return(
    <div className="">
      {error.name == "all" && <p className="text-red-700 text-center font-medium">All fields are Required</p>}
    <form className="grid mx-2 gap-3" onSubmit={HandleSubmit}>
      {verifyEmail.map(({name,id,type,placeholder,icon:Icon},index)=>(
        <div key={index} >
          <Input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder} 
          Icon={Icon}
          error={error}
          setError={setError}
          value={userFormData[id]}
          onChange = {(e)=>HandleChange(e)}
          />
        </div>
      ))}
      <Button 
      type="submit"
      BtnStyle="mt-4"
      >Send OTP</Button>
    </form>
    </div>
  )
}
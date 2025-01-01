import { useContext, useState } from "react";
import Button from "../../../utilities/Button";
import Input from "../../../utilities/Input";
import { ResetPassword as resetpassword } from "./FormData/Data";
import PasswordThunk from "../../../store/Thunks/Authentication/PasswordThunk";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../store/Context/AuthContext";

const ResetPasswordData = {
  password : "",
  confirmPassword : ""
}
export default function ResetPassword() {
  const [error , setError ] =useState({name : "",message : ""})
  const [userFormData,setUserFormData] = useState(ResetPasswordData);
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const {authDispatch} = useContext(AuthContext)

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
    const { password , confirmPassword } = userFormData;
    
    if(!password ){
      setError({name:"password",message:"password is required"})
      return;
      }
    if(!confirmPassword ){
      setError({name:"confirmPassword",message:"confirmPassword is required"})
      return;
      }
    if(password.length < 8){
      setError({name:"password",message:"Password is too short (min length : 8)"})
      return;
    }
    if(password !== confirmPassword){
      setError({name:"password",message:"password doesn't match"})
      return;
      }
      
      try{
        const formData = {
          email : user.email,
          password : password
        }
        const PasswordResponse = await dispatch(PasswordThunk(formData))
        if (PasswordResponse.payload?.success) {
          console.log("PasswordResponse successful:", PasswordResponse.payload);
          // Handle successful registration
          setUserFormData(ResetPasswordData)
          authDispatch({type:"close"})
        } else {
          console.error("PasswordResponse failed:", PasswordResponse.payload?.message);
        }
      } catch (error) {
        console.error("Error during Login:", error);
      }
  }
  return(
    <div className="">
      {error.name == "all" && <p className="text-red-700 text-center font-medium">All fields are Required</p>}
    <form className="grid mx-2 gap-3" onSubmit={HandleSubmit}>
      {resetpassword.map(({name,id,type,placeholder,icon:Icon},index)=>(
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
      >ResetPassword</Button>
    </form>
    </div>
  )
}
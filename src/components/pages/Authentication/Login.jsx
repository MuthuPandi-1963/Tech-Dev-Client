import { useContext, useState } from "react";
import Button from "../../../utilities/Button";
import Input from "../../../utilities/Input";
import { login } from "./FormData/Data";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../store/Context/AuthContext";
import LoginThunk from "../../../store/Thunks/Authentication/LoginThunk";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
const LoginFormData = {
  email :"",
  password : ""
}
export default function Login() {
  const [error , setError ] =useState({name : "",message : ""})
  const [userFormData,setUserFormData] = useState(LoginFormData);
  const {user,isAuthenticated,success,error :err,message,isLoading} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const { authDispatch } = useContext(AuthContext)

  function HandleChange(event){
    const name = event.target.name
    const value = event.target.value
    setUserFormData((prevData)=>({
      ...prevData,[name]:value
    }))
    console.log(userFormData);
  }

  async  function HandleSubmit(event){
    event.preventDefault()
    const { email , password } = userFormData;
    
    if(!email){
    setError({name:"email",message:"email is required"})
    return;
    }
    if(!email.includes("@gmail.com")){
      setError({name:"email",message:"Invalid Email address"})
      return;
    }
    if(!password ){
      setError({name:"password",message:"password is required"})
      return;
      }
    if(password.length < 8){
      setError({name:"password",message:"Password is too short (min length : 8)"})
      return;
    }
    if(!email  || !password ){
      setError({name:"all",message:"all fields are Required"})
      return;
    }
    try{
      const LoginResponse = await dispatch(LoginThunk(userFormData))
      if (LoginResponse.payload?.success) {
        console.log("Login successful:", LoginResponse.payload);
        // Handle successful registration
        setUserFormData(LoginFormData)
        authDispatch({type:"close"})
      } else {
        console.error("Login failed:", LoginResponse.payload?.message);
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }

  }
  async function HandleGoogleLogin(){
      const value = window.open('https://gadgets-heaven-81z9.onrender.com/auth/google', '_self'); 
  }
  async function HandleGithubLogin(){
    const value = window.open('https://gadgets-heaven-81z9.onrender.com/oauth/github', '_self'); 
}
  return(
    <div className="max-w-md mx-auto px-3 py-2 bg-white rounded-lg">
      {error.name === "all" && (
        <p className="text-red-700 text-center font-medium mb-4">
          All fields are Required
        </p>
      )}
      <form className="grid gap-y-4" onSubmit={HandleSubmit}>
        <div className="grid gap-y-3">
          {login.map(({ name, id, type, placeholder, icon: Icon }, index) => (
            <Input
              key={index}
              type={type}
              name={name}
              id={id}
              placeholder={placeholder}
              Icon={Icon}
              error={error}
              setError={setError}
              value={userFormData[id]}
              onChange={(e) => HandleChange(e)}
            />
          ))}
          <button
            onClick={() => authDispatch({ type: "verifyEmail" })}
            className="text-blue-800 text-sm tracking-tight font-medium hover:underline text-end self-end"
          >
            Forgot Password?
          </button>
        </div>
        <Button
          type="submit"
          BtnStyle={`w-full py-2 text-white rounded-lg ${
            isLoading ? " bg-blue-400" : " bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {isLoading ? "Wait" : "Login"}
        </Button>
      </form>
      
      {/* Divider Section */}
      <div className="flex items-center gap-4 mt-6 mb-2">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex justify-center ">
        <button 
        onClick={HandleGoogleLogin}
        className="flex items-center justify-center gap-x-3 border-2 m-1 border-gray-100 py-2 px-4 rounded-full hover:bg-gray-300">
          <GoogleIcon/>
        </button>
        <button onClick={HandleGithubLogin} 
         className="flex items-center justify-center gap-x-3 border-2 m-1 border-gray-100 py-2 px-4 rounded-full hover:bg-gray-300">
          <GitHubIcon/>
        </button>
      </div>

      {/* Register Section */}
      <div className="my-4 text-center">
        <p>
          Don't have an account?{" "}
          <button
            className="text-indigo-800 font-medium hover:underline"
            onClick={() => authDispatch({ type: "register" })}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  )
}
import { useContext, useState } from "react";
import { AuthContext } from "../../store/Context/AuthContext";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import VerifyOTP from "../pages/Authentication/OTP";
import VerifyEmail from "../pages/Authentication/Email";
import ResetPassword from "../pages/Authentication/Password";
import ResetOTP from "../pages/Authentication/ResetOTP";
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
export default function AuthenticationLayout() {
  const [dialog, setDialog] = useState(true);
  const { authState , authDispatch} = useContext(AuthContext);

  // Close dialog when clicking outside of it
  const handleCloseDialog = (e) => {
    if (e.target === e.currentTarget) {
      setDialog(false); // Close the dialog if clicked outside
    }
  };

  return (
    <>
    {authState.isActive && (<div className="inset-0 z-50 fixed w-full h-full bg-inherit" onClick={handleCloseDialog}>
      <div className="grid min-h-screen">
        
          <dialog
            open
            className="rounded-lg shadow-lg p-6 w-[360px] sm:w-[400px] relative ring-1 shadow-blue-400"
          >
            <div className="flex justify-between">
              <div className="flex-grow grid  items-center gap-y-2">
                {/* <p className="justify-self-center"><DiamondIcon classStyle=" w-16 h-12"/></p> */}
                
                
                {/* <div className="grid justify-center ">
                  <h1 className="text-xl font-medium tracking-tight">
                    Gadgets Heaven
                  </h1>
                  <p className="text-md text-black">Please SignIn to Continue</p>
                </div> */}
                <h1 className="text-center text-2xl font-medium tracking-tight">{authState.name[0].toUpperCase()+authState.name.slice(1,)} your Account</h1>
              </div>
              <button onClick={() => authDispatch({type:"close"})}>
                <CloseIcon/>
              </button>
            </div>
            <div className="mt-6 mx-auto w-full">
              {authState.name === "register" && <Register />}
              {authState.name === "login" && <Login />}
              {authState.name === "otp" && <VerifyOTP />}
              {authState.name === "verifyEmail" && <VerifyEmail />}
              {authState.name === "resetPassword" && <ResetPassword />}
              {authState.name === "verifyOTP" && <ResetOTP />}
            </div>
          </dialog>
        
      </div>
    </div>
  )}
  </>
  );
}

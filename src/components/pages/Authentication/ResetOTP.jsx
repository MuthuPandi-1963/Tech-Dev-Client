import  { useState , useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPThunk from "../../../store/Thunks/Authentication/OTPThunk";
import { AuthContext } from "../../../store/Context/AuthContext";
import ResetPasswordOTPThunk from "../../../store/Thunks/Authentication/ResetPasswordOTPthunk";

const OtpInput = ({ length = 6, onChange ,otp,setOtp}) => {
  

  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Move to the next input
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex gap-x-2 bg-white justify-center">
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          className="w-10 h-10 text-center text-xl border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

const ResetOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [ error , setError ] = useState(false)
  const {user,message,success} = useSelector(state=>state.auth)
  const {authDispatch} = useContext(AuthContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
  }, [isTimerActive, timer]);

  const handleOtpChange = (otp) => {
    console.log("OTP entered:", otp);
  };
  async function submitOTP(){
    const checkOTPInput = otp.every((value,index)=>value !== "")
    if(!checkOTPInput){
      setError(true)
      return;
    }
    console.log(otp);
    try{
        const OTPResponse = await dispatch(ResetPasswordOTPThunk({email :user?.email ,otp :otp.join("")}))
        if (OTPResponse.payload?.success) {
          console.log("OTP successful:", OTPResponse.payload);
          authDispatch({type:"resetPassword"})
        } else {
          console.error("OTP failed:", OTPResponse.payload?.message);
        }
      } catch (error) {
        console.error("Error during Login:", error);
      }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 3000);
  
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [error]);
  const handleResendOtp = () => {
    setTimer(60);
    setIsTimerActive(true);
    alert("OTP Resent!");
  };
  return (
    <div className="grid items-center  bg-gray-0">
      <div className="my-2">
        {error && <p className="text-red-600 font-medium text-center ">Please fill the all fields</p> }
      </div>
      <h1 className="text-2xl font-semibold mb-4 text-center">Enter OTP</h1>
      <OtpInput length={6} onChange={handleOtpChange} otp={otp} setOtp={setOtp} />
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={submitOTP}
      >
        Submit
      </button>
      <div className="mt-4 flex justify-end">
        {isTimerActive ? (
          <p className="text-gray-700">Resend OTP in {timer} seconds</p>
        ) : (
          <button
            className="mt-2 text-blue-500 hover:underline"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetOTP;

import { useContext, useState } from "react";
import Button from "../../../utilities/Button";
import Input from "../../../utilities/Input";
import { register } from "./FormData/Data";
import { useSelector, useDispatch } from "react-redux";
import RegisterThunk from "../../../store/Thunks/Authentication/RegisterThunk";
import { AuthContext } from "../../../store/Context/AuthContext";
import { toast } from "react-toastify";

const RegisterFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);

  const [error, setError] = useState({ name: "", message: "" });
  const [userFormData, setUserFormData] = useState(RegisterFormData);

  function HandleChange(event) {
    const { name, value } = event.target;
    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function HandleSubmit(event) {
    event.preventDefault();
    const { email, username, password, confirmPassword } = userFormData;

    // Validation
    if (!username) return setError({ name: "username", message: "Username is required" });
    if (!email) return setError({ name: "email", message: "Email is required" });
    if (!email.includes("@gmail.com")) return setError({ name: "email", message: "Invalid Email address" });
    if (!password) return setError({ name: "password", message: "Password is required" });
    if (!confirmPassword) return setError({ name: "confirmPassword", message: "Confirm Password is required" });
    if (password.length < 8) return setError({ name: "password", message: "Password is too short (min: 8 characters)" });
    if (password !== confirmPassword)
      return setError({ name: "password", message: "Passwords do not match" });

    try {
      const RegisterResponse = await dispatch(RegisterThunk(userFormData));
      if (RegisterResponse.payload?.success) {
        toast.success("Registration successful");
        setUserFormData(RegisterFormData); // Reset form
        authDispatch({ type: "otp" }); // Navigate to OTP step
      } else {
        toast.error(RegisterResponse.payload?.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Error during registration");
    }
  }

  return (
    <div className="max-w-lg mx-auto px-2 bg-white  rounded-md">
    {error.name === "all" && (
      <p className="text-red-700 text-center font-medium mb-4">All fields are required</p>
    )}
    <form className="grid gap-y-4" onSubmit={HandleSubmit}>
      {register.map(({ name, id, type, placeholder, icon: Icon }, index) => (
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
          onChange={HandleChange}
        />
      ))}
      <Button
        disabled={isLoading}
        type="submit"
        BtnStyle={`w-full py-2 text-white rounded-lg ${
          isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-900"
        }`}
      >
        {isLoading ? "Registering..." : "Signup"}
      </Button>
    </form>
    <div className="text-center mt-4">
      <p className="text-gray-700">
        Already a user?{" "}
        <button 
        onClick={()=>authDispatch({type:"login"})}
          className="text-blue-800 tracking-tight font-medium hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  </div>
  );
}

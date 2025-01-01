import { EmailIcon, PasswordIcon, UserIcon } from "../../../../utilities/Icons"

const email = {
    name : "Email",
    type : "email",
    id : "email",
    placeholder : "Enter a email",
    icon: EmailIcon
}

const username = {
    name : "Username",
    type : "text",
    id : "username",
    placeholder : "Enter a username",
    icon: UserIcon

}

const password = {
    name : "Password",
    type : "password",
    id : "password",
    placeholder : "Enter a Password",
    icon: PasswordIcon
}
const confirm_password = {
    name : "Confirm Password",
    type : "password",
    id : "confirmPassword",
    placeholder : "Enter a Confirm Password",
    icon: PasswordIcon
}

const register = [username,email,password,confirm_password]
const login = [email,password]
const verifyEmail = [email]
const ResetPassword = [password,confirm_password]
export {register , login , verifyEmail , ResetPassword };


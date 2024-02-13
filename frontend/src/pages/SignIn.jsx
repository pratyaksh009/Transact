import { useState } from "react";
import Heading from "../components/Heading";
import Entry from "../components/Entry";
import Button from "../components/Button";
import Warning from "../components/Warning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/sign-in",
                {
                    email,
                    password,
                }
            );
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-400 box-border">
            <div className=" flex-col justify-center items-center bg-slate-50 rounded-lg p-12 shadow-md space-y-8 w-96 ">
                {/* heading  */}
                <Heading
                    heading="Sign In"
                    sub_heading="Enter your credentials to access your account"
                />

                <form onSubmit={handleSubmit}>
                    <Entry
                        type={"email"}
                        label="Email"
                        input="abc123@gmail.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Entry
                        type={"password"}
                        label="Password"
                        input="P@123t"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button text="Sign in" color="bg-gray-800" />
                </form>

                <div>
                    <Warning
                        label="Don't have an account?"
                        link="Signup"
                        to="/signup"
                    />
                </div>
            </div>
        </div>
    );
}

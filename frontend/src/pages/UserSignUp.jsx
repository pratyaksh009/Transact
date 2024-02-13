import { useState } from "react";
import Heading from "../components/Heading";
import Entry from "../components/Entry";
import Button from "../components/Button";
import Warning from "../components/Warning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserSignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/sign-up",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                }
            );
            // console.log(response);
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
                    heading="Sign Up"
                    sub_heading="Enter your information to create an account"
                />

                <form onSubmit={handleSubmit}>
                    <Entry
                        type={"text"}
                        label="First Name"
                        input="John"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                    <Entry
                        type={"text"}
                        label="Last Name"
                        input="pitt"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                    <Entry
                        type={"email"}
                        label="Email"
                        input="abc123@gmail.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Entry
                        type={"text"}
                        label="Password"
                        input="atleast 8 chars, including upper-case, lower-case, numbers, special-chars"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button text="Sign Up" />
                </form>

                <div>
                    <Warning
                        label="Already have an account?"
                        link="Login"
                        to="/signin"
                    />
                </div>
            </div>
        </div>
    );
}
export default UserSignUp;

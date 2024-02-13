import { useEffect, useState } from "react";
import Button from "../components/Button";
import Entry from "../components/Entry";
import Heading from "../components/Heading";
import UserSignatures from "../components/UserSignatures";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function SendMoney() {
    const [amount, setAmount] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transferTo = queryParams.get("id");
    const firstName = queryParams.get("firstName");
    const lastName = queryParams.get("lastName");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const getUserObjectId = await axios.get(
                "http://localhost:3000/api/v1/user/currentInfo",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(getUserObjectId);
            const transferFrom = getUserObjectId.data._id;

            // console.log("token  " + token);
            const res = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",

                {
                    transferFrom,
                    transferTo,
                    amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(res.message);
            navigate("/dashboard");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex justify-center items-center bg-gray-300 h-screen ">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col bg-slate-50 shadow-md p-12 rounded-lg space-y-4 w-96">
                    <Heading heading="Send Money" sub_heading={""} />
                    <UserSignatures user={`${firstName} ${lastName}`} />
                    <Entry
                        label={"Amount (in Rs)"}
                        input={"Enter Amount"}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                    <Button text={"Intiate Transfer"} />
                </div>
            </form>
        </div>
    );
}

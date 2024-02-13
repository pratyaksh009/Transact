import axios from "axios";
import { useEffect, useState } from "react";

export default function Balance() {
    const [bal, SetBal] = useState("");
    useEffect(() => {
        const getBal = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(
                        "http://localhost:3000/api/v1/account/balance",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    // console.log(response);
                    const balance = String(response.data.balance);
                    SetBal(balance);
                } catch (e) {
                    console.log(e);
                }
            }
        };
        getBal();
    }, []);

    return (
        <div className="flex justify-start pl-20 py-6 ">
            <div className="flex justify-between gap-4 ">
                <div className="font-bold">Your Balance</div>
                <div className="font-medium">Rs {bal.split(".")[0]}</div>
            </div>
        </div>
    );
}

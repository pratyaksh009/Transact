import UsersList from "./UsersList";
import { useEffect, useState } from "react";
import { useDebouncer } from "../hooks/useDebouncer";
import axios from "axios";

export default function Users() {
    const [inputValue, setInputValue] = useState("");
    const [users, setUsers] = useState([]);
    const toSearch = useDebouncer(inputValue, 5);

    useEffect(() => {
        if (toSearch.trim() !== "") {
            const getUser = async () => {
                try {
                    const token = localStorage.getItem("token");

                    const res = await axios.get(
                        "http://localhost:3000/api/v1/user/bulk",
                        {
                            params: {
                                filter: toSearch,
                            },
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log(res.data.user);
                    setUsers(res.data.user);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            getUser();
        } else {
            // If the search input is empty, clear the users list
            setUsers([]);
        }
    }, [toSearch]);

    return (
        <div className="flex flex-col px-20 space-y-2">
            <div className="text-left font-bold ">Users</div>
            <input
                className="w-full border-2 border-gray-300 rounded-md p-1 outline-none"
                placeholder="Search users..."
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
            <UsersList users={users} />
        </div>
    );
}

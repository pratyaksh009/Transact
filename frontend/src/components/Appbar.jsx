import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Appbar({ user }) {
    const [firstName, SetFirstName] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getFirstName = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get(
                        "http://localhost:3000/api/v1/user/currentInfo",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    SetFirstName(response.data.firstName);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getFirstName();
    }, [firstName]);

    const handleLogout = () => {
        // Handle logout logic here
        localStorage.removeItem("token");
        navigate("/signin");
        // Redirect the user to the login page or any other appropriate action
    };

    const handleUpdateName = () => {
        // Handle update name logic here
    };

    const handleUpdatePassword = () => {
        // Handle update password logic here
    };
    return (
        <div className="flex justify-between items-center box-border px-12 py-3 shadow-md font-medium ">
            <div> PayTM App</div>
            <div className=" flex justify-center items-center gap-4 ">
                <div
                    className="flex justify-center items-center gap-1"
                    onMouseLeave={() => {
                        setShowDropdown(false);
                    }}
                >
                    <div> Hello,</div>
                    <div>
                        {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
                    </div>
                </div>
                <div
                    className="  flex items-center bg-gray-700 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-gray-100 dark:hover:bg-gray-200 dark:focus:ring-gray-800"
                    onMouseEnter={() => setShowDropdown(true)}
                >
                    <div className="rounded-full cursor-pointer bg-gray-300 p-2 px-3">
                        {firstName.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                        <button type="button">
                            <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="0"
                                    fill="none"
                                    width="24"
                                    height="24"
                                />

                                <g>
                                    <path d="M7 10l5 5 5-5" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
                {showDropdown && (
                    <div
                        className="absolute top-12 right-2 bg-white border rounded shadow-md"
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <ul>
                            <li
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                onClick={handleUpdateName}
                            >
                                Update Name
                            </li>
                            <li
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                onClick={handleUpdatePassword}
                            >
                                Update Password
                            </li>
                            <li
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

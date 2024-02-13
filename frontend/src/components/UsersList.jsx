import { useNavigate } from "react-router-dom";
import { SendMoneyButton } from "./SendMoneyButton";

export default function UsersList({ users }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col space-y-1  box-border ">
            {users.map((user) => {
                const { firstName, lastName} = user;
                return (
                    <div
                        key={user._id}
                        className="flex justify-between  items-center box-border border-b "
                    >
                        <div className="flex justify-between items-center box-border gap-3">
                            <div className="rounded-full p-0.5 bg-gray-300 px-2">
                                {firstName.slice(0, 1)}
                            </div>
                            <div className="font-medium ">
                                {firstName + " " + lastName}
                            </div>
                        </div>
                        <SendMoneyButton
                            text="Send Money"
                            onClick={(e) => {
                                navigate(
                                    "/send?id=" +
                                        user._id +
                                        "&firstName=" +
                                        firstName +
                                        "&lastName=" +
                                        lastName
                                );
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

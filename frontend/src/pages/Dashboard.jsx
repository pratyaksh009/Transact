import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard() {
    return (
        <div className="flex flex-col">
            <Appbar user="Pratyaksh" />
            <Balance />
            <Users />
        </div>
    );
}

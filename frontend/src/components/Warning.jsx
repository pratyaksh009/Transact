import { Link } from "react-router-dom";
export default function Warning({ label, link, to }) {
    return (
        <div className="flex justify-center items-center gap-2 font-medium">
            <div> {label}</div>
            <div className="underline hover:text-gray-600">
                <Link to={to}>{link}</Link>
            </div>
        </div>
    );
}

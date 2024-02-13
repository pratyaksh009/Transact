

export default function UserSignatures({ user }) {
    return (
        <div className="flex justify-start items-center box-border gap-3 ">
            <div className="rounded-full p-0.5 bg-green-300 px-2 text-gray-600 font-medium">
                {user.slice(0, 1)}
            </div>
            <div className="font-medium ">{user}</div>
        </div>
    );
}

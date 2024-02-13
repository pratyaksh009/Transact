export default function Entry({ label, input, onChange, type }) {
    return (
        <div className=" flex flex-col  space-y-1 mt-4">
            <div className="font-medium">
                <label htmlFor={label}>{label}</label>
            </div>
            <div>
                <input
                    className="border border-2 border-gray-200 rounded w-full p-1 outline-none "
                    type={type}
                    onChange={onChange}
                    placeholder={input}
                />
            </div>
        </div>
    );
}

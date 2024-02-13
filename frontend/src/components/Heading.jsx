export default function Heading({ heading, sub_heading }) {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-2xl "> {heading}</div>
            <div className="text-gray-400 text-center">{sub_heading}</div>
        </div>
    );
}

export function SendMoneyButton({ text, onClick }) {
    return (
        <div className="flex  justify-center items-center">
            <button
                onClick={onClick}
                type="submit"
                className={`text-white w-full bg-gray-800  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
                {text}
            </button>
        </div>
    );
}

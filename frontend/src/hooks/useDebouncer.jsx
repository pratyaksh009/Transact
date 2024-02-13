import { useEffect, useState } from "react";

export function useDebouncer(input, delay) {
    const [debouncedValue, setDebouncedValue] = useState("");
    useEffect(() => {
        const clock = setInterval(() => {
            setDebouncedValue(input);
        }, delay * 100);

        return () => {
            clearInterval(clock);
        };
    }, [input]);
    return debouncedValue;
}

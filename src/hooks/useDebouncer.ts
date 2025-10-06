import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number) => {
    const [debaunceValue, setDebaunceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebaunceValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debaunceValue;
};

export default useDebounce;

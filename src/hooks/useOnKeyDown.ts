import { useEffect, useCallback } from "react";

export function useOnKeyDown(keys: string[], callback: (event: KeyboardEvent) => void): void {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const normalizedKeys = keys.map((key) => key.toLowerCase());
            const pressedKey = event.key.toLowerCase();

            if (normalizedKeys.includes(pressedKey)) {
                event.preventDefault();
                callback(event);
            }
        },
        [keys, callback]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
}

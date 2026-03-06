import { useEffect, useState } from 'react';

/**
 * Custom React Hook for debouncing rapid state updates.
 * Prevents UI logic (like saving to a database) from firing excessively on every keystroke.
 * 
 * @param value The raw generic value to listen to
 * @param delay The millisecond timeout before committing the value
 * @returns The debounced value, guaranteed to not change more often than the delay
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Stage the value to update after the specified delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // If the value changes *before* the delay is up, clear the active timer and restart
        // This creates the "waiting for the user to stop typing" effect.
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

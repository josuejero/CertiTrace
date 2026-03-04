import { useEffect, useState } from 'react';

type SetStateAction<T> = T | ((prev: T) => T);

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    const raw = window.localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw) as T;
      } catch (error) {
        console.error('Failed to parse localStorage value:', error);
      }
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to write to localStorage:', error);
    }
  }, [key, state]);

  const setValue = (value: SetStateAction<T>) => {
    setState(prev => (typeof value === 'function' ? (value as (prev: T) => T)(prev) : value));
  };

  return [state, setValue] as const;
}

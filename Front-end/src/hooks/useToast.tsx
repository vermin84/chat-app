import { useState, useCallback, useRef, useEffect } from "react";

export function useToast(timeout = 3000) {
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null); // ← изменили тип на number

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast(null), timeout); // ← window.setTimeout
  }, [timeout]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { toast, showToast };
}

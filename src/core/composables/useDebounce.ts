// useDebounce.ts
export function useDebounce(p0: () => Promise<void>, p1: number) {
  let timeout: ReturnType<typeof setTimeout>;

  /**
   * Ejecuta una función después de un delay, 
   * cancelando la ejecución previa si se llama de nuevo.
   */
  const debounce = (fn: () => Promise<void> | void, delay: number) => {
    clearTimeout(timeout);
    
    timeout = setTimeout(async () => {
      try {
        await fn();
      } catch (error) {
        console.error("Error en ejecución debounce:", error);
      }
    }, delay);
  };

  return { debounce };
}
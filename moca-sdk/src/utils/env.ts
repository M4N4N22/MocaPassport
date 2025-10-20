export function getEnvVar(key: string): string | undefined {
    // client-side in Next.js
    if (typeof window !== "undefined") {
      return (process.env as any)[key];
    }
  
    // Node / SSR
    if (typeof process !== "undefined" && process.env) {
      return process.env[key];
    }
  
    // Vite / ESM environments
    if (typeof import.meta !== "undefined" && "env" in import.meta) {
      return (import.meta as any).env[key];
    }
  
    return undefined;
  }
  
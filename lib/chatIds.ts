// lib/chatIds.ts
export function chatIdFor(a: string, b: string): string {
    return a < b ? `${a}_${b}` : `${b}_${a}`;
  }
  
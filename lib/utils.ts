import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Splits a prose description into one bullet per sentence.
 *
 * Splits on a period followed by whitespace rather than on "." alone, so
 * decimals stay intact ("an average 5.0 seller rating" is one bullet, not two).
 */
export function toBullets(text: string): string[] {
  return text
    .split(/\.\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .map((sentence) => (sentence.endsWith('.') ? sentence : `${sentence}.`))
}

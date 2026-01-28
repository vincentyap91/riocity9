/**
 * Security utility functions for input sanitization and validation
 * Prevents XSS attacks and dangerous script injection
 */

/**
 * Sanitizes input to prevent XSS attacks
 * Removes or escapes potentially dangerous characters and scripts
 * 
 * @param input - The input string to sanitize
 * @returns Sanitized string safe for display and storage
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove null bytes and control characters (except newlines, tabs, carriage returns)
  let sanitized = input.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');

  // Remove data: URLs that could contain scripts
  sanitized = sanitized.replace(/data:text\/html/gi, '');

  // Remove iframe, embed, object tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');

  // Escape HTML entities (additional safety layer)
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return sanitized.trim();
}

/**
 * Sanitizes input but preserves basic formatting (for display purposes)
 * Less aggressive than sanitizeInput - keeps some HTML safe characters
 * 
 * @param input - The input string to sanitize
 * @returns Sanitized string with basic formatting preserved
 */
export function sanitizeInputPreserveFormat(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove null bytes and control characters
  let sanitized = input.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');

  // Remove data: URLs
  sanitized = sanitized.replace(/data:text\/html/gi, '');

  // Remove dangerous tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');

  return sanitized.trim();
}

/**
 * Validates and sanitizes mobile number input
 * Only allows digits 0-9
 * 
 * @param input - The mobile number input
 * @returns Sanitized mobile number containing only digits
 */
export function sanitizeMobileNumber(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove all non-digit characters
  return input.replace(/\D/g, '');
}

/**
 * Validates if input contains only numbers
 * 
 * @param input - The input to validate
 * @returns true if input contains only digits 0-9
 */
export function isNumericOnly(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }
  return /^\d+$/.test(input);
}

/**
 * Sanitizes input for general text fields
 * Removes dangerous scripts but allows normal text input
 * 
 * @param input - The input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeTextInput(input: string): string {
  return sanitizeInputPreserveFormat(input);
}

/**
 * Sanitizes input for username fields
 * Allows alphanumeric and underscore only
 * 
 * @param input - The username input
 * @returns Sanitized username
 */
export function sanitizeUsername(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove all characters except alphanumeric and underscore
  return input.replace(/[^a-zA-Z0-9_]/g, '');
}

/**
 * Sanitizes input for email fields
 * Basic email sanitization (removes scripts but preserves email format)
 * 
 * @param input - The email input
 * @returns Sanitized email
 */
export function sanitizeEmail(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove dangerous characters but preserve email format
  let sanitized = input.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  return sanitized.trim();
}

/** Allowed MIME types for receipt uploads (no SVG to prevent XSS). */
const RECEIPT_ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'application/pdf',
]);
const RECEIPT_MAX_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Returns true if the file looks like an SVG (by type or extension).
 * Use to block SVG uploads and prevent SVG-based XSS.
 */
export function isSvgFile(file: File): boolean {
  const t = (file.type || '').toLowerCase();
  const n = (file.name || '').toLowerCase();
  return (
    t === 'image/svg+xml' ||
    n.endsWith('.svg') ||
    n.endsWith('.svgz')
  );
}

export type ReceiptValidationResult =
  | { ok: true; file: File }
  | { ok: false; error: string };

/**
 * Validates a file for receipt upload: blocks SVG, allows only JPG/PNG/PDF, enforces size.
 * Use for any receipt or document upload in the app.
 */
export function validateReceiptFile(file: File | null | undefined): ReceiptValidationResult {
  if (!file) return { ok: false, error: 'No file selected.' };
  if (isSvgFile(file)) return { ok: false, error: 'SVG files are not allowed.' };
  if (!RECEIPT_ALLOWED_TYPES.has(file.type))
    return { ok: false, error: 'Only JPG, PNG, or PDF files are allowed.' };
  if (file.size > RECEIPT_MAX_BYTES)
    return { ok: false, error: 'File is too large. Max 10MB.' };
  return { ok: true, file };
}

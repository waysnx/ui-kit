/**
 * Security utilities for safe HTML generation.
 * 
 * These utilities prevent XSS attacks by properly escaping all user-controlled
 * data before embedding it in HTML.
 */

/**
 * Escapes HTML special characters to prevent XSS attacks.
 * 
 * @param unsafe - Raw string that may contain HTML special characters
 * @returns Safely escaped string that can be embedded in HTML
 * 
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Safely serializes data to JSON for embedding in HTML <script> tags.
 * 
 * Prevents script injection by escaping characters that could break out of
 * the script context (e.g., </script>, <!--).
 * 
 * @param data - Any JSON-serializable data
 * @returns Safely escaped JSON string
 * 
 * @example
 * safeJsonSerialize({ value: '</script><script>alert("xss")</script>' })
 * // Returns JSON with </script> safely escaped
 */
export function safeJsonSerialize(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')  // Line separator
    .replace(/\u2029/g, '\\u2029'); // Paragraph separator
}

/**
 * Escapes a string for safe use in HTML attributes.
 * 
 * @param unsafe - Raw string for attribute value
 * @returns Safely escaped attribute value
 */
export function escapeAttribute(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

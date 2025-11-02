/**
 * REGEX FOR MULTIPLE FORMATS
 * 
 * Real-world applications often need to validate multiple formats
 * combining all the regex skills you've learned:
 * 
 * - Basic patterns
 * - Methods (test, match, search, replace)
 * - Capture groups
 * - Advanced patterns (lookahead, boundaries, alternation)
 * 
 * COMMON FORMATS:
 * ===============
 * 
 * EMAIL:
 * /^[\w.+-]+@[\w.-]+\.\w+$/
 * 
 * PHONE (US):
 * /^\d{3}-\d{3}-\d{4}$/              // 123-456-7890
 * /^\(\d{3}\) \d{3}-\d{4}$/          // (123) 456-7890
 * /^\d{10}$/                          // 1234567890
 * 
 * URL:
 * /^https?:\/\/.+$/                  // Basic
 * /^https?:\/\/[\w.-]+\.\w+/         // Better
 * /^https?:\/\/[\w.-]+\.\w+(\/.+)?$/ // With path
 * 
 * PATTERN DETECTION:
 * ==================
 * 1. Check for @ symbol -> likely email
 * 2. Check for digits only or dashes/parens -> likely phone
 * 3. Check for http/https -> definitely URL
 * 4. Check for . and extension -> likely email or URL
 */

// TODO: Implement the validatePhone function
// US phone format: 123-456-7890 or (123) 456-7890 or 1234567890
// Pattern: /^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\(\d{3}\)\s?\d{3}-\d{4})$/
// Allow multiple valid formats
export function validatePhone(phone) {

}

// TODO: Implement the validateURL function
// URL format: http://example.com or https://example.com
// Pattern: /^https?:\/\/[\w.-]+\.\w+/
// Must start with http:// or https://
export function validateURL(url) {

}

// TODO: Implement the detectFormat function
// Return 'email' if looks like email (@)
// Return 'phone' if looks like phone (digits/dashes/parens)
// Return 'url' if looks like URL (http/https)
// Return 'unknown' otherwise
export function detectFormat(input) {

}

// TODO: Implement the validateAny function
// Return true if input matches email OR phone OR url
// Use || (OR) to combine multiple validators
export function validateAny(input) {

}

// TODO: Implement the extractContacts function
// Find all emails, phones, URLs in text
// Return object: { emails: [], phones: [], urls: [] }
// Use match() with global flag for each type
export function extractContacts(text) {

}

// TODO: Implement the formatPhone function
// Convert phone to standard format: (123) 456-7890
// Extract digits first, then format with parens and dash
// Pattern: replace /^(\d{3})(\d{3})(\d{4})$/ with ($1) $2-$3
export function formatPhone(phone) {

}

// TODO: Implement the normalizePhone function
// Extract only digits from phone
// Use replace(/\D/g, '') to remove non-digits
// Return exactly 10 digits or empty string
export function normalizePhone(phone) {

}

// TODO: Implement the validatePhoneStrict function
// Strict validation: exactly 10 digits, no formatting
// Pattern: /^\d{10}$/
// After normalizing, check if exactly 10 digits
export function validatePhoneStrict(phone) {

}

// TODO: Implement the extractURLDomain function
// Extract domain from full URL using capture group
// Example: 'https://www.example.com/path' -> 'example.com'
// Pattern: extract domain part between // and /
// Use capture group: /https?:\/\/(?:www\.)?([^\/]+)/
export function extractURLDomain(url) {

}

// TODO: Implement the validateContactInfo function
// Validate object with email, phone, url properties
// Return true if at least ONE is valid
// Check each property if it exists
// Return false if all are invalid or missing
export function validateContactInfo(contact) {

}

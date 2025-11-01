/**
 * ADVANCED REGEX PATTERNS - LOOKAHEAD AND LOOKBEHIND
 * 
 * LOOKAHEAD: Assert what comes AFTER current position
 * ===================================================
 * (?=pattern)   - Positive lookahead: must be followed by pattern
 * (?!pattern)   - Negative lookahead: must NOT be followed by pattern
 * 
 * LOOKBEHIND: Assert what comes BEFORE current position
 * ======================================================
 * (?<=pattern)  - Positive lookbehind: must be preceded by pattern
 * (?<!pattern)  - Negative lookbehind: must NOT be preceded by pattern
 * 
 * KEY: Lookahead/lookbehind don't consume characters (don't include in match)
 * 
 * EXAMPLES:
 * =========
 * 
 * Lookahead - Match 'test' only if followed by 'ing':
 * /test(?=ing)/  matches "testing" -> "test" (but not "tested")
 * 
 * Negative lookahead - Match 'test' only if NOT followed by 'ing':
 * /test(?!ing)/  matches "tested" -> "test" (but not "testing")
 * 
 * Lookbehind - Match 'ing' only if preceded by 'test':
 * /(?<=test)ing/ matches "testing" -> "ing" (not just any "ing")
 * 
 * Negative lookbehind - Match 'ing' NOT preceded by 'test':
 * /(?<!test)ing/ matches "running" -> "ing" (but not "testing")
 * 
 * EMAIL EXAMPLES:
 * ===============
 * 
 * Lookahead - Ensure TLD is 2-6 letters:
 * /^\w+@\w+\.(?=[a-z]{2,6}$)\w+/i
 * The (?=[a-z]{2,6}$) checks ahead before matching word chars
 * 
 * Negative lookahead - Reject consecutive dots:
 * /^\w+(?!.*\.\.)@/ matches @ not preceded by (..)
 * Actually: /^(?!.*\.\.)[\w.]+@/ rejects if (..) anywhere before @
 * 
 * Negative lookahead - Reject starting with number:
 * /^(?![0-9])[\w.]+@/ must NOT start with digit
 */

// TODO: Implement the validateWithWordBoundaries function
// Use \b word boundary to prevent partial matches
// Pattern: \b\w+@\w+\.\w+\b ensures complete word
// Example: "email@example.com" in text (not part of larger string)
export function validateWithWordBoundaries(text) {

}

// TODO: Implement the validateEmailWithDots function
// Allow dots in local part: john.doe@example.com
// Pattern: Allow dots/underscores in local part: [\w.]+@
// Example: user.name@example.com should be valid
export function validateEmailWithDots(email) {

}

// TODO: Implement the validateEmailWithPlus function
// Allow + for tag-based addresses: user+tag@example.com
// Pattern: Allow +, -, . in local part: [\w+.-]+@
// Gmail and others support this
export function validateEmailWithPlus(email) {

}

// TODO: Implement the validateLongTLD function
// Use lookahead to validate TLD length: 2-6 characters
// Pattern: @\w+\.(?=[a-z]{2,6})[a-z]+
// Lookahead (?=[a-z]{2,6}) checks ahead without consuming
export function validateLongTLD(email) {

}

// TODO: Implement the rejectConsecutiveDots function
// Use negative lookahead to reject ".." in email
// Pattern: ^(?!.*\.\.)[\w.]+@[\w.-]+\.\w+$
// (?!.*\.\.) means "not followed by .. anywhere"
export function rejectConsecutiveDots(email) {

}

// TODO: Implement the validateNoSpecialStart function
// Reject emails starting with dot or digit
// Use negative lookahead: (?![0-9.])
// Pattern: ^(?![0-9.])[\w.]+@
// Must start with letter or underscore
export function validateNoSpecialStart(email) {

}

// TODO: Implement the findEmailsNotInBrackets function
// Find emails NOT surrounded by < >
// Use negative lookbehind and lookahead
// Pattern: (?<!<)[\w.+]+@[\w.-]+(?!>)
// (?<!<) means not preceded by <, (?!>) means not followed by >
export function findEmailsNotInBrackets(text) {

}

// TODO: Implement the validateEmailWithHyphens function
// Allow hyphens in domain: my-domain.com, mail-server.org
// Pattern: [\w.+]+@[\w-]+\.[\w-]+
// Allow - in domain but not at start/end
export function validateEmailWithHyphens(email) {

}

// TODO: Implement the validateCommonDomains function
// Validate only gmail, yahoo, outlook (using alternation)
// Pattern: [\w.+]+@(gmail|yahoo|outlook)\.com
// Use | (pipe) for alternation
export function validateCommonDomains(email) {

}

// TODO: Implement the extractEmailWithContext function
// Extract email with surrounding words using groups
// Capture: (word) + email + (word)
// Return object: { email, before, after }
// Pattern: (\w+)?\s+([\w.+]+@[\w.-]+\.\w+)\s+(\w+)?
export function extractEmailWithContext(text) {

}

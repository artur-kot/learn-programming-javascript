/**
 * REGEX BASICS - INTRODUCTION TO REGULAR EXPRESSIONS
 * 
 * Regular expressions (regex) are patterns used to match character combinations in strings.
 * They're incredibly powerful for validation, searching, and text manipulation.
 * 
 * BASIC SYNTAX:
 * ============
 * /pattern/flags
 * 
 * COMMON FLAGS:
 * - g : global (find all matches, not just first)
 * - i : case-insensitive (ignore letter case)
 * - m : multiline (treat ^ and $ as line boundaries)
 * 
 * SIMPLE PATTERNS:
 * ================
 * . : any character except newline
 * \d : digit (0-9)
 * \w : word character (a-z, A-Z, 0-9, _)
 * \s : whitespace (space, tab, newline)
 * 
 * CHARACTER CLASSES:
 * ==================
 * [abc] : matches any of a, b, or c
 * [a-z] : matches any lowercase letter
 * [^abc] : matches any character NOT a, b, or c
 * 
 * QUANTIFIERS:
 * ============
 * * : 0 or more times
 * + : 1 or more times
 * ? : 0 or 1 time (optional)
 * {n} : exactly n times
 * {n,} : n or more times
 * {n,m} : between n and m times
 * 
 * ANCHORS:
 * ========
 * ^ : start of string
 * $ : end of string
 * \b : word boundary
 * 
 * EXAMPLE:
 * ========
 * /^\w+@\w+\.\w+$/ matches:
 * ^ - start of string
 * \w+ - one or more word characters (local part: "user")
 * @ - literal @ symbol
 * \w+ - one or more word characters (domain: "example")
 * \. - literal dot (escaped because . normally means any char)
 * \w+ - one or more word characters (extension: "com")
 * $ - end of string
 * 
 * Matches: "user@example.com", "john@domain.org"
 * Doesn't match: "user.name@example.com" (has dot in local part)
 */

// TODO: Implement the isSimpleEmail function
// Check if string matches basic email pattern: word@word.word
// Pattern: starts with word chars, @, more word chars, dot, word chars at end
export function isSimpleEmail(email) {

}

// TODO: Implement the hasAtSymbol function
// Check if email contains exactly one @ symbol
// Use regex test() method or search() to find @
export function hasAtSymbol(email) {

}

// TODO: Implement the hasDotAfterAt function
// Check if @ is followed by at least one character and then a dot
// Pattern: @ followed by something, then a dot
export function hasDotAfterAt(email) {

}

// TODO: Implement the isValidBasicFormat function
// Validate: alphanumeric local part, @, alphanumeric domain, dot, alphanumeric extension
// Local part: \w+
// @: @
// Domain: \w+
// Extension: \w+
export function isValidBasicFormat(email) {

}

// TODO: Implement the countAtSymbols function
// Count how many @ symbols appear in string
// Use regex with match() and global flag or split() method
export function countAtSymbols(email) {

}

// TODO: Implement the checkLocalPart function
// Check if part before @ contains only alphanumeric and dots
// Extract substring before @ and validate with regex
// Pattern: \w and . only (no special chars)
export function checkLocalPart(email) {

}

// TODO: Implement the checkDomainPart function
// Check if part after @ contains only alphanumeric, dots, and hyphens
// Extract substring after @ and validate
// Pattern: \w, ., and - only
export function checkDomainPart(email) {

}

// TODO: Implement the extractDomain function
// Extract domain name between @ and first dot after @
// Use regex capture groups or string methods
// Example: "user@company.com" -> "company"
export function extractDomain(email) {

}

// TODO: Implement the extractExtension function
// Extract extension (part after last dot in domain)
// Use regex or string methods to find last dot
// Example: "user@company.com" -> "com"
export function extractExtension(email) {

}

// TODO: Implement the isValidExtension function
// Check if extension (after last dot) is 2-6 letters
// Pattern: 2-6 lowercase letters
// Ignore everything before the @ symbol
export function isValidExtension(email) {

}

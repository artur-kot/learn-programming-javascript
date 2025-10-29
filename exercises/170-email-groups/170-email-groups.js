/**
 * CAPTURE GROUPS - EXTRACTING DATA WITH PARENTHESES
 * 
 * Capture groups are parts of a regex pattern enclosed in parentheses ()
 * They "capture" and remember the matched text for later use.
 * 
 * BASIC SYNTAX:
 * =============
 * /pattern(part1)(part2)/
 * 
 * Each pair of parentheses () is a capture group
 * Groups are numbered from left to right: group 1, 2, 3, etc.
 * 
 * ACCESSING CAPTURED GROUPS:
 * ==========================
 * 
 * In match() results:
 * const result = 'user@example.com'.match(/(\w+)@(\w+)/);
 * result[0] = full match: 'user@example'
 * result[1] = group 1: 'user'
 * result[2] = group 2: 'example'
 * 
 * In replace():
 * string.replace(/(group1)(group2)/, '$1-$2')
 * $1 = first captured group
 * $2 = second captured group
 * 
 * EXAMPLE EMAIL PATTERN:
 * ======================
 * /^(\w+)@(\w+)\.(\w+)$/
 * 
 * Group 1: (\w+)     captures local part: "user"
 * @: literal @
 * Group 2: (\w+)     captures domain: "example"
 * \.: literal dot
 * Group 3: (\w+)     captures extension: "com"
 * 
 * Usage:
 * const match = 'user@example.com'.match(/^(\w+)@(\w+)\.(\w+)$/);
 * match[0] = 'user@example.com' (full match)
 * match[1] = 'user' (local)
 * match[2] = 'example' (domain)
 * match[3] = 'com' (extension)
 * 
 * REPLACING WITH GROUPS:
 * ======================
 * 'user@example.com'.replace(/(\w+)@(\w+)\.(\w+)/, '$3.$2/$1')
 * Result: 'com.example/user' (rearranged!)
 * 
 * COMMON USES:
 * ============
 * 1. Extract parts for parsing
 * 2. Rearrange matched text
 * 3. Format data differently
 * 4. Validate and transform simultaneously
 */

// TODO: Implement the extractLocalPart function
// Use capture group to extract part before @
// Pattern: ^(\w+)@ extracts local part in group 1
// Use match() and access [1]
export function extractLocalPart(email) {

}

// TODO: Implement the extractDomainName function
// Use capture group to extract domain (between @ and first dot)
// Pattern: @(\w+)\. captures domain in group 1
// Match and return group 1
export function extractDomainName(email) {

}

// TODO: Implement the extractTLD function
// Use capture group to extract extension (after last dot)
// Pattern: \.(\w+)$ captures TLD in group 1
// Match and return group 1
export function extractTLD(email) {

}

// TODO: Implement the parseEmailParts function
// Use 3 capture groups to extract local, domain, TLD
// Pattern: ^(\w+)@(\w+)\.(\w+)$
// Match and return object: { local: match[1], domain: match[2], tld: match[3] }
export function parseEmailParts(email) {

}

// TODO: Implement the swapEmailParts function
// Extract local and domain, then swap them
// Use replace with capture groups and $1, $2 references
// Pattern: ^(\w+)@(\w+)\.(\w+)$ 
// Replace with: $2@$1.$3
// Example: user@example.com -> example@user.com
export function swapEmailParts(email) {

}

// TODO: Implement the formatEmailParts function
// Reformat email to: "local [at] domain.tld"
// Use replace() with capture groups
// Example: "user@example.com" -> "user [at] example.com"
export function formatEmailParts(email) {

}

// TODO: Implement the maskWithGroups function
// Keep first character of local, mask rest, show domain
// Use replace with capture groups
// Example: "user@example.com" -> "u***@example.com"
// Pattern: ^(.)(.+)(@.+)$ -> $1***$3
export function maskWithGroups(email) {

}

// TODO: Implement the rebuildEmailNormalized function
// Extract all parts and rebuild in lowercase
// Use capture groups to extract, then rebuild normalized
// Example: "USER  @  EXAMPLE.COM" -> "user@example.com"
export function rebuildEmailNormalized(email) {

}

// TODO: Implement the countGroupMatches function
// Count how many capture groups matched
// Use match() with 3 groups: (\w+)@(\w+)\.(\w+)
// Return number of groups that captured data (usually 3 if valid)
export function countGroupMatches(email) {

}

// TODO: Implement the extractWithOptionalSubdomain function
// Extract domain including optional subdomain
// Handle: "user@example.com" -> "example.com"
// And: "user@mail.example.com" -> "mail.example.com"
// Pattern: @(.+\.)(\w+)$ or similar with optional group
// Return the captured domain part
export function extractWithOptionalSubdomain(email) {

}

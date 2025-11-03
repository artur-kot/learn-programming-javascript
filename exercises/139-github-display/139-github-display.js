/**
 * Exercise 144: GitHub User Display
 * Master DOM manipulation by displaying GitHub user profiles beautifully
 * 
 * In this exercise, you'll create functions to render user profile data
 * in the DOM with responsive layouts, loading states, and error handling.
 */

// TODO: Implement createProfileCard(userData)
// Purpose: Create a complete profile card DOM element with all user information
// Accepts: userData (object) with login, name, avatar_url, bio, followers, following, public_repos, location, profile_url
// Returns: A DOM element (div) containing the profile card
// Features: Avatar image, name, bio, stats, location, link to profile
export function createProfileCard(userData) {
  // Create a div with class 'profile-card'
  // Include: avatar, name, bio, stats, location
  // Style with CSS classes
  // Return the element
}

// TODO: Implement formatUserStats(user)
// Purpose: Format user statistics for display
// Accepts: user (object) with followers, following, public_repos
// Returns: Object with formatted strings: { followers: "3.9K", following: "9", repos: "8" }
// Behavior: Format large numbers (1000+ becomes "1K", 1000000+ becomes "1M")
export function formatUserStats(user) {
  // Format followers (1000+ -> 1K)
  // Format following
  // Format public_repos
  // Return object with formatted values
}

// TODO: Implement createStatsRow(label, value)
// Purpose: Create a stat display row (label + value)
// Accepts: label (string), value (string or number)
// Returns: DOM element with styled stat row
// Example: createStatsRow('Followers', '3.9K')
export function createStatsRow(label, value) {
  // Create div with class 'stat-row'
  // Add label span and value span
  // Apply appropriate styling
  // Return element
}

// TODO: Implement createProfileHeader(user)
// Purpose: Create profile header section (avatar + name + badge)
// Accepts: user (object) with avatar_url, name, login
// Returns: DOM element header section
// Features: Avatar image, display name, username in smaller text
export function createProfileHeader(user) {
  // Create header element
  // Add avatar image
  // Add name and username
  // Apply appropriate styling
  // Return header element
}

// TODO: Implement createProfileBio(bio)
// Purpose: Create bio section with text
// Accepts: bio (string)
// Returns: DOM element with bio text
// Behavior: If bio is empty or null, show placeholder text
export function createProfileBio(bio) {
  // Create section for bio
  // Add bio text or placeholder
  // Apply appropriate styling
  // Return element
}

// TODO: Implement renderProfile(containerId, userData)
// Purpose: Render complete profile in a specific container
// Accepts: containerId (string - CSS selector or ID), userData (object)
// Returns: void
// Behavior: Find container, clear it, create profile card, append to container
// Caution: Handle case where container doesn't exist
export function renderProfile(containerId, userData) {
  // Find container by ID
  // Clear any existing content
  // Create profile card
  // Append to container
}

// TODO: Implement createLoadingState()
// Purpose: Create a loading spinner/state element
// Accepts: none
// Returns: DOM element showing loading indicator
// Features: Animated spinner, "Loading..." text
export function createLoadingState() {
  // Create div with loading indicator
  // Add spinner animation
  // Add loading text
  // Return element
}

// TODO: Implement createErrorState(errorMessage)
// Purpose: Create error message display
// Accepts: errorMessage (string)
// Returns: DOM element showing error
// Features: Error icon, message text, red styling
export function createErrorState(errorMessage) {
  // Create div with error styling
  // Add error message
  // Apply error styling
  // Return element
}

// TODO: Implement displayUserProfile(userData, containerId)
// Purpose: Display user profile with loading and error handling
// Accepts: userData (object or null), containerId (string)
// Returns: void
// Behavior: 
//   - If userData is null, show error state
//   - If userData exists, show profile card
//   - Clear container first, then append appropriate element
export function displayUserProfile(userData, containerId) {
  // Find container
  // Clear existing content
  // If userData is null: create and append error state
  // Else: create and append profile card
}

// TODO: Implement attachProfileClickListener(element, callback)
// Purpose: Attach click handler to profile element
// Accepts: element (DOM element), callback (function)
// Returns: void
// Behavior: When profile is clicked, call callback with user data
// Note: Extract user data from element's data attributes
export function attachProfileClickListener(element, callback) {
  // Add click event listener
  // On click, extract user data
  // Call callback with data
}

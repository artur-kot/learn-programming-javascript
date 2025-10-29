function createAddress(street, city, state, zip, country = 'USA') {
  return { street, city, state, zip, country };
}

function createUserProfile(id, firstName, lastName, email, street, city, state, zip) {
  return {
    id,
    firstName,
    lastName,
    email,
    address: createAddress(street, city, state, zip),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    getFullAddress() {
      const { street, city, state, zip, country } = this.address;
      return `${street}, ${city}, ${state} ${zip}, ${country}`;
    }
  };
}

let users = [];

export function createProfile(id, firstName, lastName, email, street, city, state, zip) {
  const profile = createUserProfile(id, firstName, lastName, email, street, city, state, zip);
  users.push(profile);
  return profile;
}

export function getUserById(id) {
  return users.find(user => user.id === id);
}

export function getUserFullName(id) {
  const user = getUserById(id);
  return user ? user.getFullName() : undefined;
}

export function getUserAddress(id) {
  const user = getUserById(id);
  return user ? user.getFullAddress() : undefined;
}

export function updateUserAddress(id, street, city, state, zip) {
  const user = getUserById(id);
  if (!user) return false;
  
  user.address = createAddress(street, city, state, zip, user.address.country);
  user.updatedAt = new Date().toISOString();
  return true;
}

export function getAllUsers() {
  return users;
}

export function addPreferences(userId) {
  const user = getUserById(userId);
  if (!user) return false;
  
  user.preferences = {
    theme: 'light',
    notifications: { email: true, sms: false, push: true },
    privacy: { showEmail: false, showPhone: false }
  };
  return true;
}

export function updateTheme(userId, theme) {
  const user = getUserById(userId);
  if (!user || !user.preferences) return false;
  
  user.preferences.theme = theme;
  return true;
}

export function toggleNotification(userId, type) {
  const user = getUserById(userId);
  if (!user || !user.preferences) return undefined;
  
  user.preferences.notifications[type] = !user.preferences.notifications[type];
  return user.preferences.notifications[type];
}

export function getPreferencesSummary(userId) {
  const user = getUserById(userId);
  if (!user || !user.preferences) return undefined;
  
  const { theme, notifications, privacy } = user.preferences;
  const notificationCount = Object.values(notifications).filter(val => val).length;
  
  return {
    theme,
    notificationCount,
    privacyMode: Object.values(privacy).every(val => val === false)
  };
}

export function getThemeSafely(userId) {
  const user = getUserById(userId);
  return user?.preferences?.theme ?? 'default';
}

export function getEmailNotificationSafely(userId) {
  const user = getUserById(userId);
  return user?.preferences?.notifications?.email;
}

export function getUserCitySafely(userId) {
  const user = getUserById(userId);
  return user?.address?.city ?? 'Unknown';
}

export function isUserInCity(userId, city) {
  const userCity = getUserById(userId)?.address?.city;
  return userCity ? userCity.toLowerCase() === city.toLowerCase() : false;
}

export function populateUsers() {
  createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main St', 'Boston', 'MA', '02101');
  createProfile(2, 'Bob', 'Smith', 'bob@example.com', '456 Oak Ave', 'New York', 'NY', '10001');
  const user3 = createProfile(3, 'Carol', 'Davis', 'carol@example.com', '789 Pine Rd', 'Chicago', 'IL', '60601');
  addPreferences(1);
  addPreferences(2);
}

export function resetUsers() {
  users = [];
}

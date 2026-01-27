/**
 * JSON-based user storage service
 * Uses localStorage to store user data in JSON format
 */

export interface UserData {
  id: string;
  username: string;
  password: string; // In production, this should be hashed
  email?: string;
  mobile?: string;
  countryCode?: string;
  displayName?: string;
  createdAt: string;
  updatedAt: string;
  agreeTerms: boolean;
  agreeBonus: boolean;
}

const STORAGE_KEY = 'riocity9_users';
const CURRENT_USER_KEY = 'riocity9_current_user';

/**
 * Get all users from storage
 */
export function getAllUsers(): UserData[] {
  try {
    const usersJson = localStorage.getItem(STORAGE_KEY);
    if (!usersJson) {
      return [];
    }
    return JSON.parse(usersJson);
  } catch (error) {
    console.error('Error reading users from storage:', error);
    return [];
  }
}

/**
 * Save all users to storage
 */
function saveAllUsers(users: UserData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users to storage:', error);
    throw new Error('Failed to save user data');
  }
}

/**
 * Get user by username
 */
export function getUserByUsername(username: string): UserData | null {
  const users = getAllUsers();
  return users.find(user => user.username.toLowerCase() === username.toLowerCase()) || null;
}

/**
 * Get user by ID
 */
export function getUserById(id: string): UserData | null {
  const users = getAllUsers();
  return users.find(user => user.id === id) || null;
}

/**
 * Get user by mobile number
 */
export function getUserByMobile(mobile: string): UserData | null {
  const users = getAllUsers();
  return users.find(user => user.mobile === mobile) || null;
}

/**
 * Check if username exists
 */
export function usernameExists(username: string): boolean {
  return getUserByUsername(username) !== null;
}

/**
 * Check if mobile number exists
 */
export function mobileExists(mobile: string): boolean {
  return getUserByMobile(mobile) !== null;
}

/**
 * Create a new user
 */
export function createUser(userData: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): UserData {
  const users = getAllUsers();
  
  // Check if username already exists
  if (usernameExists(userData.username)) {
    throw new Error('Username already registered');
  }
  
  // Check if mobile already exists (if provided)
  if (userData.mobile && mobileExists(userData.mobile)) {
    throw new Error('Mobile number already registered');
  }
  
  // Generate unique ID
  const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();
  
  const newUser: UserData = {
    ...userData,
    id,
    createdAt: now,
    updatedAt: now,
  };
  
  users.push(newUser);
  saveAllUsers(users);
  
  return newUser;
}

/**
 * Update user data
 */
export function updateUser(id: string, updates: Partial<Omit<UserData, 'id' | 'createdAt'>>): UserData | null {
  const users = getAllUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  // Check username uniqueness if changing username
  if (updates.username && updates.username !== users[userIndex].username) {
    if (usernameExists(updates.username)) {
      throw new Error('Username already taken');
    }
  }
  
  // Check mobile uniqueness if changing mobile
  if (updates.mobile && updates.mobile !== users[userIndex].mobile) {
    if (mobileExists(updates.mobile)) {
      throw new Error('Mobile number already registered');
    }
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveAllUsers(users);
  return users[userIndex];
}

/**
 * Delete user
 */
export function deleteUser(id: string): boolean {
  const users = getAllUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) {
    return false; // User not found
  }
  
  saveAllUsers(filteredUsers);
  return true;
}

/**
 * Authenticate user (check username and password)
 */
export function authenticateUser(username: string, password: string): UserData | null {
  const user = getUserByUsername(username);
  
  if (!user) {
    return null;
  }
  
  // In production, compare hashed passwords
  if (user.password !== password) {
    return null;
  }
  
  return user;
}

/**
 * Save current logged-in user
 */
export function saveCurrentUser(user: UserData): void {
  try {
    // Don't save password in current user session
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  } catch (error) {
    console.error('Error saving current user:', error);
  }
}

/**
 * Get current logged-in user
 */
export function getCurrentUser(): Omit<UserData, 'password'> | null {
  try {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    if (!userJson) {
      return null;
    }
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error reading current user:', error);
    return null;
  }
}

/**
 * Clear current user (logout)
 */
export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * Export all users as JSON string (for backup/download)
 */
export function exportUsersAsJSON(): string {
  const users = getAllUsers();
  // Remove passwords before exporting
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  return JSON.stringify(usersWithoutPasswords, null, 2);
}

/**
 * Import users from JSON string (for restore/upload)
 */
export function importUsersFromJSON(jsonString: string): void {
  try {
    const users = JSON.parse(jsonString);
    if (!Array.isArray(users)) {
      throw new Error('Invalid JSON format');
    }
    saveAllUsers(users);
  } catch (error) {
    console.error('Error importing users:', error);
    throw new Error('Failed to import users');
  }
}

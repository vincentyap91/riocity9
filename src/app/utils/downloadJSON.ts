/**
 * Utility function to download JSON data as a file
 */

/**
 * Download data as JSON file
 * @param data - The data to download (will be stringified)
 * @param filename - The filename (default: 'users.json')
 */
export function downloadJSON(data: any, filename: string = 'users.json'): void {
  try {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading JSON file:', error);
    throw new Error('Failed to download JSON file');
  }
}

/**
 * Download users data as JSON file
 * Automatically names the file with timestamp
 */
export function downloadUsersJSON(usersData: any[]): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `riocity9_users_${timestamp}.json`;
  downloadJSON(usersData, filename);
}

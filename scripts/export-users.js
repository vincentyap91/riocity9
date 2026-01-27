/**
 * Node.js script to export users from localStorage to JSON file
 * 
 * Usage:
 * 1. Open browser DevTools (F12)
 * 2. Go to Application/Storage → Local Storage
 * 3. Copy the value of 'riocity9_users' key
 * 4. Save it to a file named 'users-export.json' in this scripts folder
 * 5. Run: node scripts/export-users.js
 * 
 * Or use the browser's export feature in Settings page
 */

const fs = require('fs');
const path = require('path');

// Path to export file
const exportPath = path.join(__dirname, '..', 'data', 'users.json');
const dataDir = path.join(__dirname, '..', 'data');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Created data directory:', dataDir);
}

// Try to read from localStorage export file
const localStorageExportPath = path.join(__dirname, 'users-export.json');

if (fs.existsSync(localStorageExportPath)) {
  try {
    const usersData = fs.readFileSync(localStorageExportPath, 'utf8');
    const users = JSON.parse(usersData);
    
    // Remove passwords for security
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    
    // Write to final location
    fs.writeFileSync(exportPath, JSON.stringify(usersWithoutPasswords, null, 2), 'utf8');
    
    console.log(`✅ Successfully exported ${usersWithoutPasswords.length} users to: ${exportPath}`);
    console.log('📝 Passwords have been removed for security');
  } catch (error) {
    console.error('❌ Error processing users data:', error.message);
    process.exit(1);
  }
} else {
  console.log('ℹ️  No users-export.json file found.');
  console.log('\nTo use this script:');
  console.log('1. Open browser DevTools (F12)');
  console.log('2. Go to Application → Local Storage');
  console.log('3. Copy the value of "riocity9_users" key');
  console.log('4. Save it as "users-export.json" in the scripts folder');
  console.log('5. Run this script again');
  console.log('\nOr use the "Export Users Data" button in the Settings page of your app.');
  
  // Create empty file as placeholder
  fs.writeFileSync(exportPath, JSON.stringify([], null, 2), 'utf8');
  console.log(`\n📄 Created empty users file at: ${exportPath}`);
}

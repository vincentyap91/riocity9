// 存储调试工具 - 用于在浏览器控制台查看和管理数据

import { indexedDBStorage } from '../services/storage';
import { API_CONFIG } from '../config/api';

/**
 * 在浏览器控制台中查看所有注册用户
 * 
 * 使用方法：
 * 1. 打开浏览器开发者工具 (F12)
 * 2. 切换到 Console (控制台)
 * 3. 输入：window.viewAllUsers()
 * 4. 或者在代码中调用：viewAllUsers()
 */
export async function viewAllUsers() {
  try {
    if (API_CONFIG.storageType === 'indexeddb') {
      const users = await indexedDBStorage.getAllUsers();
      console.log('=== 所有注册用户 (IndexedDB) ===');
      console.table(users.map(u => ({
        用户名: u.username,
        手机: u.mobile || '未设置',
        推荐码: u.referralCode || '无',
        注册时间: new Date(u.createdAt).toLocaleString('zh-CN'),
      })));
      console.log('完整数据:', users);
      return users;
    } else if (API_CONFIG.storageType === 'localStorage') {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      console.log('=== 所有注册用户 (localStorage) ===');
      console.table(users.map((u: any) => ({
        用户名: u.username,
        手机: u.mobile || '未设置',
        推荐码: u.referralCode || '无',
        注册时间: new Date(u.createdAt).toLocaleString('zh-CN'),
      })));
      console.log('完整数据:', users);
      return users;
    } else {
      console.log('使用 API 模式，数据存储在后端服务器');
      return [];
    }
  } catch (error) {
    console.error('查看用户失败:', error);
    return [];
  }
}

/**
 * 查找特定用户
 */
export async function findUser(username: string) {
  try {
    if (API_CONFIG.storageType === 'indexeddb') {
      const user = await indexedDBStorage.getUserByUsername(username);
      if (user) {
        console.log(`=== 用户信息: ${username} ===`);
        console.log(user);
        return user;
      } else {
        console.log(`用户 ${username} 不存在`);
        return null;
      }
    } else if (API_CONFIG.storageType === 'localStorage') {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = users.find((u: any) => u.username === username);
      if (user) {
        console.log(`=== 用户信息: ${username} ===`);
        console.log(user);
        return user;
      } else {
        console.log(`用户 ${username} 不存在`);
        return null;
      }
    } else {
      console.log('使用 API 模式，请通过后端查看用户信息');
      return null;
    }
  } catch (error) {
    console.error('查找用户失败:', error);
    return null;
  }
}

/**
 * 查看当前存储配置
 */
export function viewStorageConfig() {
  console.log('=== 存储配置 ===');
  console.log('存储类型:', API_CONFIG.storageType);
  console.log('API 地址:', API_CONFIG.baseURL);
  console.log('\n当前登录用户:', localStorage.getItem('user'));
  console.log('Auth Token:', localStorage.getItem('authToken') ? '已设置' : '未设置');
}

/**
 * 清除所有本地数据（谨慎使用）
 */
export async function clearAllLocalData() {
  if (confirm('确定要清除所有本地数据吗？这将删除所有注册用户！')) {
    try {
      if (API_CONFIG.storageType === 'indexeddb') {
        // IndexedDB 清除需要重新创建数据库
        const dbName = 'Riocity9DB';
        const deleteReq = indexedDB.deleteDatabase(dbName);
        deleteReq.onsuccess = () => {
          console.log('IndexedDB 数据已清除');
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
          alert('所有数据已清除！请刷新页面。');
        };
        deleteReq.onerror = () => {
          console.error('清除 IndexedDB 失败');
        };
      } else if (API_CONFIG.storageType === 'localStorage') {
        localStorage.removeItem('registeredUsers');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        console.log('localStorage 数据已清除');
        alert('所有数据已清除！');
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        console.log('本地认证信息已清除（用户数据在后端）');
        alert('本地认证信息已清除！');
      }
    } catch (error) {
      console.error('清除数据失败:', error);
    }
  }
}

// 在开发环境下，将函数暴露到 window 对象，方便在控制台使用
if (typeof window !== 'undefined') {
  (window as any).viewAllUsers = viewAllUsers;
  (window as any).findUser = findUser;
  (window as any).viewStorageConfig = viewStorageConfig;
  (window as any).clearAllLocalData = clearAllLocalData;
  
  console.log('%c存储调试工具已加载！', 'color: green; font-weight: bold;');
  console.log('可用命令:');
  console.log('  - viewAllUsers() - 查看所有注册用户');
  console.log('  - findUser("用户名") - 查找特定用户');
  console.log('  - viewStorageConfig() - 查看存储配置');
  console.log('  - clearAllLocalData() - 清除所有本地数据（谨慎使用）');
}

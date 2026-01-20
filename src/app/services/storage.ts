// IndexedDB 存储服务
// 比 localStorage 更可靠，容量更大，支持结构化数据

interface UserData {
  username: string;
  password: string; // 注意：实际应用中密码应该在传输时加密
  mobile?: string;
  referralCode?: string;
  createdAt: string;
  email?: string;
}

class IndexedDBStorage {
  private dbName = 'Riocity9DB';
  private dbVersion = 1;
  private storeName = 'users';
  private db: IDBDatabase | null = null;

  // 初始化数据库
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(new Error('无法打开数据库'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // 创建 users 对象存储
        if (!db.objectStoreNames.contains(this.storeName)) {
          const objectStore = db.createObjectStore(this.storeName, { keyPath: 'username' });
          objectStore.createIndex('createdAt', 'createdAt', { unique: false });
          objectStore.createIndex('mobile', 'mobile', { unique: false });
        }
      };
    });
  }

  // 确保数据库已初始化
  private async ensureInit(): Promise<void> {
    if (!this.db) {
      await this.init();
    }
  }

  // 获取所有用户
  async getAllUsers(): Promise<UserData[]> {
    await this.ensureInit();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(new Error('获取用户数据失败'));
      };
    });
  }

  // 根据用户名查找用户
  async getUserByUsername(username: string): Promise<UserData | null> {
    await this.ensureInit();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(username);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(new Error('查找用户失败'));
      };
    });
  }

  // 根据手机号查找用户
  async getUserByMobile(mobile: string): Promise<UserData | null> {
    await this.ensureInit();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('mobile');
      const request = index.get(mobile);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(new Error('根据手机号查找用户失败'));
      };
    });
  }

  // 检查用户名是否存在
  async userExists(username: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);
    return user !== null;
  }

  // 添加新用户
  async addUser(userData: UserData): Promise<void> {
    await this.ensureInit();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(userData);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        // 如果用户已存在，会触发此错误
        if (request.error?.name === 'ConstraintError') {
          reject(new Error('用户名已存在'));
        } else {
          reject(new Error('添加用户失败'));
        }
      };
    });
  }

  // 更新用户信息
  async updateUser(username: string, userData: Partial<UserData>): Promise<void> {
    await this.ensureInit();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const getRequest = store.get(username);

      getRequest.onsuccess = () => {
        const existingUser = getRequest.result;
        if (!existingUser) {
          reject(new Error('用户不存在'));
          return;
        }

        const updatedUser = { ...existingUser, ...userData };
        const putRequest = store.put(updatedUser);

        putRequest.onsuccess = () => {
          resolve();
        };

        putRequest.onerror = () => {
          reject(new Error('更新用户失败'));
        };
      };

      getRequest.onerror = () => {
        reject(new Error('查找用户失败'));
      };
    });
  }
}

// 创建单例实例
export const indexedDBStorage = new IndexedDBStorage();

// 导出类型
export type { UserData };

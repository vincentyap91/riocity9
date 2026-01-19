import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_CONFIG } from '../config/api';
import { apiService } from '../services/api';
import { indexedDBStorage, type UserData } from '../services/storage';
// 在浏览器环境中加载调试工具
if (typeof window !== 'undefined') {
  import('../utils/storage-debug');
}

interface User {
  username: string;
  email?: string;
  mobile?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, mobile?: string, referralCode?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 初始化存储系统
  useEffect(() => {
    // 如果是使用 IndexedDB，初始化数据库
    if (API_CONFIG.storageType === 'indexeddb') {
      indexedDBStorage.init().catch((error) => {
        console.error('IndexedDB 初始化失败，回退到 localStorage:', error);
      });
    }

    // 加载保存的登录状态
    loadSavedUser();
  }, []);

  // 加载保存的用户信息
  const loadSavedUser = async () => {
    try {
      // 优先从 localStorage 加载当前登录用户（轻量级信息）
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          
          // 如果使用 API，验证 token 是否有效
          if (API_CONFIG.storageType === 'api') {
            try {
              const response = await apiService.verifyToken();
              if (response.success && response.user) {
                setUser(response.user);
                return;
              }
            } catch (error) {
              console.error('Token 验证失败:', error);
              // Token 无效，清除本地存储
              localStorage.removeItem('user');
              localStorage.removeItem('authToken');
            }
          } else {
            // IndexedDB 或 localStorage 模式，直接使用保存的用户信息
            setUser(userData);
          }
        } catch (error) {
          console.error('解析用户数据失败:', error);
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('加载用户信息失败:', error);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // 基本表单验证
    if (!username || !password) {
      alert('请输入用户名和密码');
      return false;
    }

    if (username.length < 3) {
      alert('用户名至少需要3个字符');
      return false;
    }

    if (password.length < 6) {
      alert('密码至少需要6个字符');
      return false;
    }

    try {
      // 根据配置使用不同的存储方式
      if (API_CONFIG.storageType === 'api') {
        // 使用后端 API
        const response = await apiService.login({ username, password });
        
        if (response.success && response.user) {
          const userData: User = {
            username: response.user.username,
            email: response.user.email,
            mobile: response.user.mobile,
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          return true;
        } else {
          alert(response.message || '登录失败');
          return false;
        }
      } else if (API_CONFIG.storageType === 'indexeddb') {
        // 使用 IndexedDB
        const foundUser = await indexedDBStorage.getUserByUsername(username);
        
        if (!foundUser || foundUser.password !== password) {
          alert('用户名或密码错误');
          return false;
        }

        const userData: User = {
          username: foundUser.username,
          email: foundUser.email,
          mobile: foundUser.mobile,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        // 使用 localStorage（后备方案）
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const foundUser = storedUsers.find(
          (u: { username: string; password: string }) => 
            u.username === username && u.password === password
        );

        if (!foundUser) {
          alert('用户名或密码错误');
          return false;
        }

        const userData: User = {
          username: foundUser.username,
          email: foundUser.email,
          mobile: foundUser.mobile,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    } catch (error) {
      console.error('登录错误:', error);
      alert(error instanceof Error ? error.message : '登录失败，请稍后重试');
      return false;
    }
  };

  const register = async (
    username: string, 
    password: string, 
    mobile?: string, 
    referralCode?: string
  ): Promise<boolean> => {
    // 基本表单验证
    if (!username || !password) {
      alert('请输入用户名和密码');
      return false;
    }

    if (username.length < 3) {
      alert('用户名至少需要3个字符');
      return false;
    }

    if (password.length < 6) {
      alert('密码至少需要6个字符');
      return false;
    }

    try {
      // 根据配置使用不同的存储方式
      if (API_CONFIG.storageType === 'api') {
        // 使用后端 API
        const response = await apiService.register({
          username,
          password,
          mobile,
          referralCode,
        });

        if (response.success && response.user) {
          const userData: User = {
            username: response.user.username,
            email: response.user.email,
            mobile: response.user.mobile,
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          return true;
        } else {
          alert(response.message || '注册失败');
          return false;
        }
      } else if (API_CONFIG.storageType === 'indexeddb') {
        // 使用 IndexedDB
        // 检查用户名是否已存在
        const userExists = await indexedDBStorage.userExists(username);
        
        if (userExists) {
          alert('用户名已存在，请选择其他用户名');
          return false;
        }

        // 创建新用户
        const newUser: UserData = {
          username,
          password, // 注意：在实际应用中，密码应该在传输时加密
          mobile,
          referralCode,
          createdAt: new Date().toISOString(),
        };

        await indexedDBStorage.addUser(newUser);

        // 注册成功后自动登录
        const userData: User = {
          username,
          mobile,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        // 使用 localStorage（后备方案）
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userExists = storedUsers.some(
          (u: { username: string }) => u.username === username
        );

        if (userExists) {
          alert('用户名已存在，请选择其他用户名');
          return false;
        }

        const newUser = {
          username,
          password, // 注意：在实际应用中，密码应该被哈希加密
          mobile,
          referralCode,
          createdAt: new Date().toISOString(),
        };

        storedUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));

        // 注册成功后自动登录
        const userData: User = {
          username,
          mobile,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    } catch (error) {
      console.error('注册错误:', error);
      alert(error instanceof Error ? error.message : '注册失败，请稍后重试');
      return false;
    }
  };

  const logout = async () => {
    try {
      // 如果使用 API，调用后端登出接口
      if (API_CONFIG.storageType === 'api') {
        await apiService.logout();
      }
    } catch (error) {
      console.error('登出错误:', error);
    } finally {
      // 清除本地用户信息
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

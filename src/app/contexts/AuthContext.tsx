import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // 从 localStorage 加载登录状态
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // 模拟登录验证
    // 在实际应用中，这里应该调用后端 API
    
    // 基本的表单验证
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

    // 检查本地存储的用户（模拟数据库）
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = storedUsers.find(
      (u: { username: string; password: string }) => 
        u.username === username && u.password === password
    );

    if (!foundUser) {
      alert('用户名或密码错误');
      return false;
    }

    // 登录成功
    const userData: User = {
      username: foundUser.username,
      email: foundUser.email,
      mobile: foundUser.mobile,
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
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

    // 检查用户名是否已存在
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = storedUsers.some(
      (u: { username: string }) => u.username === username
    );

    if (userExists) {
      alert('用户名已存在，请选择其他用户名');
      return false;
    }

    // 注册新用户（模拟数据库）
    const newUser = {
      username,
      password, // 在实际应用中，密码应该被哈希加密
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
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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

// API 服务层
// 用于与后端服务器通信

import { API_CONFIG } from '../config/api';

interface RegisterRequest {
  username: string;
  password: string;
  mobile?: string;
  referralCode?: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user?: {
    username: string;
    email?: string;
    mobile?: string;
  };
  token?: string;
  message?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
  }

  // 获取认证头
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // 处理 API 响应
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: '请求失败' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // 注册用户
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse<AuthResponse>(response);
      
      // 如果返回了 token，保存它
      if (result.token) {
        localStorage.setItem('authToken', result.token);
      }

      return result;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  }

  // 登录用户
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse<AuthResponse>(response);
      
      // 如果返回了 token，保存它
      if (result.token) {
        localStorage.setItem('authToken', result.token);
      }

      return result;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  }

  // 验证 token（用于检查用户是否仍然登录）
  async verifyToken(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/verify`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<AuthResponse>(response);
    } catch (error) {
      console.error('Verify token API error:', error);
      throw error;
    }
  }

  // 登出
  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseURL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });
      
      // 清除本地 token
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout API error:', error);
      // 即使 API 调用失败，也清除本地 token
      localStorage.removeItem('authToken');
    }
  }
}

// 创建单例实例
export const apiService = new ApiService();

// 导出类型
export type { RegisterRequest, LoginRequest, AuthResponse };

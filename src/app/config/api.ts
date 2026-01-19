// API 配置文件
// 设置你的后端 API 端点地址
export const API_CONFIG = {
  // 如果使用后端 API，设置这里的基础 URL
  // 例如: 'https://api.yourapp.com' 或 'http://localhost:3000/api'
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // 使用哪种存储方式
  // 'api' - 使用后端 API (推荐，生产环境)
  // 'indexeddb' - 使用 IndexedDB (本地数据库，比 localStorage 更可靠)
  // 'localStorage' - 使用 localStorage (旧方式，不推荐)
  storageType: (import.meta.env.VITE_STORAGE_TYPE || 'indexeddb') as 'api' | 'indexeddb' | 'localStorage',
  
  // API 超时设置（毫秒）
  timeout: 10000,
};

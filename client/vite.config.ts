// vite.config.ts：
// Vite 的配置文件
// 用于配置开发服务器、构建选项、插件等
// 这里配置了 React 插件，使 Vite 能够处理 React 组件

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],  // 使用 React 插件，支持 JSX 语法
})

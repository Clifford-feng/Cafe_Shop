/** @type {import('tailwindcss').Config} */
// tailwind.config.cjs：
// Tailwind CSS 的配置文件
// 用于自定义 Tailwind 的主题、变体、插件等
// 这里配置了需要处理的文件范围和主题扩展

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 
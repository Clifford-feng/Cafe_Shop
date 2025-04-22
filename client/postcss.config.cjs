// postcss.config.cjs：
// PostCSS 的配置文件
// 用于配置 CSS 处理工具
// 这里配置了 Tailwind CSS 和 Autoprefixer

module.exports = {
  plugins: {
    '@tailwindcss/postcss7-compat': {},
    autoprefixer: {},
  },
} 
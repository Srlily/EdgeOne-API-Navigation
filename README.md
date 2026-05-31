# EdgeOne-API-Navigation

一个现代化的 API 导航页面，基于 Next.js 15 构建，部署在 EdgeOne Pages 平台。

## 项目特性

- 🚀 **基于 Next.js 15** - 使用最新的 React 19 和 TypeScript
- 🎨 **精美的 UI 设计** - 采用 Tailwind CSS 4.0 构建响应式界面
- ✨ **流畅的动画效果** - 使用 GSAP 实现高质量交互动画
- 🌓 **深色/浅色主题** - 支持主题切换，适应不同使用场景
- 🎯 **磁力卡片效果** - 创新的鼠标跟踪交互体验
- 📦 **图片代理 API** - 提供图片访问代理服务
- 🌐 **边缘部署** - 部署在 EdgeOne Pages，享受边缘计算优势

## 技术栈

- **框架**: Next.js 15.0
- **UI 库**: React 19.0
- **样式**: Tailwind CSS 4.0
- **动画**: GSAP 3.12 + @gsap/react
- **图像处理**: Sharp 0.33 + image-size
- **部署平台**: EdgeOne Pages

## 项目结构

```
EdgeOne-API-Navigation/
├── src/
│   ├── app/
│   │   ├── api/              # API 路由
│   │   │   └── img/           # 图片代理 API
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局组件
│   │   └── page.tsx          # 首页
│   ├── components/           # React 组件
│   │   ├── APICard.tsx       # API 卡片组件
│   │   ├── APIGrid.tsx       # API 网格布局
│   │   ├── Footer.tsx        # 页脚组件
│   │   ├── Hero.tsx          # 英雄区域组件
│   │   ├── MagneticCard.tsx # 磁力卡片组件
│   │   └── ThemeToggle.tsx   # 主题切换组件
│   └── lib/                  # 工具函数
│       ├── animation.ts      # 动画工具
│       └── image.ts         # 图像处理工具
├── public/                   # 静态资源
├── edgeone.json             # EdgeOne 配置文件
├── next.config.ts           # Next.js 配置
├── tailwind.config.ts       # Tailwind CSS 配置
└── package.json             # 项目依赖配置
```

## 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- pnpm 8.0 或更高版本（推荐）

### 环境变量配置

在项目根目录创建 `.env.local` 文件（开发环境）或在 EdgeOne 控制台配置环境变量：

#### 必需的环境变量

```env
# 图片代理 API 目标地址
IMAGE_PROXY_URL=https://img.srliy.com

# 可选：API 域名配置
NEXT_PUBLIC_API_DOMAIN=api.srliy.com
```

#### EdgeOne Pages 环境变量配置

在 EdgeOne Pages 控制台配置以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `IMAGE_PROXY_URL` | `https://img.srliy.com` | 图片代理目标地址 |
| `NEXT_PUBLIC_API_DOMAIN` | `api.srliy.com` | API 访问域名 |

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动开发服务器：

```bash
pnpm dev
```

访问 `http://localhost:3000` 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

### 代码检查

```bash
pnpm lint
```

## 许可证

本项目基于 MIT 许可证开源。


## 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/)
- [EdgeOne Pages](https://edgeone.pages.dev/)

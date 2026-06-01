# EdgeOne-API-Navigation

一个现代化的 API 导航页面，基于 Next.js 15 构建，部署在 EdgeOne Pages 平台。

Demo：https://api.srliy.com

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

## API 接口

### 图片代理 API

项目提供两个图片代理 API 接口，用于访问外部图片资源。

#### GET /api/img

返回随机图片或默认图片。

**请求示例**:
```
GET https://api.srliy.com/api/img
```

**响应**: 直接返回图片文件

**响应头**:
```
Content-Type: image/jpeg (根据实际图片类型)
Cache-Control: public, max-age=3600
Access-Control-Allow-Origin: *
```

#### GET /api/img/[...path]

代理访问指定路径的图片资源。

**请求示例**:
```
GET https://api.srliy.com/api/img/photo.jpg
GET https://api.srliy.com/api/img/folder/image.png
```

**参数**:
- `path`: 图片路径（支持多级目录）

**响应头**:
```
Content-Type: image/jpeg
Cache-Control: public, max-age=31536000, immutable
Access-Control-Allow-Origin: *
X-Proxy-From: https://img.srliy.com
```

**使用说明**:
- 图片来源于 `IMAGE_PROXY_URL` 环境变量指定的目标地址
- 支持常见图片格式：JPEG、PNG、GIF、WebP、SVG、AVIF 等
- 启用长期缓存，提高访问速度
- 请求超时设置为 10 秒，避免长时间等待

## 主要组件

### Hero 组件

主页的英雄区域，包含：
- 渐变文字标题动画
- 字符逐个显示效果
- 呼吸动画分隔线
- 副标题淡入效果

### API 卡片与网格

- `APICard.tsx`: 单个 API 展示卡片
- `APIGrid.tsx`: API 网格布局容器，包含 GSAP 动画
- `MagneticCard.tsx`: 磁力交互卡片，支持鼠标跟踪效果

### 主题系统

- `ThemeToggle.tsx`: 深色/浅色主题切换按钮
- 全局样式支持主题变量

### 页脚

- `Footer.tsx`: 包含导航链接和版权信息
- 连接到 GitHub 仓库

## 动画效果

项目使用 GSAP 实现以下动画效果：

1. **Hero 区域动画**
   - 标题字符逐个淡入旋转
   - 分隔线缩放动画
   - 副标题滑动淡入

2. **API 卡片动画**
   - 卡片渐入模糊效果
   - 缩放和位置动画
   - 交错出现效果

3. **磁力卡片效果**
   - 鼠标跟踪旋转
   - 悬停缩放
   - 按压反馈

## 部署

### EdgeOne Pages

项目已配置 EdgeOne Pages 部署：

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm run build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "devCommand": "pnpm run dev"
}
```

### 部署步骤

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Update project"
   git push origin main
   ```

2. **在 EdgeOne Pages 连接仓库**
   - 登录 EdgeOne 控制台
   - 创建新项目，选择 GitHub 仓库
   - 配置构建命令：`pnpm run build`
   - 配置输出目录：`.next`

3. **配置环境变量**
   在 EdgeOne Pages 控制台的环境变量设置中添加：
   
   | 变量名 | 值 | 说明 |
   |--------|-----|------|
   | `IMAGE_PROXY_URL` | `https://img.srliy.com` | 图片代理目标地址 |

4. **部署完成**
   - EdgeOne 会自动构建并部署
   - 访问分配的域名即可查看网站

### 手动部署

1. 构建项目：`pnpm build`
2. 将 `.next` 目录部署到你的服务器或 CDN

## 常见问题

### 1. API 返回 404 Not Found

**问题**: 访问 `/api/img` 返回 404

**解决方案**:
- 检查 EdgeOne Pages 是否正确构建了所有路由
- 确认 `src/app/api/img/route.ts` 文件存在
- 重新部署项目

### 2. API 返回 504 超时错误

**问题**: 请求超时，返回 `CLOUD_FUNCTION_INVOCATION_TIMEOUT`

**解决方案**:
- 检查目标图片服务器 `https://img.srliy.com` 是否可访问
- 确认环境变量 `IMAGE_PROXY_URL` 配置正确
- 检查网络连接是否稳定
- 代码已添加 10 秒超时限制，如果目标服务器响应慢会返回 502

### 3. 图片无法显示

**问题**: 通过 API 获取的图片无法正常显示

**解决方案**:
- 检查 `X-Proxy-From` 响应头确认代理来源
- 确认目标图片格式是否受支持
- 检查浏览器控制台是否有 CORS 错误

### 4. 环境变量不生效

**问题**: 修改环境变量后 API 仍然使用旧配置

**解决方案**:
- EdgeOne Pages 需要重新部署才能使环境变量生效
- 在 EdgeOne 控制台手动触发重新部署
- 确认环境变量名称拼写正确（区分大小写）

## 开发指南

### 添加新的 API 卡片

在 `APIGrid.tsx` 中修改 `apiList` 数组：

```typescript
const apiList: APIItem[] = [
  {
    name: 'API 名称',
    url: '/api/endpoint',
    desc: 'API 描述',
    icon: <YourIcon />,
    status: 'active' | 'maintenance'
  }
];
```

### 添加新的 API 路由

在 `src/app/api/` 下创建新的路由文件：

```
src/app/api/your-api/route.ts
```

## 许可证

本项目基于 MIT 许可证开源。


## 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/)
- [EdgeOne Pages](https://edgeone.pages.dev/)

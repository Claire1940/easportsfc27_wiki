import type { LucideIcon } from 'lucide-react'
import {
	CalendarClock,
	Package,
	MonitorSmartphone,
	TrendingUp,
	Sparkles,
	Trophy,
	Star,
	BookOpen,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'release' -> t('nav.release')
	path: string // URL 路径，如 '/release'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

// 导航配置：EA Sports FC 27 - 8 个内容分类
export const NAVIGATION_CONFIG: NavigationItem[] = [
	{
		key: 'release',
		path: '/release',
		icon: CalendarClock,
		isContentType: true,
	},
	{
		key: 'editions',
		path: '/editions',
		icon: Package,
		isContentType: true,
	},
	{
		key: 'platforms',
		path: '/platforms',
		icon: MonitorSmartphone,
		isContentType: true,
	},
	{
		key: 'career',
		path: '/career',
		icon: TrendingUp,
		isContentType: true,
	},
	{
		key: 'features',
		path: '/features',
		icon: Sparkles,
		isContentType: true,
	},
	{
		key: 'teams',
		path: '/teams',
		icon: Trophy,
		isContentType: true,
	},
	{
		key: 'ratings',
		path: '/ratings',
		icon: Star,
		isContentType: true,
	},
	{
		key: 'guide',
		path: '/guide',
		icon: BookOpen,
		isContentType: true,
	},
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['release', 'editions', 'platforms', 'career', 'features', 'teams', 'ratings', 'guide']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}

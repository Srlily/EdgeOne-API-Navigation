import Link from "next/link";

interface APICardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

export default function APICard({ 
  title, 
  description, 
  href, 
  icon,
  badge,
  badgeColor = "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
}: APICardProps) {
  return (
    <Link href={href} className="group">
      <div className="h-full p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-hover">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl animate-float">{icon}</div>
          {badge && (
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
          <span>查看详情</span>
          <svg 
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

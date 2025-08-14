import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function ToolCard({
  title,
  subtitle,
  href,
  Icon,
  iconBg = "bg-blue-50"
}: {
  title: string;
  subtitle: string;
  href: string;            // keep string (typedRoutes disabled)
  Icon: LucideIcon;        // type-only import
  iconBg?: string;
}) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group-hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className={`p-4 rounded-xl ${iconBg} group-hover:bg-blue-100 transition-colors`}>
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</div>
            <div className="text-sm text-gray-600 mt-1">{subtitle}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
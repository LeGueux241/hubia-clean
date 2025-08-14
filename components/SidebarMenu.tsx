"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarClock,
  Wand2,
  Image as ImageIcon,
  UserCircle2,
  BadgeInfo,
  PenLine,
  Mail,
  MessageSquareText,
  Search,
} from "lucide-react";

function Item({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "group flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-all",
        active
          ? "bg-blue-100 text-blue-800"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      ].join(" ")}
    >
      <Icon className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function SidebarMenu() {
  return (
    <div className="flex flex-col justify-between h-full">
      <nav className="space-y-6 overflow-y-auto px-0 py-6">
        <div>
          <Item href="/" label="Dashboard" Icon={LayoutDashboard} />
        </div>

        <div>
          <h3 className="px-4 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Outils IA</h3>
          <div className="space-y-1">
            <Item href="/reunions" label="Réunions" Icon={CalendarClock} />
            <Item href="/images" label="Générateur visuels" Icon={Wand2} />
            <Item href="/galerie" label="Galerie" Icon={ImageIcon} />
          </div>
        </div>

        <div>
          <h3 className="px-4 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Agents IA</h3>
          <div className="space-y-1">
            <Item href="/agents/lefebvre" label="Agent Lefebvre" Icon={UserCircle2} />
            <Item href="/agents/onboarding" label="Onboarding" Icon={BadgeInfo} />
            <Item href="/agents/linkedin" label="Post LinkedIn" Icon={PenLine} />
            <Item href="/agents/newsletter" label="Newsletter" Icon={Mail} />
          </div>
        </div>

        <div>
          <h3 className="px-4 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rechercher</h3>
          <div className="space-y-1">
            <Item href="/rechercher" label="Rechercher" Icon={Search} />
          </div>
        </div>

        <div>
          <h3 className="px-4 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Conversations</h3>
          <div className="space-y-1">
            <Item href="#" label="Conversation sans titre" Icon={MessageSquareText} />
            <Item href="#" label="Utilisation et avantages du code Dal..." Icon={MessageSquareText} />
            <Item href="#" label="L'importance croissante de l’IA dans..." Icon={MessageSquareText} />
            <Item href="#" label="Échanges amicaux et salutations qu..." Icon={MessageSquareText} />
          </div>
        </div>
      </nav>
    </div>
  );
}

"use client";

import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Profil utilisateur */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            GS
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-gray-900">Grégoire Sillard</div>
            <div className="text-xs text-gray-500">Lefebvre Dalloz</div>
          </div>
        </div>
      </div>

      {/* Menu principal */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-sm">
        <SidebarMenu />
      </nav>

      {/* Pied de page */}
      <div className="px-4 pb-4 text-xs text-gray-400 text-center">
        Besoin d’aide ?
      </div>
    </aside>
  );
}

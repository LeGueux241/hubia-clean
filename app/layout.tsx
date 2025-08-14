import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hub IA Lefebvre Dalloz",
  description: "Votre hub IA pour gagner du temps et booster votre productivité",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex flex-col flex-1 overflow-hidden" style={{ background: "var(--bg-muted)" }}>
            <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm shrink-0">
              <h1 className="text-lg font-semibold">Lefebvre Dalloz</h1>
              <p className="text-sm text-gray-500">Hub IA Lefebvre Dalloz</p>
            </header>
            <div className="flex-1 overflow-auto">
              <div className="mx-auto w-full p-6 sm:p-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

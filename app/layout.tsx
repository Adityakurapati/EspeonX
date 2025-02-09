"use client";

import { Poppins } from "next/font/google";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get current route

  // Define routes where the sidebar should be hidden
  const hideSidebarRoutes = ["/", "/login", "/signup"];

  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex">
        {/* Conditionally render Sidebar only if not on login or signup page */}
        {!hideSidebarRoutes.includes(pathname) && <Sidebar />}
        
        {/* Main content wrapper to avoid overlap */}
        <main className={hideSidebarRoutes.includes(pathname) ? "w-full" : "ml-64 w-full"}>
          {children}
        </main>
      </body>
    </html>
  );
}

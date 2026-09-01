"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebar =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register";

  return (
    <>
      {!hideSidebar && <Sidebar />}

      <div className={hideSidebar ? "" : "ml-64 pt-16"}>
        {children}
      </div>
    </>
  );
}
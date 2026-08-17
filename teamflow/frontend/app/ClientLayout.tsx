"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebar = pathname === "/";

  return (
    <>
      {!hideSidebar && <Sidebar />}
      {/* <Navbar /> */}

      <div className={hideSidebar ? "" : "ml-64 pt-16"}>
        {children}
      </div>
    </>
  );
}
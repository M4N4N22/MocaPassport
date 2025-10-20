"use client";

import Sidebar from "@/components/docs/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OnThisPage } from "@/components/OnThisPage"; // ✅ import here

interface Props {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: Props) {
  const pathname = usePathname();

  // Build breadcrumb segments dynamically
  const segments = pathname
    .replace("/docs/components", "")
    .split("/")
    .filter(Boolean)
    .filter((seg) => seg.toLowerCase() !== "industry");

  const breadcrumbItems = [
    { label: "Components", href: "/docs/components" },
    ...segments.map((segment, idx) => {
      const href =
        "/docs/components" + "/" + segments.slice(0, idx + 1).join("/");
      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { label, href };
    }),
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left sidebar */}
      <Sidebar />

      {/* Main + floating "On This Page" container */}
      <div className="flex flex-1 relative">
        <main className="px-12 py-12 overflow-y-auto flex-1">
          {/* Breadcrumb */}
          <nav className="text-sm text-zinc-500 mb-6" aria-label="breadcrumb">
            {breadcrumbItems.map((item, idx) => (
              <span key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
                {idx < breadcrumbItems.length - 1 && (
                  <span className="mx-2">/</span>
                )}
              </span>
            ))}
          </nav>

          {/* Page content */}
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Stethoscope, Banknote } from "lucide-react";

// --------------------
// Types
// --------------------
interface Subitem {
  label: string;
  href: string;
}

interface SidebarItemBase {
  label: string;
  href: string;
  id?: string;
  icon?: React.ReactNode;
}

interface SidebarItemWithSubitems extends SidebarItemBase {
  subitems: Subitem[];
}

type SidebarItem = SidebarItemBase | SidebarItemWithSubitems;

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

// --------------------
// Sidebar Data
// --------------------
const sidebarSections: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs/components", id: "introduction" },
      { label: "MocaLogin", href: "/docs/components/moca-login" },
    ],
  },
  {
    title: "Verticals",
    items: [
      {
        label: "Gaming",
        href: "/docs/components/industry/gaming",
        icon: <Gamepad2 className="w-4 h-4 text-primary" />,
        subitems: [
          { label: "MocaConnectWidget", href: "/docs/components/industry/gaming/mocaconnectwidget" },
          { label: "MocaGamingPassport", href: "/docs/components/industry/gaming/mocagamingpassport" },
          { label: "MocaVerificationDashboard", href: "/docs/components/industry/gaming/mocaverificationdashboard" },
        ],
      },
      {
        label: "Finance",
        href: "/docs/components/industry/finance",
        icon: <Banknote className="w-4 h-4 text-green-600" />,
      },
      {
        label: "Healthcare",
        href: "/docs/components/industry/healthcare",
        icon: <Stethoscope className="w-4 h-4 text-sky-600" />,
      },
    ],
  },
];

// --------------------
// Type Guard
// --------------------
function hasSubitems(item: SidebarItem): item is SidebarItemWithSubitems {
  return "subitems" in item && Array.isArray(item.subitems);
}

// --------------------
// Component
// --------------------
interface SidebarProps {
  activeId?: string;
}

export default function Sidebar({ activeId }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-1/4 border-zinc-800 p-6 sticky top-0 h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">Components</h2>

      <nav className="space-y-6">
        {sidebarSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold uppercase text-zinc-500 mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href || "#"}
                    className={`text-sm w-fit text-left px-2 py-1 rounded-md transition flex items-center gap-2 ${
                      pathname === item.href
                        ? "bg-zinc-800 text-foreground"
                        : "text-muted-foreground hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                  </Link>

                  {/* Render Subitems if they exist */}
                  {hasSubitems(item) && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.subitems.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            className={`text-xs w-full text-left px-2 py-1 rounded-md transition ${
                              pathname === sub.href
                                ? "bg-zinc-800 text-foreground"
                                : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

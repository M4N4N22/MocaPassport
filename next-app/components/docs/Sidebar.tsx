"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Final curated sections
const sections = [
  {
    title: "Authentication",
    items: ["MocaLoginButton", "UserIdentityBadge", "LogoutButton"],
  },
  {
    title: "Platform Connections",
    items: [
      "PlatformConnectButton",
      "PlatformConnectList",
      "PlatformConnectionStatus",
    ],
  },
  {
    title: "Gaming Profile Data",
    items: ["GameSelector", "RankSelector"],
  },
  {
    title: "Credential Flow",
    items: [
      "CredentialPreview",
      "IssueCredentialButton",
      "CredentialIssuedModal",
      "VerifyCredentialButton",
    ],
  },
  {
    title: "Theme",
    items: ["MocaThemeProvider"],
  },
];

// convert component names into kebab-case routes
const toKebabCase = (str: string) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

export default function MocaSidebar() {
  const router = useRouter();

  const handleSelect = (section: string, component: string) => {
    router.push(
      `/docs/components/industry/gaming/${toKebabCase(
        section
      )}/${toKebabCase(component)}`
    );
  };

  return (
    <aside className="w-72 border-r border-zinc-200 dark:border-zinc-800 h-screen overflow-y-auto bg-background p-4">
      <h2 className="font-bold text-xl mb-4">Moca Components</h2>

      <Accordion type="multiple" className="space-y-2">
        {sections.map(({ title, items }) => (
          <AccordionItem key={title} value={title} className="border-none">
            <AccordionTrigger
              className={cn(
                "flex items-center justify-between w-full px-2 py-2 rounded-lg font-medium hover:bg-accent transition-colors"
              )}
            >
              <span>{title}</span>
            </AccordionTrigger>

            <AccordionContent className="pl-4 space-y-1 mt-1">
              {items.map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 3 }}
                  onClick={() => handleSelect(title, item)}
                  className="block w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-muted"
                >
                  {item}
                </motion.button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}

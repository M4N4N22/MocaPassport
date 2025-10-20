"use client";

import { useEffect, useState } from "react";

export function OnThisPage() {
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Collect section titles dynamically after content is ready
  useEffect(() => {
    const updateSections = () => {
      const elems = Array.from(document.querySelectorAll("section[id]")).map(
        (el) => ({
          id: el.id,
          title:
            el.querySelector("h1, h2, h3")?.textContent ??
            el.id.replace(/-/g, " "),
        })
      );
      setSections(elems);
    };

    // Delay a bit to ensure docs content has mounted
    const timeout = setTimeout(updateSections, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Track scroll to highlight active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [sections.length]);

  if (!sections.length) return null;

  return (
    <aside className="hidden lg:block fixed top-28 right-12 w-56 text-sm text-zinc-400">
      <h3 className="text-muted-foreground font-semibold mb-3 text-xs uppercase">
        On this page
      </h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block hover:text-foreground transition-colors ${
                activeId === section.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

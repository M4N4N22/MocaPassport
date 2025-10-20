// app/docs/components/layout.tsx
import ClientLayout from "./layout-client";

export const metadata = {
  title: "Moca Components Docs",
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  // Simply wrap children with client layout
  return <ClientLayout>{children}</ClientLayout>;
}

'use client';

import { CodeBlock } from '@/components/CodeBlock';
import { Gamepad2 } from 'lucide-react';

export default function GamingDocsPage() {
  return (
    <div className=" max-w-4xl space-y-12">
      <h1 className="text-3xl font-semibold flex items-center gap-2">
        <Gamepad2 className="w-6 h-6 text-primary" /> Gaming Components
      </h1>
      <p className="text-zinc-400 mb-6">
        Prebuilt UI components and credential tools to manage player achievements, tournaments, and linked game accounts.
      </p>

      <section id="gaming-connect">
        <h3 className="text-xl font-semibold mb-2">MocaConnectWidget</h3>
        <p className="text-zinc-400 mb-3">Connect and issue game-based credentials for players.</p>
        <CodeBlock code={`import { MocaConnectWidget } from "@moca/gaming";\n\n<MocaConnectWidget />`} />
      </section>

      <section id="gaming-passport">
        <h3 className="text-xl font-semibold mb-2">MocaGamingPassport</h3>
        <p className="text-zinc-400 mb-3">Display player profile, connected games, and credentials.</p>
        <CodeBlock code={`import { MocaGamingPassport } from "@moca/gaming";\n\n<MocaGamingPassport user={user} />`} />
      </section>

      <section id="gaming-dashboard">
        <h3 className="text-xl font-semibold mb-2">MocaVerificationDashboard</h3>
        <p className="text-zinc-400 mb-3">Admin dashboard for verifying and managing issued credentials.</p>
        <CodeBlock code={`import { MocaVerificationDashboard } from "@moca/gaming";\n\n<MocaVerificationDashboard />`} />
      </section>
    </div>
  );
}

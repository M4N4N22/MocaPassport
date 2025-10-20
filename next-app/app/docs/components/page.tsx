import { CodeBlock } from "@/components/CodeBlock";

export default function ComponentsDocsPage() {
  return (
    <div className="relative flex">
      {/* Main Content */}
      <div className="w-full lg:w-[calc(100%-14rem)] space-y-12">
        <section id="introduction">
          <h1 className="text-3xl font-semibold mb-4">Introduction</h1>
          <p className="text-zinc-400 max-w-3xl leading-relaxed">
            Moca Passport SDK is a modular identity and credential framework
            designed to power multiple industries — from gaming to finance,
            healthcare, and beyond.
          </p>
        </section>

        <section id="installation" className="space-y-3">
          <h2 className="text-2xl font-semibold mb-2">Installation</h2>
          <p className="text-zinc-400">
            Install the core SDK and optional verticals:
          </p>

          <CodeBlock title="Core SDK" code={`npm install @mocapassport/sdk`} />
          <CodeBlock
            title="Optional Vertical Packages"
            code={`npm install @mocapassport/gaming
npm install @mocapassport/finance
npm install @mocapassport/healthcare`}
          />
        </section>

        <section id="core-hooks" className="space-y-3">
          <h2 className="text-2xl font-semibold mb-4">Core Hooks</h2>
          <CodeBlock code={`import { useMocaIdentity } from "@mocapassport/sdk";`} />
          <CodeBlock code={`const { user, login, logout } = useMocaIdentity();`} />
        </section>

        <section id="core-utils">
          <h2 className="text-2xl font-semibold mb-4">Core Utilities</h2>
          <CodeBlock
            code={`import { issueCredential, verifyCredential } from "@mocapassport/sdk";`}
          />
        </section>
      </div>

    </div>
  );
}

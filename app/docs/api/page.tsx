"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ClipboardIcon, CheckIcon } from "lucide-react";

const endpoints = [
  {
    category: "Credentials",
    title: "Issue Credential",
    method: "POST",
    path: "/api/credentials/issue",
    desc: "Issue a new credential to a user, with optional attributes and expiration.",
    request: {
      userId: "user_123",
      type: "gaming_achievement",
      attributes: { score: 4200 },
    },
    response: {
      credentialId: "cred_abc123",
      status: "issued",
      issuedAt: "2025-09-26T12:00:00Z",
    },
    sdk: `await mocapassport.credentials.issue({
  userId: "user_123",
  type: "gaming_achievement",
  attributes: { score: 4200 }
});`,
  },
  {
    category: "Credentials",
    title: "Verify Credential",
    method: "POST",
    path: "/api/credentials/verify",
    desc: "Verify a credential without exposing sensitive user data (ZKP-enabled).",
    request: { credentialId: "cred_abc123" },
    response: { verified: true, verifiedAt: "2025-09-26T12:05:00Z" },
    sdk: `await mocapassport.credentials.verify({ credentialId: "cred_abc123" });`,
  },
  {
    category: "Users",
    title: "Get User",
    method: "GET",
    path: "/api/users/:userId",
    desc: "Fetch a user’s profile and issued credentials metadata.",
    request: null,
    response: {
      userId: "user_123",
      name: "Alice",
      credentials: [{ id: "cred_abc123", type: "gaming_achievement" }],
    },
    sdk: `await mocapassport.users.get("user_123");`,
  },
  {
    category: "Admin",
    title: "List All Credentials",
    method: "GET",
    path: "/api/admin/credentials",
    desc: "Fetch all issued credentials with filtering and pagination.",
    request: null,
    response: [
      { credentialId: "cred_abc123", userId: "user_123", status: "issued" },
    ],
    sdk: `await mocapassport.admin.listCredentials({ page: 1, limit: 20 });`,
  },
];

export default function ApiDocsPage() {
  const [search, setSearch] = useState("");

  const filteredEndpoints = endpoints.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.path.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(
    new Set(filteredEndpoints.map((e) => e.category))
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">
          Moca Passport API
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Use Moca Passport APIs to issue, verify, and manage user credentials
          across apps, games, and platforms. SDKs and examples included.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild className="bg-red-600 text-white hover:bg-red-500">
            <a href="/docs/quickstart">Quickstart Guide</a>
          </Button>
          <Button asChild variant="outline" className="border-foreground/20">
            <a href="/platform/integration">Integration Guide</a>
          </Button>
        </div>
      </section>

      {/* Search */}
      <section className="mb-6">
        <Input
          placeholder="Search endpoints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </section>

      {/* Tabs by Category */}
      <TabGroup>
        <TabList className="flex gap-4 border-b mb-4">
          {categories.map((cat) => (
            <Tab
              key={cat}
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium ${
                  selected
                    ? "border-b-2 border-red-600 text-red-600"
                    : "text-foreground/70"
                }`
              }
            >
              {cat}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {categories.map((cat) => (
            <Tab.Panel key={cat}>
              <div className="flex flex-col gap-6">
                {filteredEndpoints
                  .filter((e) => e.category === cat)
                  .map((e) => (
                    <div key={e.path} className="rounded-lg border p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{e.title}</h3>
                        <span className="text-sm text-foreground/50">
                          {e.method} {e.path}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-3">
                        {e.desc}
                      </p>

                      {/* Request */}
                      {e.request && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium mb-1">Request</h4>
                          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                            {JSON.stringify(e.request, null, 2)}
                          </pre>
                        </div>
                      )}

                      {/* Response */}
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Response</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                          {JSON.stringify(e.response, null, 2)}
                        </pre>
                      </div>

                      {/* SDK Snippet */}
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">
                          SDK Example
                        </h4>
                        <div className="relative">
                          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                            {e.sdk}
                          </pre>
                          <Button
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(e.sdk)}
                          >
                            <ClipboardIcon className="h-4 w-4 mr-1" /> Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Tab.Panel>
          ))}
        </TabPanels>
      </TabGroup>
    </main>
  );
}

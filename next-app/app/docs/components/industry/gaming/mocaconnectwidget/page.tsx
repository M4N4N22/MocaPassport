"use client";

import { useState } from "react";
import { MocaConnectWidget } from "@mocapassport/sdk";
import { CodeBlock } from "@/components/CodeBlock";
import { codeString } from "./moca-connect-wid-codestring";
import { mocaconnectschema } from "./moca-connect-schema";

export default function MocaConnectWidgetPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "schema">(
    "preview"
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-12 w-fit max-w-5xl">
      <h1 className="text-3xl font-semibold mb-4">MocaConnectWidget</h1>

      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        The <strong className="text-foreground">MocaConnectWidget</strong>{" "}
        allows you to connect and issue game-based credentials for players. It
        provides an easy integration point for your gaming app to onboard
        players and manage their credentials seamlessly.
      </p>

      {/* Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            className={`text-lg ${
              activeTab === "preview" ? "font-medium" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={`text-lg ${
              activeTab === "code" ? "font-medium" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </button>
          <button
            className={`text-lg ${
              activeTab === "schema" ? "font-medium" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("schema")}
          >
            Schema
          </button>
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "preview" && (
            <MocaConnectWidget onConnect={() => {}} onIssue={() => {}} />
          )}
          {activeTab === "code" && <CodeBlock code={codeString} />}
          {activeTab === "schema" && (
            <div className="flex flex-col gap-4 rounded-2xl ">
              <p>
                <span className="text-muted-foreground">Program ID:</span>{" "}
                <span
                  className="font-mono cursor-pointer underline"
                  onClick={() => copyToClipboard("c21sc0g1e42iw00o62044R")}
                >
                  c21sc0g1e42iw00o62044R
                </span>
              </p>
          
       
              <CodeBlock code={mocaconnectschema} />
            </div>
          )}
        </div>
      </div>

      {/* Usage */}
      <h2 className="text-lg font-medium mb-4">Usage</h2>
      <div className="gap-2 flex flex-col">
        <CodeBlock
          code={`import { MocaConnectWidget } from "@mocapassport/sdk";`}
        />
        <CodeBlock
          code={`<MocaConnectWidget onConnect={() => {}} onIssue={() => {}} />`}
        />
      </div>
    </div>
  );
}

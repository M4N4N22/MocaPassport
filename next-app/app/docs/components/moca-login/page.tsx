"use client";

import { useState } from "react";
import { MocaLoginButton, MocaUserPanel, useMocaIdentity } from "@mocapassport/sdk";
import { CodeBlock } from "@/components/CodeBlock";

export default function MocaLoginPage() {
  const { user } = useMocaIdentity(); // get the logged-in user from the hook
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const codeString = `import { MocaLoginButton, MocaUserPanel, useMocaIdentity } from "@mocapassport/sdk";

export default function MyComponent() {
  const { user } = useMocaIdentity();

  return (
    <div>
      {user ? (
        <MocaUserPanel showUserInfo />
      ) : (
        <MocaLoginButton 
          label="Connect with Moca" 
          onLoginSuccess={(user) => console.log("Logged in user:", user)} 
        />
      )}
    </div>
  );
}`;

  return (
    <div className="space-y-12 w-fit">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-4">MocaLogin</h1>

      {/* Description */}
      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        Use <strong className="text-foreground">MocaLoginButton</strong> to
        let users log in via the Moca identity system, and <strong className="text-foreground">MocaUserPanel </strong> 
        to display the logged-in user's account info.
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
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "preview" && (
            <div className="flex items-center gap-6 border p-24 rounded-3xl justify-center w-full">
              {user ? <MocaUserPanel showUserInfo /> : <MocaLoginButton label="Connect with Moca" />}
            </div>
          )}

          {activeTab === "code" && <CodeBlock code={codeString} />}
        </div>
      </div>

      {/* Props info */}
      <div className="pt-10">
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>
            <code>label</code> — Custom label for the login button (MocaLoginButton).
          </li>
          <li>
            <code>onLoginSuccess</code> — Callback fired after successful login (MocaLoginButton).
          </li>
          <li>
            <code>showUserInfo</code> — Whether to display logged-in user info (MocaUserPanel).
          </li>
          <li>
            <code>variant</code> — Button style variant (MocaLoginButton).
          </li>
          <li>
            <code>size</code> — Button size (MocaLoginButton).
          </li>
          <li>
            <code>CustomButton</code> — Optional custom button renderer (MocaLoginButton).
          </li>
          <li>
            <code>children</code> — Render-prop style custom rendering option (MocaLoginButton).
          </li>
        </ul>
      </div>
    </div>
  );
}

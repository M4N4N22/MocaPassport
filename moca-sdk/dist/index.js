// src/core/useMocaIdentity.ts
import { useState, useEffect, useCallback } from "react";

// src/core/airServiceSingleton.ts
import { AirService, BUILD_ENV } from "@mocanetwork/airkit";
var airService = null;
var initialized = false;
async function getAirService() {
  if (airService && initialized) return airService;
  const partnerId = process.env.NEXT_PUBLIC_AIR_PARTNER_ID;
  if (!partnerId) throw new Error("[AirService] Missing NEXT_PUBLIC_AIR_PARTNER_ID");
  airService = new AirService({ partnerId });
  console.log("[SDK] Initializing AirService...");
  await airService.init({
    buildEnv: BUILD_ENV.SANDBOX,
    enableLogging: true,
    skipRehydration: false
  });
  initialized = true;
  console.log("[SDK] AirService initialized successfully");
  return airService;
}

// src/core/useMocaIdentity.ts
function useMocaIdentity() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized2, setInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [airService2, setAirService] = useState(null);
  const init = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      const service = await getAirService();
      await service.init({
        buildEnv: "sandbox",
        enableLogging: true,
        skipRehydration: false
      });
      setAirService(service);
      setInitialized(true);
    } catch (err) {
      console.error("[MocaIdentity] Init Error:", err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, []);
  const login = useCallback(async () => {
    if (!airService2) throw new Error("AirService not initialized yet");
    const result = await airService2.login();
    const mocaUser = {
      handle: result.id ?? "",
      walletAddress: result.abstractAccountAddress ?? "",
      token: result.token ?? ""
    };
    localStorage.setItem("moca_user", JSON.stringify(mocaUser));
    setUser(mocaUser);
    return mocaUser;
  }, [airService2]);
  const logout = useCallback(() => {
    localStorage.removeItem("moca_user");
    setUser(null);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    init();
    const stored = localStorage.getItem("moca_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("moca_user");
      }
    }
  }, [init]);
  return {
    airService: airService2,
    // now safely null until client init
    user,
    loading,
    initialized: initialized2,
    error,
    login,
    logout
  };
}

// src/ui/MocaLogin.tsx
import { useState as useState2 } from "react";

// src/components/ui/button.tsx
import * as React from "react";

// src/lib/utils.ts
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// src/components/ui/button.tsx
import { jsx } from "react/jsx-runtime";
var Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      default: "bg-black text-white hover:bg-neutral-800",
      secondary: "bg-foreground hover text-background hover:bg-neutral-200",
      outline: "border border-zinc-800 bg-white text-foreground hover:bg-zinc-100 active:bg-zinc-200",
      ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100"
    };
    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-10 px-8",
      icon: "h-9 w-9"
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className: cn(base, variants[variant], sizes[size], className),
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/ui/MocaLogin.tsx
import { Loader2, Wallet } from "lucide-react";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
function MocaLoginButton({
  label = "Login with Moca",
  onLoginSuccess,
  CustomButton
}) {
  const { user, login, loading, initialized: initialized2 } = useMocaIdentity();
  const [localLoading, setLocalLoading] = useState2(false);
  const handleLogin = async () => {
    try {
      setLocalLoading(true);
      const u = await login();
      onLoginSuccess?.(u);
    } catch (err) {
      console.error("[MocaLoginButton] login error:", err);
    } finally {
      setLocalLoading(false);
    }
  };
  const Btn = CustomButton || Button;
  if (loading || !initialized2) {
    return /* @__PURE__ */ jsxs(Btn, { disabled: true, children: [
      /* @__PURE__ */ jsx2(Loader2, { className: "w-4 h-4 animate-spin mr-2 flex items-center" }),
      " Initializing..."
    ] });
  }
  if (user) return null;
  return /* @__PURE__ */ jsx2(Btn, { onClick: handleLogin, disabled: localLoading, children: localLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Loader2, { className: "w-4 h-4 animate-spin mr-2" }),
    " Connecting..."
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Wallet, { className: "w-4 h-4 mr-2" }),
    " ",
    label
  ] }) });
}

// src/ui/MocaUserPanel.tsx
import { useState as useState3 } from "react";
import { Eye, EyeOff } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function MocaUserPanel({
  showUserInfo = true,
  CustomButton
}) {
  const { user, logout } = useMocaIdentity();
  const [revealHandle, setRevealHandle] = useState3(false);
  const [revealWallet, setRevealWallet] = useState3(false);
  const Btn = CustomButton || Button;
  const hideStars = (str) => "\u25CF".repeat(str.length);
  if (!user) return null;
  return /* @__PURE__ */ jsx3("div", { className: "flex flex-col items-center gap-4", children: showUserInfo && /* @__PURE__ */ jsxs2("div", { className: "flex flex-col text-sm border p-6 rounded-3xl w-64", children: [
    /* @__PURE__ */ jsx3("h4", { className: "text-xs font-semibold text-muted-foreground mb-4", children: "Account Details" }),
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground text-[10px] mb-1", children: "Handle / ID" }),
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx3("p", { className: "font-medium text-foreground", children: revealHandle ? user.handle : hideStars(user.handle) }),
          /* @__PURE__ */ jsx3(
            "button",
            {
              onClick: () => setRevealHandle(!revealHandle),
              className: "ml-2 text-muted-foreground",
              title: revealHandle ? "Hide handle" : "Show handle",
              children: revealHandle ? /* @__PURE__ */ jsx3(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx3(Eye, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground text-[10px] mb-1", children: "Wallet Address" }),
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsx3("p", { className: "font-medium text-foreground", children: revealWallet ? user.walletAddress : hideStars(user.walletAddress) }),
          /* @__PURE__ */ jsx3(
            "button",
            {
              onClick: () => setRevealWallet(!revealWallet),
              className: "ml-2 text-muted-foreground",
              title: revealWallet ? "Hide wallet" : "Show wallet",
              children: revealWallet ? /* @__PURE__ */ jsx3(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx3(Eye, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}

// src/verticals/gaming/components/MocaConnectWidget.tsx
import { useState as useState5 } from "react";
import { motion } from "framer-motion";

// src/components/ui/Card.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Card({ className, children, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: cn(
        "rounded-2xl border border-zinc-800 bg-zinc-950/50 shadow-lg transition-all",
        className
      ),
      ...props,
      children
    }
  );
}

// src/verticals/gaming/components/MocaConnectWidget.tsx
import { CheckCircle2 as CheckCircle22, Plug } from "lucide-react";

// src/verticals/gaming/components/IssueCredentialButton.tsx
import { useState as useState4 } from "react";
import { Loader2 as Loader22, CheckCircle2, AlertCircle } from "lucide-react";

// src/verticals/gaming/issueCredential.ts
function sanitizeCredentialSubject(subject) {
  return {
    connected: subject.connected,
    country: subject.country,
    game: subject.game,
    name: subject.name,
    rank: subject.rank,
    age: subject.age,
    id: subject.id || `urn:uuid:${crypto.randomUUID()}`,
    xp: subject.xp || "0 Years"
  };
}
async function issueGamingCredential(subject) {
  try {
    const airService2 = await getAirService();
    const res = await fetch("/api/generate-jwt");
    const data = await res.json();
    if (!data.success || !data.jwt) throw new Error("Failed to fetch JWT");
    const jwt = data.jwt;
    const credentialSubject = sanitizeCredentialSubject(subject);
    const issuedCredential = await airService2.issueCredential({
      authToken: jwt,
      issuerDid: process.env.NEXT_PUBLIC_ISSUER_DID,
      credentialId: process.env.NEXT_PUBLIC_CREDENTIAL_ID,
      credentialSubject
    });
    return { success: true, issuedCredential };
  } catch (err) {
    console.error("[Gaming SDK] issueGamingCredential error:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

// src/verticals/gaming/components/IssueCredentialButton.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function IssueCredentialButton({
  subject,
  onSuccess,
  onError,
  label = "Issue Credential",
  className
}) {
  const [loading, setLoading] = useState4(false);
  const [success, setSuccess] = useState4(false);
  const [error, setError] = useState4(null);
  const handleClick = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    const result = await issueGamingCredential(subject);
    if (result.success) {
      setSuccess(true);
      onSuccess?.(result.issuedCredential);
    } else {
      setError(result.error || "Unknown error");
      onError?.(result.error || "Unknown error");
    }
    setLoading(false);
  };
  return /* @__PURE__ */ jsxs3(
    Button,
    {
      onClick: handleClick,
      disabled: loading || success,
      className,
      children: [
        loading && /* @__PURE__ */ jsx5(Loader22, { className: "animate-spin w-4 h-4 mr-2" }),
        success && /* @__PURE__ */ jsx5(CheckCircle2, { className: "w-4 h-4 mr-2" }),
        error && /* @__PURE__ */ jsx5(AlertCircle, { className: "w-4 h-4 mr-2" }),
        success ? "Issued!" : error ? "Retry" : label
      ]
    }
  );
}

// src/verticals/gaming/components/MocaConnectWidget.tsx
import { Fragment as Fragment2, jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var PLATFORMS = [
  {
    id: "steam",
    name: "Steam",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    color: "#1b2838"
  },
  {
    id: "epic",
    name: "Epic Games",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg",
    color: "#444"
  }
];
var GAME_RANKS = {
  valo: [
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Immortal",
    "Radiant"
  ],
  cs2: [
    "Silver",
    "Gold Nova",
    "Master Guardian",
    "Legendary Eagle",
    "Supreme",
    "Global Elite"
  ]
};
function MocaConnectWidget({
  defaultCountry = "USA",
  onConnect,
  onIssue,
  connected: initialConnected = []
}) {
  const { user, login, loading: loginLoading } = useMocaIdentity();
  const [step, setStep] = useState5(1);
  const [connected, setConnected] = useState5(initialConnected);
  const [loading, setLoading] = useState5(null);
  const [form, setForm] = useState5({
    game: "",
    rank: "",
    name: "",
    age: "",
    country: defaultCountry
  });
  const handleConnect = async (provider) => {
    setLoading(provider);
    try {
      if (onConnect) await onConnect(provider);
      setConnected((prev) => [...prev, provider]);
    } finally {
      setLoading(null);
    }
  };
  const canContinue = connected.includes("steam") || connected.includes("epic");
  const handleSubmit = async () => {
    if (onIssue) await onIssue({ connected, ...form });
  };
  return /* @__PURE__ */ jsxs4(Card, { className: "p-10 rounded-2xl shadow-xl w-full max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsx6("h2", { className: "text-2xl font-semibold text-white flex items-center gap-2 mb-6", children: "Create your MOCA Gaming Passport" }),
    step === 1 && /* @__PURE__ */ jsxs4(Fragment2, { children: [
      /* @__PURE__ */ jsxs4("p", { className: "text-zinc-400 mb-4", children: [
        "Connect at least",
        " ",
        /* @__PURE__ */ jsx6("span", { className: "text-foreground", children: "one platform" }),
        " (Steam or Epic) to verify your gaming identity."
      ] }),
      /* @__PURE__ */ jsx6("div", { className: "flex flex-col gap-4", children: PLATFORMS.map((p) => {
        const isConnected = connected.includes(p.id);
        return /* @__PURE__ */ jsxs4(
          "div",
          {
            className: `rounded-xl p-6 border flex justify-between items-center text-center transition ${isConnected ? "" : ""}`,
            children: [
              /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx6("img", { src: p.icon, alt: p.name, className: "w-10 h-10" }),
                /* @__PURE__ */ jsx6("h3", { className: " font-medium", children: p.name })
              ] }),
              isConnected ? /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1   text-sm", children: [
                /* @__PURE__ */ jsx6(CheckCircle22, { className: "w-4 h-4" }),
                " Connected"
              ] }) : /* @__PURE__ */ jsxs4(
                Button,
                {
                  variant: "secondary",
                  onClick: () => handleConnect(p.id),
                  className: "flex items-center ",
                  children: [
                    /* @__PURE__ */ jsx6(Plug, { className: "w-4 h-4 mr-1" }),
                    loading === p.id ? "Connecting..." : "Connect"
                  ]
                }
              )
            ]
          },
          p.id
        );
      }) }),
      /* @__PURE__ */ jsx6("div", { className: "flex  mt-6 w-full ", children: /* @__PURE__ */ jsx6(
        Button,
        {
          variant: "secondary",
          onClick: () => setStep(2),
          disabled: !canContinue,
          className: "",
          children: "Continue"
        }
      ) })
    ] }),
    step === 2 && /* @__PURE__ */ jsxs4(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, children: [
      /* @__PURE__ */ jsx6("p", { className: "text-zinc-400 mb-4", children: "Tell us a bit about your gaming profile." }),
      /* @__PURE__ */ jsxs4("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx6("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Game" }),
          /* @__PURE__ */ jsxs4(
            "select",
            {
              className: "   rounded-lg px-3 py-2 w-full bg-card",
              value: form.game,
              onChange: (e) => setForm({ ...form, game: e.target.value }),
              children: [
                /* @__PURE__ */ jsx6("option", { value: "", children: "Select Game" }),
                /* @__PURE__ */ jsx6("option", { value: "cs2", children: "CS2" }),
                /* @__PURE__ */ jsx6("option", { value: "valo", children: "Valorant" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx6("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Rank / Experience" }),
          /* @__PURE__ */ jsxs4(
            "select",
            {
              className: "  rounded-lg px-3 py-2 w-full bg-card",
              disabled: !form.game,
              value: form.rank,
              onChange: (e) => setForm({ ...form, rank: e.target.value }),
              children: [
                /* @__PURE__ */ jsx6("option", { value: "", children: "Select Rank" }),
                form.game && GAME_RANKS[form.game].map((r) => /* @__PURE__ */ jsx6("option", { value: r, children: r }, r))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx6("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Full Name" }),
          /* @__PURE__ */ jsx6(
            "input",
            {
              type: "text",
              className: "   rounded-lg px-3 py-2 w-full bg-card",
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx6("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Age" }),
          /* @__PURE__ */ jsx6(
            "input",
            {
              type: "number",
              min: 12,
              max: 100,
              className: " bg-card  rounded-lg px-3 py-2 w-full",
              value: form.age,
              onChange: (e) => setForm({ ...form, age: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx6("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Country" }),
          /* @__PURE__ */ jsx6(
            "input",
            {
              type: "text",
              className: "  rounded-lg px-3 py-2 w-full bg-card",
              value: form.country,
              onChange: (e) => setForm({ ...form, country: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "flex justify-between mt-6", children: [
        /* @__PURE__ */ jsx6(Button, { variant: "outline", onClick: () => setStep(1), className: "", children: "Go Back" }),
        /* @__PURE__ */ jsx6(
          Button,
          {
            onClick: () => setStep(3),
            variant: "secondary",
            disabled: !form.game || !form.rank || !form.name || !form.age,
            children: "Continue"
          }
        )
      ] })
    ] }),
    step === 3 && /* @__PURE__ */ jsxs4("div", { className: " p-6 rounded-xl border", children: [
      /* @__PURE__ */ jsx6("h3", { className: "text-lg font-medium mb-4 flex items-center gap-2", children: "Review & Issue Credential" }),
      /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1", children: [
        /* @__PURE__ */ jsxs4("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ jsx6("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Connected" }),
          /* @__PURE__ */ jsx6("span", { className: "text-white font-semibold", children: connected.join(", ") })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ jsx6("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Game" }),
          /* @__PURE__ */ jsx6("span", { className: "text-white font-semibold ", children: form.game.toUpperCase() })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ jsx6("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Rank" }),
          /* @__PURE__ */ jsx6("span", { className: "text-white font-semibold", children: form.rank })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ jsx6("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Name" }),
          /* @__PURE__ */ jsx6("span", { className: "text-white font-semibold", children: form.name })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ jsx6("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Age" }),
          /* @__PURE__ */ jsx6("span", { className: "text-white font-semibold", children: form.age })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ jsx6("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Country" }),
          /* @__PURE__ */ jsx6("span", { className: "text-white font-semibold", children: form.country })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "flex justify-between mt-4", children: [
        /* @__PURE__ */ jsx6(Button, { variant: "outline", onClick: () => setStep(2), children: "Go Back" }),
        !user ? /* @__PURE__ */ jsx6(
          MocaLoginButton,
          {
            label: "Login with Moca",
            onLoginSuccess: () => {
              console.log("User logged in, can now issue credentials");
            }
          }
        ) : /* @__PURE__ */ jsx6(
          IssueCredentialButton,
          {
            subject: {
              connected: true,
              game: form.game,
              rank: form.rank,
              name: form.name,
              age: Number(form.age),
              country: form.country
            },
            label: "Issue Gaming Credential",
            onSuccess: (cred) => console.log("Issued:", cred),
            onError: (err) => console.error("Error:", err)
          }
        )
      ] })
    ] })
  ] });
}

// src/verticals/gaming/components/MocaGamingPassport.tsx
import { useEffect as useEffect2, useState as useState6 } from "react";
import { motion as motion2 } from "framer-motion";

// src/utils/getGameIcon.ts
var getGameIcon = (name) => {
  const map = {
    steam: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    epic: "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg",
    valorant: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/2560px-Valorant_logo_-_pink_color_version.svg.png",
    cs2: "https://static.wikia.nocookie.net/logopedia/images/4/49/Counter-Strike_2_%28Icon%29.png/revision/latest?cb=20230330015359"
  };
  const key = name.toLowerCase().replace(/\s+/g, "");
  return map[key] || "/icons/default-game.svg";
};

// src/verticals/gaming/components/MocaGamingPassport.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function MocaGamingPassport({
  issuedCredential
}) {
  const [credentials, setCredentials] = useState6([]);
  const [loading, setLoading] = useState6(true);
  useEffect2(() => {
    const mapToPassportCreds = () => {
      if (!issuedCredential) return [];
      const mapped = [];
      mapped.push({
        id: `${issuedCredential.game}_rank`,
        label: `${issuedCredential.game} Rank`,
        value: issuedCredential.rank,
        game: issuedCredential.game,
        icon: getGameIcon(issuedCredential.game)
      });
      mapped.push({
        id: "xp",
        label: "Total Gaming XP",
        value: issuedCredential.xp || "N/A",
        game: "Cross-Platform",
        icon: "https://cdn-icons-png.freepik.com/256/8078/8078524.png?semt=ais_white_label",
        issuedBy: "Moca Gaming Passport"
      });
      issuedCredential.connected.forEach((platform) => {
        mapped.push({
          id: `${platform}_connected`,
          label: `${platform} Connected`,
          value: "verified",
          game: platform,
          icon: getGameIcon(platform),
          issuedBy: "Moca Gaming Passport"
        });
      });
      return mapped;
    };
    setLoading(true);
    const creds = mapToPassportCreds();
    setCredentials(creds);
    setLoading(false);
  }, [issuedCredential]);
  return /* @__PURE__ */ jsxs5(Card, { className: "rounded-2xl shadow w-full max-w-4xl border text-card-foreground", children: [
    /* @__PURE__ */ jsxs5("div", { className: "flex flex-col p-6  border-b gap-4", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between ", children: [
        /* @__PURE__ */ jsx7("h2", { className: "text-xl font-semibold", children: "Your Gaming Passport" }),
        /* @__PURE__ */ jsx7("span", { className: "bg-primary/10 text-primary py-2 px-4 rounded-full text-xs", children: "Verified by Moca" })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-center", children: [
        issuedCredential && /* @__PURE__ */ jsxs5("div", { className: "flex sm:flex-row gap-4 ", children: [
          /* @__PURE__ */ jsxs5("div", { className: "", children: [
            /* @__PURE__ */ jsx7("span", { className: "text-xs text-muted-foreground", children: "Name" }),
            /* @__PURE__ */ jsx7("p", { className: "font-medium text-foreground", children: issuedCredential.name })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "", children: [
            /* @__PURE__ */ jsx7("span", { className: "text-xs text-muted-foreground", children: "Age" }),
            /* @__PURE__ */ jsx7("p", { className: "font-medium text-foreground", children: issuedCredential.age })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "", children: [
            /* @__PURE__ */ jsx7("span", { className: "text-xs text-muted-foreground", children: "Country" }),
            /* @__PURE__ */ jsx7("p", { className: "font-medium text-foreground", children: issuedCredential.country })
          ] })
        ] }),
        !loading && credentials.length > 0 && /* @__PURE__ */ jsx7(motion2.div, { className: "   flex flex-col sm:flex-row justify-between text-sm text-muted-foreground gap-2 sm:gap-0", children: /* @__PURE__ */ jsxs5("div", { children: [
          "Passport Status:",
          " ",
          /* @__PURE__ */ jsx7("span", { className: "font-medium text-foreground", children: "Active" })
        ] }) })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxs5("div", { className: "flex flex-col items-center py-10 opacity-70", children: [
      /* @__PURE__ */ jsx7("div", { className: "animate-spin border-2 border-border border-t-foreground rounded-full w-10 h-10 mb-3" }),
      /* @__PURE__ */ jsx7("p", { className: "text-sm text-muted-foreground", children: "Fetching credentials..." })
    ] }) : credentials.length === 0 ? /* @__PURE__ */ jsxs5("div", { className: "text-center py-10 text-muted-foreground", children: [
      "No verified credentials found.",
      /* @__PURE__ */ jsx7("p", { className: "text-sm mt-1", children: "Connect a game to get started." })
    ] }) : /* @__PURE__ */ jsx7("div", { className: "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-1 p-6", children: credentials.map((cred) => /* @__PURE__ */ jsxs5(
      motion2.div,
      {
        whileHover: { scale: 1.03 },
        className: "flex justify-between p-4 rounded-xl bg-card items-center",
        children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-3 ", children: [
            /* @__PURE__ */ jsx7("div", { className: "bg-background p-4 rounded-xl", children: /* @__PURE__ */ jsx7(
              "img",
              {
                src: cred.icon,
                alt: cred.game,
                className: "w-8 h-8 opacity-90"
              }
            ) }),
            /* @__PURE__ */ jsxs5("div", { children: [
              /* @__PURE__ */ jsx7("p", { className: "text-sm text-muted-foreground", children: cred.game }),
              /* @__PURE__ */ jsx7("h3", { className: "font-semibold text-foreground", children: cred.label })
            ] })
          ] }),
          /* @__PURE__ */ jsx7("div", { className: "flex items-center gap-2 ", children: /* @__PURE__ */ jsx7("span", { className: "  text-primary bg-background rounded-full px-4 py-1", children: cred.value }) })
        ]
      },
      cred.id
    )) })
  ] });
}

// src/verticals/gaming/components/MocaTournamentVerifier.tsx
import { useState as useState7 } from "react";
import { motion as motion3 } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Search,
  ShieldCheck,
  Loader2 as Loader23
} from "lucide-react";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var MOCK_PLAYER_DATA = {
  id: "moca_12345",
  name: "Manan Singh",
  credentials: {
    "rank.valo": "Ascendant 2",
    "rank.cs2": "Master Guardian Elite",
    "experience.years": 3
  }
};
var TOURNAMENT_CRITERIA = {
  "rank.valo": "Ascendant",
  "experience.years": 2
};
function MocaTournamentVerifier() {
  const [input, setInput] = useState7("");
  const [loading, setLoading] = useState7(false);
  const [verified, setVerified] = useState7(null);
  const [result, setResult] = useState7({});
  const handleVerify = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setVerified(null);
    await new Promise((res) => setTimeout(res, 1800));
    const checks = {};
    let pass = true;
    for (const [key, requiredValue] of Object.entries(TOURNAMENT_CRITERIA)) {
      const typedKey = key;
      const playerValue = MOCK_PLAYER_DATA.credentials[typedKey];
      const ok = typeof playerValue === "number" ? playerValue >= requiredValue : playerValue.toLowerCase().includes(requiredValue.toLowerCase());
      checks[typedKey] = ok;
      if (!ok) pass = false;
    }
    setResult(checks);
    setVerified(pass);
    setLoading(false);
  };
  return /* @__PURE__ */ jsxs6(Card, { className: "p-6 bg-black border border-zinc-800 rounded-2xl shadow-lg text-white", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ jsxs6("h2", { className: "text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsx8(ShieldCheck, { className: "w-5 h-5 text-[#FAFF2A]" }),
        "Tournament Verifier"
      ] }),
      /* @__PURE__ */ jsx8("span", { className: "text-zinc-400 text-sm", children: "Moca SDK Demo" })
    ] }),
    /* @__PURE__ */ jsxs6("div", { className: "flex gap-3 mb-6", children: [
      /* @__PURE__ */ jsx8(
        "input",
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: "Enter Moca ID or email...",
          className: "flex-1 bg-zinc-900 border border-zinc-700 text-sm px-3 py-2 rounded-xl text-white placeholder-zinc-500"
        }
      ),
      /* @__PURE__ */ jsx8(
        Button,
        {
          onClick: handleVerify,
          disabled: loading,
          className: "bg-[#FAFF2A] text-black font-medium px-4 rounded-xl",
          children: loading ? /* @__PURE__ */ jsx8(Loader23, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ jsx8(Search, { className: "w-4 h-4" })
        }
      )
    ] }),
    loading && /* @__PURE__ */ jsxs6("div", { className: "text-center py-6 opacity-70", children: [
      /* @__PURE__ */ jsx8(Loader23, { className: "animate-spin w-8 h-8 mx-auto mb-3 text-[#FAFF2A]" }),
      /* @__PURE__ */ jsx8("p", { className: "text-zinc-400 text-sm", children: "Verifying credentials..." })
    ] }),
    !loading && verified !== null && /* @__PURE__ */ jsxs6(
      motion3.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: `p-5 rounded-xl ${verified ? "bg-green-950/40 border border-green-700" : "bg-red-950/40 border border-red-700"}`,
        children: [
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-3 mb-3", children: [
            verified ? /* @__PURE__ */ jsx8(CheckCircle, { className: "text-green-400 w-6 h-6" }) : /* @__PURE__ */ jsx8(XCircle, { className: "text-red-400 w-6 h-6" }),
            /* @__PURE__ */ jsx8("h3", { className: "text-lg font-semibold", children: verified ? "Player Verified \u2705" : "Verification Failed \u274C" })
          ] }),
          /* @__PURE__ */ jsx8("div", { className: "space-y-3", children: Object.entries(TOURNAMENT_CRITERIA).map(([key, requiredValue]) => {
            const typedKey = key;
            const ok = result[typedKey];
            const playerValue = MOCK_PLAYER_DATA.credentials[typedKey];
            return /* @__PURE__ */ jsxs6(
              "div",
              {
                className: "flex items-center justify-between text-sm bg-zinc-900/60 border border-zinc-800 rounded-lg p-3",
                children: [
                  /* @__PURE__ */ jsxs6("div", { children: [
                    /* @__PURE__ */ jsx8("p", { className: "text-zinc-400", children: key }),
                    /* @__PURE__ */ jsxs6("p", { className: "font-medium text-white", children: [
                      "Player:",
                      " ",
                      /* @__PURE__ */ jsx8("span", { className: "text-[#FAFF2A]", children: String(playerValue) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx8(
                    "p",
                    {
                      className: `font-semibold ${ok ? "text-green-400" : "text-red-400"}`,
                      children: ok ? "Meets Criteria" : "Below Requirement"
                    }
                  )
                ]
              },
              key
            );
          }) })
        ]
      }
    ),
    !loading && verified === null && /* @__PURE__ */ jsx8("div", { className: "text-zinc-500 text-center py-10 text-sm", children: "Enter a gamer\u2019s Moca ID to verify eligibility for your tournament." })
  ] });
}

// src/verticals/gaming/components/MocaVerificationDashboard.tsx
import { useState as useState8 } from "react";
import { motion as motion4 } from "framer-motion";
import { Loader2 as Loader24 } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
function MocaVerificationDashboard({
  records = [],
  onVerify,
  onRevoke
}) {
  const [loadingIndex, setLoadingIndex] = useState8(null);
  const [data, setData] = useState8(records);
  const handleVerify = async (index) => {
    setLoadingIndex(index);
    try {
      if (onVerify) await onVerify(data[index]);
      setData(
        (prev) => prev.map((r, i) => i === index ? { ...r, verified: true } : r)
      );
    } finally {
      setLoadingIndex(null);
    }
  };
  const handleRevoke = async (index) => {
    if (onRevoke) await onRevoke(data[index]);
    setData((prev) => prev.filter((_, i) => i !== index));
  };
  return /* @__PURE__ */ jsxs7(Card, { className: "rounded-2xl shadow w-full max-w-4xl border text-card-foreground", children: [
    /* @__PURE__ */ jsxs7("div", { className: "flex flex-col p-6 border-b gap-4", children: [
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx9("h2", { className: "text-xl font-semibold", children: "Verification Dashboard" }),
        /* @__PURE__ */ jsx9("span", { className: "bg-primary/10 text-primary py-2 px-4 rounded-full text-xs", children: "Managed by Moca" })
      ] }),
      /* @__PURE__ */ jsx9("p", { className: "text-sm text-muted-foreground", children: "Verify or revoke gamer credentials issued through Moca Gaming Passport." })
    ] }),
    data.length === 0 ? /* @__PURE__ */ jsx9("div", { className: "flex flex-col items-center py-10 opacity-70", children: /* @__PURE__ */ jsx9("p", { className: "text-sm text-muted-foreground", children: "No credentials found." }) }) : /* @__PURE__ */ jsx9("div", { className: "grid grid-cols-2 gap-6 p-6 w-fit", children: data.map((record, index) => /* @__PURE__ */ jsxs7(
      motion4.div,
      {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.15 },
        className: "flex flex-col gap-3 p-6 rounded-3xl border",
        children: [
          /* @__PURE__ */ jsx9("div", { className: "flex flex-wrap gap-2 mb-2", children: record.connected.map((plat) => /* @__PURE__ */ jsxs7(
            "span",
            {
              className: "text-xs px-3 py-1 rounded-full bg-muted font-medium",
              children: [
                plat,
                " Account Connected"
              ]
            },
            plat
          )) }),
          /* @__PURE__ */ jsxs7("div", { className: "flex flex-wrap gap-12 p-6 bg-card rounded-3xl", children: [
            /* @__PURE__ */ jsxs7("div", { children: [
              /* @__PURE__ */ jsx9("span", { className: "text-xs text-muted-foreground", children: "Name" }),
              /* @__PURE__ */ jsx9("p", { className: "font-medium text-foreground", children: record.name })
            ] }),
            /* @__PURE__ */ jsxs7("div", { children: [
              /* @__PURE__ */ jsx9("span", { className: "text-xs text-muted-foreground", children: "Age" }),
              /* @__PURE__ */ jsx9("p", { className: "font-medium text-foreground", children: record.age })
            ] }),
            /* @__PURE__ */ jsxs7("div", { children: [
              /* @__PURE__ */ jsx9("span", { className: "text-xs text-muted-foreground", children: "Country" }),
              /* @__PURE__ */ jsx9("p", { className: "font-medium text-foreground", children: record.country })
            ] })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "space-y-6 bg-card rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs7("div", { className: "flex flex-wrap gap-12 items-center", children: [
              /* @__PURE__ */ jsx9("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs7("div", { children: [
                /* @__PURE__ */ jsx9("p", { className: "text-xs text-muted-foreground", children: "Game" }),
                /* @__PURE__ */ jsx9("p", { className: "font-medium text-foreground", children: record.game })
              ] }) }),
              /* @__PURE__ */ jsxs7("div", { children: [
                /* @__PURE__ */ jsx9("span", { className: "text-xs text-muted-foreground", children: "Rank" }),
                /* @__PURE__ */ jsx9("p", { className: "font-medium text-foreground", children: record.rank })
              ] }),
              /* @__PURE__ */ jsxs7("div", { children: [
                /* @__PURE__ */ jsx9("span", { className: "text-xs text-muted-foreground", children: "XP" }),
                /* @__PURE__ */ jsx9("p", { className: "font-medium text-foreground", children: record.xp })
              ] })
            ] }),
            /* @__PURE__ */ jsx9("div", { className: "flex items-center gap-3 pt-2", children: !record.verified ? loadingIndex === index ? /* @__PURE__ */ jsx9(Loader24, { className: "animate-spin w-5 h-5 text-primary" }) : /* @__PURE__ */ jsx9(
              Button,
              {
                onClick: () => handleVerify(index),
                className: " font-medium px-4 rounded-xl w-full bg-foreground",
                children: /* @__PURE__ */ jsx9("span", { className: "text-background", children: "Verify" })
              }
            ) : /* @__PURE__ */ jsx9(
              Button,
              {
                onClick: () => handleRevoke(index),
                className: "bg-muted font-medium px-4 rounded-xl w-full",
                children: "Revoke"
              }
            ) })
          ] })
        ]
      },
      `${record.name}-${record.game}`
    )) })
  ] });
}
export {
  MocaConnectWidget,
  MocaGamingPassport,
  MocaLoginButton,
  MocaTournamentVerifier,
  MocaUserPanel,
  MocaVerificationDashboard,
  useMocaIdentity
};
//# sourceMappingURL=index.js.map
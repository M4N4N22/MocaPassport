"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MocaConnectWidget: () => MocaConnectWidget,
  MocaGamingPassport: () => MocaGamingPassport,
  MocaLoginButton: () => MocaLoginButton,
  MocaTournamentVerifier: () => MocaTournamentVerifier,
  MocaUserPanel: () => MocaUserPanel,
  MocaVerificationDashboard: () => MocaVerificationDashboard,
  useMocaIdentity: () => useMocaIdentity
});
module.exports = __toCommonJS(index_exports);

// src/core/useMocaIdentity.ts
var import_react = require("react");

// src/core/airServiceSingleton.ts
var import_airkit = require("@mocanetwork/airkit");
var airService = null;
var initialized = false;
async function getAirService() {
  if (airService && initialized) return airService;
  const partnerId = process.env.NEXT_PUBLIC_AIR_PARTNER_ID;
  if (!partnerId) throw new Error("[AirService] Missing NEXT_PUBLIC_AIR_PARTNER_ID");
  airService = new import_airkit.AirService({ partnerId });
  console.log("[SDK] Initializing AirService...");
  await airService.init({
    buildEnv: import_airkit.BUILD_ENV.SANDBOX,
    enableLogging: true,
    skipRehydration: false
  });
  initialized = true;
  console.log("[SDK] AirService initialized successfully");
  return airService;
}

// src/core/useMocaIdentity.ts
function useMocaIdentity() {
  const [user, setUser] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [initialized2, setInitialized] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const [airService2, setAirService] = (0, import_react.useState)(null);
  const init = (0, import_react.useCallback)(async () => {
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
  const login = (0, import_react.useCallback)(async () => {
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
  const logout = (0, import_react.useCallback)(() => {
    localStorage.removeItem("moca_user");
    setUser(null);
  }, []);
  (0, import_react.useEffect)(() => {
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
var import_react2 = require("react");

// src/components/ui/button.tsx
var React = __toESM(require("react"), 1);

// src/lib/utils.ts
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// src/components/ui/button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_lucide_react = require("lucide-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
function MocaLoginButton({
  label = "Login with Moca",
  onLoginSuccess,
  CustomButton
}) {
  const { user, login, loading, initialized: initialized2 } = useMocaIdentity();
  const [localLoading, setLocalLoading] = (0, import_react2.useState)(false);
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Btn, { disabled: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Loader2, { className: "w-4 h-4 animate-spin mr-2 flex items-center" }),
      " Initializing..."
    ] });
  }
  if (user) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Btn, { onClick: handleLogin, disabled: localLoading, children: localLoading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Loader2, { className: "w-4 h-4 animate-spin mr-2" }),
    " Connecting..."
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Wallet, { className: "w-4 h-4 mr-2" }),
    " ",
    label
  ] }) });
}

// src/ui/MocaUserPanel.tsx
var import_react3 = require("react");
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function MocaUserPanel({
  showUserInfo = true,
  CustomButton
}) {
  const { user, logout } = useMocaIdentity();
  const [revealHandle, setRevealHandle] = (0, import_react3.useState)(false);
  const [revealWallet, setRevealWallet] = (0, import_react3.useState)(false);
  const Btn = CustomButton || Button;
  const hideStars = (str) => "\u25CF".repeat(str.length);
  if (!user) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex flex-col items-center gap-4", children: showUserInfo && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col text-sm border p-6 rounded-3xl w-64", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "text-xs font-semibold text-muted-foreground mb-4", children: "Account Details" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-muted-foreground text-[10px] mb-1", children: "Handle / ID" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "font-medium text-foreground", children: revealHandle ? user.handle : hideStars(user.handle) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              onClick: () => setRevealHandle(!revealHandle),
              className: "ml-2 text-muted-foreground",
              title: revealHandle ? "Hide handle" : "Show handle",
              children: revealHandle ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Eye, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-muted-foreground text-[10px] mb-1", children: "Wallet Address" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "font-medium text-foreground", children: revealWallet ? user.walletAddress : hideStars(user.walletAddress) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              onClick: () => setRevealWallet(!revealWallet),
              className: "ml-2 text-muted-foreground",
              title: revealWallet ? "Hide wallet" : "Show wallet",
              children: revealWallet ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Eye, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}

// src/verticals/gaming/components/MocaConnectWidget.tsx
var import_react5 = require("react");
var import_framer_motion = require("framer-motion");

// src/components/ui/Card.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function Card({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_lucide_react4 = require("lucide-react");

// src/verticals/gaming/components/IssueCredentialButton.tsx
var import_react4 = require("react");
var import_lucide_react3 = require("lucide-react");

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
var import_jsx_runtime5 = require("react/jsx-runtime");
function IssueCredentialButton({
  subject,
  onSuccess,
  onError,
  label = "Issue Credential",
  className
}) {
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const [success, setSuccess] = (0, import_react4.useState)(false);
  const [error, setError] = (0, import_react4.useState)(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    Button,
    {
      onClick: handleClick,
      disabled: loading || success,
      className,
      children: [
        loading && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react3.Loader2, { className: "animate-spin w-4 h-4 mr-2" }),
        success && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react3.CheckCircle2, { className: "w-4 h-4 mr-2" }),
        error && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react3.AlertCircle, { className: "w-4 h-4 mr-2" }),
        success ? "Issued!" : error ? "Retry" : label
      ]
    }
  );
}

// src/verticals/gaming/components/MocaConnectWidget.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  const [step, setStep] = (0, import_react5.useState)(1);
  const [connected, setConnected] = (0, import_react5.useState)(initialConnected);
  const [loading, setLoading] = (0, import_react5.useState)(null);
  const [form, setForm] = (0, import_react5.useState)({
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Card, { className: "p-10 rounded-2xl shadow-xl w-full max-w-3xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { className: "text-2xl font-semibold text-white flex items-center gap-2 mb-6", children: "Create your MOCA Gaming Passport" }),
    step === 1 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-zinc-400 mb-4", children: [
        "Connect at least",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-foreground", children: "one platform" }),
        " (Steam or Epic) to verify your gaming identity."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex flex-col gap-4", children: PLATFORMS.map((p) => {
        const isConnected = connected.includes(p.id);
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "div",
          {
            className: `rounded-xl p-6 border flex justify-between items-center text-center transition ${isConnected ? "" : ""}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", { src: p.icon, alt: p.name, className: "w-10 h-10" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: " font-medium", children: p.name })
              ] }),
              isConnected ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-1   text-sm", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react4.CheckCircle2, { className: "w-4 h-4" }),
                " Connected"
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                Button,
                {
                  variant: "secondary",
                  onClick: () => handleConnect(p.id),
                  className: "flex items-center ",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react4.Plug, { className: "w-4 h-4 mr-1" }),
                    loading === p.id ? "Connecting..." : "Connect"
                  ]
                }
              )
            ]
          },
          p.id
        );
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex  mt-6 w-full ", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    step === 2 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_framer_motion.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-zinc-400 mb-4", children: "Tell us a bit about your gaming profile." }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Game" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "select",
            {
              className: "   rounded-lg px-3 py-2 w-full bg-card",
              value: form.game,
              onChange: (e) => setForm({ ...form, game: e.target.value }),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "", children: "Select Game" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "cs2", children: "CS2" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "valo", children: "Valorant" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Rank / Experience" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "select",
            {
              className: "  rounded-lg px-3 py-2 w-full bg-card",
              disabled: !form.game,
              value: form.rank,
              onChange: (e) => setForm({ ...form, rank: e.target.value }),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "", children: "Select Rank" }),
                form.game && GAME_RANKS[form.game].map((r) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: r, children: r }, r))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Full Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "input",
            {
              type: "text",
              className: "   rounded-lg px-3 py-2 w-full bg-card",
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Age" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Country" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between mt-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { variant: "outline", onClick: () => setStep(1), className: "", children: "Go Back" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    step === 3 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: " p-6 rounded-xl border", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "text-lg font-medium mb-4 flex items-center gap-2", children: "Review & Issue Credential" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Connected" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-white font-semibold", children: connected.join(", ") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Game" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-white font-semibold ", children: form.game.toUpperCase() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Rank" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-white font-semibold", children: form.rank })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-white font-semibold", children: form.name })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Age" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-white font-semibold", children: form.age })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-card rounded-lg p-4 flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm text-muted-foreground mb-2 font-medium block", children: "Country" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-white font-semibold", children: form.country })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between mt-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { variant: "outline", onClick: () => setStep(2), children: "Go Back" }),
        !user ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          MocaLoginButton,
          {
            label: "Login with Moca",
            onLoginSuccess: () => {
              console.log("User logged in, can now issue credentials");
            }
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var import_react6 = require("react");
var import_framer_motion2 = require("framer-motion");

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
var import_jsx_runtime7 = require("react/jsx-runtime");
function MocaGamingPassport({
  issuedCredential
}) {
  const [credentials, setCredentials] = (0, import_react6.useState)([]);
  const [loading, setLoading] = (0, import_react6.useState)(true);
  (0, import_react6.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Card, { className: "rounded-2xl shadow w-full max-w-4xl border text-card-foreground", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex flex-col p-6  border-b gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center justify-between ", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { className: "text-xl font-semibold", children: "Your Gaming Passport" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "bg-primary/10 text-primary py-2 px-4 rounded-full text-xs", children: "Verified by Moca" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex justify-between items-center", children: [
        issuedCredential && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex sm:flex-row gap-4 ", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-xs text-muted-foreground", children: "Name" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "font-medium text-foreground", children: issuedCredential.name })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-xs text-muted-foreground", children: "Age" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "font-medium text-foreground", children: issuedCredential.age })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-xs text-muted-foreground", children: "Country" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "font-medium text-foreground", children: issuedCredential.country })
          ] })
        ] }),
        !loading && credentials.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_framer_motion2.motion.div, { className: "   flex flex-col sm:flex-row justify-between text-sm text-muted-foreground gap-2 sm:gap-0", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
          "Passport Status:",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "font-medium text-foreground", children: "Active" })
        ] }) })
      ] })
    ] }),
    loading ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex flex-col items-center py-10 opacity-70", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "animate-spin border-2 border-border border-t-foreground rounded-full w-10 h-10 mb-3" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-sm text-muted-foreground", children: "Fetching credentials..." })
    ] }) : credentials.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "text-center py-10 text-muted-foreground", children: [
      "No verified credentials found.",
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-sm mt-1", children: "Connect a game to get started." })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-1 p-6", children: credentials.map((cred) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      import_framer_motion2.motion.div,
      {
        whileHover: { scale: 1.03 },
        className: "flex justify-between p-4 rounded-xl bg-card items-center",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-3 ", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "bg-background p-4 rounded-xl", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "img",
              {
                src: cred.icon,
                alt: cred.game,
                className: "w-8 h-8 opacity-90"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-sm text-muted-foreground", children: cred.game }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "font-semibold text-foreground", children: cred.label })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex items-center gap-2 ", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "  text-primary bg-background rounded-full px-4 py-1", children: cred.value }) })
        ]
      },
      cred.id
    )) })
  ] });
}

// src/verticals/gaming/components/MocaTournamentVerifier.tsx
var import_react7 = require("react");
var import_framer_motion3 = require("framer-motion");
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime8 = require("react/jsx-runtime");
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
  const [input, setInput] = (0, import_react7.useState)("");
  const [loading, setLoading] = (0, import_react7.useState)(false);
  const [verified, setVerified] = (0, import_react7.useState)(null);
  const [result, setResult] = (0, import_react7.useState)({});
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Card, { className: "p-6 bg-black border border-zinc-800 rounded-2xl shadow-lg text-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h2", { className: "text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react5.ShieldCheck, { className: "w-5 h-5 text-[#FAFF2A]" }),
        "Tournament Verifier"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-zinc-400 text-sm", children: "Moca SDK Demo" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex gap-3 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "input",
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: "Enter Moca ID or email...",
          className: "flex-1 bg-zinc-900 border border-zinc-700 text-sm px-3 py-2 rounded-xl text-white placeholder-zinc-500"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        Button,
        {
          onClick: handleVerify,
          disabled: loading,
          className: "bg-[#FAFF2A] text-black font-medium px-4 rounded-xl",
          children: loading ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react5.Loader2, { className: "animate-spin w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react5.Search, { className: "w-4 h-4" })
        }
      )
    ] }),
    loading && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "text-center py-6 opacity-70", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react5.Loader2, { className: "animate-spin w-8 h-8 mx-auto mb-3 text-[#FAFF2A]" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-zinc-400 text-sm", children: "Verifying credentials..." })
    ] }),
    !loading && verified !== null && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      import_framer_motion3.motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: `p-5 rounded-xl ${verified ? "bg-green-950/40 border border-green-700" : "bg-red-950/40 border border-red-700"}`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-3 mb-3", children: [
            verified ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react5.CheckCircle, { className: "text-green-400 w-6 h-6" }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react5.XCircle, { className: "text-red-400 w-6 h-6" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { className: "text-lg font-semibold", children: verified ? "Player Verified \u2705" : "Verification Failed \u274C" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "space-y-3", children: Object.entries(TOURNAMENT_CRITERIA).map(([key, requiredValue]) => {
            const typedKey = key;
            const ok = result[typedKey];
            const playerValue = MOCK_PLAYER_DATA.credentials[typedKey];
            return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              "div",
              {
                className: "flex items-center justify-between text-sm bg-zinc-900/60 border border-zinc-800 rounded-lg p-3",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-zinc-400", children: key }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "font-medium text-white", children: [
                      "Player:",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-[#FAFF2A]", children: String(playerValue) })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
    !loading && verified === null && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-zinc-500 text-center py-10 text-sm", children: "Enter a gamer\u2019s Moca ID to verify eligibility for your tournament." })
  ] });
}

// src/verticals/gaming/components/MocaVerificationDashboard.tsx
var import_react8 = require("react");
var import_framer_motion4 = require("framer-motion");
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime9 = require("react/jsx-runtime");
function MocaVerificationDashboard({
  records = [],
  onVerify,
  onRevoke
}) {
  const [loadingIndex, setLoadingIndex] = (0, import_react8.useState)(null);
  const [data, setData] = (0, import_react8.useState)(records);
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Card, { className: "rounded-2xl shadow w-full max-w-4xl border text-card-foreground", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex flex-col p-6 border-b gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", { className: "text-xl font-semibold", children: "Verification Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "bg-primary/10 text-primary py-2 px-4 rounded-full text-xs", children: "Managed by Moca" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-sm text-muted-foreground", children: "Verify or revoke gamer credentials issued through Moca Gaming Passport." })
    ] }),
    data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex flex-col items-center py-10 opacity-70", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-sm text-muted-foreground", children: "No credentials found." }) }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "grid grid-cols-2 gap-6 p-6 w-fit", children: data.map((record, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      import_framer_motion4.motion.div,
      {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.15 },
        className: "flex flex-col gap-3 p-6 rounded-3xl border",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex flex-wrap gap-2 mb-2", children: record.connected.map((plat) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex flex-wrap gap-12 p-6 bg-card rounded-3xl", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-xs text-muted-foreground", children: "Name" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "font-medium text-foreground", children: record.name })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-xs text-muted-foreground", children: "Age" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "font-medium text-foreground", children: record.age })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-xs text-muted-foreground", children: "Country" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "font-medium text-foreground", children: record.country })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "space-y-6 bg-card rounded-3xl p-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex flex-wrap gap-12 items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-xs text-muted-foreground", children: "Game" }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "font-medium text-foreground", children: record.game })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-xs text-muted-foreground", children: "Rank" }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "font-medium text-foreground", children: record.rank })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-xs text-muted-foreground", children: "XP" }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "font-medium text-foreground", children: record.xp })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex items-center gap-3 pt-2", children: !record.verified ? loadingIndex === index ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react6.Loader2, { className: "animate-spin w-5 h-5 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              Button,
              {
                onClick: () => handleVerify(index),
                className: " font-medium px-4 rounded-xl w-full bg-foreground",
                children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-background", children: "Verify" })
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MocaConnectWidget,
  MocaGamingPassport,
  MocaLoginButton,
  MocaTournamentVerifier,
  MocaUserPanel,
  MocaVerificationDashboard,
  useMocaIdentity
});
//# sourceMappingURL=index.cjs.map
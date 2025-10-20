# Wave 2 — MocaPassport SDK Setup & Gaming Credential Components

This wave introduces major updates to the MocaPassport ecosystem, including a full MocaLogin refactor, MocaIdentity hook, multi-step gaming credential issuance, robust credential handling, and modular SDK organization via `moca-sdk`.

## Key Notes

* `moca-sdk` handles all authentication, identity management, credential issuance, and utilities
* `next-app` contains multi-step UI for gamer credential creation, demo pages, and integration examples
* Modular structure allows reusable SDK across multiple frontend apps

## 2. MocaIdentity Hook

`useMocaIdentity.ts` provides:

* `user` object (`handle`, `walletAddress`, `token`)
* `login()` — triggers login flow via AIR service
* `logout()` — clears local session
* `initialized` & `loading` states
* `error` state for debugging

### Features

* Persists login in `localStorage`
* Auto-initializes on mount
* Gracefully handles login and init errors

### Usage Example

```javascript
import { useMocaIdentity } from "@mocapassport/sdk";

const { user, login, logout, loading, error } = useMocaIdentity();
```

## 3. MocaLogin Component

Built on top of `useMocaIdentity`, `<MocaLogin />`:

* Shows login button or user panel
* Supports `CustomButton` for UI customization
* Optional `showUserInfo` prop to reveal handle and wallet
* Children as a render prop for custom rendering

### Example Conditional Usage

```javascript
<MocaLogin onLoginSuccess={() => showIssueButton(true)} />
```

## 4. IssueCredentialButton Component

`IssueCredentialButton.tsx` handles:

* Credential issuance with loading, success, and error states
* Calls `issueGamingCredential(subject)` internally
* Optional callbacks: `onSuccess` & `onError`
* Works seamlessly with multi-step widgets and conditional login

## 5. Credential Issuance (`issueCredential.ts`)

* Ensures required fields (`id`, `xp`) are present
* Optional fields are sanitized to prevent undefined values
* Generates `id` automatically if missing
* Defaults `xp` to `"0 Years"`

```javascript
function sanitizeCredentialSubject(subject) {
  const cleaned: any = {};
  for (const key in subject) if (subject[key] != null) cleaned[key] = subject[key];
  if (!cleaned.id) cleaned.id = `urn:uuid:${crypto.randomUUID()}`;
  if (!cleaned.xp) cleaned.xp = "0 Years";
  return cleaned;
}
```

Prevents runtime errors like `EmptyError` from AIR.

## 6. Multi-Step Gaming Passport Widget

`MocaConnectWidget.tsx` / `MocaGamingPassport.tsx`:

### Steps

1. **Platform Connect** — Steam / Epic Games
2. **Profile Info** — Game, Rank, Name, Age, Country
3. **Review & Issue** — Conditional IssueCredentialButton wrapped in `<MocaLogin>`

### Type Safety Fixes

* `age` input cast to `number` for `GamingCredentialSubject`
* `connected` platforms array tracked for validation

## 7. Other Frontend Components

* **MocaTournamentVerifier.tsx** — verifies tournament credentials
* **MocaVerificationDashboard.tsx** — admin view of issued credentials and users
* **Verticals/gaming** — specialized gaming credential issuance logic

## 8. Demo Pages & Schema Tab

* **Preview tab:** live demo of login / panel
* **Code tab:** shows copyable snippets
* **Schema tab:** displays issued credential metadata, program ID, expiration, and credential ID
* Credential ID is copyable
* `xp` defaults to `"0 Years"` if missing

## 9. AIR Integration Fixes

* Login required automatically handled with `<MocaLogin />`
* Prevents errors like:
  * `EmptyError: no elements in sequence`
  * `NOT_LOGGED_IN` or `Refresh token missing`
  * WalletConnect mismatch errors

## 10. Benefits of Wave 2

* Modular `moca-sdk` with hooks, components, and verticals
* Conditional login ensures smooth credential issuance
* Robust sanitization prevents runtime errors
* Multi-step UI for gamers, with platform + profile verification
* Copyable schema and credential IDs
* Full demo pages with preview, code, and schema tabs

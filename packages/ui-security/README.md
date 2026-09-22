# @waysnx/ui-security

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — authentication, authorization, and security utilities.

Enterprise-grade security components from WaysNX — authentication, authorization, MFA, secure inputs, and session management.

## Installation

```bash
npm install @waysnx/ui-security
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-security/dist/index.css";
```

## Overview

`@waysnx/ui-security` provides security-oriented UI organized by domain: authentication, authorization gates, multi-factor authentication, verification, secure inputs, session management, audit views, CAPTCHA, and SSO. Components are exported at the package root.

## Representative exports

- Authentication & password: `LoginForm`, `LoginCard`, `ChangePasswordForm`, `ForgotPasswordForm`, `PasswordInput`, `PasswordStrengthMeter`, `PasswordGenerator`, `PasswordRequirements`
- OTP & verification: `OTPInput`, `OTPVerificationCard`, `EmailVerificationCard`, `PhoneVerificationCard`
- Authorization gates: `RoleGate`, `PermissionGate`
- Secure inputs, MFA, audit, CAPTCHA, and SSO component families

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { useState } from "react";
import { PasswordInput } from "@waysnx/ui-security";

export function Example() {
  const [password, setPassword] = useState("");
  return <PasswordInput value={password} onChange={setPassword} />;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech

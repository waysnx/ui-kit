# @waysnx/ui-security — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

Enterprise-grade security components — pre-built auth UIs, MFA flows, session management, and authorization gates. Use these instead of building login/auth forms from scratch.

---

## Package info

- **npm:** `@waysnx/ui-security` v1.0.1 (companion package — NOT included in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-security`
- **Deps:** `@waysnx/ui-core`, `@waysnx/ui-feedback`, `@waysnx/ui-layout`, `@waysnx/ui-i18n`
- **Peer deps:** `react >=18`, `react-dom >=18`
- **CSS (required):** `import '@waysnx/ui-security/dist/index.css'`

---

## Providers

| Provider | Hook | Purpose |
|----------|------|---------|
| `AuthenticationProvider` | `useAuthentication` | Auth state, login/logout |
| `SessionProvider` | `useSession` | Session lifecycle |
| `AuthorizationProvider` | `useAuthorization` | Permissions/roles |
| `MFAProvider` | `useMFA` | Multi-factor auth state |

Additional hooks: `useAuth`, `useIdleDetection`, `usePasswordValidation`, `useSecureStorage`, `useBiometricAuth`, `useOTP`

---

## Components by domain

### Authentication
`LoginForm`, `LoginCard`, `ChangePasswordForm`, `ForgotPasswordForm`

### Password
`PasswordInput`, `PasswordStrengthMeter`, `PasswordRequirements`, `PasswordGenerator`

### OTP
`OTPInput`, `OTPResendButton`, `OTPVerificationCard`

### Verification
`EmailVerificationCard`, `PhoneVerificationCard`, `DeviceVerificationDialog`, `VerificationStatus`

### Authorization gates
`PermissionGate`, `RoleGate`, `FeatureGate`, `ScopeGate`, `PolicyGate`, `AccessDenied`, `UnauthorizedPage`

### Session management
`SessionTimeoutDialog`, `SessionCountdown`, `IdleMonitor`, `ActiveSessions`, `ConcurrentSessionDialog`, `KeepAliveButton`

### Secure inputs
`SecureInput`, `SecureTextarea`, `SecureUploader`, `SecureDownloadButton`, `SecureClipboardButton`, `SensitiveText`, `MaskedInput`, `PINInput`

### MFA
`MFASetupWizard`, `MFAVerificationDialog`, `AuthenticatorQRCode`, `BackupCodesCard`, `TrustedDeviceSelector`, `MFAStatus`, `BiometricButton`, `SecurityKeyButton`

### Security dashboard
`SecurityBanner`, `SecurityAlert`, `SecurityStatusCard`, `SecurityScore`, `EncryptionBadge`, `PasswordAgeIndicator`, `RiskScoreBadge`, `SecurityHealthIndicator`

### Audit & logging
`AuditTimeline`, `AuditHistoryTable`, `LoginHistory`, `SecurityEventLog`, `ActivityFeed`

### Settings panels
`SecuritySettingsPanel`, `PasswordPolicyPanel`, `MFASettingsPanel`, `SessionPolicyPanel`, `TrustedDevicesPanel`, `PrivacySettingsPanel`, `SecurityLogsPanel`, `SecurityAlertsPanel`

### Captcha
`GoogleCaptcha`, `TurnstileCaptcha`, `HCaptcha`, `CaptchaContainer`

### SSO buttons
`GoogleLoginButton`, `MicrosoftLoginButton`, `GitHubLoginButton`, `OktaLoginButton`, `Auth0LoginButton`

---

## Key types

`User`, `Session`, `Permission`, `Role`, `AuthorizationContext`, `AuditEvent`, `LoginCredentials`, `PasswordPolicy`, `SecurityPolicy`, `RiskScore`, `TrustedDeviceInfo`, `AuthenticationResult`

---

## Example

```tsx
import { AuthenticationProvider, LoginCard, PermissionGate } from '@waysnx/ui-security';
import '@waysnx/ui-security/dist/index.css';

function App() {
  return (
    <AuthenticationProvider config={{ apiBaseUrl: '/api/auth' }}>
      <LoginCard onSuccess={(user) => console.log('Logged in:', user)} />
      <PermissionGate permissions={['admin']}>
        <AdminPanel />
      </PermissionGate>
    </AuthenticationProvider>
  );
}
```

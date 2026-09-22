# @waysnx/ui-communication — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see `@waysnx/ui-kit` LLM.md (shipped with that package).

---

## ⭐ What this package does

Networking-agnostic communication framework — provides UI components for chat/messaging, threads, presence, reactions, and mentions. You supply the transport layer (WebSocket, REST, etc.).

---

## Package info

- **npm:** `@waysnx/ui-communication` v1.0.1 (companion package — NOT in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-communication`
- **Peer deps:** `react >=18`, `react-dom >=18`, `@waysnx/ui-core >=1.0.0`, `@waysnx/ui-layout >=1.0.0`, `@waysnx/ui-feedback >=1.0.0`
- **CSS (required):** `import '@waysnx/ui-communication/dist/index.css'`

---

## Architecture

This is a **networking-agnostic** communication framework. It provides UI components and state management for chat/messaging, but does NOT include WebSocket or API connectivity. You provide the transport layer.

---

## Provider

```tsx
import { CommunicationProvider } from '@waysnx/ui-communication';

<CommunicationProvider config={communicationConfig}>
  <App />
</CommunicationProvider>
```

---

## Exported components

| Component | Purpose |
|-----------|---------|
| `ConversationList` | List of conversations/channels |
| `ChatWindow` | Full chat window |
| `MessageBubble` | Individual message display |
| `ChatInput` | Message composition input |
| `ThreadPanel` | Thread/reply panel |
| `PresenceIndicator` | Online/offline/away status dot |
| `TypingIndicator` | "User is typing..." indicator |
| `ReadReceipts` | Message read status |
| `ReactionBar` | Emoji reactions on messages |
| `EmojiPicker` | Emoji selection panel |
| `MentionInput` | @mention autocomplete input |
| `VoiceMessage` | Voice message recorder/player |
| `UserPresenceList` | List of users with status |
| `NotificationList` | Notification feed |
| `NotificationBadge` | Unread count badge |

## Hooks

| Hook | Purpose |
|------|---------|
| `useConversation` | Conversation state management |
| `useMessages` | Message CRUD operations |
| `useTyping` | Typing indicator state |
| `usePresence` | User presence tracking |
| `useMentions` | @mention resolution |

## Provider hook

`useCommunication` — access the full communication context

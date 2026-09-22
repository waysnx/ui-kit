# @waysnx/ui-communication

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — messaging, threads, presence, reactions, and collaboration hooks.

Enterprise-grade communication components from WaysNX — messaging, threads, presence, reactions, mentions, and realtime collaboration.

## Installation

```bash
npm install @waysnx/ui-communication
```

Requires `react` and `react-dom` (>=18) as peer dependencies, along with `@waysnx/ui-core`, `@waysnx/ui-layout`, and `@waysnx/ui-feedback`.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-communication/dist/index.css";
```

## Overview

`@waysnx/ui-communication` provides building blocks for chat, messaging, and collaboration surfaces — conversation lists, chat windows, message composition, presence, reactions, and mentions. A `CommunicationProvider` and hooks support shared communication state.

## Representative exports

- Messaging: `ConversationList`, `ChatWindow`, `MessageBubble`, `ChatInput`, `ThreadPanel`, `VoiceMessage`
- Presence & engagement: `PresenceIndicator`, `TypingIndicator`, `ReadReceipts`, `ReactionBar`, `EmojiPicker`, `MentionInput`, `UserPresenceList`
- Notifications: `NotificationList`, `NotificationBadge`
- Provider & hooks: `CommunicationProvider`, `useCommunication`, `useConversation`, `useMessages`, `useTyping`, `usePresence`, `useMentions`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { CommunicationProvider, ConversationList } from "@waysnx/ui-communication";

export function Example() {
  return (
    <CommunicationProvider>
      <ConversationList conversations={[]} />
    </CommunicationProvider>
  );
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech

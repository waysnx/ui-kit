# @waysnx/ui-navigation — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

Enterprise navigation framework — menus, sidebars, breadcrumbs, command palette, workspace switching, and more. Networking-agnostic: you provide menu data, the components handle rendering, keyboard navigation, and accessibility.

---

## Package info

- **npm:** `@waysnx/ui-navigation` v1.0.1 (companion package — NOT included in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-navigation`
- **Peer deps:** `react >=18`, `react-dom >=18`
- **CSS (required):** `import '@waysnx/ui-navigation/dist/index.css'`

---

## Provider

Wrap your app with `NavigationProvider` to enable hooks:

```tsx
import { NavigationProvider } from '@waysnx/ui-navigation';
<NavigationProvider menuItems={menuConfig}>
  <App />
</NavigationProvider>
```

---

## Exported components

| Component | Purpose |
|-----------|---------|
| `Menu` | Horizontal/vertical menu |
| `MenuItemComponent` | Individual menu item |
| `Sidebar` | Collapsible sidebar — supports `colorScheme: 'dark' \| 'light'` for independent theming |
| `Navbar` | Top navigation bar |
| `Header` | App header with logo/nav |
| `Breadcrumb` | Breadcrumb trail |
| `ContextMenu` | Right-click context menu |
| `MegaMenu` | Multi-column dropdown menu |
| `TreeMenu` | Hierarchical tree navigation |
| `Tabs` | Navigation tabs |
| `Drawer` | Navigation drawer |
| `CommandPalette` | Cmd+K command launcher — fuzzy search, category grouping, keyboard nav, recent commands |
| `SearchNavigation` | Global search with categories |
| `UserMenu` | User avatar dropdown |
| `NotificationCenter` | Notification bell + panel |
| `WorkspaceSwitcher` | Workspace/org selector |
| `QuickActions` | Floating action shortcuts |
| `StepNavigation` | Step-by-step navigation |
| `FavoritesMenu` | Bookmarked items |
| `RecentItems` | Recently accessed items |

## Hooks

`useNavigation`, `useSidebar`, `useMenu`, `useTabs`, `useDrawer`, `useBreadcrumb`, `useWorkspace`, `useCommandPalette`

## Utilities

`createMenu`, `flattenMenu`, `findMenuItem`, `buildBreadcrumb`, `filterMenuByPermissions`

---

## Key Props

### Sidebar — `colorScheme`

```tsx
colorScheme?: 'light' | 'dark';  // default: undefined (inherits app theme)
```

Renders sidebar with independent dark/light colors regardless of app theme. Uses scoped CSS variables via `data-color-scheme` attribute.

```tsx
<Sidebar items={menuItems} colorScheme="dark" />
```

### CommandPalette — Category Grouping

Commands with a `category` field are grouped with section headers:

```tsx
const commands: Command[] = [
  { id: '1', title: 'New File', category: 'Files', action: () => {} },
  { id: '2', title: 'New Folder', category: 'Files', action: () => {} },
  { id: '3', title: 'Search Users', category: 'Users', action: () => {} },
];
// Renders grouped: "FILES" header → New File, New Folder | "USERS" header → Search Users
```

**Keyboard:** `Ctrl+K` / `Cmd+K` to open, `↑↓` navigate, `Enter` select, `Escape` close. Backspace and all input keys work normally.


---

## i18n Keys

Navigation components use the following translation keys internally via `useTranslation()`. Override these by passing custom messages to `<TranslationProvider>`.

| Key | Default (English) | Used in |
|-----|-------------------|---------|
| `general.loading` | "Loading..." | Loading states |
| `navigation.search` | "Search" | Search input label |
| `navigation.noResults` | "No results found" | Empty search results |
| `navigation.noCommands` | "No commands found" | Command palette empty state |
| `navigation.noFavorites` | "No favorites yet" | Favorites empty state |
| `navigation.recentItems` | "Recent items" | Recent items section title |
| `navigation.notifications` | "Notifications" | Notifications panel title |


---

## Accessibility Font Scaling

All navigation component font sizes use `--wx-font-size-*` tokens from `@waysnx/ui-core` (which include `--wx-accessibility-font-scale`). Menu items, sidebar text, breadcrumbs, tabs, mega-menu, tree-menu, command palette, and all other navigation text scale automatically when text size changes in the Accessibility Center. No `rem`-based hardcoded font sizes remain — size variants (`--nav-*-font-size`) also resolve to scalable tokens.

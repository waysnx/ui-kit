/**
 * The 18 focused WaysNX UI libraries.
 *
 * All data here is derived from the actual repository:
 *  - `npm` = the package.json "name"
 *  - `description` = the package.json "description" (condensed)
 *  - `kind` = 'visual' (ships standalone Storybook component stories) or
 *             'functional' (primarily schema / API / runtime functionality)
 *  - `storybookSection` = the existing Storybook top-level title prefix where
 *             its stories live, or null when it has no standalone stories.
 *  - `storyCount` = number of *.stories.tsx files currently filed for it
 *             (not a component count — component counts are not invented here).
 *  - `note` = clarifies known Storybook categorization mismatches.
 *
 * @waysnx/ui-kit (the aggregate package) is intentionally NOT listed here — it
 * is not a 19th focused library.
 */

export interface LibraryInfo {
  name: string;
  npm: string;
  description: string;
  kind: 'visual' | 'functional';
  /** Existing Storybook top-level section title, or null if no stories. */
  storybookSection: string | null;
  storyCount: number;
  /**
   * A verified, existing Storybook story ID to link the card to, or null when
   * the library has no reliable destination (no stories). Every non-null value
   * here was confirmed against Storybook's generated index.json — we never
   * derive a route from a section name (sections are not Docs pages).
   */
  storyId: string | null;
  note?: string;
}

export const LIBRARIES: LibraryInfo[] = [
  {
    name: 'Accessibility',
    npm: '@waysnx/ui-accessibility',
    description:
      'Accessibility control center — centralized settings applied across components in real time.',
    kind: 'visual',
    storybookSection: 'Accessibility',
    storyCount: 4,
    storyId: 'accessibility-accessibilitycenter--floating-button',
  },
  {
    name: 'Communication',
    npm: '@waysnx/ui-communication',
    description:
      'Messaging, threads, presence, reactions, mentions and realtime collaboration components.',
    kind: 'visual',
    storybookSection: 'Communication',
    storyCount: 13,
    storyId: 'communication-chatinput--default',
  },
  {
    name: 'Core',
    npm: '@waysnx/ui-core',
    description:
      'Foundational controls — inputs, buttons, date pickers and form controls.',
    kind: 'visual',
    storybookSection: 'Components',
    storyCount: 22,
    storyId: 'components-button--primary',
    note: 'Stories are filed under the "Components" section.',
  },
  {
    name: 'Dashboard',
    npm: '@waysnx/ui-dashboard',
    description:
      'Dashboard framework — widgets, layout system and dashboard infrastructure.',
    kind: 'visual',
    storybookSection: 'Dashboard',
    storyCount: 6,
    storyId: 'dashboard-specialized-widgets--chart-widget-basic',
  },
  {
    name: 'Data',
    npm: '@waysnx/ui-data',
    description:
      'Data editing and viewing — JSON, XML, code and markdown editors and viewers.',
    kind: 'visual',
    storybookSection: 'Data',
    storyCount: 6,
    storyId: 'data-codeeditor--default',
  },
  {
    name: 'Diagnostics',
    npm: '@waysnx/ui-diagnostics',
    description:
      'Client-side runtime diagnostics and UI error observability. A capture/emit library.',
    kind: 'functional',
    storybookSection: 'Diagnostics',
    storyCount: 1,
    storyId: 'diagnostics-diagnostics--default',
    note: 'Functional library. Includes one interactive error-boundary demo story.',
  },
  {
    name: 'Docs',
    npm: '@waysnx/ui-docs',
    description:
      'Documentation framework — renders documentation from structured, JSON-driven metadata.',
    kind: 'visual',
    storybookSection: 'Docs',
    storyCount: 3,
    storyId: 'docs-componenthero--default',
  },
  {
    name: 'Feedback',
    npm: '@waysnx/ui-feedback',
    description:
      'Overlays and status — Modal, Toast, Drawer, Tooltip, Skeleton, Progress, Badge and more.',
    kind: 'visual',
    storybookSection: 'Components',
    storyCount: 1,
    storyId: 'components-spinner--default',
    note: 'Currently only the Spinner story is filed (under "Components"). Most Feedback components do not yet have standalone stories.',
  },
  {
    name: 'Files',
    npm: '@waysnx/ui-files',
    description: 'File and document viewing — PDF viewer and document preview.',
    kind: 'visual',
    storybookSection: 'Files',
    storyCount: 2,
    storyId: 'files-documentpreview--default',
  },
  {
    name: 'Form Builder',
    npm: '@waysnx/ui-form-builder',
    description:
      'Schema-driven form builder — renders forms from JSON Schema using ui-core components.',
    kind: 'functional',
    storybookSection: null,
    storyCount: 0,
    storyId: null,
    note: 'Functional library. No standalone Storybook stories.',
  },
  {
    name: 'Grid Builder',
    npm: '@waysnx/ui-grid-builder',
    description:
      'Data grid — sortable, filterable, paginated grid with column types and actions.',
    kind: 'visual',
    storybookSection: null,
    storyCount: 0,
    storyId: null,
    note: 'No standalone Storybook stories yet.',
  },
  {
    name: 'i18n',
    npm: '@waysnx/ui-i18n',
    description:
      'Internationalization provider — shared translation context across all packages.',
    kind: 'functional',
    storybookSection: null,
    storyCount: 0,
    storyId: null,
    note: 'Functional library. No standalone Storybook stories.',
  },
  {
    name: 'Layout',
    npm: '@waysnx/ui-layout',
    description:
      'Layout components — page structure, layout primitives and content organization.',
    kind: 'visual',
    storybookSection: null,
    storyCount: 0,
    storyId: null,
    note: 'No standalone Storybook stories yet.',
  },
  {
    name: 'Maps',
    npm: '@waysnx/ui-maps',
    description:
      'Maps and location — address search, map views, route planning and geolocation.',
    kind: 'visual',
    storybookSection: 'Maps',
    storyCount: 9,
    storyId: 'maps-addressautocomplete--default',
  },
  {
    name: 'Media',
    npm: '@waysnx/ui-media',
    description:
      'Media and visual — QR/barcode, signatures, image/video/audio, OCR and color picker.',
    kind: 'visual',
    storybookSection: 'Media',
    storyCount: 12,
    storyId: 'media-audioplayer--default',
  },
  {
    name: 'Navigation',
    npm: '@waysnx/ui-navigation',
    description:
      'Navigation framework — menus, sidebars, breadcrumbs and advanced navigation patterns.',
    kind: 'visual',
    storybookSection: 'Navigation',
    storyCount: 19,
    storyId: 'navigation-breadcrumb--default',
    note: 'Four stories are currently grouped under the "Enterprise" section (FavoritesMenu, QuickActions, RecentItems, StepNavigation).',
  },
  {
    name: 'Security',
    npm: '@waysnx/ui-security',
    description:
      'Security components — authentication, authorization, MFA, secure inputs and sessions.',
    kind: 'visual',
    storybookSection: 'Security',
    storyCount: 74,
    storyId: 'security-pages-accessdenied--default',
  },
  {
    name: 'Visualization',
    npm: '@waysnx/ui-visualization',
    description:
      'Visualization — OrgChart, Tree, Hierarchy and more, on a high-performance engine.',
    kind: 'visual',
    storybookSection: 'Visualization',
    storyCount: 4,
    storyId: 'visualization-hierarchy--default',
  },
];

export const LINKS = {
  docs: 'https://uikit.waysnx.tech',
  github: 'https://github.com/waysnx/ui-kit',
  npm: 'https://www.npmjs.com/org/waysnx',
};

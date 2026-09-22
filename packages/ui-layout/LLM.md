# @waysnx/ui-layout — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

Layout primitives for page structure and content organization — Grid, Tabs, Accordion, Wizard, Card, etc. These are for **page layout**, not for laying out form fields (DynamicForm from `@waysnx/ui-form-builder` handles its own internal grid).

---

## Package info

- **npm:** `@waysnx/ui-layout` v1.0.1
- **Peer deps:** `react >=18`
- **CSS (required):** `import '@waysnx/ui-layout/dist/index.css'`

---

## Exported components

All export `<Name>` + `<Name>Props`.

### Page structure
| Component | Purpose |
|-----------|---------|
| `PageLayout` | Full page wrapper |
| `PageHeader` | Page title/breadcrumb area |
| `PageContent` | Main content area |
| `SidebarLayout` | Page with sidebar |
| `Container` | Max-width wrapper (`maxWidth?: 'sm'\|'md'\|'lg'\|'xl'\|'full'`) |

### Layout primitives
| Component | Key props | Purpose |
|-----------|-----------|---------|
| `Grid` | `columns?: number\|string`, `gap?` | CSS grid container. Number = equal columns, string = any CSS grid-template-columns (e.g. `"2fr 1fr 1fr"`) |
| `Row` | `gap?` | Flex row |
| `Column` | `span?` | Flex column |
| `Stack` | `direction?: 'vertical'\|'horizontal'`, `gap?` | Stack layout |
| `Section` | `title?` | Semantic section |
| `Divider` | — | Horizontal rule |
| `Spacer` | `size?` | Vertical space |

### Content containers
| Component | Key props | Purpose |
|-----------|-----------|---------|
| `Card` | `title?`, `className?`, `testId?` | Card container |
| `Panel` | `title?` | Panel with header |

### Tabs & Accordion
| Component | Purpose |
|-----------|---------|
| `Tabs`, `TabList`, `Tab`, `TabPanels`, `TabPanel` | Tab container + panels |
| `PageTabs`, `PageTab` | Full-page-width tabs |
| `Accordion`, `AccordionItem` | Collapsible sections |
| `Collapsible` | Single collapsible |

### Navigation & flow
| Component | Key props | Purpose |
|-----------|-----------|---------|
| `Breadcrumb`, `BreadcrumbItem` | `items` | Breadcrumb trail |
| `Stepper`, `StepItem` | `steps`, `currentStep` | Multi-step indicator |
| `Wizard`, `WizardStep` | — | Multi-step form wizard |
| `SplitLayout` | — | Resizable split panes |

---

## Usage example

```tsx
import { Container, Grid, Card, Tabs, TabList, Tab, TabPanels, TabPanel } from '@waysnx/ui-layout';
import '@waysnx/ui-layout/dist/index.css';

function Dashboard() {
  return (
    <Container maxWidth="xl">
      <Grid columns={3} gap="1rem">
        <Card title="Revenue">$12,340</Card>
        <Card title="Users">1,234</Card>
        <Card title="Orders">567</Card>
      </Grid>

      {/* Unequal columns — pass any CSS grid-template-columns string */}
      <Grid columns="2fr 1fr 1fr" gap="1rem">
        <Card title="Main Content">Takes 2x width</Card>
        <Card title="Sidebar 1">Normal</Card>
        <Card title="Sidebar 2">Normal</Card>
      </Grid>
      <Tabs defaultTab={0}>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Overview content</TabPanel>
          <TabPanel>Details content</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
```


---

## i18n Keys

Layout components use the following translation keys internally via `useTranslation()`. Override these by passing custom messages to `<TranslationProvider>`.

| Key | Default (English) | Used in |
|-----|-------------------|---------|
| `wizard.next` | "Next" | Wizard next step button |
| `wizard.previous` | "Previous" | Wizard previous step button |
| `wizard.skip` | "Skip" | Wizard skip button |
| `wizard.finish` | "Finish" | Wizard final step button |
| `wizard.saveContinueLater` | "Save & Continue Later" | Wizard save draft button |
| `wizard.validating` | "Validating..." | Wizard validation state |


---

## Accessibility Font Scaling

All layout component font sizes use `--wx-font-size-*` tokens from `@waysnx/ui-core` (which include `--wx-accessibility-font-scale`). Card titles, panel headings, tab labels, stepper/wizard text, and accordion triggers scale automatically when text size changes in the Accessibility Center. No `rem`-based hardcoded sizes remain.

- `Card` title → `.wx-card-title` class, uses `--wx-font-size-md`
- `Panel` title → `.wx-panel-title` class, uses `--wx-font-size-md`
- Body/tab/stepper text → `--wx-font-size-sm`

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { Sidebar } from '@waysnx/ui-navigation';
import type { NavigationItem } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Navigation" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: '📊',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: '📈',
    children: [
      {
        id: 'analytics-overview',
        label: 'Overview',
        href: '/analytics/overview',
      },
      {
        id: 'analytics-reports',
        label: 'Reports',
        href: '/analytics/reports',
      },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    href: '/users',
    icon: '👥',
    children: [
      {
        id: 'users-list',
        label: 'List',
        href: '/users/list',
      },
      {
        id: 'users-new',
        label: 'New',
        href: '/users/new',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: '⚙️',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Logo</div>,
    collapsible: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const Collapsed: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>L</div>,
    collapsible: true,
    isCollapsed: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const WithFooter: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    collapsible: true,
    footer: (
      <div style={{ fontSize: '0.875rem', color: '#666' }}>
        <div>© 2024</div>
        <div>Version 1.0</div>
      </div>
    ),
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const NotCollapsible: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    collapsible: false,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const CompactDensity: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>L</div>,
    collapsible: true,
    density: 'compact',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const RightPosition: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>L</div>,
    collapsible: true,
    position: 'right',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh', flexDirection: 'row-reverse' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const DarkMode: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    collapsible: true,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', color: '#fff', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const DarkColorScheme: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>WaysNX</div>,
    collapsible: true,
    colorScheme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark sidebar on a light-themed app using the `colorScheme="dark"` prop. The sidebar renders with dark background and light text independently of the app theme — a common enterprise admin pattern.',
      },
    },
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh', background: '#f8fafc' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Light App with Dark Sidebar</h1>
          <p>The sidebar uses <code>colorScheme="dark"</code> while the content area stays light.</p>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const LightColorScheme: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>WaysNX</div>,
    collapsible: true,
    colorScheme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Explicit light sidebar using `colorScheme="light"` — forces light colors even inside a dark-themed app.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto', color: '#fff' }}>
          <h1>Dark App with Light Sidebar</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>WaysNX</div>,
    collapsible: true,
    persistState: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          isCollapsed={isCollapsed}
          onCollapseChange={setIsCollapsed}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Interactive Sidebar</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
          <p>Collapsed: {isCollapsed ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  },
};

export const Accessibility: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    collapsible: true,
    keyboardNav: true,
    ariaLabel: 'Application sidebar navigation',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with full keyboard navigation and ARIA support for accessibility.',
      },
    },
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};


export const UncontrolledWithDefaultCollapsed: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Logo</div>,
    defaultCollapsed: false,
    collapsible: true,
    persistState: false,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Uncontrolled Mode (defaultCollapsed)</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
          <p>The sidebar manages its own state internally.</p>
        </div>
      </div>
    );
  },
};

export const UncontrolledWithPersistence: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Logo</div>,
    defaultCollapsed: false,
    collapsible: true,
    persistState: true,
    storageKey: 'storybook-sidebar-uncontrolled',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Uncontrolled Mode with Persistence</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
          <p>Toggle the sidebar and refresh the page to see persistence in action.</p>
        </div>
      </div>
    );
  },
};

export const ControlledMode: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Logo</div>,
    collapsible: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    const [collapsed, setCollapsed] = useState(false);
    
    return (
      <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
        <div style={{ padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#f5f5f5' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{ padding: '8px 12px' }}>
            External Toggle: {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar
            {...args}
            collapsed={collapsed}
            onCollapseChange={setCollapsed}
            activeItem={activeItem}
            onActiveChange={setActiveItem}
          />
          <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            <h1>Controlled Mode</h1>
            <p>Active: {activeItem?.label || 'None'}</p>
            <p>Collapsed: {collapsed ? 'yes' : 'no'}</p>
            <p>Use the external button above or the sidebar toggle to control the state.</p>
          </div>
        </div>
      </div>
    );
  },
};

export const ControlledWithoutCallback: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Logo</div>,
    collapsible: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    const [collapsed, setCollapsed] = useState(false);
    
    return (
      <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
        <div style={{ padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#f5f5f5' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{ padding: '8px 12px' }}>
            External Toggle: {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar
            {...args}
            collapsed={collapsed}
            activeItem={activeItem}
            onActiveChange={setActiveItem}
          />
          <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            <h1>Controlled Mode (No onCollapseChange)</h1>
            <p>Active: {activeItem?.label || 'None'}</p>
            <p>Collapsed: {collapsed ? 'yes' : 'no'}</p>
            <p>Note: Clicking the sidebar toggle button does NOT change the state. Only external button works.</p>
          </div>
        </div>
      </div>
    );
  },
};

export const ControlledWithExternalPersistence: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Logo</div>,
    collapsible: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    const [collapsed, setCollapsed] = useState(() => {
      if (typeof window === 'undefined') return false;
      try {
        const saved = localStorage.getItem('storybook-sidebar-controlled');
        return saved ? JSON.parse(saved) : false;
      } catch {
        return false;
      }
    });
    
    const handleChange = (value: boolean) => {
      setCollapsed(value);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('storybook-sidebar-controlled', JSON.stringify(value));
        } catch {
          // Handle quota exceeded or other errors
        }
      }
    };
    
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          collapsed={collapsed}
          onCollapseChange={handleChange}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Controlled Mode with External Persistence</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
          <p>Collapsed: {collapsed ? 'yes' : 'no'}</p>
          <p>Toggle the sidebar and refresh the page to see the state persisted.</p>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Note: Persistence is handled externally in the component using localStorage.</p>
        </div>
      </div>
    );
  },
};

export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [uncontrolledActive, setUncontrolledActive] = useState<NavigationItem | undefined>();
    const [controlledCollapsed, setControlledCollapsed] = useState(false);
    const [controlledActive, setControlledActive] = useState<NavigationItem | undefined>();
    
    return (
      <div style={{ display: 'flex', height: '100vh', gap: '2px', backgroundColor: '#f0f0f0' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #ddd' }}>
          <div style={{ padding: '10px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
            <h3 style={{ margin: 0, fontSize: '14px' }}>Uncontrolled</h3>
          </div>
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <Sidebar
              items={sampleItems}
              logo={<div style={{ fontWeight: 'bold' }}>Logo</div>}
              collapsible={true}
              defaultCollapsed={false}
              activeItem={uncontrolledActive}
              onActiveChange={setUncontrolledActive}
            />
            <div style={{ flex: 1, padding: '15px', overflow: 'auto', fontSize: '13px' }}>
              <p>Internal state only</p>
              <p>Active: {uncontrolledActive?.label || 'None'}</p>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
            <h3 style={{ margin: 0, fontSize: '14px' }}>Controlled</h3>
            <button 
              onClick={() => setControlledCollapsed(!controlledCollapsed)}
              style={{ marginTop: '5px', padding: '4px 8px', fontSize: '12px' }}
            >
              {controlledCollapsed ? 'Expand' : 'Collapse'}
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <Sidebar
              items={sampleItems}
              logo={<div style={{ fontWeight: 'bold' }}>Logo</div>}
              collapsible={true}
              collapsed={controlledCollapsed}
              onCollapseChange={setControlledCollapsed}
              activeItem={controlledActive}
              onActiveChange={setControlledActive}
            />
            <div style={{ flex: 1, padding: '15px', overflow: 'auto', fontSize: '13px' }}>
              <p>External state control</p>
              <p>Active: {controlledActive?.label || 'None'}</p>
              <p>Collapsed: {controlledCollapsed ? 'yes' : 'no'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

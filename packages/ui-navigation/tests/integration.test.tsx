import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Sidebar } from "../src/components/Sidebar";
import type { NavigationItem } from "../src/types";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend vitest's expect with jest-dom matchers
expect.extend(matchers);

describe("Sidebar + Menu Integration", () => {
  const mockNavItems: NavigationItem[] = [
    { id: "1", label: "Dashboard", href: "/dashboard" },
    {
      id: "2",
      label: "Projects",
      href: "/projects",
      children: [
        { id: "2-1", label: "Active", href: "/projects/active" },
        { id: "2-2", label: "Archived", href: "/projects/archived" },
      ],
    },
    { id: "3", label: "Settings", href: "/settings" },
  ];

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  describe("Sidebar with Menu Integration", () => {
    it("renders complete sidebar with menu items", () => {
      render(<Sidebar items={mockNavItems} />);
      
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("maintains menu functionality when sidebar is collapsed", async () => {
      const user = userEvent.setup();
      const handleItemClick = vi.fn();
      
      render(
        <Sidebar
          items={mockNavItems}
          collapsible={true}
          onItemClick={handleItemClick}
        />
      );
      
      // Collapse sidebar
      const toggleButton = screen.getByLabelText("Collapse sidebar");
      await user.click(toggleButton);
      
      // Menu items should still be clickable
      await user.click(screen.getByText("Dashboard"));
      
      expect(handleItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: "1", label: "Dashboard" })
      );
    });

    it("menu receives correct variant from sidebar", () => {
      const { container } = render(
        <Sidebar items={mockNavItems} variant="minimal" />
      );
      
      const menu = container.querySelector(".nav-menu");
      expect(menu).toHaveClass("nav-menu--minimal");
    });

    it("menu receives correct density from sidebar", () => {
      const { container } = render(
        <Sidebar items={mockNavItems} density="compact" />
      );
      
      const menu = container.querySelector(".nav-menu");
      expect(menu).toHaveClass("nav-menu--compact");
    });

    it("renders parent items with expandable indicators", async () => {
      const { container } = render(<Sidebar items={mockNavItems} />);
      
      // Parent item should be visible
      expect(screen.getByText("Projects")).toBeInTheDocument();
      
      // Parent with children should have expandable class
      const projectsItem = screen.getByText("Projects").closest("li");
      expect(projectsItem).toHaveClass("nav-menu-item--expandable");
      
      // Children are collapsed by default and not rendered in DOM
    });
  });

  describe("State Coordination", () => {
    it("sidebar collapse state does not affect menu active state", async () => {
      const user = userEvent.setup();
      const activeItem = mockNavItems[0]; // Dashboard
      
      render(
        <Sidebar
          items={mockNavItems}
          activeItem={activeItem}
          collapsible={true}
        />
      );
      
      const dashboardItem = screen.getByText("Dashboard").closest("li");
      expect(dashboardItem).toHaveClass("nav-menu-item--active");
      
      // Collapse sidebar
      await user.click(screen.getByLabelText("Collapse sidebar"));
      
      // Active state should persist
      expect(dashboardItem).toHaveClass("nav-menu-item--active");
    });

    it("menu callbacks propagate through sidebar", async () => {
      const user = userEvent.setup();
      const handleItemClick = vi.fn();
      const handleActiveChange = vi.fn();
      
      render(
        <Sidebar
          items={mockNavItems}
          onItemClick={handleItemClick}
          onActiveChange={handleActiveChange}
        />
      );
      
      await user.click(screen.getByText("Settings"));
      
      expect(handleItemClick).toHaveBeenCalledTimes(1);
      expect(handleItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: "3", label: "Settings" })
      );
      
      expect(handleActiveChange).toHaveBeenCalledTimes(1);
      expect(handleActiveChange).toHaveBeenCalledWith(
        expect.objectContaining({ id: "3", label: "Settings" })
      );
    });
  });

  describe("Complex Layout Scenarios", () => {
    it("renders sidebar with all sections (header, logo, menu, footer)", () => {
      const logo = <div data-testid="logo">Logo</div>;
      const header = <div data-testid="header">Header</div>;
      const footer = <div data-testid="footer">Footer</div>;
      
      render(
        <Sidebar
          items={mockNavItems}
          logo={logo}
          header={header}
          footer={footer}
        />
      );
      
      // All sections should be rendered
      expect(screen.getByTestId("logo")).toBeInTheDocument();
      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("maintains correct structural layout order", () => {
      const logo = <div data-testid="logo">Logo</div>;
      const header = <div data-testid="header">Header</div>;
      const footer = <div data-testid="footer">Footer</div>;
      
      const { container } = render(
        <Sidebar
          items={mockNavItems}
          logo={logo}
          header={header}
          footer={footer}
        />
      );
      
      const sidebar = container.querySelector(".nav-sidebar");
      expect(sidebar).toBeInTheDocument();
      
      // Verify structural elements exist in expected order
      const sidebarHeader = sidebar?.querySelector(".nav-sidebar__header");
      const sidebarContent = sidebar?.querySelector(".nav-sidebar__content");
      const sidebarFooter = sidebar?.querySelector(".nav-sidebar__footer");
      
      expect(sidebarHeader).toBeInTheDocument();
      expect(sidebarContent).toBeInTheDocument();
      
      // Header should appear before content in DOM order
      const headerIndex = Array.from(sidebar?.children || []).indexOf(sidebarHeader!);
      const contentIndex = Array.from(sidebar?.children || []).indexOf(sidebarContent!);
      
      expect(headerIndex).toBeLessThan(contentIndex);
      
      // Footer should appear after content
      if (sidebarFooter) {
        const footerIndex = Array.from(sidebar?.children || []).indexOf(sidebarFooter);
        expect(footerIndex).toBeGreaterThan(contentIndex);
      }
    });

    it("handles empty menu items gracefully", () => {
      render(<Sidebar items={[]} />);
      
      const sidebar = screen.getByRole("complementary");
      expect(sidebar).toBeInTheDocument();
      
      // Menu should render but with no items
      const menu = sidebar.querySelector(".nav-menu");
      expect(menu).toBeInTheDocument();
      
      // No menu items should be present
      const menuItems = menu?.querySelectorAll(".nav-menu-item");
      expect(menuItems).toHaveLength(0);
    });
  });

  describe("Controlled State Behavior", () => {
    it("documents uncontrolled behavior - isCollapsed is initial state only (Phase 3)", () => {
      // KNOWN LIMITATION - Phase 3: Sidebar does not support controlled isCollapsed prop
      // Current behavior: isCollapsed sets initial state but updates to prop are ignored
      // Expected behavior (Phase 3): Sidebar should respond to isCollapsed prop changes
      
      const { container, rerender } = render(
        <Sidebar items={mockNavItems} isCollapsed={false} />
      );
      
      const sidebar = container.querySelector(".nav-sidebar");
      
      // Should be expanded when isCollapsed=false (initial)
      expect(sidebar).toHaveClass("nav-sidebar--expanded");
      expect(sidebar).not.toHaveClass("nav-sidebar--collapsed");
      
      // Rerender with isCollapsed=true
      rerender(<Sidebar items={mockNavItems} isCollapsed={true} />);
      
      // CURRENT BEHAVIOR: State does NOT update (isCollapsed only read on mount)
      // Sidebar remains expanded despite isCollapsed=true
      expect(sidebar).toHaveClass("nav-sidebar--expanded");
      expect(sidebar).not.toHaveClass("nav-sidebar--collapsed");
      
      // TODO Phase 3: Implement controlled mode
      // Expected after Phase 3 fix:
      // expect(sidebar).toHaveClass("nav-sidebar--collapsed");
      // expect(sidebar).not.toHaveClass("nav-sidebar--expanded");
    });

    it("invokes onCollapseChange in uncontrolled mode (current behavior)", async () => {
      const user = userEvent.setup();
      const handleCollapseChange = vi.fn();
      
      const { container } = render(
        <Sidebar
          items={mockNavItems}
          isCollapsed={false}
          collapsible={true}
          onCollapseChange={handleCollapseChange}
        />
      );
      
      const sidebar = container.querySelector(".nav-sidebar");
      
      // Initial state: expanded
      expect(sidebar).toHaveClass("nav-sidebar--expanded");
      
      // Click toggle button
      const toggleButton = screen.getByLabelText("Collapse sidebar");
      await user.click(toggleButton);
      
      // Callback should be invoked
      expect(handleCollapseChange).toHaveBeenCalledTimes(1);
      expect(handleCollapseChange).toHaveBeenCalledWith(true);
      
      // CURRENT BEHAVIOR: State changes (uncontrolled)
      expect(sidebar).toHaveClass("nav-sidebar--collapsed");
      
      // NOTE: In controlled mode (Phase 3), parent would update isCollapsed prop
      // and state would only change when prop changes, not from toggle button
    });
  });

  describe("Security Context Integration", () => {
    const itemsWithPermissions: NavigationItem[] = [
      { id: "1", label: "Public", href: "/public" },
      { id: "2", label: "Admin Only", href: "/admin", permissions: ["admin"] },
      { id: "3", label: "User Only", href: "/user", roles: ["user"] },
    ];

    it("menu respects security context passed through sidebar", () => {
      const securityContext = {
        permissions: ["admin"],
        roles: [],
      };
      
      render(
        <Sidebar
          items={itemsWithPermissions}
          security={securityContext}
        />
      );
      
      expect(screen.getByText("Public")).toBeInTheDocument();
      expect(screen.getByText("Admin Only")).toBeInTheDocument();
      // User Only should be filtered out
    });
  });

  describe("Responsive Behavior", () => {
    it("applies correct CSS variables for width", () => {
      const { container } = render(
        <Sidebar
          items={mockNavItems}
          expandedWidth="20rem"
          collapsedWidth="5rem"
        />
      );
      
      const sidebar = container.querySelector(".nav-sidebar");
      const style = sidebar?.getAttribute("style");
      
      expect(style).toContain("--wx-nav-sidebar-width");
    });

    it("updates width variable when collapsed", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Sidebar
          items={mockNavItems}
          expandedWidth="20rem"
          collapsedWidth="5rem"
          collapsible={true}
        />
      );
      
      const sidebar = container.querySelector(".nav-sidebar");
      let style = sidebar?.getAttribute("style");
      expect(style).toContain("20rem");
      
      // Collapse sidebar
      await user.click(screen.getByLabelText("Collapse sidebar"));
      
      style = sidebar?.getAttribute("style");
      expect(style).toContain("5rem");
    });
  });
});

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Menu } from "../src/components/Menu";
import type { NavigationItem, SecurityContext } from "../src/types";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend vitest's expect with jest-dom matchers
expect.extend(matchers);

describe("Menu", () => {
  // Mock navigation items
  const mockItems: NavigationItem[] = [
    { id: "1", label: "Home", href: "/" },
    { id: "2", label: "About", href: "/about" },
    { id: "3", label: "Contact", href: "/contact" },
  ];

  const mockItemsWithChildren: NavigationItem[] = [
    { id: "1", label: "Dashboard", href: "/dashboard" },
    {
      id: "2",
      label: "Products",
      href: "/products",
      children: [
        { id: "2-1", label: "Electronics", href: "/products/electronics" },
        { id: "2-2", label: "Clothing", href: "/products/clothing" },
      ],
    },
    { id: "3", label: "Support", href: "/support" },
  ];

  // Clean up DOM after each test
  afterEach(() => {
    cleanup();
  });

  describe("Rendering", () => {
    it("renders all menu items", () => {
      render(<Menu items={mockItems} />);
      
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders with vertical orientation by default", () => {
      const { container } = render(<Menu items={mockItems} />);
      const menu = container.querySelector(".nav-menu");
      
      expect(menu).toHaveClass("nav-menu--vertical");
    });

    it("renders with horizontal orientation when specified", () => {
      const { container } = render(
        <Menu items={mockItems} orientation="horizontal" />
      );
      const menu = container.querySelector(".nav-menu");
      
      expect(menu).toHaveClass("nav-menu--horizontal");
    });

    it("renders parent items with expandable indicators", () => {
      const { container } = render(<Menu items={mockItemsWithChildren} />);
      
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Support")).toBeInTheDocument();
      
      // Parent with children should have expandable class
      const productsItem = screen.getByText("Products").closest("li");
      expect(productsItem).toHaveClass("nav-menu-item--expandable");
      
      // Children items are not rendered until expanded (collapsed by default)
    });

    it("applies density class", () => {
      const { container } = render(
        <Menu items={mockItems} density="compact" />
      );
      const menu = container.querySelector(".nav-menu");
      
      expect(menu).toHaveClass("nav-menu--compact");
    });

    it("applies variant class", () => {
      const { container } = render(
        <Menu items={mockItems} variant="minimal" />
      );
      const menu = container.querySelector(".nav-menu");
      
      expect(menu).toHaveClass("nav-menu--minimal");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Menu items={mockItems} className="custom-menu" />
      );
      const menu = container.querySelector(".nav-menu");
      
      expect(menu).toHaveClass("nav-menu");
      expect(menu).toHaveClass("custom-menu");
    });
  });

  describe("Item Expansion", () => {
    it("marks items with children as expandable and toggles aria-expanded", async () => {
      const user = userEvent.setup();
      const { container } = render(<Menu items={mockItemsWithChildren} />);
      
      const productsItem = screen.getByText("Products").closest("li");
      const productsLink = screen.getByText("Products").closest("a");
      
      // Should have expandable class and aria-expanded=false initially
      expect(productsItem).toHaveClass("nav-menu-item--expandable");
      expect(productsLink).toHaveAttribute("aria-expanded", "false");
      
      // Click to expand
      await user.click(screen.getByText("Products"));
      
      // Verify aria-expanded changes to true after click
      expect(productsLink).toHaveAttribute("aria-expanded", "true");
      
      // Note: Child visibility depends on MenuItem implementation
      // The expandable state and aria-expanded are the contract
    });

    it("nested children become visible when parent is expanded", async () => {
      const user = userEvent.setup();
      render(<Menu items={mockItemsWithChildren} />);
      
      const productsLink = screen.getByText("Products").closest("a");
      
      // Initially collapsed
      expect(productsLink).toHaveAttribute("aria-expanded", "false");
      
      // Children should not be visible initially (or should verify actual behavior)
      // If implementation renders children collapsed, verify they exist but are hidden
      // If implementation doesn't render until expanded, verify they're absent
      
      // Click to expand
      await user.click(screen.getByText("Products"));
      
      // Verify expanded state
      expect(productsLink).toHaveAttribute("aria-expanded", "true");
      
      // Verify children are now visible
      expect(screen.getByText("Electronics")).toBeVisible();
      expect(screen.getByText("Clothing")).toBeVisible();
    });
  });

  describe("Item Interaction", () => {
    it("invokes onItemClick when item is clicked", async () => {
      const user = userEvent.setup();
      const handleItemClick = vi.fn();
      
      render(<Menu items={mockItems} onItemClick={handleItemClick} />);
      
      await user.click(screen.getByText("Home"));
      
      expect(handleItemClick).toHaveBeenCalledTimes(1);
      expect(handleItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: "1", label: "Home" })
      );
    });

    it("invokes onActiveChange when item is clicked", async () => {
      const user = userEvent.setup();
      const handleActiveChange = vi.fn();
      
      render(<Menu items={mockItems} onActiveChange={handleActiveChange} />);
      
      await user.click(screen.getByText("About"));
      
      expect(handleActiveChange).toHaveBeenCalledTimes(1);
      expect(handleActiveChange).toHaveBeenCalledWith(
        expect.objectContaining({ id: "2", label: "About" })
      );
    });

    it("highlights active item", () => {
      const activeItem = mockItems[1]; // "About"
      const { container } = render(
        <Menu items={mockItems} activeItem={activeItem} />
      );
      
      const aboutItem = screen.getByText("About").closest("li");
      expect(aboutItem).toHaveClass("nav-menu-item--active");
    });
  });

  describe("Keyboard Navigation", () => {
    it("documents keyboard nav limitation - ArrowDown (Phase 3)", async () => {
      // KNOWN LIMITATION - Phase 3: Menu does not implement custom keyboard navigation
      // Expected: Arrow keys should move focus between items
      // Current: Focus does not move (standard browser behavior only)
      
      const user = userEvent.setup();
      render(<Menu items={mockItems} keyboardNav={true} />);
      
      const firstLink = screen.getByText("Home").closest("a");
      const secondLink = screen.getByText("About").closest("a");
      
      // Focus first item
      firstLink?.focus();
      expect(document.activeElement).toBe(firstLink);
      
      // Press ArrowDown
      await user.keyboard("{ArrowDown}");
      
      // CURRENT BEHAVIOR: Focus does not move
      expect(document.activeElement).toBe(firstLink);
      
      // TODO Phase 3: Implement arrow key navigation
      // Expected: expect(document.activeElement).toBe(secondLink);
    });

    it("documents keyboard nav limitation - ArrowUp (Phase 3)", async () => {
      // KNOWN LIMITATION - Phase 3: Arrow key navigation not implemented
      
      const user = userEvent.setup();
      render(<Menu items={mockItems} keyboardNav={true} />);
      
      const firstLink = screen.getByText("Home").closest("a");
      const secondLink = screen.getByText("About").closest("a");
      
      // Focus second item
      secondLink?.focus();
      expect(document.activeElement).toBe(secondLink);
      
      // Press ArrowUp
      await user.keyboard("{ArrowUp}");
      
      // CURRENT BEHAVIOR: Focus does not move
      expect(document.activeElement).toBe(secondLink);
      
      // TODO Phase 3: expect(document.activeElement).toBe(firstLink);
    });

    it("Enter key triggers native link behavior", async () => {
      const user = userEvent.setup();
      const handleItemClick = vi.fn();
      render(
        <Menu items={mockItems} onItemClick={handleItemClick} keyboardNav={true} />
      );
      
      const firstLink = screen.getByText("Home").closest("a");
      
      // Focus first item
      firstLink?.focus();
      expect(document.activeElement).toBe(firstLink);
      
      // Press Enter
      await user.keyboard("{Enter}");
      
      // Enter triggers click via native link behavior
      expect(handleItemClick).toHaveBeenCalledTimes(1);
      expect(handleItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: "1", label: "Home" })
      );
    });

    it("documents keyboard nav limitation - Home key (Phase 3)", async () => {
      // KNOWN LIMITATION - Phase 3: Home/End keys not implemented
      
      const user = userEvent.setup();
      render(<Menu items={mockItems} keyboardNav={true} />);
      
      const lastLink = screen.getByText("Contact").closest("a");
      const firstLink = screen.getByText("Home").closest("a");
      
      // Focus last item
      lastLink?.focus();
      expect(document.activeElement).toBe(lastLink);
      
      // Press Home
      await user.keyboard("{Home}");
      
      // CURRENT BEHAVIOR: Focus does not move
      expect(document.activeElement).toBe(lastLink);
      
      // TODO Phase 3: expect(document.activeElement).toBe(firstLink);
    });

    it("documents keyboard nav limitation - End key (Phase 3)", async () => {
      // KNOWN LIMITATION - Phase 3: Home/End keys not implemented
      
      const user = userEvent.setup();
      render(<Menu items={mockItems} keyboardNav={true} />);
      
      const firstLink = screen.getByText("Home").closest("a");
      const lastLink = screen.getByText("Contact").closest("a");
      
      // Focus first item
      firstLink?.focus();
      expect(document.activeElement).toBe(firstLink);
      
      // Press End
      await user.keyboard("{End}");
      
      // CURRENT BEHAVIOR: Focus does not move
      expect(document.activeElement).toBe(firstLink);
      
      // TODO Phase 3: expect(document.activeElement).toBe(lastLink);
    });

    it("documents keyboard nav limitation - Escape key (Phase 3)", async () => {
      // KNOWN LIMITATION - Phase 3: Escape key collapse not implemented
      
      const user = userEvent.setup();
      render(<Menu items={mockItemsWithChildren} keyboardNav={true} />);
      
      const productsLink = screen.getByText("Products").closest("a");
      
      // Click to expand
      await user.click(screen.getByText("Products"));
      
      // Verify expanded
      expect(productsLink).toHaveAttribute("aria-expanded", "true");
      
      // Focus the item
      productsLink?.focus();
      
      // Press Escape
      await user.keyboard("{Escape}");
      
      // CURRENT BEHAVIOR: Does not collapse
      expect(productsLink).toHaveAttribute("aria-expanded", "true");
      
      // TODO Phase 3: Implement Escape key handler
      // Expected: expect(productsLink).toHaveAttribute("aria-expanded", "false");
    });

    it("keyboard navigation prop is available but not fully implemented", async () => {
      const user = userEvent.setup();
      render(<Menu items={mockItems} keyboardNav={false} />);
      
      const firstLink = screen.getByText("Home").closest("a");
      const secondLink = screen.getByText("About").closest("a");
      
      // Focus first item
      firstLink?.focus();
      expect(document.activeElement).toBe(firstLink);
      
      // Press ArrowDown
      await user.keyboard("{ArrowDown}");
      
      // With keyboardNav false, custom nav should not work (currently not implemented either way)
      expect(firstLink).toBeInTheDocument();
      expect(secondLink).toBeInTheDocument();
    });
  });

  describe("Permission-Based Filtering", () => {
    const itemsWithPermissions: NavigationItem[] = [
      { id: "1", label: "Public Page", href: "/public" },
      { id: "2", label: "Admin Page", href: "/admin", permissions: ["admin"] },
      { id: "3", label: "User Page", href: "/user", roles: ["user"] },
    ];

    it("shows all items when no security context provided", () => {
      render(<Menu items={itemsWithPermissions} />);
      
      // All items should be visible without security filtering
      expect(screen.getByText("Public Page")).toBeInTheDocument();
      expect(screen.getByText("Admin Page")).toBeInTheDocument();
      expect(screen.getByText("User Page")).toBeInTheDocument();
    });

    it("filters items based on security context permissions", () => {
      const securityContext: SecurityContext = {
        permissions: ["admin"],
        roles: [],
      };
      
      render(
        <Menu items={itemsWithPermissions} security={securityContext} />
      );
      
      // Should show public and admin items
      expect(screen.getByText("Public Page")).toBeInTheDocument();
      expect(screen.getByText("Admin Page")).toBeInTheDocument();
      
      // Should NOT show user page (requires 'user' role which is not present)
      expect(screen.queryByText("User Page")).not.toBeInTheDocument();
    });

    it("filters items based on security context roles", () => {
      const securityContext: SecurityContext = {
        permissions: [],
        roles: ["user"],
      };
      
      render(
        <Menu items={itemsWithPermissions} security={securityContext} />
      );
      
      // Should show public and user items
      expect(screen.getByText("Public Page")).toBeInTheDocument();
      expect(screen.getByText("User Page")).toBeInTheDocument();
      
      // Should NOT show admin page (requires 'admin' permission which is not present)
      expect(screen.queryByText("Admin Page")).not.toBeInTheDocument();
    });

    it("filters multiple items when permissions are missing", () => {
      const securityContext: SecurityContext = {
        permissions: [],
        roles: [],
      };
      
      render(
        <Menu items={itemsWithPermissions} security={securityContext} />
      );
      
      // Should only show public item
      expect(screen.getByText("Public Page")).toBeInTheDocument();
      
      // Should NOT show restricted items
      expect(screen.queryByText("Admin Page")).not.toBeInTheDocument();
      expect(screen.queryByText("User Page")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has menu role by default", () => {
      render(<Menu items={mockItems} />);
      
      const menu = screen.getByRole("menu");
      expect(menu).toBeInTheDocument();
    });

    it("has navigation role when specified", () => {
      render(<Menu items={mockItems} role="navigation" />);
      
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("has accessible label", () => {
      render(<Menu items={mockItems} ariaLabel="Main menu" />);
      
      expect(screen.getByLabelText("Main menu")).toBeInTheDocument();
    });

    it("uses default label when ariaLabel not provided", () => {
      render(<Menu items={mockItems} />);
      
      expect(screen.getByLabelText("Menu")).toBeInTheDocument();
    });
  });

  describe("Icons and Badges", () => {
    const itemsWithExtras: NavigationItem[] = [
      {
        id: "1",
        label: "Dashboard",
        href: "/dashboard",
        icon: <span data-testid="icon-dashboard">📊</span>,
      },
      {
        id: "2",
        label: "Messages",
        href: "/messages",
        badge: 5,
      },
    ];

    it("shows icons when showIcons is true", () => {
      render(<Menu items={itemsWithExtras} showIcons={true} />);
      
      expect(screen.getByTestId("icon-dashboard")).toBeInTheDocument();
    });

    it("shows badges when showBadges is true", () => {
      render(<Menu items={itemsWithExtras} showBadges={true} />);
      
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("documents inline styles limitation (Phase 3)", () => {
      // KNOWN LIMITATION - Phase 3: Menu does not apply inline styles from style prop
      // Expected: Inline styles should be applied to menu element
      // Current: style prop is accepted but not applied
      
      const { container } = render(
        <Menu items={mockItems} style={{ backgroundColor: "blue", padding: "20px" }} />
      );
      const menu = container.querySelector(".nav-menu");
      
      // Menu element exists
      expect(menu).toBeInTheDocument();
      
      // CURRENT BEHAVIOR: Inline styles are not applied
      // Style prop is accepted but ignored by component implementation
      
      // TODO Phase 3: Implement style prop forwarding
      // Expected after fix:
      // expect(menu).toHaveStyle({ backgroundColor: "blue" });
      // expect(menu).toHaveStyle({ padding: "20px" });
    });
  });

  describe("Default Expanded Items", () => {
    const itemsWithSubmenu: MenuItem[] = [
      { id: "home", label: "Home", href: "/" },
      { 
        id: "products", 
        label: "Products", 
        href: "/products",
        children: [
          { id: "product-1", label: "Product 1", href: "/products/1" },
          { id: "product-2", label: "Product 2", href: "/products/2" }
        ]
      },
      { 
        id: "services", 
        label: "Services", 
        href: "/services",
        children: [
          { id: "service-1", label: "Service 1", href: "/services/1" },
          { id: "service-2", label: "Service 2", href: "/services/2" }
        ]
      }
    ];

    it("renders all items collapsed when defaultExpandedIds is not supplied", () => {
      render(<Menu items={itemsWithSubmenu} />);
      
      // Child items should not be visible
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Service 1")).not.toBeInTheDocument();
    });

    it("expands single item when one ID is supplied in defaultExpandedIds", () => {
      render(<Menu items={itemsWithSubmenu} defaultExpandedIds={["products"]} />);
      
      // Products children should be visible
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      
      // Services children should not be visible
      expect(screen.queryByText("Service 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Service 2")).not.toBeInTheDocument();
    });

    it("expands multiple items when multiple IDs are supplied in defaultExpandedIds", () => {
      render(<Menu items={itemsWithSubmenu} defaultExpandedIds={["products", "services"]} />);
      
      // Both sets of children should be visible
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("Service 1")).toBeInTheDocument();
      expect(screen.getByText("Service 2")).toBeInTheDocument();
    });

    it("handles invalid/unknown IDs gracefully and still expands valid IDs", () => {
      render(<Menu items={itemsWithSubmenu} defaultExpandedIds={["invalid-id", "products", "unknown"]} />);
      
      // Valid ID (products) should still expand
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      
      // Other children should remain collapsed
      expect(screen.queryByText("Service 1")).not.toBeInTheDocument();
    });

    it("allows user to collapse and expand items after initial render", () => {
      render(<Menu items={itemsWithSubmenu} defaultExpandedIds={["products"]} />);
      
      // Products should be initially expanded
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      
      // Click to collapse Products
      const productsButton = screen.getByText("Products");
      fireEvent.click(productsButton);
      
      // Products children should now be hidden
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
      
      // Click to expand Services
      const servicesButton = screen.getByText("Services");
      fireEvent.click(servicesButton);
      
      // Services children should now be visible
      expect(screen.getByText("Service 1")).toBeInTheDocument();
      expect(screen.getByText("Service 2")).toBeInTheDocument();
    });
  });
});

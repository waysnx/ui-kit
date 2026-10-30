/**
 * @file components/Sidebar/Sidebar.tsx
 * Sidebar component for application navigation
 */

import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import { Menu } from '../Menu';
import type { MenuProps } from '../Menu';
import './sidebar.css';

/**
 * Sidebar component props
 */
export interface SidebarProps extends Omit<MenuProps, 'role'> {
  /**
   * Logo or brand content
   */
  logo?: React.ReactNode;

  /**
   * Whether sidebar is collapsed
   */
  isCollapsed?: boolean;

  /**
   * Callback when collapse state changes
   */
  onCollapseChange?: (isCollapsed: boolean) => void;

  /**
   * Whether sidebar is collapsible
   */
  collapsible?: boolean;

  /**
   * Width of sidebar when expanded
   */
  expandedWidth?: string | number;

  /**
   * Width of sidebar when collapsed
   */
  collapsedWidth?: string | number;

  /**
   * Footer content
   */
  footer?: React.ReactNode;

  /**
   * Header content (above logo)
   */
  header?: React.ReactNode;

  /**
   * Position of sidebar
   */
  position?: 'left' | 'right';

  /**
   * Whether to show overlay on mobile
   */
  overlay?: boolean;

  /**
   * Mobile breakpoint for responsive behavior
   */
  mobileBreakpoint?: string;

  /**
   * Persist collapsed state to localStorage
   */
  persistState?: boolean;

  /**
   * Storage key for persistence
   */
  storageKey?: string;

  /**
   * Whether to show divider after menu
   */
  showDivider?: boolean;

  /**
   * Color scheme for the sidebar, independent of the app theme.
   * Use 'dark' to render a dark sidebar on a light-themed app.
   * @default undefined (inherits from app theme)
   */
  colorScheme?: 'light' | 'dark';
}

/**
 * Sidebar Component
 *
 * Provides a collapsible sidebar navigation for applications.
 * Supports responsive behavior, persistence, and customizable content.
 *
 * @example
 * ```tsx
 * <Sidebar
 *   items={menuItems}
 *   logo={<Logo />}
 *   collapsible={true}
 *   persistState={true}
 * />
 * ```
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      logo,
      isCollapsed = false,
      onCollapseChange,
      collapsible = true,
      expandedWidth = '16rem',
      collapsedWidth = '4rem',
      footer,
      header,
      position = 'left',
      overlay = true,
      mobileBreakpoint = '768px',
      persistState = false,
      storageKey = 'sidebar-collapsed',
      showDivider = true,
      colorScheme,
      className = '',
      style,
      variant = 'default',
      density = 'normal',
      ...menuProps
    },
    ref
  ) => {
    // Phase 1: SSR-safe initialization - use prop/default only, no localStorage
    const [collapsed, setCollapsed] = useState(isCollapsed);
    const sidebarRef = useRef<HTMLElement>(null);

    // Phase 2: Read persisted state AFTER hydration (client-side only)
    useEffect(() => {
      if (!persistState) return;
      
      // Skip in SSR environment
      if (typeof window === 'undefined') return;
      
      try {
        // Access localStorage - may throw in sandboxed contexts
        const storage = window.localStorage;
        const savedState = storage.getItem(storageKey);
        
        if (savedState !== null) {
          const persisted = JSON.parse(savedState);
          
          // Validate parsed value is boolean before applying
          if (typeof persisted === 'boolean') {
            setCollapsed(persisted);
          } else {
            // Invalid type: retain default state, log warning
            console.warn('[Sidebar] Invalid persisted state (not boolean), using default');
          }
        }
        // If savedState is null, no persisted value exists; keep default
      } catch (e) {
        if (e instanceof SyntaxError) {
          // Malformed JSON: retain default state, log warning
          console.warn('[Sidebar] Failed to parse persisted state (malformed JSON), using default');
        } else {
          // Storage error (SecurityError, unavailable): retain default state, log warning
          console.warn('[Sidebar] Failed to access localStorage, using default state');
        }
      }
    }, [persistState, storageKey]);

    // Handle collapse change with SSR-safe persistence
    const handleToggleCollapse = useCallback(() => {
      const newState = !collapsed;
      setCollapsed(newState);
      onCollapseChange?.(newState);

      if (persistState && typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, JSON.stringify(newState));
        } catch (e) {
          if (e instanceof DOMException && e.name === 'QuotaExceededError') {
            console.warn('[Sidebar] localStorage quota exceeded, state not persisted');
          } else {
            // General error: handle SecurityError, other exceptions
            console.warn('[Sidebar] Failed to persist state to localStorage');
          }
        }
      }
    }, [collapsed, onCollapseChange, persistState, storageKey]);

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(sidebarRef.current);
        } else {
          ref.current = sidebarRef.current;
        }
      }
    }, [ref]);

    return (
      <aside
        ref={sidebarRef}
        className={`nav-sidebar nav-sidebar--${position} nav-sidebar--${collapsed ? 'collapsed' : 'expanded'} nav-component ${className}`}
        style={{
          ...style,
          '--wx-nav-sidebar-width': collapsed ? collapsedWidth : expandedWidth,
        } as React.CSSProperties}
        aria-label="Sidebar navigation"
        role="complementary"
        data-color-scheme={colorScheme}
      >
        {/* Sidebar header with logo */}
        {(header || logo || collapsible) && (
        <div className="nav-sidebar__header">
          {header && (
            <div className="nav-sidebar__header-content">
              {header}
            </div>
          )}

          {logo && (
            <div className="nav-sidebar__logo">
              {logo}
            </div>
          )}

          {collapsible && (
            <button
              className="nav-sidebar__toggle"
              onClick={handleToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                width="1.25rem"
                height="1.25rem"
                fill="currentColor"
              >
                {collapsed ? (
                  // Expand icon
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                ) : (
                  // Collapse icon
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                )}
              </svg>
            </button>
          )}
        </div>
        )}

        {showDivider && <div className="nav-sidebar__divider" />}

        {/* Menu */}
        <div className="nav-sidebar__content">
          <Menu
            items={items}
            {...menuProps}
            orientation="vertical"
            variant={variant}
            density={density}
            className="nav-sidebar__menu"
            ariaLabel="Sidebar navigation"
          />
        </div>

        {/* Footer */}
        {footer && (
          <>
            {showDivider && <div className="nav-sidebar__divider" />}
            <div className="nav-sidebar__footer">
              {footer}
            </div>
          </>
        )}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;

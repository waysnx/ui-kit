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

  // ========== CONTROLLED MODE ==========
  /**
   * Controlled collapse state (controlled mode)
   * 
   * When provided, the component is in CONTROLLED mode.
   * The component directly renders from this value and does NOT maintain internal state.
   * Consumer MUST provide updated values via onCollapseChange callback.
   * 
   * @example
   * const [collapsed, setCollapsed] = useState(false);
   * <Sidebar collapsed={collapsed} onCollapseChange={setCollapsed} />
   */
  collapsed?: boolean;

  // ========== UNCONTROLLED INITIAL VALUES ==========
  /**
   * Initial collapse state for uncontrolled mode (PREFERRED over isCollapsed)
   * 
   * Used only in UNCONTROLLED mode (when collapsed prop is not provided).
   * Sets the initial internal state value.
   * After mount, component manages state independently.
   * 
   * @default undefined
   * 
   * @example
   * <Sidebar defaultCollapsed={false} onCollapseChange={handleChange} />
   */
  defaultCollapsed?: boolean;

  /**
   * @deprecated Use `collapsed` for controlled mode or `defaultCollapsed` for uncontrolled mode.
   * 
   * Maintained for backward compatibility. In uncontrolled mode, treated as initial value.
   * If both isCollapsed and defaultCollapsed are provided, defaultCollapsed takes precedence.
   * 
   * @example
   * <Sidebar isCollapsed={false} onCollapseChange={handleChange} />
   */
  isCollapsed?: boolean;

  // ========== CALLBACK ==========
  /**
   * Callback when collapse state changes (works in both controlled and uncontrolled modes)
   * 
   * In CONTROLLED mode: 
   *   - Called when user clicks toggle button
   *   - Consumer MUST handle the state update and pass new value via collapsed prop
   *   - Component does NOT update until new collapsed prop received
   * 
   * In UNCONTROLLED mode:
   *   - Called when collapse state changes (via toggle button or programmatically)
   *   - Optional - component manages state independently
   *   - Useful for tracking state changes or external logging
   * 
   * @param isCollapsed - New collapse state
   * 
   * @example
   * // Controlled
   * <Sidebar
   *   collapsed={collapsed}
   *   onCollapseChange={(value) => setCollapsed(value)}
   * />
   * 
   * // Uncontrolled with callback
   * <Sidebar
   *   defaultCollapsed={false}
   *   onCollapseChange={(value) => console.log('Collapsed:', value)}
   * />
   * 
   * // Uncontrolled without callback
   * <Sidebar defaultCollapsed={false} />
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
   * Persist collapsed state to localStorage (uncontrolled mode only)
   * 
   * In controlled mode, persistence is handled externally by consumer.
   * In uncontrolled mode, enables automatic localStorage persistence.
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
 * Provides a collapsible sidebar navigation supporting both controlled 
 * and uncontrolled modes for flexible state management.
 *
 * ## State Precedence (Uncontrolled Mode)
 * When determining the initial collapse state in uncontrolled mode:
 * 1. **Persisted state** - From localStorage (if persistState=true and valid)
 * 2. **defaultCollapsed** - Explicit uncontrolled initial prop
 * 3. **isCollapsed** - Backward compatibility prop
 * 4. **false** - Default fallback
 * 
 * Note: Persisted state takes precedence over initial props after hydration.
 * This means if you have persisted state, toggling the sidebar once and
 * refreshing will restore the toggled state, not the defaultCollapsed value.
 *
 * ## Mode Stability (Important)
 * Do NOT switch between controlled and uncontrolled modes after mounting.
 * The mode is determined on first render and must remain consistent throughout
 * the component's lifetime. Changing mode will trigger a development warning.
 * 
 * ✓ Correct: Always controlled
 * const [collapsed, setCollapsed] = useState(false);
 * <Sidebar collapsed={collapsed} onCollapseChange={setCollapsed} />
 * 
 * ✓ Correct: Always uncontrolled
 * <Sidebar defaultCollapsed={false} persistState={true} />
 * 
 * ✗ Incorrect: Mode switches based on condition
 * <Sidebar collapsed={condition ? collapsed : undefined} />
 *
 * ## Controlled Mode (External State Management)
 * Use when state is managed externally (Redux, Context, useState, Zustand, etc).
 * The component renders directly from the collapsed prop and does NOT manage internal state.
 * 
 * @example
 * ```tsx
 * // With useState
 * const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
 * 
 * <Sidebar
 *   items={menuItems}
 *   collapsed={sidebarCollapsed}
 *   onCollapseChange={setSidebarCollapsed}
 *   collapsible={true}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With Redux
 * const collapsed = useSelector(selectSidebarCollapsed);
 * const dispatch = useDispatch();
 * 
 * <Sidebar
 *   items={menuItems}
 *   collapsed={collapsed}
 *   onCollapseChange={(value) => dispatch(setSidebarCollapsed(value))}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With Zustand
 * const collapsed = useSidebarStore((state) => state.collapsed);
 * const setCollapsed = useSidebarStore((state) => state.setCollapsed);
 * 
 * <Sidebar
 *   items={menuItems}
 *   collapsed={collapsed}
 *   onCollapseChange={setCollapsed}
 * />
 * ```
 *
 * ## Uncontrolled Mode (Internal State Management)
 * Use when the sidebar manages its own state internally (default behavior).
 * The component maintains collapse state independently.
 * Recommended for simple use cases without external state requirements.
 * 
 * @example
 * ```tsx
 * // Simple uncontrolled (internal state only)
 * <Sidebar
 *   items={menuItems}
 *   logo={<Logo />}
 *   collapsible={true}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Uncontrolled with callback for tracking
 * <Sidebar
 *   items={menuItems}
 *   defaultCollapsed={false}
 *   onCollapseChange={(collapsed) => console.log('Sidebar:', collapsed)}
 *   collapsible={true}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Uncontrolled with persistence (state precedence example)
 * // Render 1: Sidebar expands (defaultCollapsed=false)
 * // User toggles: Sidebar collapses (persisted to localStorage)
 * // Refresh: Sidebar stays collapsed (persisted state takes precedence)
 * 
 * <Sidebar
 *   items={menuItems}
 *   defaultCollapsed={false}
 *   persistState={true}
 *   storageKey="app-sidebar-collapsed"
 *   collapsible={true}
 * />
 * ```
 *
 * ## Controlled with External Persistence (SSR-Safe)
 * For advanced state management with custom persistence:
 *
 * @example
 * ```tsx
 * // SSR-SAFE: Two-phase hydration pattern
 * // Phase 1: Initialize with safe default (no localStorage access)
 * const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
 *   // Server and initial client render use prop default (prevents hydration mismatch)
 *   if (typeof window === 'undefined') {
 *     return false; // SSR default
 *   }
 *   // On client: start with same default, restore persisted state in useEffect
 *   return false;
 * });
 *
 * // Phase 2: Restore persisted state after hydration
 * useEffect(() => {
 *   if (typeof window === 'undefined') return;
 *   
 *   try {
 *     const saved = localStorage.getItem('sidebar-collapsed');
 *     if (saved) setSidebarCollapsed(JSON.parse(saved));
 *   } catch (e) {
 *     // localStorage not available (sandboxed context)
 *   }
 * }, []); // Single run after mount
 *
 * const handleChange = (collapsed: boolean) => {
 *   setSidebarCollapsed(collapsed);
 *   
 *   // Persist only on client
 *   if (typeof window !== 'undefined') {
 *     try {
 *       localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
 *     } catch (e) {
 *       // Handle quota exceeded or other storage errors
 *       console.warn('Failed to persist sidebar state', e);
 *     }
 *   }
 *   
 *   // Also sync to API, analytics, etc.
 *   trackAnalytics('sidebar_toggled', { collapsed });
 * };
 *
 * <Sidebar
 *   items={menuItems}
 *   collapsed={sidebarCollapsed}
 *   onCollapseChange={handleChange}
 *   collapsible={true}
 * />
 * ```
 *
 * Note: Two-phase hydration prevents SSR mismatches: initialize with prop default on both
 * server and client, then restore persisted state after hydration via useEffect. Always check
 * `typeof window !== 'undefined'` before accessing localStorage to avoid runtime errors in SSR.
 *
 * ## Backward Compatibility
 * The isCollapsed prop is deprecated but fully supported for backward compatibility.
 * It works as initial state in uncontrolled mode with lowest precedence
 * (persisted state, defaultCollapsed take precedence).
 *
 * @example
 * ```tsx
 * // Deprecated (but still works)
 * <Sidebar items={menuItems} isCollapsed={false} />
 * ```
 *
 * For new code, prefer:
 * - `collapsed` prop for controlled mode
 * - `defaultCollapsed` prop for uncontrolled mode
 * 
 * @ref Returns a reference to the underlying `<aside>` element
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      logo,
      collapsed,              // NEW: explicit controlled prop
      defaultCollapsed,       // NEW: explicit uncontrolled initial
      isCollapsed = false,    // EXISTING: backward compatibility
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
    // ========== TOP LEVEL: All useRef declarations ==========
    const sidebarRef = useRef<HTMLElement>(null);
    const initialModeRef = useRef<boolean | undefined>(undefined);

    // ========== MODE DETECTION ==========
    // Controlled mode: collapsed prop is explicitly provided (not undefined)
    const isControlled = collapsed !== undefined;

    // ========== UNCONTROLLED MODE: Initialize Internal State ==========
    // Phase 1: SSR-safe initialization using defaultCollapsed or isCollapsed
    const [internalCollapsed, setInternalCollapsed] = useState<boolean>(() => {
      // Precedence: defaultCollapsed > isCollapsed > false
      if (defaultCollapsed !== undefined) {
        return defaultCollapsed;
      }
      if (isCollapsed !== undefined) {
        return isCollapsed;
      }
      return false;
    });

    // ========== DETERMINE RENDER VALUE ==========
    // In controlled mode: use collapsed prop directly
    // In uncontrolled mode: use internal state
    const renderCollapsed = isControlled ? collapsed : internalCollapsed;

    // ========== MODE CHANGE DETECTION & WARNING ==========
    // Initialize mode on first render
    useEffect(() => {
      if (initialModeRef.current === undefined) {
        initialModeRef.current = isControlled;
      }
    }, []);

    // Warn if mode changes after mount (development only)
    useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        if (initialModeRef.current !== undefined && initialModeRef.current !== isControlled) {
          console.warn(
            '[Sidebar] Mode change detected after mount. ' +
            'Switching between controlled and uncontrolled modes is unsupported. ' +
            `Changed from ${initialModeRef.current ? 'controlled' : 'uncontrolled'} to ${isControlled ? 'controlled' : 'uncontrolled'}. ` +
            'This indicates a bug in your component logic.'
          );
        }
      }
    }, [isControlled]);

    // ========== UNCONTROLLED MODE: Phase 2 - Restore Persisted State (SSR-safe) ==========
    // Only runs in uncontrolled mode, after hydration
    useEffect(() => {
      if (isControlled) return;  // Skip if controlled
      if (!persistState) return;
      if (typeof window === 'undefined') return;
      
      try {
        const storage = window.localStorage;
        const savedState = storage.getItem(storageKey);
        
        if (savedState !== null) {
          const persisted = JSON.parse(savedState);
          
          // Validate parsed value is boolean before applying
          if (typeof persisted === 'boolean') {
            setInternalCollapsed(persisted);
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
    }, [persistState, storageKey, isControlled]);

    // ========== HANDLE TOGGLE (Works in Both Modes) ==========
    const handleToggleCollapse = useCallback(() => {
      const newState = !renderCollapsed;
      
      // Call callback in both modes
      onCollapseChange?.(newState);
      
      // In uncontrolled mode: update internal state
      if (!isControlled) {
        setInternalCollapsed(newState);
        
        // Persist if enabled
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
      }
      // In controlled mode: consumer handles state update via onCollapseChange
    }, [renderCollapsed, isControlled, onCollapseChange, persistState, storageKey]);

    // ========== MERGED CALLBACK REF (assigned during commit phase) ==========
    // This merged ref handles both forwarded ref and internal sidebarRef
    // Assigned during React's commit phase (not in useEffect), properly cleaned up on unmount
    const mergedRef = useCallback((element: HTMLElement | null) => {
      // Assign to internal ref
      sidebarRef.current = element;
      
      // Assign to forwarded ref
      if (ref) {
        if (typeof ref === 'function') {
          // Callback ref
          ref(element);
        } else {
          // Object ref
          ref.current = element;
        }
      }
    }, [ref]);

    return (
      <aside
        ref={mergedRef}
        className={`nav-sidebar nav-sidebar--${position} nav-sidebar--${renderCollapsed ? 'collapsed' : 'expanded'} nav-component ${className}`}
        style={{
          ...style,
          '--wx-nav-sidebar-width': renderCollapsed ? collapsedWidth : expandedWidth,
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
              aria-label={renderCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!renderCollapsed}
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                width="1.25rem"
                height="1.25rem"
                fill="currentColor"
              >
                {renderCollapsed ? (
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

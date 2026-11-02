/**
 * @file components/Menu/Menu.tsx
 * Menu component for hierarchical navigation
 */

import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import type { NavigationItem } from '../../types';
import { canAccessItem, filterMenuByPermissions } from '../../utils';
import type { SecurityContext } from '../../types';
import { MenuItem as MenuItemComponent } from './MenuItem';
import './menu.css';

/**
 * Menu component props
 */
export interface MenuProps {
  /**
   * Menu items to display
   */
  items: NavigationItem[];

  /**
   * Currently active item
   */
  activeItem?: NavigationItem;

  /**
   * Callback when item is clicked
   */
  onItemClick?: (item: NavigationItem) => void;

  /**
   * Callback when active item changes
   */
  onActiveChange?: (item?: NavigationItem) => void;

  /**
   * Security context for permission-based filtering
   */
  security?: SecurityContext;

  /**
   * Menu orientation
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * Component density
   */
  density?: 'compact' | 'normal' | 'spacious';

  /**
   * Theme variant
   */
  variant?: 'default' | 'minimal' | 'elevated';

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Whether to show icons
   */
  showIcons?: boolean;

  /**
   * Whether to show badges
   */
  showBadges?: boolean;

  /**
   * Maximum depth for nested items
   */
  maxDepth?: number;

  /**
   * Keyboard navigation enabled
   */
  keyboardNav?: boolean;

  /**
   * Accessible label for menu
   */
  ariaLabel?: string;

  /**
   * @deprecated Menu now always renders as <nav> using Disclosure Navigation Pattern.
   * This prop is kept for API compatibility but has no effect.
   * The role prop will be removed in the next major version.
   */
  role?: 'menu' | 'menubar' | 'navigation' | 'none';

  /**
   * Default expanded item IDs (uncontrolled mode)
   * Sets which menu items are expanded on initial render
   */
  defaultExpandedIds?: string[];
}

/**
 * Menu Component
 *
 * Displays a hierarchical menu with support for nested items, icons, badges,
 * keyboard navigation, and permission-based access control.
 *
 * @example
 * ```tsx
 * <Menu
 *   items={menuItems}
 *   activeItem={currentItem}
 *   onItemClick={handleClick}
 *   orientation="vertical"
 *   keyboardNav={true}
 * />
 * ```
 */
export const Menu = forwardRef<HTMLElement, MenuProps>(
  (
    {
      items,
      activeItem,
      onItemClick,
      onActiveChange,
      security,
      orientation = 'vertical',
      density = 'normal',
      variant = 'default',
      className = '',
      style,
      showIcons = true,
      showBadges = true,
      maxDepth = 5,
      keyboardNav: _keyboardNav = true, // Accepted for API compatibility, not used
      ariaLabel,
      role: _role, // Deprecated - accepted for API compatibility, not used
      defaultExpandedIds,
    },
    ref
  ) => {
    // Initialize expanded items from defaultExpandedIds prop
    const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
      if (defaultExpandedIds && defaultExpandedIds.length > 0) {
        return new Set(defaultExpandedIds);
      }
      return new Set();
    });
    const [focusedItemId, setFocusedItemId] = useState<string>();
    const menuRef = useRef<HTMLElement>(null);

    // Filter items by permissions
    const visibleItems = security
      ? filterMenuByPermissions(items, security)
      : items;

    // Handle item click
    const handleItemClick = useCallback(
      (item: NavigationItem) => {
        onItemClick?.(item);
        onActiveChange?.(item);
      },
      [onItemClick, onActiveChange]
    );

    // Handle item expansion
    const handleToggleExpand = useCallback((itemId: string) => {
      setExpandedItems((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        return next;
      });
    }, []);

    // Keyboard navigation removed for Disclosure Navigation Pattern
    // Native Tab/Shift+Tab navigation is the primary method
    // Space and Enter are handled natively by <button> and <a> elements
    // Arrow key enhancements may be added in a future release

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(menuRef.current);
        } else {
          ref.current = menuRef.current;
        }
      }
    }, [ref]);

    return (
      <nav
        ref={menuRef}
        className={`nav-menu nav-menu--${orientation} nav-menu--${density} nav-menu--${variant} nav-component ${className}`}
        aria-label={ariaLabel || 'Menu'}
        style={style}
      >
        <ul className="nav-menu__list" role="list">
          {visibleItems.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              isActive={activeItem?.id === item.id}
              isFocused={focusedItemId === item.id}
              isExpanded={expandedItems.has(item.id)}
              onItemClick={handleItemClick}
              onToggleExpand={handleToggleExpand}
              onFocus={setFocusedItemId}
              showIcons={showIcons}
              showBadges={showBadges}
              depth={0}
              maxDepth={maxDepth}
              security={security}
              canAccess={security ? (item: NavigationItem) => canAccessItem(item, security) : undefined}
            />
          ))}
        </ul>
      </nav>
    );
  }
);

Menu.displayName = 'Menu';

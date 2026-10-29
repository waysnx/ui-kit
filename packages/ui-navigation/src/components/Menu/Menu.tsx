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
   * Menu role
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
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
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
      keyboardNav = true,
      ariaLabel,
      role = 'menu',
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
    const menuRef = useRef<HTMLDivElement>(null);

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

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!keyboardNav) return;

        const allItems = visibleItems.flatMap((item) => [
          item,
          ...(item.children || []),
        ]);

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            const currentIdx = allItems.findIndex((item) => item.id === focusedItemId);
            const nextIdx = Math.min(currentIdx + 1, allItems.length - 1);
            setFocusedItemId(allItems[nextIdx]?.id);
            break;

          case 'ArrowUp':
            e.preventDefault();
            const currIdx = allItems.findIndex((item) => item.id === focusedItemId);
            const prevIdx = Math.max(currIdx - 1, 0);
            setFocusedItemId(allItems[prevIdx]?.id);
            break;

          case 'ArrowRight':
            if (focusedItemId) {
              const item = allItems.find((i) => i.id === focusedItemId);
              if (item?.children?.length) {
                handleToggleExpand(focusedItemId);
              }
            }
            break;

          case 'ArrowLeft':
            if (focusedItemId) {
              setExpandedItems((prev) => {
                const next = new Set(prev);
                next.delete(focusedItemId);
                return next;
              });
            }
            break;

          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusedItemId) {
              const item = allItems.find((i) => i.id === focusedItemId);
              if (item) {
                handleItemClick(item);
                if (item.children?.length) {
                  handleToggleExpand(focusedItemId);
                }
              }
            }
            break;

          case 'Escape':
            e.preventDefault();
            setFocusedItemId(undefined);
            break;

          case 'Home':
            e.preventDefault();
            setFocusedItemId(allItems[0]?.id);
            break;

          case 'End':
            e.preventDefault();
            setFocusedItemId(allItems[allItems.length - 1]?.id);
            break;
        }
      },
      [focusedItemId, visibleItems, keyboardNav, handleItemClick, handleToggleExpand]
    );

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
      <div
        ref={menuRef}
        className={`nav-menu nav-menu--${orientation} nav-menu--${density} nav-menu--${variant} nav-component ${className}`}
        role={role}
        aria-label={ariaLabel || 'Menu'}
        onKeyDown={handleKeyDown}
        style={style}
      >
        <ul className="nav-menu__list" role={role === 'none' ? 'none' : 'presentation'}>
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
      </div>
    );
  }
);

Menu.displayName = 'Menu';

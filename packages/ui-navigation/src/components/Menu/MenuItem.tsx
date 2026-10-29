/**
 * @file components/Menu/MenuItem.tsx
 * MenuItem component - child item within a Menu
 */

import React, { useCallback, useMemo, forwardRef } from 'react';
import type { NavigationItem, SecurityContext } from '../../types';
import { isMenuItemDisabled, isMenuItemHidden } from '../../utils';

/**
 * MenuItem component props
 */
export interface MenuItemProps {
  /**
   * The navigation item to render
   */
  item: NavigationItem;

  /**
   * Whether this item is currently active
   */
  isActive?: boolean;

  /**
   * Whether this item is focused via keyboard navigation
   */
  isFocused?: boolean;

  /**
   * Whether this item's children are expanded
   */
  isExpanded?: boolean;

  /**
   * Callback when item is clicked
   */
  onItemClick?: (item: NavigationItem) => void;

  /**
   * Callback to toggle expansion
   */
  onToggleExpand?: (itemId: string) => void;

  /**
   * Callback when item receives focus
   */
  onFocus?: (itemId?: string) => void;

  /**
   * Whether to show icons
   */
  showIcons?: boolean;

  /**
   * Whether to show badges
   */
  showBadges?: boolean;

  /**
   * Current nesting depth
   */
  depth?: number;

  /**
   * Maximum nesting depth allowed
   */
  maxDepth?: number;

  /**
   * Security context for permission checking
   */
  security?: SecurityContext;

  /**
   * Function to check access for this item
   */
  canAccess?: (item: NavigationItem) => boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;
}

/**
 * MenuItem Component
 *
 * Individual menu item that can have nested children.
 * Supports icons, badges, keyboard navigation, and permission-based access.
 *
 * @example
 * ```tsx
 * <MenuItem
 *   item={menuItem}
 *   isActive={true}
 *   onItemClick={handleClick}
 *   depth={0}
 * />
 * ```
 */
export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  (
    {
      item,
      isActive = false,
      isFocused = false,
      isExpanded = false,
      onItemClick,
      onToggleExpand,
      onFocus,
      showIcons = true,
      showBadges = true,
      depth = 0,
      maxDepth = 5,
      security,
      canAccess,
      className = '',
      style,
    },
    ref
  ) => {
    const isDisabled = isMenuItemDisabled(item);
    const isHidden = isMenuItemHidden(item);
    const hasChildren = useMemo(
      () => (item.children?.length || 0) > 0 && depth < (maxDepth || 5),
      [item.children, depth, maxDepth]
    );

    // Check access permission
    const canAccessItem = useMemo(() => {
      if (canAccess) {
        return canAccess(item);
      }
      return true;
    }, [canAccess, item]);

    if (!canAccessItem || isHidden) {
      return null;
    }

    // Handle click
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }

        if (hasChildren && onToggleExpand) {
          e.preventDefault();
          onToggleExpand(item.id);
        }

        item.onClick?.(item);
        onItemClick?.(item);
      },
      [item, isDisabled, hasChildren, onToggleExpand, onItemClick]
    );

    // Handle focus
    const handleFocus = useCallback(() => {
      onFocus?.(item.id);
    }, [item.id, onFocus]);

    // Handle blur
    const handleBlur = useCallback(() => {
      onFocus?.(undefined);
    }, [onFocus]);

    return (
      <li
        ref={ref}
        className={`nav-menu-item nav-component ${isActive ? 'nav-menu-item--active' : ''} ${
          isFocused ? 'nav-menu-item--focused' : ''
        } ${isDisabled ? 'nav-menu-item--disabled' : ''} ${
          hasChildren ? 'nav-menu-item--expandable' : ''
        } ${isExpanded ? 'nav-menu-item--expanded' : ''} ${className}`}
        style={style}
      >
        {hasChildren && !item.href ? (
          // Disclosure button for expandable items without links
          <button
            type="button"
            className="nav-menu-item__link nav-menu-item__disclosure"
            onClick={(e) => {
              e.preventDefault();
              if (!isDisabled && onToggleExpand) {
                onToggleExpand(item.id);
              }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-expanded={isExpanded}
            aria-disabled={isDisabled}
            disabled={isDisabled}
          >
            <span className="nav-menu-item__content">
              {showIcons && item.icon && (
                <span className="nav-menu-item__icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}

              <span className="nav-menu-item__label">{item.label}</span>

              {showBadges && item.badge && (
                <span className="nav-menu-item__badge" role="status">
                  {item.badge}
                </span>
              )}
            </span>

            <span
              className="nav-menu-item__chevron"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </span>
          </button>
        ) : (
          // Link for navigable items
          <a
            href={item.href || '#'}
            className="nav-menu-item__link"
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={isDisabled}
            aria-expanded={hasChildren ? isExpanded : undefined}
          >
            <span className="nav-menu-item__content">
              {showIcons && item.icon && (
                <span className="nav-menu-item__icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}

              <span className="nav-menu-item__label">{item.label}</span>

              {showBadges && item.badge && (
                <span className="nav-menu-item__badge" role="status">
                  {item.badge}
                </span>
              )}
            </span>

            {hasChildren && (
              <button
                type="button"
                className="nav-menu-item__chevron nav-menu-item__chevron-button"
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
                aria-expanded={isExpanded}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isDisabled && onToggleExpand) {
                    onToggleExpand(item.id);
                  }
                }}
                tabIndex={0}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
            )}
          </a>
        )}

        {hasChildren && isExpanded && item.children && (
          <ul className="nav-menu-item__submenu" role="list">
            {item.children.map((child) => (
              <MenuItem
                key={child.id}
                item={child}
                isActive={isActive}
                onItemClick={onItemClick}
                onToggleExpand={onToggleExpand}
                onFocus={onFocus}
                showIcons={showIcons}
                showBadges={showBadges}
                depth={(depth || 0) + 1}
                maxDepth={maxDepth}
                security={security}
                canAccess={canAccess}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;

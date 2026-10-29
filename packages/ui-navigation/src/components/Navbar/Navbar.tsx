/**
 * @file components/Navbar/Navbar.tsx
 * Navbar component for horizontal navigation
 */

import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import { Menu } from '../Menu';
import type { MenuProps } from '../Menu';
import './navbar.css';

/**
 * Navbar component props
 */
export interface NavbarProps extends Omit<MenuProps, 'orientation' | 'role'> {
  /**
   * Logo or brand element
   */
  logo?: React.ReactNode;

  /**
   * Left content (after logo)
   */
  left?: React.ReactNode;

  /**
   * Right side content (e.g., user menu, settings)
   */
  right?: React.ReactNode;

  /**
   * Navbar title
   */
  title?: string;

  /**
   * Position of navbar
   */
  position?: 'static' | 'sticky' | 'fixed';

  /**
   * Whether navbar is sticky to top
   */
  sticky?: boolean;

  /**
   * Height of navbar
   */
  height?: string | number;

  /**
   * Show mobile menu button
   */
  showMobileMenu?: boolean;

  /**
   * Callback when mobile menu is toggled
   */
  onMobileMenuToggle?: (isOpen: boolean) => void;

  /**
   * Custom background color
   */
  backgroundColor?: string;

  /**
   * Shadow effect
   */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Navbar Component
 *
 * Horizontal navigation bar typically used at the top of applications.
 * Supports logo, title, left/right content areas, and mobile menu.
 *
 * @example
 * ```tsx
 * <Navbar
 *   logo={<Logo />}
 *   items={menuItems}
 *   right={<UserMenu />}
 *   sticky={true}
 * />
 * ```
 */
export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  (
    {
      items,
      logo,
      left,
      right,
      title,
      position = 'sticky',
      sticky = false,
      height = '3.5rem',
      showMobileMenu = true,
      onMobileMenuToggle,
      backgroundColor,
      shadow = 'md',
      className = '',
      style,
      variant = 'default',
      ...menuProps
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);

    // Handle mobile menu toggle
    const handleMobileMenuToggle = useCallback(() => {
      const newState = !mobileMenuOpen;
      setMobileMenuOpen(newState);
      onMobileMenuToggle?.(newState);
    }, [mobileMenuOpen, onMobileMenuToggle]);

    // Close mobile menu on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          navbarRef.current &&
          !navbarRef.current.contains(e.target as Node)
        ) {
          setMobileMenuOpen(false);
        }
      };

      if (mobileMenuOpen) {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }
    }, [mobileMenuOpen]);

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(navbarRef.current);
        } else {
          ref.current = navbarRef.current;
        }
      }
    }, [ref]);

    return (
      <nav
        ref={navbarRef}
        className={`nav-navbar nav-navbar--${position} nav-navbar--shadow-${shadow} nav-component ${className}`}
        style={{
          ...style,
          '--wx-nav-navbar-height': height,
          '--wx-nav-navbar-bg': backgroundColor,
        } as React.CSSProperties}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Navbar container */}
        <div className="nav-navbar__container">
          {/* Left section */}
          <div className="nav-navbar__section nav-navbar__section--left">
            {logo && (
              <div className="nav-navbar__logo">
                {logo}
              </div>
            )}

            {title && (
              <span className="nav-navbar__title">
                {title}
              </span>
            )}

            {left && (
              <div className="nav-navbar__left-content">
                {left}
              </div>
            )}
          </div>

          {/* Menu - desktop only */}
          <div className="nav-navbar__menu-container">
            <Menu
              items={items}
              {...menuProps}
              orientation="horizontal"
              variant={variant}
              className="nav-navbar__menu"
            />
          </div>

          {/* Right section */}
          <div className="nav-navbar__section nav-navbar__section--right">
            {right && (
              <div className="nav-navbar__right-content">
                {right}
              </div>
            )}

            {showMobileMenu && (
              <button
                className="nav-navbar__mobile-menu-btn"
                onClick={handleMobileMenuToggle}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                aria-haspopup="menu"
                type="button"
              >
                <span className="nav-navbar__hamburger">
                  <span className="nav-navbar__hamburger-line" />
                  <span className="nav-navbar__hamburger-line" />
                  <span className="nav-navbar__hamburger-line" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu - dropdown */}
        {showMobileMenu && mobileMenuOpen && (
          <div className="nav-navbar__mobile-menu" role="navigation">
            <Menu
              items={items}
              {...menuProps}
              orientation="vertical"
              variant={variant}
              className="nav-navbar__mobile-menu-content"
            />
          </div>
        )}
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export default Navbar;

/**
 * JavaScript for HTML coverage report interactivity.
 * 
 * Provides search, sort, filter, theme toggle, and expand/collapse functionality.
 * No external dependencies - vanilla JavaScript only.
 */

export const JS_SCRIPTS = `
(function() {
  'use strict';
  
  // ============================================================================
  // Theme Management
  // ============================================================================
  
  function initTheme() {
    const savedTheme = localStorage.getItem('coverage-report-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
  }
  
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('coverage-report-theme', newTheme);
    updateThemeButton(newTheme);
  }
  
  function updateThemeButton(theme) {
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  
  // ============================================================================
  // Search Functionality
  // ============================================================================
  
  function initSearch() {
    const searchBox = document.getElementById('search-box');
    if (!searchBox) return;
    
    searchBox.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();
      filterAllTables(query);
    });
  }
  
  function filterAllTables(query) {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      const rows = table.querySelectorAll('tbody tr');
      let visibleCount = 0;
      
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = !query || text.includes(query);
        
        if (matches) {
          row.classList.remove('hidden');
          visibleCount++;
        } else {
          row.classList.add('hidden');
        }
      });
      
      // Show/hide empty state if applicable
      const emptyState = table.parentElement.querySelector('.empty-state');
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }
  
  // ============================================================================
  // Table Sorting
  // ============================================================================
  
  function initSorting() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      const headers = table.querySelectorAll('th');
      
      headers.forEach((header, columnIndex) => {
        if (!header.classList.contains('sortable')) return;
        
        header.addEventListener('click', function() {
          sortTable(table, columnIndex, header);
        });
      });
    });
  }
  
  function sortTable(table, columnIndex, header) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Determine sort direction
    const currentSort = header.classList.contains('sort-asc') ? 'asc' : 
                       header.classList.contains('sort-desc') ? 'desc' : 
                       'none';
    const newSort = currentSort === 'none' ? 'asc' : 
                    currentSort === 'asc' ? 'desc' : 
                    'asc';
    
    // Clear all sort indicators in this table
    table.querySelectorAll('th').forEach(th => {
      th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Add new sort indicator
    if (newSort === 'asc') {
      header.classList.add('sort-asc');
    } else {
      header.classList.add('sort-desc');
    }
    
    // Sort rows
    rows.sort((a, b) => {
      const aCell = a.cells[columnIndex];
      const bCell = b.cells[columnIndex];
      
      if (!aCell || !bCell) return 0;
      
      let aValue = aCell.textContent.trim();
      let bValue = bCell.textContent.trim();
      
      // Try to parse as number
      const aNum = parseFloat(aValue.replace(/,/g, ''));
      const bNum = parseFloat(bValue.replace(/,/g, ''));
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return newSort === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      // String comparison
      const comparison = aValue.localeCompare(bValue, undefined, { 
        numeric: true, 
        sensitivity: 'base' 
      });
      
      return newSort === 'asc' ? comparison : -comparison;
    });
    
    // Reorder DOM
    rows.forEach(row => tbody.appendChild(row));
  }
  
  // ============================================================================
  // Expand/Collapse Sections
  // ============================================================================
  
  function initExpandCollapse() {
    const headers = document.querySelectorAll('.section-header');
    
    headers.forEach(header => {
      header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.expand-icon');
        
        if (content && content.classList.contains('section-content')) {
          content.classList.toggle('collapsed');
          if (icon) {
            icon.classList.toggle('collapsed');
          }
        }
      });
    });
  }
  
  // ============================================================================
  // Keyboard Shortcuts
  // ============================================================================
  
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchBox = document.getElementById('search-box');
        if (searchBox) {
          searchBox.focus();
          searchBox.select();
        }
      }
      
      // Ctrl/Cmd + D: Toggle theme
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
  
  // ============================================================================
  // Back to Top
  // ============================================================================
  
  function initBackToTop() {
    const backToTopLinks = document.querySelectorAll('a[href="#top"]');
    
    backToTopLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
  }
  
  // ============================================================================
  // Section Navigation
  // ============================================================================
  
  function initSectionNav() {
    const navLinks = document.querySelectorAll('.section-nav a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  
  // ============================================================================
  // Initialize All Features
  // ============================================================================
  
  function init() {
    initTheme();
    initSearch();
    initSorting();
    initExpandCollapse();
    initKeyboardShortcuts();
    initBackToTop();
    initSectionNav();
    
    // Setup theme toggle button
    const themeButton = document.getElementById('theme-toggle');
    if (themeButton) {
      themeButton.addEventListener('click', toggleTheme);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
`;

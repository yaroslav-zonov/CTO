/**
 * Modern vanilla JS interactions for DLE templates
 * Handles dropdowns, toggles, and other interactive elements
 * Gracefully degrades when JS is disabled
 */

(function() {
  'use strict';

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initDropdowns();
    initCommentFormToggle();
    initTabNavigation();
  }

  /**
   * Dropdown functionality for login menus
   */
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown-trigger]');
    
    dropdowns.forEach(trigger => {
      const menu = trigger.parentElement.querySelector('[data-dropdown-menu]');
      if (!menu) return;

      // Toggle dropdown on click
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = menu.classList.contains('hidden');
        
        // Close all other dropdowns
        document.querySelectorAll('[data-dropdown-menu]').forEach(m => {
          if (m !== menu) m.classList.add('hidden');
        });
        
        // Toggle current dropdown
        menu.classList.toggle('hidden', !isHidden);
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-dropdown-trigger]') && !e.target.closest('[data-dropdown-menu]')) {
        document.querySelectorAll('[data-dropdown-menu]').forEach(menu => {
          menu.classList.add('hidden');
        });
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('[data-dropdown-menu]').forEach(menu => {
          menu.classList.add('hidden');
        });
      }
    });
  }

  /**
   * Toggle comment form visibility
   */
  function initCommentFormToggle() {
    const toggleButtons = document.querySelectorAll('[data-toggle="comment-form"]');
    
    toggleButtons.forEach(button => {
      const form = button.closest('#add-comm-form');
      if (!form) return;

      const formBody = form.querySelector('[data-form-body]');
      const icon = button.querySelector('.material-symbols-outlined');
      
      if (!formBody) return;

      button.addEventListener('click', () => {
        const isHidden = formBody.style.display === 'none';
        formBody.style.display = isHidden ? 'block' : 'none';
        if (icon) {
          icon.textContent = isHidden ? 'expand_less' : 'expand_more';
        }
      });
    });
  }

  /**
   * Tab navigation for PM page
   */
  function initTabNavigation() {
    const tabs = document.querySelectorAll('[data-tab]');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active state from all tabs
        tabs.forEach(t => {
          t.classList.remove('border-[#fc5621]', 'text-foreground');
          t.classList.add('border-transparent', 'text-gray-500');
        });
        
        // Add active state to clicked tab
        tab.classList.remove('border-transparent', 'text-gray-500');
        tab.classList.add('border-[#fc5621]', 'text-foreground');
      });
    });
  }

  /**
   * Enhanced button interactions
   */
  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    
    // Add visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 100);

    // Handle specific actions
    switch (action) {
      case 'favorite':
      case 'bookmark':
        // Toggle filled/outlined icon state
        const icon = button.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.style.fontVariationSettings = 
            icon.style.fontVariationSettings === "'FILL' 1, 'wght' 500" 
              ? "'wght' 500" 
              : "'FILL' 1, 'wght' 500";
        }
        break;
    }
  });

})();

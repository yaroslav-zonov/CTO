/**
 * Modern DLE Theme - Vanilla JavaScript
 * Replaces jQuery-based interactions with modern vanilla JS
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Utility: Toggle class
  function toggleClass(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }

  // Utility: Fade toggle
  function fadeToggle(element, duration = 200) {
    if (!element.style.opacity || element.style.opacity === '1') {
      element.style.opacity = '1';
      element.style.display = 'block';
      let start = null;
      
      function fade(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(0, 1 - (progress / duration));
        element.style.opacity = opacity;
        
        if (progress < duration) {
          requestAnimationFrame(fade);
        } else {
          element.style.display = 'none';
          element.style.opacity = '0';
        }
      }
      requestAnimationFrame(fade);
    } else {
      element.style.display = 'block';
      let start = null;
      
      function fadeIn(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(1, progress / duration);
        element.style.opacity = opacity;
        
        if (progress < duration) {
          requestAnimationFrame(fadeIn);
        } else {
          element.style.opacity = '1';
        }
      }
      requestAnimationFrame(fadeIn);
    }
  }

  // Initialize all behaviors
  ready(function() {
    document.body.classList.add('js');

    // ========================================
    // Header Search Toggle
    // ========================================
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchInput = searchContainer?.querySelector('input[type="text"]');

    if (searchToggle && searchContainer) {
      searchToggle.addEventListener('click', function() {
        const isHidden = searchContainer.style.display === 'none' || !searchContainer.style.display;
        
        if (isHidden) {
          searchContainer.style.display = 'flex';
          if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
          }
        } else {
          searchContainer.style.display = 'none';
        }
      });
    }

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('fixed');
        document.body.style.overflow = 'hidden';
      });
    }

    if (mobileMenuClose && mobileMenu) {
      mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('fixed');
        document.body.style.overflow = '';
      });
    }

    // Close mobile menu on link click
    if (mobileMenu) {
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('fixed');
          document.body.style.overflow = '';
        });
      });
    }

    // ========================================
    // Dropdown Toggle (User Menu)
    // ========================================
    const dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
    
    dropdownTriggers.forEach(trigger => {
      const targetId = trigger.getAttribute('data-dropdown-trigger');
      const dropdown = document.getElementById(targetId);
      
      if (dropdown) {
        trigger.addEventListener('click', function(e) {
          e.stopPropagation();
          const isHidden = dropdown.classList.contains('hidden');
          
          // Close all other dropdowns
          document.querySelectorAll('[data-dropdown]').forEach(dd => {
            if (dd !== dropdown) {
              dd.classList.add('hidden');
            }
          });
          
          if (isHidden) {
            dropdown.classList.remove('hidden');
          } else {
            dropdown.classList.add('hidden');
          }
        });
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('[data-dropdown-trigger]')) {
        document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
          dropdown.classList.add('hidden');
        });
      }
    });

    // ========================================
    // Legacy DLE Features - Preserved
    // ========================================

    // Clickable elements with data-link
    const clickableLinks = document.querySelectorAll('.ps-link[data-link]');
    clickableLinks.forEach(el => {
      el.addEventListener('click', function() {
        const url = this.getAttribute('data-link');
        if (url) {
          window.location.href = url;
        }
      });
    });

    // Sorter hover/click behavior
    const sorters = document.querySelectorAll('.sorter');
    const isDesktop = window.innerWidth > 1220;

    sorters.forEach(sorter => {
      const form = sorter.querySelector('form');
      if (form) {
        if (isDesktop) {
          sorter.addEventListener('mouseenter', () => form.style.display = 'block');
          sorter.addEventListener('mouseleave', () => form.style.display = 'none');
        } else {
          sorter.addEventListener('click', () => {
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
          });
        }
      }
    });

    // Rating display
    document.querySelectorAll('.rate3').forEach(ratebox => {
      const ratingEl = ratebox.querySelector('.ratingtypeplusminus');
      const countEl = ratebox.querySelector('span[id]:last-child');
      
      if (ratingEl && countEl) {
        const raterate = parseInt(ratingEl.textContent);
        const ratecount = parseInt(countEl.textContent);
        
        if (ratecount >= raterate) {
          const minusik = Math.floor((ratecount - raterate) / 2);
          const plusik = ratecount - minusik;
          
          const plussEl = ratebox.querySelector('.pluss');
          const minussEl = ratebox.querySelector('.minuss');
          
          if (plussEl) {
            const span = document.createElement('span');
            span.className = 'plusik';
            span.textContent = plusik;
            plussEl.appendChild(span);
          }
          
          if (minussEl) {
            const span = document.createElement('span');
            span.className = 'minusik';
            span.textContent = minusik;
            minussEl.appendChild(span);
          }
        }
      }
    });

    // Tabs functionality
    const tabContainers = document.querySelectorAll('.tabs-sel');
    tabContainers.forEach(tabSel => {
      const tabs = tabSel.querySelectorAll('span');
      const tabsBox = tabSel.closest('.tabsbox');
      const tabContents = tabsBox?.querySelectorAll('.tabs-b');
      
      if (tabs.length > 0) {
        tabs[0].classList.add('current');
        if (tabContents && tabContents.length > 0) {
          tabContents[0].classList.add('visible');
          tabContents[0].style.display = 'block';
        }
      }
      
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
          if (!this.classList.contains('current')) {
            tabs.forEach(t => t.classList.remove('current'));
            this.classList.add('current');
            
            if (tabContents) {
              tabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('visible');
              });
              
              if (tabContents[index]) {
                tabContents[index].style.display = 'block';
                tabContents[index].classList.add('visible');
              }
            }
          }
        });
      });
    });

    // Text slicing with expand button
    document.querySelectorAll('.mov-desc-text').forEach(slice => {
      const sliceH = slice.offsetHeight;
      const sliceL = parseInt(slice.getAttribute('data-slice'));
      
      if (sliceH > sliceL) {
        slice.classList.add('slice');
        slice.style.height = sliceL + 'px';
        
        const btn = document.createElement('div');
        btn.className = 'slice-btn';
        btn.innerHTML = '<span>Развернуть полностью</span>';
        slice.appendChild(btn);
        
        btn.addEventListener('click', function() {
          slice.style.height = 'auto';
          slice.classList.remove('slice');
          btn.style.display = 'none';
        });
      }
    });

    // Comment form toggle
    const addCommBtn = document.getElementById('add-commbtn');
    const addCommForm = document.getElementById('add-comm-form');
    
    if (addCommBtn && addCommForm) {
      addCommBtn.addEventListener('click', () => {
        addCommForm.style.display = addCommForm.style.display === 'none' ? 'block' : 'none';
      });
    }

    const commQuotes = document.querySelectorAll('.comm-q');
    commQuotes.forEach(q => {
      if (addCommForm) {
        q.addEventListener('click', () => {
          addCommForm.style.display = 'block';
        });
      }
    });

    // Move comments to proper container
    const dleComments = document.querySelector('#dle-content > #dle-ajax-comments');
    const fullComms = document.getElementById('full-comms');
    if (dleComments && fullComms) {
      fullComms.appendChild(dleComments);
    }

    // Scroll to top button
    if (window.innerWidth > 750) {
      const gotop = document.createElement('div');
      gotop.id = 'gotop';
      gotop.innerHTML = '<span class="material-symbols-outlined">arrow_upward</span>';
      gotop.style.display = 'none';
      document.body.appendChild(gotop);
      
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          gotop.style.display = 'block';
        } else {
          gotop.style.display = 'none';
        }
      });
      
      gotop.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // ========================================
    // Grid View Toggle with Cookie Support
    // ========================================
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }

    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
    }

    const grid = document.getElementById('grid');
    const gridSelect = document.getElementById('grid-select');
    
    if (grid && gridSelect) {
      // Load saved view from cookie
      const savedView = getCookie('loop_view');
      if (savedView === 'grid-list') {
        grid.classList.remove('grid-thumb');
        grid.classList.add('grid-list');
        grid.setAttribute('data-view', 'grid-list');
        const btn = gridSelect.querySelector('span:nth-child(1)');
        if (btn) {
          btn.classList.add('current');
          gridSelect.querySelectorAll('span').forEach(s => {
            if (s !== btn) s.classList.remove('current');
          });
        }
      } else if (savedView === 'grid-thumb') {
        grid.classList.remove('grid-list');
        grid.classList.add('grid-thumb');
        grid.setAttribute('data-view', 'grid-thumb');
        const btn = gridSelect.querySelector('span:nth-child(2)');
        if (btn) {
          btn.classList.add('current');
          gridSelect.querySelectorAll('span').forEach(s => {
            if (s !== btn) s.classList.remove('current');
          });
        }
      }
      
      // Handle view change
      gridSelect.querySelectorAll('span').forEach(span => {
        span.addEventListener('click', function(e) {
          e.preventDefault();
          
          const viewType = this.getAttribute('data-type');
          const loopView = grid.getAttribute('data-view');
          
          if (viewType === loopView) return;
          
          gridSelect.querySelectorAll('span').forEach(s => s.classList.remove('current'));
          this.classList.add('current');
          
          grid.style.opacity = '0';
          
          setTimeout(() => {
            if (loopView) {
              grid.classList.remove(loopView);
            }
            grid.classList.add(viewType);
            grid.setAttribute('data-view', viewType);
            grid.style.opacity = '1';
          }, 100);
          
          setCookie('loop_view', viewType, 7);
        });
      });
    }

    // ========================================
    // Social Share Links (Desktop only)
    // ========================================
    if (window.innerWidth > 950) {
      const linkTitle = encodeURIComponent(document.title);
      const linkUrl = encodeURIComponent(window.location.href);
      const leftvar = (screen.width - 600) / 2;
      const topvar = (screen.height - 400) / 2;
      
      const socialLinks = [
        {
          url: `http://vkontakte.ru/share.php?url=${linkUrl}`,
          title: 'ВКонтакте'
        },
        {
          url: `http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl=${linkUrl}&title=${linkTitle}`,
          title: 'Одноклассники'
        },
        {
          url: `http://connect.mail.ru/share?share_url=${linkUrl}`,
          title: 'Mail.ru'
        },
        {
          url: `http://www.facebook.com/sharer.php?u=${linkUrl}&t=${linkTitle}`,
          title: 'Facebook'
        },
        {
          url: `http://twitter.com/share?text=${linkTitle}&url=${linkUrl}`,
          title: 'Twitter'
        },
        {
          url: `https://plus.google.com/share?url=${linkUrl}`,
          title: 'Google'
        },
        {
          url: `http://www.livejournal.com/update.bml?event=${linkUrl}&subject=${linkTitle}`,
          title: 'Livejournal'
        }
      ];
      
      document.querySelectorAll('.share-box').forEach(shareBox => {
        const urlImg = shareBox.getAttribute('data-img');
        let sdvig = 0;
        
        socialLinks.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url;
          a.title = link.title;
          a.target = '_blank';
          a.style.background = `url(${urlImg}) -${sdvig}px top no-repeat`;
          
          a.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(
              this.href,
              'contacts',
              `location,width=600,height=400,left=${leftvar},top=${topvar}`
            );
          });
          
          shareBox.appendChild(a);
          sdvig += 27;
        });
      });
    }

    // ========================================
    // Carousel Plugin
    // ========================================
    document.querySelectorAll('.tcarusel').forEach(carousel => {
      const scroll = carousel.querySelector('.tcarusel-scroll');
      const items = carousel.querySelectorAll('.tcarusel-item');
      
      if (!scroll || items.length === 0) return;
      
      const itemWidth = items[0].offsetWidth + 
        parseInt(getComputedStyle(items[0]).marginLeft) +
        parseInt(getComputedStyle(items[0]).marginRight);
      
      const nextBtn = carousel.querySelector('.tcarusel-next');
      const prevBtn = carousel.querySelector('.tcarusel-prev');
      
      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          scroll.style.transition = 'left 0.2s';
          scroll.style.left = `-${itemWidth}px`;
          
          setTimeout(() => {
            scroll.appendChild(items[0]);
            scroll.style.transition = 'none';
            scroll.style.left = '0';
          }, 200);
        });
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          const lastItem = scroll.querySelector('.tcarusel-item:last-child');
          scroll.insertBefore(lastItem, items[0]);
          scroll.style.transition = 'none';
          scroll.style.left = `-${itemWidth}px`;
          
          setTimeout(() => {
            scroll.style.transition = 'left 0.2s';
            scroll.style.left = '0';
          }, 10);
        });
      }
    });
  });

  // ========================================
  // Rating Function (Global - needed by DLE)
  // ========================================
  window.doRateLD = function(rate, id) {
    // Show loading indicator
    if (typeof ShowLoading === 'function') {
      ShowLoading('');
    }
    
    fetch(`${dle_root}engine/ajax/rating.php?go_rate=${rate}&news_id=${id}&skin=${dle_skin}`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (typeof HideLoading === 'function') {
        HideLoading('');
      }
      
      if (data.success) {
        let rating = data.rating
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&');
        
        const ratingLayer = document.getElementById(`ratig-layer-${id}`);
        const voteNum = document.getElementById(`vote-num-id-${id}`);
        
        if (ratingLayer) {
          ratingLayer.innerHTML = rating;
        }
        
        if (voteNum) {
          voteNum.textContent = data.votenum;
        }
        
        // Update plus/minus counts
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rating;
        const ratingtext = parseInt(tempDiv.textContent);
        const minusik = Math.floor((data.votenum - ratingtext) / 2);
        const plusik = data.votenum - minusik;
        
        const plussEl = document.querySelector(`#pluss-${id} .plusik`);
        const minussEl = document.querySelector(`#minuss-${id} .minusik`);
        
        if (plussEl) plussEl.textContent = plusik;
        if (minussEl) minussEl.textContent = minusik;
      } else if (data.error && typeof DLEalert === 'function') {
        DLEalert(data.errorinfo, dle_info);
      }
    })
    .catch(error => {
      console.error('Rating error:', error);
      if (typeof HideLoading === 'function') {
        HideLoading('');
      }
    });
  };
})();

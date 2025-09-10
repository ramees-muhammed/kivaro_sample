(function ($) {
  const HOME_PATHS = ['/', '/index.html'];

  function isHome() {
    const p = location.pathname.replace(/\/+$/, '') || '/';
    return HOME_PATHS.includes(p);
  }

  function getHeaderHeight() {
    const $h = $('.header, header, #header');
    return $h.length ? $h.outerHeight() : 0;
  }

  function smoothScrollTo(selector) {
    const $t = $(selector);
    if (!$t.length) return;
    const top = $t.offset().top - getHeaderHeight() - 8;
    $('html, body').stop().animate({ scrollTop: top }, 500, 'swing');
  }

  // Handle clicks on nav links with data-target
  $(document).on('click', 'a.js-section-link', function (e) {
    const target = $(this).data('target'); // "#homeServices"
    if (!target) return;

    if (!isHome()) {
      e.preventDefault();
      window.location.href = '/index.html' + target;
      return;
    }

    e.preventDefault();
    smoothScrollTo(target);

    // Close mobile nav
    $('.menu-toggle').removeClass('active');
    $('.navigations').removeClass('active');
  });

  // Active link highlighting
  function setActiveLink() {
    const currentPath = (location.pathname.split('#')[0]).replace(/\/+$/, '') || '/';
    $('.nav-link').each(function () {
      const href = $(this).attr('href') || '';
      const hrefPath = href.split('#')[0].replace(/\/+$/, '') || '/';
      const isActive =
        hrefPath === currentPath ||
        (hrefPath === '/index.html' && currentPath === '/');

      $(this).toggleClass('active', isActive);
    });

    // Force Services active if hash matches
    if (isHome() && location.hash === '#homeServices') {
      $('.nav-link').removeClass('active');
      $('a.js-section-link[data-target="#homeServices"]').addClass('active');
    }
  }

  $(window).on('load', setActiveLink);
  $(document).ajaxComplete(setActiveLink);
})(jQuery);


$(document).ready(function () {
  const $mainNav = $('.main-nav')

  // Don't mind this bad boy. They'll just help us make adjustments later
  const BREATHING_ROOM = 16

  // Get those scroll link bad boys
  // Basically, any anchors that start with # except for the ones
  // which only use # as a placeholder or as a target (looking at you BootStrap)
  const scrollLinks = $('a[href^="#"]:not([role="button"])')

  scrollLinks.click(function (e) {
    // We don't want the link to work like a regular link!
    // That would just be the same choppy BS we're trying to avoid >:(
    e.preventDefault();

    const $this = $(this)

    // Here's the deal: #myRef works fine because it refers to an id
    // Of course, # breaks because who in the world knows what # means?
    // So we account for that
    if ($this.attr('href') === '#') {
      target = $('body')
    } else {
      target = $('body').find($this.attr('href'))
    }

    // Most of the time, it suffices to just get the position of the destination
    const idealDest = target.offset().top
    // Unfortunately, we have a top nav! So we better adjust for that
    const trueDest = idealDest - $mainNav.height()
    // There we go :)

    $('html, body').animate({
      // But personally, I like a little more breathing room
      scrollTop: trueDest - BREATHING_ROOM
    }, 300)

    // I believe the below code is meant for single-page sites with navbars
    // This doesn't apply here since . . . we don't have a single-page site
    /*
    $(this).parent().addClass('active')
    $(this).parent().siblings().removeClass('active')
    */

    // Okay, I'll be honest: I "borrowed" this code so I'm not 100%
    // why we return false. But from experience it probably is a
    // backup e.preventDefault() since returning false also
    // overrides default behaviour (but that's just an educated guess)
    return false
  })

  let isNavCollapsed = true
  const $navToggler = $mainNav.find('.navbar-toggler')

  $(window).on('scroll', function () {
    // If the nav is expanded, scroll is irrelevant
    // It is REALLY important that an expanded nav is always active
    if (!isNavCollapsed) return

    if ($(window).scrollTop() > 30) {
      $mainNav.addClass('active')
    } else {
      $mainNav.removeClass('active')
    }
  })

  $(window).on('click', function () {
    isNavCollapsed = $navToggler.hasClass('collapsed')

    // Similarly, if we have scrolled down the page at all,
    // we must ensure that the nav is active even if the nav is collapsed
    if (isNavCollapsed && $(window).scrollTop() <= 30) {
      $mainNav.removeClass('active')
    } else {
      $mainNav.addClass('active')
    }
    // Without tests like those, there would be issues . . .
    // - scrolling with an expanded nav
    // - collapsing a nav while scrolled down
  })

  // And, of course, we should also check on page load
  // in case someone loads a fragment (e.g., #learn-more)
  if ($(window).scrollTop() > 30) {
    $mainNav.addClass('active')
  } else {
    $mainNav.removeClass('active')
  }
})

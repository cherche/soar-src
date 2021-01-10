// Huh?! What is this? I'm an amateur and I have no clue what this is!
// Well, when we have a scroll listener, notice that it's activating
// basically CONSTANTLY. Like, normally 30+ events triggered per second.
// This function limits it to maybe like 5 times a second
function throttle(fn, delay) {
  let timer = null

  return () => {
    const context = this
    const args = arguments

    if (timer) return

    fn.apply(context, args)

    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}

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

  const $navToggler = $mainNav.find('.navbar-toggler')

  // Okay, this short flowchart should clarify the logic:
  // SCROLLED DOWN?
  // y -> [opaque nav]
  // n -> MOBILE MENU EXPANDED?
  //      y -> [opaque nav]
  //      n -> [transparent nav]

  let isScrolledDown = $(window).scrollTop() > 30
  let isNavCollapsed = $navToggler.hasClass('collapsed')

  // This function makes it pretty reusable. Efficient? Optimized? Probably not
  function setNavOpacity () {
    if (isScrolledDown || !isNavCollapsed) {
      $mainNav.addClass('active')
    } else {
      $mainNav.removeClass('active')
    }
  }

  $(window).on('scroll', throttle(function () {
    isScrolledDown = $(window).scrollTop() > 30
    setNavOpacity()
  }, 200))

  $(window).on('click', function () {
    isNavCollapsed = $navToggler.hasClass('collapsed')
    setNavOpacity()
  })

  // And, of course, we should also initialize state on page load
  // in case someone loads a fragment (e.g., #learn-more)
  setNavOpacity()
})

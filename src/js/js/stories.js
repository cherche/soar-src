$(document).ready(function () {
  const $stories = $('.stories')

  // Why am I finding in $stories? So we don't have to traverse the whole DOM!
  const $indActive = $stories.find('.page-active')
  const $indTotal = $stories.find('.page-total')

  const $prev = $stories.find('.story-control-prev')
  const $next = $stories.find('.story-control-next')

  // Cast them all to a jQuery object so we can use those sweet methods later
  const $storyDivs = Array.from($stories.find('.story')).map(el => $(el))
  // Doing it this way means we are adaptive to changes in the HTML
  // without needing to ever revisit this Godforsaken file
  // Just kidding, love you stories.js <3
  const totalCount = $storyDivs.length

  // And finally, we must find the index of our current story
  // Honestly, this part was kind of not that fun, but it works
  let i
  for (let j = 0; j < totalCount; j++) {
    if ($storyDivs[j].hasClass('active')) {
      i = j
      break
    }
  }
  // Now, we initialize the indicator so it doesn't look super confusing
  $indActive.text(i + 1)
  $indTotal.text(totalCount)

  // With the prep done, let's set up some helpers to get some work done

  const goToPrevStory = () => {
    // To clarify, this is the "old" active story
    $storyDivs[i].removeClass('active')

    i--
    // Hashtag modular arithmetic
    // We add the totalCount in order to stay in range (otherwise i may be negative)
    i = (i + totalCount) % totalCount

    // After doing some math, we can now make the new story active
    $storyDivs[i].addClass('active')
    // . . . and set the page indicator, adding 1 to make it human-friendly
    $indActive.text(i + 1)
  }

  const goToNextStory = () => {
    $storyDivs[i].removeClass('active')

    i++
    // Here we don't need to add a buffer since we never go into the negatives
    i %= totalCount

    $storyDivs[i].addClass('active')
    $indActive.text(i + 1)
  }

  // Before we set up the manual scroll, let's do an autoscroll
  // Why set up autoscroll first? So we can make sure our event listeners
  // can CANCEL the autoscroll so users aren't forced against their will
  // to read the stories like a speed demon. Wow, these comments are weird

  let isAutoscrollActive = true
  const TIME = parseInt($stories.attr('data-interval'))
  let timeout = null

  const goToNextStoryLoop = () => {
    // To clarify, this is the "old" active story
    goToNextStory()

    // If active, reset the loop! We store it in interval in case we want
    if (isAutoscrollActive) timeout = setTimeout(goToNextStoryLoop, TIME)
  }
  timeout = setTimeout(goToNextStoryLoop, TIME)

  // A bit of a dramatic name, haha, but it gets the point across
  const resetTimeout = (delay) => {
    // We (a) stop the current timer
    clearTimeout(timeout)
    // and (b) set a requested delay
    timeout = setTimeout(goToNextStoryLoop, delay)
  }

  // And here we go: our main controls

  $prev.on('click', (e) => {
    e.preventDefault()
    goToPrevStory()
    // The idea is that we DO want the autoscroll to resume,
    // but not for a while. So we'll wait 30s before we get back to it.
    resetTimeout(30000)
    return false
  })

  $next.on('click', (e) => {
    e.preventDefault()
    goToNextStory()
    resetTimeout(30000)
    return false
  })
})

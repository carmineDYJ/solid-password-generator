import { createSignal, onMount } from 'solid-js'

function Slider(props) {
  let slideRef, thumbRef, darkSlideRef
  const [shiftX, setShiftX] = createSignal(undefined)
  const isTouchDevice = 'ontouchstart' in document.documentElement

  // TODO only disable when the slider is dragged
  document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false })

  // set the initial position of the thumb
  // TODO set it to the middle of the interval
  // TODO extract below calculation to a function
  // TODO 1 pixel issue, weird when set to 20 on mobile
  // TODO the codes that cause the weird issue
  // onMount(() => {
  //   let initLeft =
  //     slideRef.offsetWidth *
  //     ((props.passwordLength - props.shortestPasswordLength) /
  //       (props.longestPasswordLength - props.shortestPasswordLength + 1))
  //   if (initLeft < 0) {
  //     initLeft = 0
  //   }
  //   let rightEdge = slideRef.offsetWidth - thumbRef.offsetWidth
  //   if (initLeft > rightEdge) {
  //     initLeft = rightEdge
  //   }
  //   thumbRef.style.left = initLeft + 'px'
  //   darkSlideRef.style.left = initLeft + thumbRef.offsetWidth / 2 + 'px'
  // })

  const onDragStart = (event) => {
    event.preventDefault()
  }

  const onSlide = (event) => {
    let newLeft
    if (isTouchDevice) {
      newLeft = event.touches[0].clientX - shiftX() - slideRef.getBoundingClientRect().left
    } else {
      newLeft = event.clientX - shiftX() - slideRef.getBoundingClientRect().left
    }
    if (newLeft < 0) {
      newLeft = 0
    }
    let rightEdge = slideRef.offsetWidth - thumbRef.offsetWidth
    if (newLeft > rightEdge) {
      newLeft = rightEdge
    }
    thumbRef.style.left = newLeft + 'px'
    darkSlideRef.style.left = newLeft + thumbRef.offsetWidth / 2 + 'px'

    // Calculate the percentage of the slider
    let sliderPercentage = (newLeft + thumbRef.offsetWidth / 2) / slideRef.offsetWidth
    // Calculate the length of the password
    let passwordLength =
      props.shortestPasswordLength +
      Math.ceil(sliderPercentage * (props.longestPasswordLength - props.shortestPasswordLength + 1)) -
      1
    // Set the password length
    props.setPasswordLength(passwordLength)
    localStorage.setItem('passwordLength', passwordLength)
  }

  const onMouseDown = (event) => {
    event.preventDefault()
    setShiftX(event.clientX - thumbRef.getBoundingClientRect().left)
    document.addEventListener('mousemove', onSlide)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseUp = () => {
    setShiftX(undefined)
    document.removeEventListener('mousemove', onSlide)
    document.removeEventListener('mouseup', onMouseUp)
  }

  const onTouchStart = (event) => {
    if (event.touches.length === 1) {
      // check if the touch is on the slider
      if (
        event.touches[0].clientX > thumbRef.getBoundingClientRect().left &&
        event.touches[0].clientX < thumbRef.getBoundingClientRect().right &&
        event.touches[0].clientY > thumbRef.getBoundingClientRect().top &&
        event.touches[0].clientY < thumbRef.getBoundingClientRect().bottom
      ) {
        setShiftX(event.touches[0].clientX - thumbRef.getBoundingClientRect().left)
        document.addEventListener('touchmove', onSlide)
        document.addEventListener('touchend', onTouchEnd)
      }
    }
  }

  const onTouchEnd = () => {
    setShiftX(undefined)
    document.removeEventListener('touchmove', onSlide)
    document.removeEventListener('touchend', onTouchEnd)
  }
  return (
    <div ref={slideRef} overflow="hidden" before="content-empty slide" class="relative h-24px w-100% mb-12px">
      <div
        ref={thumbRef}
        class="z-1 thumb"
        onMouseDown={isTouchDevice ? () => {} : onMouseDown}
        onTouchStart={isTouchDevice ? onTouchStart : () => {}}
        onDragStart={onDragStart}
      ></div>
      <div ref={darkSlideRef} class="darkSlide"></div>
    </div>
  )
}

export default Slider

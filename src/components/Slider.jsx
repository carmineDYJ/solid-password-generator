import { createSignal } from 'solid-js'

function Slider(props) {
  let slideRef, thumbRef
  const [shiftX, setShiftX] = createSignal(undefined)
  const isTouchDevice = 'ontouchstart' in document.documentElement

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

    // Calculate the percentage of the slider
    let sliderPercentage = (newLeft + thumbRef.offsetWidth / 2) / slideRef.offsetWidth
    // Calculate the length of the password
    let passwordLength =
      props.shortestPasswordLength +
      Math.ceil(sliderPercentage * (props.longestPasswordLength - props.shortestPasswordLength + 1)) -
      1
    // Set the password length
    props.setPasswordLength(passwordLength)
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
        document.addEventListener('touchmove', onTouchMove)
        document.addEventListener('touchup', onTouchUp)
      }
    }
  }

  const onTouchUp = () => {
    setShiftX(undefined)
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchup', onTouchUp)
  }
  return (
    <div ref={slideRef} class="relative before:content-empty before:slide h-24px w-100% mb-12px">
      <div
        ref={thumbRef}
        class="absolute top-0px left-0px slider"
        onMouseDown={isTouchDevice ? () => {} : onMouseDown}
        onTouchStart={isTouchDevice ? onTouchStart : () => {}}
        onDragStart={onDragStart}
      ></div>
    </div>
  )
}

export default Slider

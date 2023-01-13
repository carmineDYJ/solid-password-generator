import { createSignal } from 'solid-js'

function Slider(props) {
  let slideRef, thumbRef
  const [shiftX, setShiftX] = createSignal(undefined)
  const isTouchDevice = 'ontouchstart' in document.documentElement

  const onDragStart = (event) => {
    event.preventDefault()
  }

  if (!isTouchDevice) {
    // PC slider
    const onMouseDown = (event) => {
      event.preventDefault()
      setShiftX(event.clientX - thumbRef.getBoundingClientRect().left)
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
    const onMouseMove = (event) => {
      let newLeft = event.clientX - shiftX() - slideRef.getBoundingClientRect().left
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
    const onMouseUp = () => {
      setShiftX(undefined)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    return (
      <div ref={slideRef} class="relative h-24px w-100% mb-12px">
        <div ref={thumbRef} class="absolute slider" onMouseDown={onMouseDown} onDragStart={onDragStart}></div>
      </div>
    )
  } else {
    const [isSlide, setIsSlide] = createSignal(false)
    // tablet or mobile slider
    const onTouchStart = (event) => {
      if (event.touches.length === 1) {
        // check if the touch is on the slider
        if (
          event.touches[0].clientX > thumbRef.getBoundingClientRect().left &&
          event.touches[0].clientX < thumbRef.getBoundingClientRect().right &&
          event.touches[0].clientY > thumbRef.getBoundingClientRect().top &&
          event.touches[0].clientY < thumbRef.getBoundingClientRect().bottom
        ) {
          setIsSlide(true)
          setShiftX(event.touches[0].clientX - thumbRef.getBoundingClientRect().left)
          document.addEventListener('touchmove', onTouchMove)
          document.addEventListener('touchup', onTouchUp)
        }
      }
    }
    const onTouchMove = (event) => {
      let newLeft = event.touches[0].clientX - shiftX() - slideRef.getBoundingClientRect().left
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
    const onTouchUp = () => {
      setShiftX(undefined)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchup', onTouchUp)
    }
    return (
      <div ref={slideRef} class="relative h-24px w-100% mb-12px">
        <div ref={thumbRef} class="absolute slider" onTouchStart={onTouchStart} onDragStart={onDragStart}></div>
      </div>
    )
  }
}

export default Slider

import { createSignal } from 'solid-js'

function Slider() {
  let slideRef, thumbRef
  const [shiftX, setShiftX] = createSignal(undefined)
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
  }
  const onMouseUp = () => {
    setShiftX(undefined)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  const onDragStart = (event) => {
    event.preventDefault()
  }
  return (
    <div ref={slideRef} class="relative h-24px w-100% mb-12px">
      <div ref={thumbRef} class="absolute slider" onMouseDown={onMouseDown} onDragStart={onDragStart}></div>
    </div>
  )
}

export default Slider

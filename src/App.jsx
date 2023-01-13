import { createSignal, For } from 'solid-js'
import Checkbox from './components/Checkbox'

const passwordInitOptions = {
  uppercaseIncluded: false,
  lowercaseIncluded: false,
  numberIncluded: false,
  signalIncluded: false,
}
const passwordOptionHints = [
  'Include Uppercase Letters',
  'Include Lowercase Letters',
  'Include Numbers',
  'Include Symbols',
]
const initPasswordOptions = () => {
  Object.keys(passwordInitOptions).forEach((key) => {
    passwordInitOptions[key] = localStorage.getItem(key) === 'true' ? true : false
  })
  return passwordInitOptions
}

function App() {
  const [password, setPassword] = createSignal('123!a@5678')
  const [passwordOptions, setPasswordOptions] = createSignal(initPasswordOptions())

  let slideRef, thumbRef
  const [shiftX, setShiftX] = createSignal(undefined)
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
    <div class="font-mono text-18px">
      <h1 class="text-title text-center font-extrabold center sm:mt-60px md:mt-100px sm:mb-16px md:mb-32px">
        Solid Password Generator
      </h1>
      <main class="main-bg-color text-main center sm:w-85vw md:w-600px">
        <div class="h-80px ps-20px pe-20px flex flex-column items-center">
          <div class="text-36px">{password}</div>
        </div>
        <div class="h-30px index-bg-color"></div>
        <div class="ps-16px pe-16px pt-20px pb-20px font-bold">
          <div class="flex justify-between items-center">
            <div class="text-18px">Character length</div>
            <div class="text-36px text-green font-normal">{password().length}</div>
          </div>
          <div ref={slideRef} class="relative h-24px w-100% mb-12px">
            <div ref={thumbRef} class="absolute slider" onMouseDown={onMouseDown} onDragStart={onDragStart}></div>
          </div>
          <For each={Object.keys(passwordOptions())}>
            {(option, i) => (
              <div class="flex items-center mb-12px">
                <Checkbox
                  class="sm:me-6px md:me-12px"
                  onClick={() => {
                    setPasswordOptions({ ...passwordOptions(), [option]: !passwordOptions()[option] })
                    localStorage.setItem(option, passwordOptions()[option])
                  }}
                  passwordOption={passwordOptions()[option]}
                />
                {passwordOptionHints[i()]}
              </div>
            )}
          </For>
        </div>
      </main>
    </div>
  )
}

export default App

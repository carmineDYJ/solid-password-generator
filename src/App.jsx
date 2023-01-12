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

  let slideRef, sliderRef
  const [shiftX, setShiftX] = createSignal(undefined)
  const [isMouseDown, setIsMouseDown] = createSignal(false)
  const onMouseDown = (event) => {
    event.preventDefault()
    setIsMouseDown(true)
    console.log(isMouseDown())
    setShiftX(event.clientX - sliderRef.getBoundingClientRect().left)
  }
  const onMouseMove = (event) => {
    if (isMouseDown()) {
      console.log(222)
      let newLeft = event.clientX - shiftX() - sliderRef.getBoundingClientRect().left
      console.log('newLeft', newLeft)
      // the pointer is out of slider => lock the thumb within the bounaries
      if (newLeft < 0) {
        newLeft = 0
      }
      let rightEdge = slideRef.offsetWidth - sliderRef.offsetWidth
      if (newLeft > rightEdge) {
        newLeft = rightEdge
      }

      sliderRef.style.left = newLeft + 'px'
    }
  }
  const onMouseUp = (event) => {
    setIsMouseDown(false)
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
          <div ref={slideRef} class="relative h-24px w-100% mb-12px" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <div ref={sliderRef} class="absolute slider" onMouseDown={onMouseDown}></div>
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

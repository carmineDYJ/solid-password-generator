import { createEffect, createSignal, For } from 'solid-js'
import Checkbox from './components/Checkbox'
import Slider from './components/Slider'
import passwordGenerate from './utils/passwordGenerate'

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
  const shortestPasswordLength = 8
  const longestPasswordLength = 20
  const [passwordLength, setPasswordLength] = createSignal(shortestPasswordLength)

  setPassword(passwordGenerate(passwordOptions(), passwordLength()))
  createEffect(() => {
    setPassword(passwordGenerate(passwordOptions(), passwordLength()))
  })
  return (
    <div class="font-mono text-18px">
      <h1 class="text-title text-center font-extrabold center sm:mt-60px md:mt-100px sm:mb-16px md:mb-32px">
        Solid Password Generator
      </h1>
      <main class="main-bg-color text-main center sm:w-85vw md:w-600px">
        <div class="h-80px ps-16px pe-16px flex flex-column items-center">
          <div class="text-36px">{password}</div>
        </div>
        <div class="h-30px index-bg-color"></div>
        <div class="ps-16px pe-16px pt-20px pb-20px font-bold">
          <div class="flex justify-between items-center">
            <div class="text-18px">Character length</div>
            <div class="text-36px text-green font-normal">{passwordLength()}</div>
          </div>
          <Slider
            setPasswordLength={setPasswordLength}
            shortestPasswordLength={shortestPasswordLength}
            longestPasswordLength={longestPasswordLength}
          />
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

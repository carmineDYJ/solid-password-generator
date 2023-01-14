import { createEffect, createSignal, For, Match, Switch } from 'solid-js'
import passwordGenerate from './utils/passwordUtils'
import Checkbox from './components/Checkbox'
import Slider from './components/Slider'
import CopyIcon from './assets/icons/CopyIcon'
import RefreshIcon from './assets/icons/RefreshIcon'
import PasswordStrength from './components/PasswordStrength'

const passwordInitOptions = {
  lowercaseIncluded: true,
  uppercaseIncluded: true,
  numberIncluded: true,
  signalIncluded: true,
}
const passwordOptionHints = [
  'Include Lowercase Letters',
  'Include Uppercase Letters',
  'Include Numbers',
  'Include Symbols',
]

function initPasswordOptions() {
  for (const key of Object.keys(passwordInitOptions)) {
    if (localStorage.getItem(key) === 'true' || localStorage.getItem(key) === 'false') {
      passwordInitOptions[key] = localStorage.getItem(key) === 'true'
    } else {
      localStorage.setItem(key, passwordInitOptions[key])
    }
  }
  return passwordInitOptions
}

const shortestPasswordLength = 8
const longestPasswordLength = 20

function initPasswordLength() {
  if (localStorage.getItem('passwordLength')) {
    const parsed = parseInt(localStorage.getItem('passwordLength'))
    if (isNaN(parsed)) {
      localStorage.setItem('passwordLength', shortestPasswordLength)
      return shortestPasswordLength
    } else if (parsed >= shortestPasswordLength && parsed <= longestPasswordLength) {
      return parsed
    }
  } else {
    localStorage.setItem('passwordLength', shortestPasswordLength)
    return shortestPasswordLength
  }
}

function App() {
  const [password, setPassword] = createSignal('')
  const [passwordOptions, setPasswordOptions] = createSignal(initPasswordOptions())
  const [passwordLength, setPasswordLength] = createSignal(initPasswordLength())
  const maxPasswordStrength = 4
  const [passwordStrength, setPasswordStrength] = createSignal(0)
  createEffect(() => {
    const { password, passwordStrength } = passwordGenerate(passwordOptions(), passwordLength())
    setPassword(password)
    setPasswordStrength(passwordStrength)
  })

  const refreshPassword = () => {
    const { password, passwordStrength } = passwordGenerate(passwordOptions(), passwordLength())
    setPassword(password)
    setPasswordStrength(passwordStrength)
  }
  const copyPassword2Clipboard = async () => {
    await navigator.clipboard.writeText(password())
  }
  return (
    <div class="font-mono text-18px">
      <h1 class="text-smGray text-center font-extrabold center sm:mt-60px md:mt-100px sm:mb-16px md:mb-32px">
        Solid Password Generator
      </h1>
      <main class="main-bg-color text-main center sm:w-85vw md:w-600px">
        <div class="relative h-80px ps-16px pe-16px flex items-center">
          <div class="max-w-[calc(100%-64px)] overflow-hidden whitespace-nowrap sm:text-30px md:text-36px">
            {password}
          </div>
          <div class="absolute top-16px right-78px w-40px h-[calc(100%-32px)] blurEffect"></div>
          <CopyIcon
            class="ml-auto ml-2px mr-6px cursor-pointer"
            width="28"
            height="28"
            onClick={copyPassword2Clipboard}
          />
          <RefreshIcon class="cursor-pointer" width="28" height="28" onClick={refreshPassword} />
        </div>
        <div class="h-30px index-bg-color"></div>
        <div class="ps-16px pe-16px pt-20px pb-20px font-bold">
          <div class="flex justify-between items-center">
            <div class="text-18px">Character length</div>
            <div class="text-36px text-green font-normal">{passwordLength()}</div>
          </div>
          <Slider
            passwordLength={passwordLength()}
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
                    let optionCanDisable = false
                    for (const key of Object.keys(passwordOptions())) {
                      if (key === option) continue
                      if (passwordOptions()[key]) {
                        optionCanDisable = true
                        break
                      }
                    }
                    if (!optionCanDisable && passwordOptions()[option]) return
                    setPasswordOptions({ ...passwordOptions(), [option]: !passwordOptions()[option] })
                    localStorage.setItem(option, passwordOptions()[option])
                  }}
                  passwordOption={passwordOptions()[option]}
                />
                {passwordOptionHints[i()]}
              </div>
            )}
          </For>
          <PasswordStrength maxPasswordStrength={maxPasswordStrength} passwordStrength={passwordStrength()} />
        </div>
      </main>
    </div>
  )
}

export default App

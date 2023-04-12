import { createEffect, createSignal, For, Match, Switch } from 'solid-js'
import passwordGenerate from './utils/passwordUtils'
import Checkbox from './components/Checkbox'
import Slider from './components/Slider'
import CopyIcon from './assets/icons/CopyIcon'
import RefreshIcon from './assets/icons/RefreshIcon'
import PasswordStrength from './components/PasswordStrength'
import PasswordOptions from './components/PasswordOptions'

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

// TODO fix strange slider display issue on mobile device
// function initPasswordLength() {
//   if (localStorage.getItem('passwordLength')) {
//     const parsed = parseInt(localStorage.getItem('passwordLength'))
//     if (isNaN(parsed)) {
//       localStorage.setItem('passwordLength', shortestPasswordLength)
//       return shortestPasswordLength
//     } else if (parsed >= shortestPasswordLength && parsed <= longestPasswordLength) {
//       return parsed
//     }
//   } else {
//     localStorage.setItem('passwordLength', shortestPasswordLength)
//     return shortestPasswordLength
//   }
// }

function App() {
  const [password, setPassword] = createSignal('')
  const [passwordOptions, setPasswordOptions] = createSignal(initPasswordOptions())
  const [passwordLength, setPasswordLength] = createSignal(shortestPasswordLength)
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
    <div font="mono" class="sm:16px md:text-18px">
      <h1 text="smGray center 24px" font="extrabold" class="center sm:mt-60px md:mt-100px sm:mb-16px md:mb-32px">
        Solid Password Generator
      </h1>
      <main text="main" class="center sm:w-85vw md:w-600px">
        <div bg="smGray" class="relative h-80px ps-16px pe-16px mb-40px flex items-center">
          <div overflow="hidden" whitespace="nowrap" class="max-w-[calc(100%-64px)] sm:text-30px md:text-36px">
            {password}
          </div>
          <div class="absolute top-16px right-78px w-40px h-[calc(100%-32px)] blurEffect"></div>
          <CopyIcon width="28" height="28" onClick={copyPassword2Clipboard} />
          <RefreshIcon width="28" height="28" onClick={refreshPassword} />
        </div>
        <div bg="smGray" font="bold" class="ps-16px pe-16px pt-20px pb-20px">
          <div class="flex justify-between items-center">
            <div text="18px">Character length</div>
            <div text="36px green" font="normal">
              {passwordLength()}
            </div>
          </div>
          <Slider
            passwordLength={passwordLength()}
            setPasswordLength={setPasswordLength}
            shortestPasswordLength={shortestPasswordLength}
            longestPasswordLength={longestPasswordLength}
          />
          <PasswordOptions
            passwordOptionHints={passwordOptionHints}
            passwordOptions={passwordOptions()}
            setPasswordOptions={setPasswordOptions}
          />
          <PasswordStrength maxPasswordStrength={maxPasswordStrength} passwordStrength={passwordStrength()} />
        </div>
      </main>
    </div>
  )
}

export default App

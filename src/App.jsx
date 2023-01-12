import { createSignal } from 'solid-js'
import Checkbox from './components/Checkbox'

function App() {
  const [password, setPassword] = createSignal('123!a@5678')
  const [uppercaseIncluded, setUppercaseIncluded] = createSignal(false)
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
        <div class="h-400px ps-16px pe-16px pt-20px">
          <div class="flex justify-between items-center">
            <div class="text-18px">Character length</div>
            <div class="text-36px">{password().length}</div>
          </div>
          <div class="flex items-center">
            <Checkbox
              class="sm:me-6px md:me-12px"
              onClick={() => setUppercaseIncluded((prev) => !prev)}
              uppercaseIncluded={uppercaseIncluded}
            />
            Include Uppercase Letters
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

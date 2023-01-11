import { createSignal } from 'solid-js'

function App() {
  const [password, setPassword] = createSignal('123!a@5678')
  return (
    <div class="font-mono">
      <h1 class="text-title text-center text-20px font-extrabold center sm:mt-60px md:mt-100px sm:mb-16px md:mb-32px">
        Solid Password Generator
      </h1>
      <main class="main-bg-color center sm:w-85vw md:w-600px text-main">
        <div class="h-80px ps-20px pe-20px flex flex-column items-center">
          <div class="text-36px">{password}</div>
        </div>
        <div class="index-bg-color h-30px"></div>
        <div class="h-400px"></div>
      </main>
    </div>
  )
}

export default App

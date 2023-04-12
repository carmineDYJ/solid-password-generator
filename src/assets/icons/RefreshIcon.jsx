import { createSignal } from 'solid-js'

function RefreshIcon(props) {
  const [clicked, setClicked] = createSignal(false)
  const onClick = () => {
    props.onClick()
    setClicked(true)
    setTimeout(() => {
      setClicked(false)
    }, 1000)
  }
  return (
    <div class="relative">
      <div
        class="absolute -top-120% -translate-x-50% left-50% op-0 select-none"
        classList={{ 'animate-fade-out op-1': clicked() }}
      >
        Refreshed!
      </div>
      <svg
        cursor="pointer"
        t="1673688701989"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3461"
        width={props.width ? props.width : '200'}
        height={props.height ? props.height : '200'}
        onClick={onClick}
      >
        <path
          d="M990.08 425.6a30.72 30.72 0 0 1 0 44.8l-135.68 135.68a30.72 30.72 0 0 1-44.8 0l-135.68-135.68a31.36 31.36 0 1 1 44.8-44.8L832 538.24l113.28-112.64a30.72 30.72 0 0 1 44.8 0z"
          fill="#66ff99"
          p-id="3462"
        ></path>
        <path
          d="M448 928A416 416 0 1 1 864 512a32 32 0 0 1-64 0A352 352 0 1 0 448 864a345.6 345.6 0 0 0 176-47.36 32.64 32.64 0 0 1 43.52 12.16 31.36 31.36 0 0 1-11.52 43.52A414.72 414.72 0 0 1 448 928z"
          fill="#66ff99"
          p-id="3463"
        ></path>
      </svg>
    </div>
  )
}

export default RefreshIcon

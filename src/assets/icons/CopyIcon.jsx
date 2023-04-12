import { createSignal } from 'solid-js'

function CopyIcon(props) {
  const [clicked, setClicked] = createSignal(false)
  const onClick = () => {
    props.onClick()
    setClicked(true)
    setTimeout(() => {
      setClicked(false)
    }, 1000)
  }
  return (
    <div class="relative ml-auto mr-8px z-1">
      <div
        class="absolute -top-120% -translate-x-50% left-50% op-0 select-none"
        classList={{ 'animate-fade-out op-1': clicked() }}
      >
        Copied!
      </div>
      <svg
        cursor="pointer"
        t="1673688699919"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5514"
        width={props.width ? props.width : '200'}
        height={props.height ? props.height : '200'}
        onClick={onClick}
      >
        <path
          d="M864 736C846.336 736 832 721.664 832 704L832 160 352 160C334.32 160 320 145.664 320 128 320 110.336 334.32 96 352 96L832 96C867.344 96 896 124.656 896 160L896 704C896 721.664 881.68 736 864 736ZM704 352 704 864C704 899.344 675.344 928 640 928L192 928C156.656 928 128 899.344 128 864L128 352C128 316.656 156.656 288 192 288L640 288C675.344 288 704 316.656 704 352ZM192 864 640 864 640 352 192 352 192 864Z"
          p-id="5515"
          fill="#66ff99"
        ></path>
      </svg>
    </div>
  )
}

export default CopyIcon

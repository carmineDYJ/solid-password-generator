import { mergeProps } from 'solid-js'

function Checkbox(props) {
  return (
    <div onClick={props.onClick} class={`checkbox ${props.class}`}>
      <div class="checked" classList={{ invisible: !props.passwordOption }}></div>
    </div>
  )
}

export default Checkbox

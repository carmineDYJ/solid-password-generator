import { For } from 'solid-js'
import Checkbox from './Checkbox'

function PasswordOptions(props) {
  return (
    <For each={Object.keys(props.passwordOptions)}>
      {(option, i) => (
        <div class="flex items-center mb-12px">
          <Checkbox
            class="sm:me-6px md:me-12px"
            onClick={() => {
              let optionCanDisable = false
              for (const key of Object.keys(props.passwordOptions)) {
                if (key === option) continue
                if (props.passwordOptions[key]) {
                  optionCanDisable = true
                  break
                }
              }
              if (!optionCanDisable && props.passwordOptions[option]) return
              props.setPasswordOptions({ ...props.passwordOptions, [option]: !props.passwordOptions[option] })
              localStorage.setItem(option, props.passwordOptions[option])
            }}
            passwordOption={props.passwordOptions[option]}
          />
          {props.passwordOptionHints[i()]}
        </div>
      )}
    </For>
  )
}

export default PasswordOptions

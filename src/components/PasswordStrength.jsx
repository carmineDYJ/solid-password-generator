function PasswordStrength(props) {
  return (
    <div class="flex items-center bg-lgGray sm:p-16px md:p-24px">
      <div>STRENGTH</div>
      <For each={new Array(props.maxPasswordStrength)}>
        {(strength, i) => {
          return (
            <Switch
              fallback={
                <div
                  class="w-12px h-30px b-3px b-solid b-main"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              }
            >
              <Match when={props.passwordStrength === 1 && i() < 1}>
                <div
                  class="w-12px h-30px b-3px b-solid b-red bg-red"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              </Match>
              <Match when={props.passwordStrength === 2 && i() < 2}>
                <div
                  class="w-12px h-30px b-3px b-solid b-orange bg-orange"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              </Match>
              <Match when={props.passwordStrength === 3 && i() < 3}>
                <div
                  class="w-12px h-30px b-3px b-solid b-yellow bg-yellow"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              </Match>
              <Match when={props.passwordStrength === 4 && i() < 4}>
                <div
                  class="w-12px h-30px b-3px b-solid b-green bg-green"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              </Match>
            </Switch>
          )
        }}
      </For>
    </div>
  )
}

export default PasswordStrength

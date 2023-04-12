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
                  b="3px solid main"
                  class="w-12px h-30px"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              }
            >
              <Match when={props.passwordStrength === 1 && i() < 1}>
                <div
                  b="none"
                  bg="red"
                  class="w-12px h-30px"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              </Match>
              <Match when={props.passwordStrength === 2 && i() < 2}>
                <div
                  b="none"
                  bg="orange"
                  class="w-12px h-30px"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              </Match>
              <Match when={props.passwordStrength === 3 && i() < 3}>
                <div
                  b="none"
                  bg="yellow"
                  class="w-12px h-30px"
                  classList={{ 'ml-auto': i() === 0, 'ml-6px': i() > 0 }}
                ></div>
              </Match>
              <Match when={props.passwordStrength === 4 && i() < 4}>
                <div
                  b="none"
                  bg="green"
                  class="w-12px h-30px"
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

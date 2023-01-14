function passwordGenerate(options, length) {
  const pattern = '[a-zA-Z0-9~@#$%^&_+\\-\\*/=.!?:;()]'
  let password = ''
  while (password.length < length) {
    const UTF16Char = String.fromCharCode(crypto.getRandomValues(new Uint8Array(1))[0])
    if (UTF16Char.match(pattern)) {
      password += UTF16Char
    }
  }
  return password
}

export default passwordGenerate

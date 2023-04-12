const patterns = {
  lowercaseIncluded: '[a-z]',
  uppercaseIncluded: '[A-Z]',
  numberIncluded: '[0-9]',
  signalIncluded: '[~@#$%^&_+\\-\\*/=.!?:;()]',
}
const strength = {
  lowercaseIncluded: 0,
  uppercaseIncluded: 0,
  numberIncluded: 0,
  signalIncluded: 0,
}

function passwordGenerate(options, length) {
  let password = ''
  while (password.length < length) {
    const UTF16Char = String.fromCharCode(crypto.getRandomValues(new Uint8Array(1))[0])
    // check if UTF16Char match all patterns in patterns
    for (const key in patterns) {
      if (!options[key]) continue
      if (UTF16Char.match(patterns[key])) {
        password += UTF16Char
        strength[key] = 1
      }
    }
  }
  const passwordStrength = Object.values(strength).reduce((a, b) => a + b, 0)
  for (const key in strength) {
    strength[key] = 0
  }
  return { password, passwordStrength }
}

export default passwordGenerate

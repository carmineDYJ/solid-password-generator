function passwordGenerate(options, length) {
  const patterns = {
    lowercaseIncluded: '[a-z]',
    uppercaseIncluded: '[A-Z]',
    numberIncluded: '[0-9]',
    signalIncluded: '[~@#$%^&_+\\-\\*/=.!?:;()]',
  }
  const pattern = '[a-zA-Z0-9~@#$%^&_+\\-\\*/=.!?:;()]'
  Object.keys(options).forEach((key) => {
    if (!options[key]) {
      delete patterns[key]
    }
  })
  let password = ''
  while (password.length < length) {
    const UTF16Char = String.fromCharCode(crypto.getRandomValues(new Uint8Array(1))[0])
    // check if UTF16Char match all patterns in patterns
    const matchPattern = (pattern) => UTF16Char.match(pattern)
    if (Object.values(patterns).some(matchPattern)) {
      password += UTF16Char
    }
  }
  return password
}

export default passwordGenerate

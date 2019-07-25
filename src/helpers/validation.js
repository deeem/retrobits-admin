export const validateInput = (value, rules) => {
  let isValid = true
  if (!rules) {
    return true
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
  }

  return isValid
}

export const validateForm = validation => {
  let formIsValid = true
  for (let inputName in validation) {
    formIsValid = validation[inputName].valid && formIsValid
  }

  return formIsValid
}

export const hasError = inputValidationObject => {
  return inputValidationObject.touched
    ? inputValidationObject.valid
      ? false
      : true
    : false
}

export const validate = {
  required: value => value.trim() !== '',
  min: (value, minLength) => value.length >= minLength,
  max: (value, maxLength) => value.length <= maxLength,
}

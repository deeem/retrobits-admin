export const validate = {
  required: value => value.trim() !== '',
  min: (value, minLength) => value.length >= minLength,
  max: (value, maxLength) => value.length <= maxLength,
}

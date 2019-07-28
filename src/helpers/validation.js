export const validate = {
  required: value => value.trim() !== '',
  min: (value, minLength) => value.length >= minLength,
  max: (value, maxLength) => value.length <= maxLength,
  email: value =>
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      value,
    ),
}

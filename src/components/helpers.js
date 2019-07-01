export const extractPageParamFromUrl = url => {
  if (url) {
    return new URL(url).searchParams.get('page')
  }

  return url
}

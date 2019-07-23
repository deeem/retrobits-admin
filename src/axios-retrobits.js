import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export default instance

export const extractPageParamFromUrl = url => {
  return url ? new URL(url).searchParams.get('page') : url
}

export const fetchPaginated = async (url, params) => {
  try {
    const response = await instance.get(url, {
      params: params,
    })

    return {
      data: response.data.data,
      pagination: {
        count: response.data.meta.total,
        page: response.data.meta.current_page,
        rowsPerPage: response.data.meta.per_page,
        last_page: response.data.meta.last_page,
        first: extractPageParamFromUrl(response.data.links.first),
        last: extractPageParamFromUrl(response.data.links.last),
        next: extractPageParamFromUrl(response.data.links.next),
        prev: extractPageParamFromUrl(response.data.links.prev),
      },
    }
  } catch (error) {
    console.log(error)
  }
}

export const shouldFetch = (prev, current) => {
  for (var param in prev) {
    if (prev[param] !== undefined && prev[param] !== current[param]) {
      return true
    }
  }

  return false
}

export const updateParams = (prev = {}, next = {}, resetPage = true) => {
  return resetPage ? { ...prev, ...next, page: 1 } : { ...prev, ...next }
}

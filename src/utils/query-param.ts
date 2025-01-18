export const parseURLSearchParams = (data: Record<string, unknown>): URLSearchParams => {
  const filteredData = Object.fromEntries(Object.entries(data).filter((kv) => !!kv[1]))
  const searchParams = new URLSearchParams()
  Object.entries(filteredData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(`${key}[]`, v.toString()))
      return
    }
    searchParams.append(key, (value as string | number).toString())
  })

  return searchParams
}

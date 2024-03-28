import { useCallback, useMemo, useState } from "react"
import Fuse from "fuse.js"
import { debounce } from "throttle-debounce"

export const useFuse = (list, options) => {
  const [query, updateQuery] = useState("")

  const fuse = useMemo(() => new Fuse(list, options), [list, options])

  // memoize results whenever the query or options change
  const hits = useMemo(() => fuse.search(query), [fuse, query])

  const setQuery = useCallback(debounce(100, updateQuery), [])

  const onSearch = useCallback(
    (e) => setQuery(e.target.value.trim()),
    [setQuery]
  )

  return {
    hits,
    onSearch,
    query,
    setQuery,
  }
}

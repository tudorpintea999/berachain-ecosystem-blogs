import { useCallback, useMemo, useState } from "react"
import Fuse from "fuse.js"
import { debounce } from "throttle-debounce"

export const useFuse = (list, options) => {
  const [query, updateQuery] = useState("")

  // removing custom options from Fuse options object

  const fuse = useMemo(() => new Fuse(list, options), [list, options])

  // memoize results whenever the query or options change
  const hits = useMemo(() => fuse.search(query), [fuse, query])

  // debounce updateQuery and rename it `setQuery` so it's transparent
  const setQuery = useCallback(debounce(100, updateQuery), [])

  // pass a handling helper to speed up implementation
  const onSearch = useCallback(
    (e) => setQuery(e.target.value.trim()),
    [setQuery]
  )

  console.log(query, hits, fuse, "??????")

  return {
    hits,
    onSearch,
    query,
    setQuery,
  }
}

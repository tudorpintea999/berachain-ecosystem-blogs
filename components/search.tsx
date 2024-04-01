"use client"

import Link from "next/link"
import * as Popover from "@radix-ui/react-popover"
import type { PostOrPage } from "@tryghost/content-api"
import searchData from "data/search.json"
import { Search as SearchIcon } from "lucide-react"

import { useFuse } from "@/hooks/use-fuse"

const fuseOptions = {
  isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["title", "html", "slug", "authors.name", "excerpt"],
}

function Search() {
  const { hits, onSearch } = useFuse(searchData, fuseOptions)

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="cursor-pointer outline-none" aria-label="Search">
          <SearchIcon />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[480px] rounded bg-white p-2 will-change-[transform,opacity] dark:bg-black"
          sideOffset={5}
        >
          <div className="my-2">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search bar{" "}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                onKeyUp={onSearch}
                onChange={onSearch}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Start searching here ..."
                required
              />
            </div>
          </div>

          {hits.length > 0
            ? hits.map((res) => {
                const item = res.item as PostOrPage
                return (
                  <div key={item.uuid} className="my-3">
                    <div className="my-2 rounded-md border py-2 text-muted-foreground">
                      <Link
                        href={`blog/${item.slug}`}
                        className="relative inline-flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                )
              })
            : " "}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default Search

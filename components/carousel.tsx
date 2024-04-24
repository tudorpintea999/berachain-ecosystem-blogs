"use client"

import Image from "next/image"
import Link from "next/link"
import { Post } from "@/types"
import { Carousel, type CustomFlowbiteTheme } from "flowbite-react"

import { formatDate } from "@/lib/utils"

import { Icons } from "./icons"

interface BlogHighlightCarouselProps {
  topPosts: Post[]
}

const customTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "flex flex-col items-center justify-center md:h-[360px] w-full gap-8 relative",
    leftControl:
      "hidden transform left-0 -translate-x-3/4 bottom-1/2 focus:outline-none ", //absolute
    rightControl:
      "hidden right-0 translate-x-3/4 bottom-1/2 focus:outline-none", //absolute
  },
  indicators: {
    active: {
      off: "bg-black/50 hover:bg-gray/50 dark:bg-gray-800 dark:hover:bg-muted-foreground h-2.5 w-2.5",
      on: "bg-foreground dark:bg-gray",
    },
    base: "h-3 w-3 rounded-full",
    wrapper: "flex items-center justify-center gap-2 bottom-4",
  },
  item: {
    base: "relative flex w-full h-full",
    wrapper: {
      off: "w-full h-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full h-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex snap-mandatory overflow-y-hidden scroll-smooth w-full",
    snap: "snap-x",
  },
}

const leftControl = (
  <button className="outline-border hover:bg-muted dark:outline-muted-foreground rounded-full p-4 outline">
    <Icons.chevronLeft />
  </button>
)
const rightControl = (
  <button className="outline-border hover:bg-muted dark:outline-muted-foreground rounded-full p-4 outline">
    <Icons.chevronRight />
  </button>
)

export default function BlogHighlightCarousel({
  topPosts,
}: BlogHighlightCarouselProps) {
  return (
    <div className="max-w-8xl container py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
            Featured
          </h1>
        </div>
      </div>
      <hr className="my-8" />

      <div className="flex h-full">
        <Carousel
          leftControl={leftControl}
          rightControl={rightControl}
          indicators={topPosts.length > 1}
          pauseOnHover
          theme={customTheme}
        >
          {topPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`}>
              <div
                key={index}
                className="grid grid-rows-2 gap-12 px-4 md:grid-cols-2 md:grid-rows-1"
              >
                <div className="border-border flex h-full w-full items-center overflow-hidden rounded-xl border-2">
                  <Image
                    src={post.feature_image}
                    height={400}
                    width={600}
                    alt="..."
                    className="h-full w-full rounded-xl object-cover object-left"
                  />
                </div>
                <div className="h-full w-full flex-1 flex-col items-start justify-start p-4">
                  <div className="text-md text-muted-foreground">
                    {formatDate(post.published_at)}
                  </div>

                  <div className="flex text-3xl font-extrabold xl:text-4xl">
                    {post.title}
                  </div>
                  {/* <div className="before:bg-gradient-to-gray before:to-gray flex h-full overflow-hidden py-4 before:absolute before:inset-0 before:from-transparent before:content-['']">
                  <p className="z-10 flex">{post.excerpt}</p>
                </div> */}
                  {post.authors?.length ? (
                    <div className="flex space-x-4 py-4">
                      {post.authors.map((author) =>
                        author ? (
                          <div
                            key={author.id}
                            className="flex items-center gap-4 space-x-2 text-sm"
                          >
                            {author?.profile_image ? (
                              <Image
                                src={author?.profile_image ?? "/avatar.png"}
                                alt={author?.name}
                                width={36}
                                height={36}
                                className="rounded-full bg-white"
                              />
                            ) : (
                              <Icons.user className="h-8 w-8 rounded-full bg-white" />
                            )}
                            <div className="flex-1 text-left leading-tight">
                              <div className="mb-0 text-[12px] font-medium">
                                {author.name}
                              </div>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

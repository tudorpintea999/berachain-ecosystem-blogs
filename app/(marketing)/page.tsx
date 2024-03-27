import Image from "next/image"
import Link from "next/link"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import { getPosts } from "@/app/api/getPosts"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = await getPosts().then((res) => {
    return res
      .filter((post) => post.visibility === "public")
      .sort((a, b) => {
        return compareDesc(new Date(a.published_at), new Date(b.published_at))
      })
  })

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A place for everything Berachain.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group relative flex flex-col space-y-2 overflow-hidden"
            >
              {post.feature_image && (
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-lg font-extrabold md:text-2xl">
                {post.title}
              </h2>
              {/* {post.excerpt && (
                <p className="text-muted-foreground">{post.excerpt}</p>
              )} */}
              {post.published_at && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.published_at)}
                </p>
              )}
              <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}

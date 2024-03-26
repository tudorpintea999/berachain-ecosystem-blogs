import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { formatDate } from "@/lib/utils"
import { getPosts } from "@/app/api/getPosts"

interface ReadMoreProps {
  currentPostSlug: string
}

export default async function ReadMore({ currentPostSlug }: ReadMoreProps) {
  const filteredPosts = await getPosts().then((res) => {
    return res.filter((post) => post.slug !== currentPostSlug)
  })

  if (!filteredPosts) {
    notFound()
  }

  return (
    <>
      <div className="w-full px-8 py-6 font-bold lg:py-10">
        <h2>READ MORE</h2>
        <div className="my-2 border-t-2 border-muted xl:border-r-2" />
        <div className="grid gap-10 sm:grid-cols-4">
          {filteredPosts &&
            filteredPosts.slice(0, 4).map((post, index) => (
              <article
                key={post._id}
                className="group relative flex flex-col space-y-2"
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
                <h2 className="text-2xl font-extrabold">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-sm font-normal text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                {post.published_at && (
                  <p className="text-sm font-normal text-muted-foreground">
                    {formatDate(post.published_at)}
                  </p>
                )}
                <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
        </div>
      </div>
    </>
  )
}

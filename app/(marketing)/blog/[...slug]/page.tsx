import { notFound } from "next/navigation"

import "@/styles/post.css"
import "@/styles/mdx.css"
import "@/styles/audio.css"
import "@/styles/blockquote.css"
import "@/styles/bookmark.css"
import "@/styles/button.css"
import "@/styles/callout.css"
import "@/styles/collection.css"
import "@/styles/file.css"
import "@/styles/gallery.css"
import "@/styles/header_v2.css"
import "@/styles/header.css"
import "@/styles/nft.css"
import "@/styles/product.css"
import "@/styles/signup.css"
import "@/styles/toggle.css"
import "@/styles/video.css"
import Image from "next/image"
import Link from "next/link"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { getSinglePost } from "@/app/api/getPosts"

import ReadMore from "../readMore"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getSinglePost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="container relative max-w-3xl py-6 lg:py-10">
        <Link
          href="/blog"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-[-200px] top-14 hidden xl:inline-flex"
          )}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        <div>
          {post.published_at && (
            <time
              dateTime={post.date}
              className="block text-sm text-muted-foreground"
            >
              Published on {formatDate(post.published_at)}
            </time>
          )}
          {post.title ? (
            <h1 className="my-2 inline-block font-heading text-4xl tracking-tight lg:text-5xl">
              {post.title}
            </h1>
          ) : null}

          {post.authors?.length ? (
            <div className="mt-4 flex space-x-4">
              {post.authors.map((author) =>
                author ? (
                  <div
                    key={author.id}
                    className="my-2 flex items-center space-x-2 text-sm"
                  >
                    <div className="flex-1 text-left leading-tight">
                      <p className="font-medium">{author.name}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : null}

          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              width={804}
              height={452}
              className="rounded-md border bg-muted transition-colors"
            />
          ) : null}

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
      <ReadMore currentPostSlug={params.slug[0]} />
    </>
  )
}

import { notFound } from "next/navigation"

import "@/styles/mdx.css"
import Image from "next/image"
import Link from "next/link"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { getSinglePost } from "@/app/api/getPosts"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getSinglePost(params.slug)
  console.log(post.authors, "aaaaa")

  if (!post) {
    notFound()
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
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
        <h1 className="my-2 inline-block font-heading text-4xl tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        <Image
          src={post.feature_image}
          alt={post.title}
          width={804}
          height={452}
          className="rounded-md border bg-muted transition-colors"
        />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </article>
  )
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { getPosts } from "@/app/api/getPosts"

interface Post {
  id: string
  slug: string
  title: string
  feature_image: string
  published_at: string
}

interface ReadMoreProps {
  currentPostSlug: string
}

export default function ReadMore({ currentPostSlug }: ReadMoreProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getPosts()
      .then((res) => {
        const filteredPosts = res.filter(
          (post) => post.slug !== currentPostSlug
        )
        setPosts(filteredPosts)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error)
        setLoading(false)
      })
  }, [currentPostSlug])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!posts.length) {
    return <div>No more posts to read.</div>
  }

  return (
    <>
      <div className="container w-full py-6 font-bold lg:py-10">
        <h2>READ MORE</h2>
        <div className="my-2 border-t-2 border-muted xl:border-r-2" />
        <div className="grid gap-10 sm:grid-cols-4">
          {posts.slice(0, 4).map((post, index) => (
            <article
              key={post.id}
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
              <div className="text-lg font-extrabold md:text-2xl">
                {post.title}
              </div>
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

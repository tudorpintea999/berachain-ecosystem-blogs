"use client"

import { useEffect, useState } from "react"

import { getPosts } from "@/app/api/getPosts"

import BlogCard, { Post } from "./blogCard"

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
            <BlogCard post={post} key={index} />
          ))}
        </div>
      </div>
    </>
  )
}

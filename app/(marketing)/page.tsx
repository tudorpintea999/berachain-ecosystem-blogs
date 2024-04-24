import * as fs from "node:fs"
import { compareDesc } from "date-fns"

import { getPosts } from "@/app/api/getPosts"

import "@/styles/post.css"
import BlogHighlightCarousel from "@/components/carousel"

import BlogPosts from "./blog/blogPosts"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = await getPosts().then((res) => {
    try {
      const jsonString = JSON.stringify(res)

      fs.writeFile("data/search.json", jsonString, "utf8", (err) => {
        if (err) {
          console.log("Error writing file", err)
        } else {
          console.log("Successfully wrote file")
        }
      })
    } catch (error) {
      console.log("error : ", error)
    }
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
    <div className="container">
      <BlogHighlightCarousel topPosts={posts.slice(0, 4)} />
      <BlogPosts posts={posts} />
    </div>
  )
}

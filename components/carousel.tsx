"use client"

import Image from "next/image"
import { Post } from "@/types"
import { Carousel } from "flowbite-react"

interface BlogHighlightCarouselProps {
  topPosts: Post[]
}

export default function BlogHighlightCarousel({
  topPosts,
}: BlogHighlightCarouselProps) {
  return (
    <div className="h-56 px-12 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {topPosts.map((post) => (
          <Image src={post.feature_image} height={400} width={600} alt="..." />
        ))}
      </Carousel>
    </div>
  )
}

import GhostContentAPI from "@tryghost/content-api"

export const ghostApi = new GhostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v5.0",
})

export async function GET(req: Request) {
  try {
    const posts = await ghostApi.posts.browse({
      limit: "all",
      include: "tags,authors",
    })

    return posts
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }
}

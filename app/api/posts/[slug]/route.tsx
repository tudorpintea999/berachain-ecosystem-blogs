import * as z from "zod"

import { ghostApi } from "../route"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
})
export async function GET(context: z.infer<typeof routeContextSchema>) {
  try {
    const post = await ghostApi.posts.read({
      slug: context.params.slug,
      include: "tags,authors",
    })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

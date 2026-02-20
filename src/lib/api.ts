import { ArtworkSchema } from "../schemas/artwork.ts"
import type { Artwork } from "../schemas/artwork.ts"

const BASE_URL = "https://api.artic.edu/api/v1/artworks/search"


//searchfunciton
export async function searchArtworks(query: string): Promise<Artwork[]> {
const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&fields=id,title,artist_title,image_id&limit=100`)
const json = await response.json()

if (!json.data) return []

return json.data
    .map((item: unknown) => {
    const parsed = ArtworkSchema.safeParse(item)
    return parsed.success ? parsed.data : null
    })
    .filter(Boolean) as Artwork[]
}

// recommended
export async function getRandomArtworks(count = 3): Promise<Artwork[]> {
const all = await searchArtworks("")
if (!all.length) return []

// shuffle array
const shuffled = all.sort(() => 0.5 - Math.random())
return shuffled.slice(0, count)
}
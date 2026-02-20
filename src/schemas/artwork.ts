import { z } from "zod"


export const ArtworkSchema = z.object({
id: z.number(),

title: z.string().default("Untitled"),

artist_title: z
    .string()
    .nullable()
    .transform((val) => val ?? "Unknown Artist"),
image_id: z.string().nullable(),
note: z.string().max(200).optional(),
})

export type Artwork = z.infer<typeof ArtworkSchema>


export const NoteSchema = z
.string()
.min(1)
.max(200)


export const SavedArtworkSchema = ArtworkSchema.extend({
note: NoteSchema.optional(),
})

export type SavedArtwork = z.infer<typeof SavedArtworkSchema>
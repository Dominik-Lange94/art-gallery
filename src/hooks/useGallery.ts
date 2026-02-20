import { useState, useEffect } from "react"
import type { Artwork } from "../schemas/artwork"

interface SavedArtwork extends Artwork {
note?: string
}

export function useGallery() {
const [gallery, setGallery] = useState<SavedArtwork[]>([])

useEffect(() => {
    const stored = localStorage.getItem("gallery")
    if (stored) setGallery(JSON.parse(stored))
}, [])

useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(gallery))
}, [gallery])

function addToGallery(artwork: Artwork) {
    setGallery((prev) =>
    prev.find((a) => a.id === artwork.id)
        ? prev
        : [...prev, artwork]
    )
}

function removeFromGallery(id: number) {
    setGallery((prev) => prev.filter((a) => a.id !== id))
}

function updateNote(id: number, note: string) {
    setGallery((prev) =>
    prev.map((a) =>
        a.id === id ? { ...a, note } : a
    )
    )
}

return { gallery, addToGallery, removeFromGallery, updateNote }
}
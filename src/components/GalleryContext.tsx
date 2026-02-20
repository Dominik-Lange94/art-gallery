import { createContext, useContext, useEffect, useState} from "react"
import type { Artwork } from "../schemas/artwork"
import type { ReactNode } from "react"

export interface SavedArtwork extends Artwork {
note?: string
}

interface GalleryContextType {
gallery: SavedArtwork[]
addToGallery: (art: Artwork) => void
removeFromGallery: (id: number) => void
updateNote: (id: number, note: string) => void
}

const GalleryContext = createContext<GalleryContextType | null>(null)

export function GalleryProvider({ children }: { children: ReactNode }) {


// LocalStorage laden
const [gallery, setGallery] = useState<SavedArtwork[]>(() => {
    const stored = localStorage.getItem("gallery")
    return stored ? JSON.parse(stored) : []
})

// LocalStorage speichern
useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(gallery))
}, [gallery])

// Add Artwork
function addToGallery(art: Artwork) {
    setGallery((prev) =>
    prev.find((a) => a.id === art.id)
        ? prev
        : [...prev, { ...art }]
    )
}

// Remove Artwork
function removeFromGallery(id: number) {
    setGallery((prev) => prev.filter((a) => a.id !== id))
}

// Update Note
function updateNote(id: number, note: string) {
    setGallery((prev) =>
    prev.map((a) => (a.id === id ? { ...a, note } : a))
    )
}

return (
    <GalleryContext.Provider value={{ gallery, addToGallery, removeFromGallery, updateNote }}>
    {children}
    </GalleryContext.Provider>
)
}

//  Hook für Komponenten
export function useGallery() {
const context = useContext(GalleryContext)
if (!context) throw new Error("useGallery must be used inside GalleryProvider")
return context
}
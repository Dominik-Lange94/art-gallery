import { useState } from "react"
import type { Artwork } from "../schemas/artwork"
import { useGallery } from "./GalleryContext"

interface Props {
artwork: Artwork
}

export default function ArtworkCard({ artwork }: Props) {
const { gallery, addToGallery, removeFromGallery } = useGallery()
const [isModalOpen, setIsModalOpen] = useState(false)

const isInGallery = gallery.some((a) => a.id === artwork.id)
const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    : null

return (
    <>
    {/* Karte */}
    <div className="border border-gray-700 rounded-lg shadow-lg p-4 bg-gray-800 text-gray-100 flex flex-col items-center">
        {imageUrl && (
        <img
            src={imageUrl}
            alt={artwork.title}
            className="mb-2 rounded cursor-pointer w-64 h-64 object-cover transition duration-400 ease-in-out hover:scale-105"
            onClick={() => setIsModalOpen(true)}
        />
        )}
        <h2 className="font-bold text-lg text-center">{artwork.title}</h2>
        <p className="text-sm text-gray-300 text-center">{artwork.artist_title}</p>

        {isInGallery ? (
        <button
            onClick={() => removeFromGallery(artwork.id)}
            className="mt-2 bg-red-500 hover:bg-red-400 active:bg-red-600 text-white px-4 py-2 rounded font-semibold transition duration-200 ease-in-out hover:scale-105"
        >
            Remove from Gallery
        </button>
        ) : (
        <button
            onClick={() => addToGallery(artwork)}
            className="mt-2 bg-yellow-500 hover:bg-yellow-300 active:bg-yellow-600 text-white px-4 py-2 rounded font-semibold transition duration-200 ease-in-out hover:scale-105"
        >
            Add to Gallery
        </button>
        )}
    </div>

    {/* großes Bild */}
    {isModalOpen && imageUrl && (
        <div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={() => setIsModalOpen(false)}
        >
        <img
            src={imageUrl}
            alt={artwork.title}
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
        />
        </div>
    )}
    </>
)
}
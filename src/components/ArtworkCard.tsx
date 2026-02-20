import { useState, useEffect } from "react"
import { useGallery } from "./GalleryContext"
import type { Artwork } from "../schemas/artwork"

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
const { gallery, addToGallery, removeFromGallery } = useGallery()
const isInGallery = gallery.some(a => a.id === artwork.id)
const [note, setNote] = useState(artwork.note || "")
const [isModalOpen, setIsModalOpen] = useState(false) // <-- Modal state

const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= 200) setNote(value)
}

const saveNote = () => {
    if (!isInGallery) return
    addToGallery({ ...artwork, note })
}

useEffect(() => {
    if (isInGallery) setNote(artwork.note || "")
}, [artwork.note, isInGallery])

const imgSrc = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    : "https://via.placeholder.com/400x400?text=No+Image"

return (
    <div className="bg-gray-800 p-4 rounded shadow">
    {/* Klickbares Bild */}
    <img
        src={imgSrc}
        alt={artwork.title}
        className="w-full h-100 object-cover rounded mb-2 cursor-pointer hover:scale-102 transition duration-400 transform"
        onClick={() => setIsModalOpen(true)}
    />

    <h3 className="text-white font-semibold">{artwork.title}</h3>
    <p className="text-gray-300">{artwork.artist_title}</p>

    {/* Add / Remove Button */}
    <button
        onClick={() =>
        isInGallery ? removeFromGallery(artwork.id) : addToGallery({ ...artwork, note })
        }
        className={`mt-2 px-3 py-1 rounded font-semibold transition transform duration-200 ease-in-out ${
        isInGallery
            ? "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white hover:scale-105"
            : "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-white hover:scale-105"
        }`}
    >
        {isInGallery ? "Remove from Gallery" : "Add to Gallery"}
    </button>

    {/* Note Input */}
    {isInGallery && (
        <div className="mt-2">
        <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Add a note (max 200 chars)"
            className="w-full p-2 rounded bg-gray-700 text-gray-100 resize-none"
        />
        <button
            onClick={saveNote}
            className="mt-1 px-3 py-1 rounded font-semibold bg-blue-600 text-white 
                    hover:bg-blue-500 active:bg-blue-700 transition transform duration-200 ease-in-out hover:scale-105"
        >
            Save Changes
        </button>
        </div>
    )}

    {/* Modal */}
    {isModalOpen && (
        <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={() => setIsModalOpen(false)}
        >
        <img
            src={imgSrc}
            alt={artwork.title}
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
        />
        </div>
    )}
    </div>
)
}
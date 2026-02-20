import { useState, useEffect } from "react"
import { searchArtworks, getRandomArtworks } from "../lib/api"
import type { Artwork } from "../schemas/artwork"
import ArtworkCard from "./ArtworkCard"

export default function Search() {
const [query, setQuery] = useState("")
const [results, setResults] = useState<Artwork[]>([])
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 9

// Slice für aktuelle Seite
const currentResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
)

// Suche ausführen
async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const data = await searchArtworks(query)
    setResults(data)
    setCurrentPage(1)
}

// Recommend 
async function recommendArt() {
    const data = await getRandomArtworks(9)

    setResults(data)
}

// Reset Page 
useEffect(() => {
    setCurrentPage(1)
}, [results])

return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
        className="border border-gray-600 bg-gray-800 text-gray-100 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artworks..."
        />
        <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 transition hover:scale-105 duration-200 ease-in-out"
        >
        Search
        </button>
        <button
        type="button"
        onClick={recommendArt}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition hover:scale-105 duration-200 ease-in-out"
        >
        Recommend Art
        </button>
    </form>

    {/* Grid */}
    <div className="grid grid-cols-3 gap-6 mt-6">
        {currentResults.map((art) => (
        <ArtworkCard key={art.id} artwork={art} />
        ))}
    </div>

    {/* Pages */}
    {results.length > itemsPerPage && (
        <div className="flex gap-2 mt-6 justify-center">
        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 hover:scale-105 duration-200 ease-in-out"
        >
            Previous
        </button>
        <span className="px-3 py-1">
            Page {currentPage} / {Math.ceil(results.length / itemsPerPage)}
        </span>
        <button
            disabled={currentPage * itemsPerPage >= results.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 hover:scale-105 duration-200 ease-in-out"
        >
            Next
        </button>
        </div>
    )}
    </div>
)
}
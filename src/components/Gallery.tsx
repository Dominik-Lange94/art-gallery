import { useGallery } from "./GalleryContext"
import ArtworkCard from "./ArtworkCard"

export default function Gallery() {
const { gallery } = useGallery()

if (gallery.length === 0)
    return <p className="px-6 text-gray-500">No artworks in your gallery yet.</p>

return (
    <div className="grid grid-cols-3 gap-6 p-6">
    {gallery.map((art) => (
        <ArtworkCard key={art.id} artwork={art} />
    ))}
    </div>
)
}
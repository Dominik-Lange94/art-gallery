import { NavLink } from "react-router-dom"

export default function Navbar() {
return (
    <nav className="bg-gray-800 text-gray-100 px-6 py-4 flex items-center justify-between">
    <h1 className="text-2xl font-bold">Art Explorer</h1>
    <div className="flex gap-4">
        <NavLink
        to="/search"
        className={({ isActive }) =>
            isActive
            ? "font-semibold underline"
            : "hover:underline"
        }
        >
        Search
        </NavLink>
        <NavLink
        to="/gallery"
        className={({ isActive }) =>
            isActive
            ? "font-semibold underline"
            : "hover:underline"
        }
        >
        Gallery
        </NavLink>
    </div>
    </nav>
)
}
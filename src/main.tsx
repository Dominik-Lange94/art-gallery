import { GalleryProvider } from "./components/GalleryContext"
import App from "./App"
import ReactDOM from "react-dom/client"
import React from "react"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GalleryProvider>
      <App />
    </GalleryProvider>
  </React.StrictMode>
)
# Art Gallery

A small frontend project built with **TypeScript**, **React**, **Zod**, and **Tailwind CSS**.  

The app allows users to search for artworks, view details, and save their favorite pieces in a personal gallery. It uses the **Art Institute of Chicago API** for fetching artwork data.

## Features

- **Search Artworks**: Users can search for artworks by keyword.
- **Recommend Art**: Display random artworks with each click.
- **Artwork Cards**: Shows image, title, and artist. Clickable images open in a modal.
- **Personal Gallery**: Add or remove artworks to a gallery stored in localStorage.
- **Notes**: Users can add short notes per artwork.
- **Pagination**: Search results are displayed in pages (9 artworks per page).
- **Dark Design**: The UI uses a dark theme for better readability.

## Technologies Used

- [React](https://reactjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Zod](https://github.com/colinhacks/zod) (schema validation)  
- Art Institute of Chicago API

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/art-gallery.git
cd art-gallery
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at http://localhost:5173 (or the URL printed in the terminal).

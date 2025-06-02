# Anni's Wardrobe

A modern digital wardrobe app built with Next.js, Convex, and Convex Auth.

## Overview

Anni's Wardrobe lets you manage your clothing items, organize your digital closet, and trade items with others. Authentication is handled via Convex Auth (Google sign-in). The backend is made with Convex for real-time data and file storage.

## Features

- User authentication (Google, via Convex Auth)
- Add, edit, and delete clothing items with images
- Organize wardrobe by category, size, color, and more
- Mark items as available for trade
- View and manage your profile
- Responsive, modern UI with Tailwind CSS and Shadcn UI

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS, Shadcn UI
- Backend: Convex (database, file storage, serverless functions)
- Auth: Convex Auth (Google OAuth)

## Getting Started

Install dependencies:

```sh
npm install
```

Set up environment variables:

```sh
cp .env.local.example .env.local
```

Start the development servers:

```sh
npm run dev
```

This runs both the Next.js frontend and Convex backend locally.

Open the app:

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Links

- [Convex Docs](https://docs.convex.dev/)
- [Convex Auth Docs](https://docs.convex.dev/auth)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## License
This project is for educational/demo purposes.

# AERON TERMOSISTEM

> Professional construction & renovation services website — Roman, Neamț County, Romania.

**Live:** [aerontermosistem.vercel.app](https://aerontermosistem.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | CSS (custom) + Tailwind CSS |
| Database | MongoDB Atlas + Mongoose |
| Image Storage | Cloudinary |
| Deployment | Vercel |

---

## Features

- Responsive landing page (Hero, Services, About, Gallery, Contact)
- Gallery with lightbox — images loaded dynamically from MongoDB
- Contact form — messages saved to MongoDB Atlas
- **Admin panel** at `/admin` — upload images directly (Cloudinary + MongoDB)
- Password-protected admin with cookie-based auth
- Middleware route protection

---

## Project Structure

```
aerontermosistem/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Main landing page
│   │   ├── layout.tsx                # Root layout + SEO metadata
│   │   ├── globals.css               # Global styles
│   │   ├── admin/
│   │   │   ├── page.tsx              # Admin dashboard (upload / delete images)
│   │   │   └── login/page.tsx        # Admin login page
│   │   └── api/
│   │       ├── contact/route.ts      # POST — save contact message to MongoDB
│   │       ├── imagini/route.ts      # GET — fetch gallery images from MongoDB
│   │       ├── imagini/[id]/route.ts # DELETE — remove image
│   │       ├── admin/login/route.ts  # POST/DELETE — admin auth cookie
│   │       └── admin/upload/route.ts # POST — upload to Cloudinary + save URL to MongoDB
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Servicii.tsx
│   │   ├── Despre.tsx
│   │   ├── Galerie.tsx               # Gallery grid + lightbox
│   │   ├── Contact.tsx               # Contact form
│   │   └── Footer.tsx
│   ├── models/
│   │   ├── Imagine.ts                # Mongoose schema — gallery image
│   │   └── Mesaj.ts                  # Mongoose schema — contact message
│   ├── lib/
│   │   └── mongodb.ts                # MongoDB connection (cached)
│   └── middleware.ts                 # Protects /admin routes
├── public/
│   └── images/                       # Static fallback images
├── .env.local.example                # Environment variables template
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Admin Panel

Navigate to `/admin` — authenticate with the password from `.env.local`.

- Upload an image → uploaded to **Cloudinary** → URL saved in **MongoDB**
- Delete images from the gallery
- Gallery on the main site updates automatically

---

---

# AERON TERMOSISTEM — Romana

> Site web pentru servicii de constructii si renovari — Roman, Judetul Neamt.

**Live:** [aerontermosistem.vercel.app](https://aerontermosistem.vercel.app)

---

## Tehnologii folosite

| Strat | Tehnologie |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Limbaj | TypeScript |
| Stilizare | CSS custom + Tailwind CSS |
| Baza de date | MongoDB Atlas + Mongoose |
| Stocare imagini | Cloudinary |
| Hosting | Vercel |

---

## Functionalitati

- Pagina de prezentare responsive (Hero, Servicii, Despre, Galerie, Contact)
- Galerie cu lightbox — imagini incarcate dinamic din MongoDB
- Formular de contact — mesajele se salveaza in MongoDB Atlas
- **Panou de admin** la `/admin` — upload imagini direct din browser
- Autentificare cu parola protejata prin cookie
- Protectie rute prin middleware

---

## Structura proiectului

```
aerontermosistem/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Pagina principala
│   │   ├── layout.tsx                # Layout de baza + metadata SEO
│   │   ├── globals.css               # Stiluri globale
│   │   ├── admin/
│   │   │   ├── page.tsx              # Dashboard admin (upload / stergere imagini)
│   │   │   └── login/page.tsx        # Pagina de login admin
│   │   └── api/
│   │       ├── contact/route.ts      # POST — salveaza mesaj de contact in MongoDB
│   │       ├── imagini/route.ts      # GET — returneaza imaginile din MongoDB
│   │       ├── imagini/[id]/route.ts # DELETE — sterge o imagine
│   │       ├── admin/login/route.ts  # POST/DELETE — cookie autentificare admin
│   │       └── admin/upload/route.ts # POST — upload pe Cloudinary + salveaza URL in MongoDB
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Servicii.tsx
│   │   ├── Despre.tsx
│   │   ├── Galerie.tsx               # Grila galerie + lightbox
│   │   ├── Contact.tsx               # Formular de contact
│   │   └── Footer.tsx
│   ├── models/
│   │   ├── Imagine.ts                # Schema Mongoose — imagine galerie
│   │   └── Mesaj.ts                  # Schema Mongoose — mesaj contact
│   ├── lib/
│   │   └── mongodb.ts                # Conexiune MongoDB (cu cache)
│   └── middleware.ts                 # Protejeaza rutele /admin
├── public/
│   └── images/                       # Imagini statice locale
├── .env.local.example                # Template variabile de mediu
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Panou Admin

Mergi la `/admin` — autentificare cu parola din `.env.local`.

- Incarci o poza → se urca pe **Cloudinary** → URL-ul se salveaza in **MongoDB**
- Stergi imagini din galerie
- Galeria de pe site se actualizeaza automat

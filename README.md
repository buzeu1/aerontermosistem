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

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/buzeu1/aerontermosistem.git
cd aerontermosistem
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/aerontermosistem?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_PASSWORD=your_secure_password
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy

Push to `main` — Vercel auto-deploys.
Add all environment variables in **Vercel → Settings → Environment Variables**.

---

## Admin Panel

Navigate to `/admin` (password-protected).

- Upload images — they go to **Cloudinary** and the URL is saved in **MongoDB**
- Delete images from the gallery
- Gallery on the main site updates automatically

---

---

# AERON TERMOSISTEM — Documentație în Română

> Site web pentru servicii de construcții și renovări — Roman, Județul Neamț.

**Live:** [aerontermosistem.vercel.app](https://aerontermosistem.vercel.app)

---

## Tehnologii folosite

| Strat | Tehnologie |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
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

## Pornire locala

```bash
git clone https://github.com/buzeu1/aerontermosistem.git
cd aerontermosistem
npm install
cp .env.local.example .env.local
# Completeaza .env.local cu datele tale
npm run dev
```

---

## Panou Admin

Mergi la `/admin` → autentificare cu parola din `.env.local`.

- Incarci o poza → se urca pe **Cloudinary** → URL-ul se salveaza in **MongoDB**
- Stergi imagini din galerie
- Galeria de pe site se actualizeaza automat

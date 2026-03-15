# AERON TERMOSISTEM - Site Next.js + TypeScript + MongoDB

## 🚀 Pași pentru a porni proiectul

### 1. Instalează dependențele
```bash
npm install
```

### 2. Configurează MongoDB
- Mergi pe https://cloud.mongodb.com
- Creează cont gratuit → New Project → Create Deployment (M0 Free)
- În Cluster → Connect → Drivers → copiază connection string
- Redenumește `.env.local.example` în `.env.local`
- Înlocuiește `USERNAME:PAROLA` și `cluster0.xxxxx` cu datele tale reale

### 3. Adaugă pozele
- Pune pozele în folderul `public/images/`
- Numește-le: `lucrare1.jpg`, `lucrare2.jpg`, ..., `lucrare18.jpg`
- SAU adaugă-le în MongoDB prin interfața Atlas (pentru URL-uri externe)

### 4. Pornește serverul de development
```bash
npm run dev
```
Deschide http://localhost:3000

### 5. Deploy pe Vercel
```bash
# Prima dată
npx vercel

# Actualizări ulterioare
npx vercel --prod
```
Nu uita să adaugi `MONGODB_URI` în Vercel → Settings → Environment Variables!

---

## 📁 Structura proiectului
```
src/
├── app/
│   ├── page.tsx              ← Pagina principală
│   ├── layout.tsx            ← HTML de bază + meta tags
│   ├── globals.css           ← Toate stilurile CSS
│   └── api/
│       ├── contact/route.ts  ← Primeste mesaje → MongoDB
│       └── imagini/route.ts  ← Returneaza poze din MongoDB
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Servicii.tsx
│   ├── Despre.tsx
│   ├── Galerie.tsx           ← Galerie cu lightbox
│   ├── Contact.tsx           ← Formular → salvat în MongoDB
│   └── Footer.tsx
├── models/
│   ├── Mesaj.ts              ← Schema mesaje MongoDB
│   └── Imagine.ts            ← Schema imagini MongoDB
└── lib/
    └── mongodb.ts            ← Conexiunea la MongoDB
```

---

## 💡 Cum adaugi o poza noua in MongoDB (optional)
Trimite un POST request la `/api/imagini`:
```json
{
  "titlu": "Lucrare noua",
  "url": "https://link-spre-poza.jpg",
  "altText": "Descriere poza",
  "ordine": 19
}
```
Sau foloseste MongoDB Atlas UI direct.

---

## 📬 Unde gasesti mesajele din formular?
- **MongoDB Atlas** → Collections → `mesajs`
- SAU acceseaza `GET /api/contact` în browser când ești în development

import mongoose, { Document, Schema, Model } from 'mongoose'

// Interfata TypeScript - definim cum arata o imagine din galerie
export interface IImagine extends Document {
  titlu: string
  url: string       // URL-ul pozei (Cloudinary, sau /images/lucrare1.jpg)
  altText: string   // Text alternativ pentru accesibilitate
  ordine: number    // Ordinea in galerie
  activa: boolean   // Daca se afiseaza sau nu
  dataAdaugare: Date
}

const ImagineSchema = new Schema<IImagine>(
  {
    titlu: {
      type: String,
      required: [true, 'Titlul este obligatoriu'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'URL-ul este obligatoriu'],
    },
    altText: {
      type: String,
      default: 'Lucrare AERON TERMOSISTEM',
    },
    ordine: {
      type: Number,
      default: 0,
    },
    activa: {
      type: Boolean,
      default: true,
    },
    dataAdaugare: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Sortam implicit dupa ordine
ImagineSchema.index({ ordine: 1 })

const Imagine: Model<IImagine> =
  mongoose.models.Imagine || mongoose.model<IImagine>('Imagine', ImagineSchema)

export default Imagine

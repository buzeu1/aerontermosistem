import mongoose, { Document, Schema, Model } from 'mongoose'

// Interfata TypeScript - definim cum arata un mesaj
export interface IMesaj extends Document {
  nume: string
  email: string
  telefon: string
  mesaj: string
  dataTrimiteri: Date
  citit: boolean
}

const MesajSchema = new Schema<IMesaj>(
  {
    nume: {
      type: String,
      required: [true, 'Numele este obligatoriu'],
      trim: true,
      maxlength: [100, 'Numele nu poate depasi 100 caractere'],
    },
    email: {
      type: String,
      required: [true, 'Email-ul este obligatoriu'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalid'],
    },
    telefon: {
      type: String,
      required: [true, 'Telefonul este obligatoriu'],
      trim: true,
    },
    mesaj: {
      type: String,
      required: [true, 'Mesajul este obligatoriu'],
      maxlength: [2000, 'Mesajul nu poate depasi 2000 caractere'],
    },
    dataTrimiteri: {
      type: Date,
      default: Date.now,
    },
    citit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adauga automat createdAt si updatedAt
  }
)

// Verificam daca modelul exista deja (pentru hot reload in dev)
const Mesaj: Model<IMesaj> =
  mongoose.models.Mesaj || mongoose.model<IMesaj>('Mesaj', MesajSchema)

export default Mesaj

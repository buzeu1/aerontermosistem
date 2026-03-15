import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error(
    'Lipseste MONGODB_URI din .env.local! Citeste .env.local.example'
  )
}

// Pastram conexiunea intre request-uri ca sa nu facem 1000 de conexiuni
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache
}

let cached: MongooseCache = global.mongooseCache

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null }
}

export async function connectDB(): Promise<typeof mongoose> {
  // Daca suntem deja conectati, returnam conexiunea existenta
  if (cached.conn) {
    return cached.conn
  }

  // Daca nu avem o promisiune in curs, cream una
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

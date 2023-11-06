import mongoose, { type ConnectOptions } from 'mongoose'

export async function connectToDB(): Promise<void> {
    const Options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    try {
        await mongoose.connect(
            process.env.MONGO_URI + process.env.DATABASE_NAME!,
            Options as ConnectOptions
        )
        console.log('Database Connected')
    } catch (error: any) {
        console.log('Database Connection Failed: ', error.message)
        process.exit(1)
    }
}

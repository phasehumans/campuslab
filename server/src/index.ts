import { app } from './app.js'
import { ensureSeedData } from './shared/bootstrap.js'

const PORT = Number(process.env.PORT) || 3000

const startServer = async () => {
    await ensureSeedData()

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://0.0.0.0:${PORT}`)
    })
}

startServer().catch((error) => {
    console.error('Failed to start server', error)
    process.exit(1)
})

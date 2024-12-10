import express from 'express'
import bodyParser from 'body-parser'
import homeRoutes from './routes/home.js'
import historyRoutes from './routes/history.js'
import citiesRoutes from './routes/cities.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'https://mayapan-sm.vercel.app',
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/home', homeRoutes)
app.use('/history', historyRoutes)
app.use('/cities', citiesRoutes)
app.use('/assets', express.static(path.join(__dirname, '/assets')))

app.get('/', (req, res) => {
  const homePageContent = `
        <html>
            <head>
                <title>Homepage</title>
            </head>
            <body>
                <p>This is the homepage. Start to use this API here:</p>
                <ul>
                <li>
                    <a href="">Home Data</a>
                </li>
                <li>
                    <a href="">History Data</a>
                </li>
                <li>
                    <a href="">Cities Data</a>
                </li>
                </ul>
            </body>
        </html>
    `
  res.send(homePageContent)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
)

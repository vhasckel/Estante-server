const express = require('express')
const cors = require("cors")
const bookRouter = require('./routes/book')
const favoriteRoute = require('./routes/favorite')
const wantToReadRoute = require('./routes/to_read')

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use('/books', bookRouter)
app.use('/favorites', favoriteRoute)
app.use('/to_read', wantToReadRoute)

const port = 8000

app.listen(port, () => {
    console.log(`escutando porta ${port}`)
})
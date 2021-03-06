const path = require('path')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const settings = require('./settings')

const mainRoutes = require('./routes/index')
const profileRoutes = require('./routes/profiles')
const searchRoutes = require('./routes/searches')

const PORT = process.env.PORT ? process.env.PORT : settings.server.port

let app = express()
app.use(cors())
app.use(cookieParser())
app.use(session(settings.session))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve(process.cwd(), 'client', 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', mainRoutes)
app.use('/profiles', profileRoutes)
app.use('/searches', searchRoutes)

app.listen(PORT, () => {
  console.log(`app started http://localhost:${PORT}`)
})

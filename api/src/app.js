const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/auth', authRoutes)
app.use('/analytics', analyticsRoutes)
app.use('/category', categoryRoutes)
app.use('/order', orderRoutes)
app.use('/position', positionRoutes)

module.exports = app

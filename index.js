const express = require('express')
const flash = require('connect-flash')
const hbs = require('hbs')
const methodOverride = require('method-override')
const parser = require('body-parser')
const passport = require('passport')
const session = require('express-session')

const conController = require('./controllers/convention')
const userController = require('./controllers/user')

const app = express()
app.set('view engine', 'hbs')
app.use(parser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(session({secret: 'O_O'}))
app.use(flash())

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.get('/', (req, res) => {
  res.render('index')
  res.redirect('/conventions')
})

app.use('/conventions', conController)
app.use('/users', userController)

app.listen(3000, console.log('listening'))

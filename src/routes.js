const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddlaware = require('./app/middlewares/auth')
const guestMiddlaware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('sucess')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/', guestMiddlaware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddlaware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

/* Todas as rotas que começam com /app
  vão olhar o middlaware, protegendo essas rotas
  de serem acessadas por usuarios que não estão logados */
routes.use('/app', authMiddlaware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  return res.render('dashboard')
})

module.exports = routes

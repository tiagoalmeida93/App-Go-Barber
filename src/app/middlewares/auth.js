module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    /* @dica - res.locals funciona como uma variavel
    global para todas as views do nunjucks,
    dessa forma podemos acessar as informacoes
    do usuario chamando a variavel {{user}}
    de qualquer lugar das views com nunjucks */
    res.locals.user = req.session.user

    return next()
  }

  return res.redirect('/')
}

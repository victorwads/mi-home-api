let port = process.env.PORT || 8080

const server = {}
server.start = (app) => {
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  app.listen(port, () => {
    console.log('------------------------------------------------------------')
    console.log('Server listening on port ' + port)
    console.log('------------------------------------------------------------')
  })
}

export default server

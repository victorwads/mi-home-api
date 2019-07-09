const API_PORT = 8080
const HOME_PORT = 8081

const server = {}
server.start = (api, home) => {
  api.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  api.listen(API_PORT, () => {
    console.log('API Server listening on port ' + API_PORT)
  })
  home.listen(HOME_PORT, () => {
    console.log('Home Server listening on port ' + HOME_PORT)
  })
}

export default server

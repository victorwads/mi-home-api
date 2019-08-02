import cors from 'cors'

const BASE_DOMAIN = process.env.BASE_DOMAIN
const API_PORT = 8080
const HOME_PORT = 8081

var allowedOrigins = [
  'https://' + BASE_DOMAIN,
  'https://' + BASE_DOMAIN + ':7443',
  'http://' + BASE_DOMAIN + ':' + API_PORT,
  'http://' + BASE_DOMAIN + ':' + HOME_PORT
]

export default {
  cors: api => {
    api.use(cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) === -1) {
          return callback(null, false)
        }
        return callback(null, true)
      }
    }))
  },
  start: (api, home) => {
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
}

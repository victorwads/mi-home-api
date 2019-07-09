import cors from 'cors'

const API_PORT = 8080
const HOME_PORT = 8081

var allowedOrigins = [
  'https://home.victorwads.com.br',
  'https://home.victorwads.com.br:7443'
];

export default {
  start: (api, home) => {
    api.use(cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          return callback(null, false);
        }
        return callback(null, true);
      }
    }));
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

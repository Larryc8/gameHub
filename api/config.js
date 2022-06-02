const allowedDomains = ['http://localhost:3000']
const SERVER_PORT = 3001;

const cors = {
  origin: allowedDomains,
  optionsSuccesStatus: 200
}

module.exports = {
  cors,
  SERVER_PORT
}

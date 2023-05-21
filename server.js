// importing http module
const http = require('http');

// importing controllers
const {
  getAllCricketBats,
  getCricketBat,
  postCricketBat,
  putCricketBat,
  deleteCricketBat,
} = require('./controller/cricketBatsController');

// creating server instance
const server = http.createServer((request, response) => {
  // GET all cricketBats
  if (request.url === '/api/cricketBats/' && request.method === 'GET') {
    getAllCricketBats(request, response);
  }
  // GET a cricketBat by id
  else if (
    request.url.match(/\/api\/cricketBats\/[0-9]+/) &&
    request.method === 'GET'
  ) {
    const id = request.url.split('/')[3];
    getCricketBat(request, response, id);
  }
  // POST (create) a cricketBat
  else if (request.url === '/api/cricketBats/' && request.method === 'POST') {
    postCricketBat(request, response);
  }
  // PUT (update) a cricketBat
  else if (
    request.url.match(/\/api\/cricketBats\/[0-9]+/) &&
    request.method === 'PUT'
  ) {
    const id = request.url.split('/')[3];
    putCricketBat(request, response, id);
  }
  // DELETE a cricketBat
  else if (
    request.url.match(/\/api\/cricketBats\/[0-9]+/) &&
    request.method === 'DELETE'
  ) {
    const id = request.url.split('/')[3];
    deleteCricketBat(request, response, id);
  }
  // Bad request
  else {
    response.writeHead(401, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'BAD REQUEST' }));
  }
});

server.listen(5000, () => console.log('Listenting at port 5000'));

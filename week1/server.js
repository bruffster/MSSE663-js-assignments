const http = require('http');

function serve (req, res) {
  const body = 'Hello World!';

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Type': body.length
  });

  res.end(body);
}

const server = http.createServer(serve);

server.listen(8000);

console.log('Running server...');

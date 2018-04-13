"use strict";

const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {

  console.log(headers);

  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });

  setInterval(() => {
      stream.write(`It's ${Date.now()} <br>`);
  }, 500);


  stream.pushStream({ ':path': '/pushed-data.json' }, (err, pushStream, headers) => {
    if (err) throw err;
    pushStream.respond({ ':status': 200 });
    pushStream.end('{ "pushed": true }');
  });

  //stream.end('Hello World');
});

server.listen(8443);

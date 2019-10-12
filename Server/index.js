// const https = require('https');
import http from 'http';
import path from 'path';
import express from 'express';
import WebSocket from 'ws';

const app = express();
// app.use(express.static(__dirname));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const server = http.createServer(app);

app.get('/', (req, res) => {
  const context = {
    title: 'hello',
    message: 'Hello World'
  };
  res.render('index', context);
});

const wss = new WebSocket.Server({ server });
wss.on('connection', ws => {
  console.log('connection');
  //connection is up, let's add a simple simple event
  ws.on('message', message => {
    //log the received message and send it back to the client
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server');
});

const port = process.env.PORT || 5555;
server.listen(port, () => {
  console.log(`Server started on port ${server.address().port}`);
});

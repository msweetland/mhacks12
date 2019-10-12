console.log('test');
const socketUrl = 'ws://localhost:5555/';
const webSocket = new WebSocket(socketUrl);

webSocket.onopen((e) => {
  console.log(e);
})

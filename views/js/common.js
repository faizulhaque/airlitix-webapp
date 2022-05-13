$(document).ready(() => {

  let wifiClient = '';
  let socket = io.connect('//socketio0.herokuapp.com', {
    transports: ['websocket'],
    upgrade: false,
    rejectUnauthorized: false,
    secure: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 10      
  });

  socket.on('WIFI-CLIENT-CONNECTED', (data) => {
    if (data.socketId) {
      wifiClient = data.socketId;
      appendLogs(`WIFI Client ${data.socketId} connected.`);
    } else {
      appendLogs(`Not WIFI Client available yet.`);
    }      
  });
  socket.on('WIFI-CLIENT-DISCONNECTED', (data) => {
    wifiClient = '';
    appendLogs(`WIFI Client ${data.socketId} disconnected.`);
  });
  socket.on('message', (data) => {
    appendLogs(`Message received from WIFI Client ${JSON.stringify(data.msg, null, 2)}.`);
  });
  socket.emit('join', {type: 'WEB'});

  let objectForSocket = {
    greenHouse: '',
    bay: '',
    cmd: 'lcd',
    key: ''
  };

  $('#all-greenhouses-view').on('click', '.greenhouse-grid .greenhouse-cell-div .main-greenhouse-div', (element) => {
    objectForSocket.greenHouse = element.currentTarget.children[0].innerHTML;
    appendLogs(objectForSocket);
  });

  $('.bay-container').on('click', '.bay-div', (element) => {
    objectForSocket.bay = element.currentTarget.children[0].innerHTML;
    appendLogs(objectForSocket);
  });
  

  $('.bay-calculation-div').on('click', '.keypad-btn', (element) => {
    objectForSocket.key = element.currentTarget.children[0].innerHTML;
    appendLogs(objectForSocket);

    if (wifiClient === '') {
      alert('No WIFI client is available.');
      return;
    }

    socket.emit('message', {
      receiverId: wifiClient,
      senderId: socket.id,
      msg: objectForSocket
    });
  });

});

function appendLogs(msg) {
  console.table('appendLogs', msg);

  if ($('.log-div').length) {
    $('.log-div').prepend( `<div class='log-text-content'>${JSON.stringify(msg)}</div>`);
  }
}

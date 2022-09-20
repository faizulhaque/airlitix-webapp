$(document).ready(() => {

  let wifiClient = '';
  let socket = io.connect('/', {
    transports: ['websocket'],
    upgrade: false,
    rejectUnauthorized: false,
    secure: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 10      
  });

  let office_name = document.getSelectorsByClass('office-div').innerHTML; // help

// COMMANDS
let CMD_GET_LCD_DATA    = 11 // Get LCD DATA
let CMD_SET_LCD_DATA    = 12 // Set LCD DATA
let CMD_RET_LCD_DATA    = 13 // Return LCD DATA
let CMD_GET_MAP_DATA    = 21 // Get MAP DATA
let CMD_SET_MAP_DATA    = 22 // Set MAP DATA
let CMD_RET_MAP_DATA    = 23 // Return MAP DATA
let CMD_GET_WIFI_STATUS = 31 // Get WIFI STATUS
let CMD_SET_WIFI_STATUS = 32 // Set WIFI STATUS
let CMD_RET_WIFI_STATUS = 33 // Return WIFI STATUS
let CMD_GET_WIFI_CONFIG = 41 // Get WIFI CONFIG
let CMD_SET_WIFI_CONFIG = 42 // Set WIFI CONFIG
let CMD_RET_WIFI_CONFIG = 43 // Return WIFI CONFIG
let CMD_GET_MPU_STATUS  = 51 // Get MPU STATUS
let CMD_SET_MPU_STATUS  = 52 // Set MPU STATUS
let CMD_RET_MPU_STATUS  = 53 // Return MPU STATUS
let CMD_GET_MPU_CONFIG  = 61 // Get MPU CONFIG
let CMD_SET_MPU_CONFIG  = 62 // Set MPU CONFIG
let CMD_RET_MPU_CONFIG  = 63 // Return MPU CONFIG
let CMD_RET_LOG         = 91 // Return LOG
let CMD_RET_STATUS      = 92 // Return STATUS

// MODULE_TYPE: 1=OFF, 2=GH, 3=BAYWater, 4=BAYMap
let OFFICE_MODULE_TYPE     = 1
let GREENHOUSE_MODULE_TYPE = 2
let BAYWATER_MODULE_TYPE   = 3
let BAYMAP_MODULE_TYPE     = 4

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

  // socket.on('message', (data) => {
  socket.on('fromIOT', (data) => { // help
  // in the format:
  socket.on('fromIOT', {
    receiverId: socket.id, // ids switched by IOT
    senderId: wifiClient,  // ids switched by IOT
    msg: objectFromIOT
  }
  appendStatus(`fromIOT received from WIFI Client ${JSON.stringify(data.msg, null, 2)}.`);
    // TODO: Parse COMMAND -
    //    * If "COMMAND" = CMD_RET_LCD_DATA, parse DATA into LCD '.panel-text-r*', where * = 1, 2, 3, 4
    //    If "COMMAND" = CMD_RET_MAP_DATA, msg="<command> Not Implemented", post to STATUS text box with "appendStatus(msg)"
    //    If "COMMAND" = CMD_RET_WIFI_STATUS, msg="<command> Not Implemented", post to STATUS text box with "appendStatus(msg)"
    //    If "COMMAND" = CMD_RET_WIFI_CONFIG, msg="<command> Not Implemented", post to STATUS text box with "appendStatus(msg)"
    //    If "COMMAND" = CMD_RET_MPU_STATUS, msg="<command> Not Implemented", post to STATUS text box with "appendStatus(msg)"
    //    If "COMMAND" = CMD_RET_MPU_CONFIG, msg="<command> Not Implemented", post to STATUS text box with "appendStatus(msg)"
    //    * If "COMMAND" = CMD_RET_LOG, parse DATA=>msg, then post "msg" to LOG text box with "appendLog(msg)"
    //    * If "COMMAND" = CMD_RET_STATUS, parse DATA=>msg, then post "msg" to STATUS text box with "appendStatus(msg)"
  });

  socket.emit('join', {type: 'WEB'});

  let objectToIOT = {
    office_name: '',     // OFFICE_NAME
    greenhouse_name: '', // GREENHOUSE_NAME
    bay_name: '',        // BAY_NAME
    targetType: '',      // MODULE_TYPE: 1=OFF, 2=GH, 3=BAYWater, 4=BAYMap
    command: '',         // COMMAND
    data: ''             // DATA: KEYPAD input
  };

  let objectFromIOT = {
    command: '',         // COMMAND
    data: ''             // DATA. ex:LCD return data
    //  "data1": '1234567890123456789'
    //  "data2": '1234567890123456789'
    //  "data3": '1234567890123456789'
    //  "data4": '1234567890123456789'
  };

  // OFFICE GEAR selected (ADMIN mode) 
  $('#all-greenhouses-view').on('click', '.greenhouse-grid .greenhouse-cell-div .gear-div', (element) => { // help
    objectForSocket.office_name = office_name;
    objectForSocket.greenHouse_name = '';
    objectForSocket.bay_name = '';
    objectForSocket.targetType = OFFICE_MODULE_TYPE;
    appendStatus(objectForSocket);
  });
  
  // GREENHOUSE GEAR selected (ADMIN mode)
  $('#all-greenhouses-view').on('click', '.greenhouse-grid .greenhouse-cell-div .gear-div', (element) => { // help
    objectForSocket.greenHouse_name = element.parent().querySelector("h2").innerHTML; // help
    objectForSocket.office_name = office_name;
    objectForSocket.bay_name = '';
    objectForSocket.targetType = GREENHOUSE_MODULE_TYPE;
    appendStatus(objectForSocket);
  });

  // GREENHOUSE selected (USER mode)
  $('#all-greenhouses-view').on('click', '.greenhouse-grid .greenhouse-cell-div .main-greenhouse-div', (element) => {
    objectForSocket.greenHouse_name = element.currentTarget.children[0].innerHTML;
    objectForSocket.office_name = office_name;
    objectForSocket.bay_name = '';
    objectForSocket.targetType = GREENHOUSE_MODULE_TYPE;
    appendStatus(objectForSocket);
  });

  // BAY selected
  $('.bay-div').on('click', (element) => {
    objectForSocket.bay_name = element.currentTarget.children[0].innerHTML;
    appendStatus(objectForSocket);
  });
  
  // KEYPAD BUTTON selected
  $('.keypad-btn').on('click', (element) => {
    objectForSocket.data = element.currentTarget.children[0].innerHTML;
    objectForSocket.command = CMD_SET_LCD_DATA;
    appendStatus(objectForSocket);

    if (wifiClient === '') {
      alert('No WIFI client is available.');
      return;
    }

    // socket.emit('message', {
    //   receiverId: wifiClient,
    //   senderId: socket.id,
    //   msg: objectForSocket
    // }
    socket.emit('toIOT', {
      receiverId: wifiClient,
      senderId: socket.id,
      msg: objectToIOT
    }
    );
  });

  // WATER menu button selected
  $('.water').on('click', (element) => {
    objectForSocket.command = CMD_GET_LCD_DATA;
    appendStatus(objectForSocket);

    if (wifiClient === '') {
        alert('No WIFI client is available.');
        return;
    }

    socket.emit('toIOT', {
        receiverId: wifiClient,
        senderId: socket.id,
        msg: objectToIOT
    });
  });

// MAPPING menu button selected
$('.mapping').on('click', (element) => {
    objectForSocket.command = CMD_GET_MAP_DATA;
    appendStatus(objectForSocket);
    
    if (wifiClient === '') {
        alert('No WIFI client is available.');
        return;
    }
    
    socket.emit('toIOT', {
        receiverId: wifiClient,
        senderId: socket.id,
        msg: objectToIOT
    });
  });

// WIFI STATUS menu button selected
$('.wifi').on('click', (element) => {
    objectForSocket.command = CMD_GET_WIFI_STATUS;
    appendStatus(objectForSocket);
    
    if (wifiClient === '') {
        alert('No WIFI client is available.');
        return;
    }
    
    socket.emit('toIOT', {
        receiverId: wifiClient,
        senderId: socket.id,
        msg: objectToIOT
    });
  });

  // WIFI CONFIG menu button selected
$('.wifi-config').on('click', (element) => {
    objectForSocket.command = CMD_GET_WIFI_CONFIG;
    appendStatus(objectForSocket);
    
    if (wifiClient === '') {
        alert('No WIFI client is available.');
        return;
    }
    
    socket.emit('toIOT', {
        receiverId: wifiClient,
        senderId: socket.id,
        msg: objectToIOT
    });
  });

// MPU STATUS menu button selected
$('.mpu').on('click', (element) => {
    objectForSocket.command = CMD_GET_MPU_STATUS;
    appendStatus(objectForSocket);
    
    if (wifiClient === '') {
        alert('No WIFI client is available.');
        return;
    }
    
    socket.emit('toIOT', {
        receiverId: wifiClient,
        senderId: socket.id,
        msg: objectToIOT
    });
  });

// MPU CONFIG menu button selected
$('.mpu-config').on('click', (element) => {
    objectForSocket.command = CMD_GET_MPU_CONFIG;
    appendStatus(objectForSocket);
    
    if (wifiClient === '') {
        alert('No WIFI client is available.');
        return;
    }
    
    socket.emit('toIOT', {
        receiverId: wifiClient,
        senderId: socket.id,
        msg: objectToIOT
    });
  });

});

// Print "msg" to LOG text box
function appendLogs(msg) {
  console.table('appendLogs', msg);
  if ($('.log-div').length) {
    $('.log-div').html( `<div class='log-text-content'>${JSON.stringify(msg)}</div>`);
  }
}

// Print "msg" to STATUS text box
function appendStatus(msg) {
  console.table('appendStatus', msg);
  if ($('.status-div').length) {
    $('.status-div').html( `<div class='status-text-content'>${JSON.stringify(msg)}</div>`); // help
  }
}

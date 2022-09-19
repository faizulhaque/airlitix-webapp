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

  let officeName = $(".office-div > h3").html();

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
  
  socket.on('message', (data) => {
    appendLogs(`Message received from WIFI Client ${JSON.stringify(data.msg, null, 2)}.`);
  });

  socket.on('fromiot', (data) => {
    
    if (data.msg) {
      renderDataOnScreen(data.msg);
    }
    appendStatus(`Message received from WIFI Client ${JSON.stringify(data.msg, null, 2)}.`);
  });


  socket.emit('join', {type: 'WEB'});

  let objectToIOT = {
    officeName: '',     // OFFICE_NAME
    greenhouseName: '', // GREENHOUSE_NAME
    bayName: '',        // BAY_NAME
    targetType: '',      // MODULE_TYPE: 1=OFF, 2=GH, 3=BAYWater, 4=BAYMap
    command: '',         // COMMAND
    data: ''             // DATA: KEYPAD input
  };

  // \"command\": 13,
  // \"data\": \"12345678901234567890123456789012345678901234567890123456789012345678901234567890\"
  let objectFromIOT = {
    command: '',         // COMMAND
    data: ''             // DATA. ex:LCD return data
  };

  // GREENHOUSE selected (USER mode)
  $('#all-greenhouses-view').on('click', '.greenhouse-grid .greenhouse-cell-div .main-greenhouse-div', (element) => {
    objectToIOT.greenhouseName = element.currentTarget.children[0].innerHTML;
    objectToIOT.officeName = officeName;
    objectToIOT.bayName = 'Bay 1'; // webflow main script auto selecting the Bay 1 by default.
    objectToIOT.targetType =  '';
    objectToIOT.command =  '';
    objectToIOT.data =  '';
    objectToIOT.targetType = GREENHOUSE_MODULE_TYPE;
    appendStatus(objectToIOT);
  });

  // BAY selected
  $('.bay-div').on('click', (element) => {
    objectToIOT.bayName = element.currentTarget.children[0].innerHTML;
    objectToIOT.command = CMD_GET_LCD_DATA;
    appendStatus(objectToIOT);

    socket.emit('toiot', {
      receiverId: wifiClient,
      senderId: socket.id,
      msg: objectToIOT
  });
  
  // KEYPAD BUTTON selected
  $('.keypad-btn').on('click', (element) => {
    objectToIOT.data = element.currentTarget.children[0].innerHTML;
    objectToIOT.command = CMD_SET_LCD_DATA;
    appendStatus(objectToIOT);

    socket.emit('toiot', {
      receiverId: wifiClient,
      senderId: socket.id,
      msg: objectToIOT
    });
  });


// MAPPING menu button selected
$('.mapping').on('click', (element) => {
  objectToIOT.command = CMD_GET_MAP_DATA;
  appendStatus(objectToIOT);
  
  socket.emit('toiot', {
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
    $('.status-div').html( `<div class='status-text-content'>${JSON.stringify(msg)}</div>`);
  }
}

function renderDataOnScreen(msg) {
  try {
    $(".panel-text-r1").html(msg.data1);
    $(".panel-text-r2").html(msg.data2);
    $(".panel-text-r3").html(msg.data3);
    $(".panel-text-r4").html(msg.data4);
  } catch (e) {
    console.error('renderDataOnScreen.error', e);
  }
}
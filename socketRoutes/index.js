'use strict'

const logger = require('../helper/logger')(module);
const _ = require('lodash');

const CLIENT_TYPES = {
  WIFI: 'WIFI',
  WEB: 'WEB'
};

const CLIENT_SOCKET_STATUS = {
  WIFI: '',
  WEB: {}
};


module.exports = (io) => {

  io.on('connection', socket => {

    socket.on('join', async (data) => {
      logger.info("join: ", {
        socketId: socket.id,
        type: data.type
      });

      socket.type = data.type;

      if (!CLIENT_TYPES[data.type]) {
        return socket.emit('ERROR', {msg: `Provided client ${data.type} is not supported yet.`});
      }

      if (data.type === CLIENT_TYPES.WIFI) {
        CLIENT_SOCKET_STATUS.WIFI = socket.id;
        for(let key in CLIENT_SOCKET_STATUS.WEB) {
          socket.to(key).emit('WIFI-CLIENT-CONNECTED', {socketId: socket.id});
        }
      } else {
        CLIENT_SOCKET_STATUS.WEB[socket.id] = socket.id;
        socket.emit('WIFI-CLIENT-CONNECTED', {socketId: CLIENT_SOCKET_STATUS.WIFI});
      }

    });

    socket.on('disconnect', async () => {
      logger.info("disconnect: ", {
        socketId: socket.id,
        type: socket.type
      });

      if (socket.id === CLIENT_SOCKET_STATUS.WIFI) {
        CLIENT_SOCKET_STATUS.WIFI = '';
        for(let key in CLIENT_SOCKET_STATUS.WEB) {
          socket.broadcast.to(key).emit('WIFI-CLIENT-DISCONNECTED', {socketId: socket.id});
        }
      } else {
        delete CLIENT_SOCKET_STATUS.WEB[socket.id];
      }

    });

    socket.on('message', async (data) => {
      //data.command will be parsed
      logger.info("message: ", {
        socketId: socket.id,
        data
      });

      io.to(data.receiverId).emit('message', data);
    });

  });
};
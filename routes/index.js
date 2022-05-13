'use strict'

const logger = require('../helper/logger')(module);
const path = require('path');

module.exports = (app) => {

  app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname+'/index.html'));
  })

}

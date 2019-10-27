
const path = require('path')
const express = require('express');
const app = express();

// Settings
app.set('port', 7777)
app.use(express.static(path.join(__dirname, '/client/')))

server = app.listen(app.get('port'), () => {
      console.log('servidor en puerto', app.get('port'))
})
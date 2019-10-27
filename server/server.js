/**
 * Script server.js
 * 
 * Se encarga de administrar
 * los clientes conectados para el envio de datos y
 * acciones
 * 
 */
const path = require('path')
const express = require('express');
const app = express();
const SocketIo = require('socket.io')

// inicia el servidor
let sio
let server
var cliData = {}
function initServer() {

      // Settings
      app.set('port', 5555)
      app.use(express.static(path.join(__dirname, '/')))

      server = app.listen(app.get('port'), () => {
            console.log('servidor en puerto', app.get('port'))
      })
      sio = SocketIo(server)

      // websockets
      sio.sockets.on('connection', socket => {
            socket.on('disconnect', () => {
                  console.log('desconectado')
            })
            // --------------------------------------------------------------------
            // Primera conexion ----------------------
            // envia codigo del servidor
            let o = {
                  //frameSync: frameCount,
                  //codeAux: .cmAux.getValue()
            }
            //sio.emit('broadcast', o)
            //----------------------------------------

            // recive desde cliente
            socket.on('cliente', data => {
                  // Reenvia la actualizacion a clientes/
                  cliData = data
                  //console.log(data)
                  // let o = {
                  //       // ID
                  //       id: socket.id,
                  //       cmContext: 'aux',
                  //       frameSync: frameCount,
                  //       codeAux: data.codeAux
                  // }
                  // socket.broadcast.emit('liveleparc1', o)
            })
      })
}
exports.close = function () {
      server.close()
}
exports.initServer = function () {
      initServer()
}
exports.sendClient = function () {

      let o = {
      }
      sio.emit('cliente', o)
}
exports.getCliData = function () {

      return cliData
}

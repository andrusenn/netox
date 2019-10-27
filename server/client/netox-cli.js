var SERVER_IP = 'localhost'
var SERVER_PORT = '5555'
var conn;
var mouseIsPressed = false
function getServerVars(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable && pair[0] != '') {
                  return pair[1];
            } else {
                  return ''
            }
      }
}
function start() {
      SERVER_IP = (getServerVars('ip') == '') ? window.location.hostname : getServerVars('ip')
      SERVER_PORT = (getServerVars('port') == '') ? SERVER_PORT : getServerVars('port')
      conn = io.connect('http://' + SERVER_IP + ':' + SERVER_PORT);

      // conn.emit('cliente', {
      //       msj: 'hola'
      // })
      // conn.on('connection', function (message) {
      //       console.log('conectado');
      //       conn.emit('message', {
      //             msj:'Hola'
      //       })
      // })
      // conn.on('cliente', function (message) {
      //       console.log('conectado');
      // })
}
// document.addEventListener('mousemove', function (e) {
//       conn.emit('cliente', {
//             x: e.clientX,
//             y: e.clientY,
//             w: window.innerWidth,
//             h: window.innerHeight,
//       })
// })

function setup(){
      createCanvas(windowWidth,windowHeight)

}
function draw(){
      background(127)
      if(mouseIsPressed){
            conn.emit('cliente', {
                  x: mouseX,
                  y: mouseY,
                  w: width,
                  h: height,
            })
      }
}
function windowResized(){
      resizeCanvas(windowWidth,windowHeight)
}
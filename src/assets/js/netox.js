// const SocketIo = require('socket.io')

var server = require('./server.js')

server.initServer();

function setup() {
      colorMode(HSB,255)
      createCanvas(windowWidth, windowHeight)
      background(0);

}
function draw() {
      noStroke()
      // Mapea la diferencia entre ventanas
      let x = server.getCliData().x / server.getCliData().w * windowWidth
      let y = server.getCliData().y / server.getCliData().h * windowHeight

      let c = int(abs(sin(frameCount*0.01)) * 255)
      let s = int(abs(sin(frameCount*0.01)) * 200)
      fill(c,255,255)
      circle(x, y, s)
      //console.log(server.getCliData())
}

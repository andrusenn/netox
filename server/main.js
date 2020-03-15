const { app, BrowserWindow } = require('electron')
// const os = require("os")
// const ip = require("ip")
// const fs = require('fs-extra')
const path = require('path')

// Paths
let appPath = app.getAppPath();
let resourcesPath = (app.isPackaged) ? app.getPath("home") + "" : app.getAppPath();

let mainWindow

function createWindow() {
      mainWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: path.join(appPath, 'assets', 'icon.png')
      })
      mainWindow.setMenu(null);
      mainWindow.center();
      //mainWindow.setAlwaysOnTop(true);
      mainWindow.setMenuBarVisibility(false);
      
      mainWindow.loadFile('index.html')
      // mainWindow.webContents.openDevTools()
      // mainWindow.webContents.openDevTools({ mode: 'detach' })
      // creat el servidor para el cliente -------------
      require('./client.js')
      //
      mainWindow.on('closed', function () {
            mainWindow = null
      })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
            app.quit()
      }
})
app.on('activate', function () {
      if (mainWindow === null) {
            createWindow()
      }
})
exports.exit = function () {
      app.exit();
}

// Utils
function mkdir(path, fn) {
      fs.mkdir(path, err => {
            if (!err) {
                  fs.chmod(path, '0777', function (err) {
                        if (!err) {
                              if (typeof fn == 'function') {
                                    fn()
                              }
                        }
                  });
            }
      });
}
function chmodall(dir) {
      let files = fs.readdirSync(dir);
      files.forEach(function (file) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                  fs.chmod(path.join(dir, file), '0777');
            }
      })
}
function writef(path, content, fn) {
      fs.writeFile(path, content, function (err) {
            if (!err) {
                  fs.chmod(path, '0777', function (err) {
                        if (!err) {
                              if (typeof fn == 'function') {
                                    fn()
                              }
                        }
                  });
            }
      });
}

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
      if (app.isPackaged) {
            // Directorio leparc_resources
            // mkdir(path.join(resourcesPath, 'leparc_resources'), () => {
            //       // Directorio -> leparc_resources/save
            //       mkdir(path.join(resourcesPath, 'leparc_resources', 'save'), () => {
            //             writef(path.join(resourcesPath, 'leparc_resources', 'save', 'auxcode.txt'), '// Hola LeParc!!');
            //       })
            //       // Directorio -> leparc_resources/snippets
            //       mkdir(path.join(resourcesPath, 'leparc_resources', 'snippets'), () => {
            //             fs.copy(path.join(appPath, 'leparc_resources', 'snippets'), path.join(resourcesPath, 'leparc_resources', 'snippets'), () => {
            //                   chmodall(path.join(resourcesPath, 'leparc_resources', 'snippets'))
            //             })
            //       })
            //       // Directorio -> leparc_resources/libs 
            //       mkdir(path.join(resourcesPath, 'leparc_resources', 'libs'))
            //       // Directorio -> leparc_resources/media 
            //       mkdir(path.join(resourcesPath, 'leparc_resources', 'media'))
            //       // Directorio -> leparc_resources/config
            //       mkdir(path.join(resourcesPath, 'leparc_resources', 'config'), () => {
            //             writef(path.join(resourcesPath, 'leparc_resources', 'config', 'config.txt'), "server-ip=127.0.0.1\nport=7777\nmfr=0.001")
            //       })
            //       // Directorio -> leparc_resources/extends
            //       mkdir(path.join(resourcesPath, 'leparc_resources', 'extends'), () => {
            //             fs.copy(path.join(appPath, 'leparc_resources', 'extends'), path.join(resourcesPath, 'leparc_resources', 'extends'), () => {
            //                   chmodall(path.join(resourcesPath, 'leparc_resources', 'extends'))
            //             })
            //       })
            // })
      }
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
// export const path = function () {
//       return path
// }
// export const setFull = function () {
//       mainWindow.setKiosk(true)
//       mainWindow.setMenu(null);
//       mainWindow.setMenuBarVisibility(false)
// }
// export const setUnFull = function () {
//       mainWindow.setKiosk(false)
//       mainWindow.setMenu(null);
//       mainWindow.setMenuBarVisibility(false)
// }
// export const getMemory = function () {
//       return Math.round((os.freemem() / os.totalmem()) * 100);
// }
// export const getIP = function () {
//       return ip.address()
// }

// export const saveCode = (file, data) => {
//       fs.writeFile(path.join(resourcesPath, 'leparc_resources', 'save', file + ".txt"), data, function (err) {
//             if (err) throw err;
//       });
// }
// export const resizeWin = function (w, h) {
//       if (mainWindow.isMaximized()) {
//             mainWindow.unmaximize();
//       } else
//             if (mainWindow.isKiosk()) {
//                   mainWindow.setKiosk(false)
//             }
//       mainWindow.setMenuBarVisibility(false)
//       mainWindow.setBounds({ width: w, height: h });
//       mainWindow.center()
// }
// export const devTools = function (open) {
//       if (open) {
//             mainWindow.webContents.openDevTools({ mode: 'right' });
//       } else {
//             mainWindow.webContents.closeDevTools();
//       }
// }
// export const reload = function () {
//       if (arguments.length == 1) {
//             global.settings.renderer = arguments[0]
//       }
//       mainWindow.loadFile('index.html');
// }
// export const resourcesPath = function () {
//       return resourcesPath;
// }

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

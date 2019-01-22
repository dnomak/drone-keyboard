const {
  app,
  Menu,
  BrowserWindow,
  shell
  // globalShortcut
} = require('electron')

// require('electron-debug')()

const dgram = require('dgram')
const express = require('express')()
const expressStatic = require('express-static')
const droneKeyboardAppLocalhost = require('express')()
const droneKeyboardStreamLocalhost = require('express')()
const droneKeyboardApp = require('http').Server(express)
const io = require('socket.io')(droneKeyboardApp)
const throttle = require('lodash/throttle')
const path = require('path')

const PORT = 8889
const HOST = '192.168.10.1'

droneKeyboardAppLocalhost.use('/', expressStatic(path.join(__dirname, '/dist')))
droneKeyboardAppLocalhost.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})
droneKeyboardAppLocalhost.listen(2020)

droneKeyboardStreamLocalhost.use('/', expressStatic(path.join(__dirname, '/stream')))
droneKeyboardStreamLocalhost.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/stream/index.html'));
})
droneKeyboardStreamLocalhost.listen(2021)

function parseState (state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value
      return data
    }, {})
}

function handleError (err) {
  if (err) {
    console.log('ERROR')
    console.log(err)
  }
}

function createWindow () {
  let mainWindow = new BrowserWindow({
    width: 1280,
    height: 910,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.maximize()
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  const template = [
    {
      label: app.getName(),
      submenu: [
        {
          label: 'About Drone Keyboard for Tello',
          click () {
            mainWindow.minimize()
            shell.openExternal('https://github.com/dnomak/drone-keyboard')
          }
        },
        {
          label: 'Version 1.0.1',
          enabled: false
        },
        {
          label: 'Check for Update',
          click () {
            mainWindow.minimize()
            shell.openExternal('https://github.com/dnomak/drone-keyboard/releases')
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  const drone = dgram.createSocket('udp4')
  drone.bind(PORT)
  drone.on('message', message => {
    console.log(`🤖 : ${message}`)
    // io.sockets.emit('status', message.toString())
  })
  drone.send('command', 0, 'command'.length, PORT, HOST, handleError)

  const droneState = dgram.createSocket('udp4')
  droneState.bind(8890)
  droneState.on(
    'message',
    throttle(state => {
      const formattedState = parseState(state.toString())
      io.sockets.emit('dronestate', formattedState)
    }, 100)
  )

  io.on('connection', socket => {
    socket.on('command', command => {
      console.log('command Sent from browser')
      console.log(command)
      drone.send(command, 0, command.length, PORT, HOST, handleError)
    })
    socket.on('link', link => {
      mainWindow.minimize()
      shell.openExternal(link);
    })
    socket.on('relunch', relunch => {
      console.log(relunch)
      app.relaunch()
      app.quit()
    })
  })

  droneKeyboardApp.listen(6767, () => {
    console.log('Socket io server up and running')
  })
	// globalShortcut.register('f5', () => {
  //   mainWindow.minimize()
	// })
	// globalShortcut.register('CommandOrControl+R', () => {
  //   app.relaunch()
  //   app.quit()
	// })
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

app.on('ready', createWindow)

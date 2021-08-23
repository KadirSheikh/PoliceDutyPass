const { app, BrowserWindow, globalShortcut } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor : '#ffffff',
    icon : `file://${__dirname}/dist/police-id-generation/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      worldSafeExecuteJavaScript: true, 
      contextIsolation: true
    }
  })

  win.loadURL(`file://${__dirname}/dist/police-id-generation/index.html`)
  win.maximize()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }

})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
    
  }
})

const express = require('./api/index')
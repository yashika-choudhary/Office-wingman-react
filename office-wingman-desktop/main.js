

import { app, BrowserWindow } from 'electron/main';
import path from 'node:path';
import isDev from 'electron-is-dev';

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  // win.loadFile('office-wingman/public/index.html');
if(isDev){
win.loadURL("http://localhost:3000");
}


}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

const ticketingButton = document.getElementById('ticketing');
ticketingButton.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../ticketing/ticketing.html');
    let win = new BrowserWindow({

        webPreferences:{
            nodeIntegration:true,
            webSecurity:false,

        }

    })
    win.on('close', function () { win = null });
    win.maximize();
    win.loadURL(modalPath);
    win.show()
});
const insightsButton = document.getElementById('insights');
insightsButton.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../insights/login.html');
    let win = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            webSecurity:false,

        }
    })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.maximize();
    win.show()
});
const displayButton = document.getElementById('display')
displayButton.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../queueingDisplay/informativeDisplay.html')
    let win = new BrowserWindow({
    webPreferences : {
        nodeIntegration:true,
        webSecurity:false
    }

        
    });
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.maximize()
    win.webContents.id = 1;
    win.show()
});
const serverButton = document.getElementById('server')
serverButton.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../server/createServerInstance.html')
    let win = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            webSecurity:false

        }

    });
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.maximize();
    win.webContents.id = 2;
    win.show()
});
const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

const ticketingButton = document.getElementById('ticketing');
ticketingButton.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../ticketing/ticketing.html');
    console.log(modalPath);
    let win = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences:{
            nodeIntegration:true,
            webSecurity:false

        }
    })
    win.on('close', function () { win = null });
    win.loadURL(modalPath);
    win.show()
});
const insightsButton = document.getElementById('insights');
insightsButton.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../insights/insights.html');
    let win = new BrowserWindow({

    })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
});
const displayButton = document.getElementById('display')
displayButton.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../queuingDisplay/informativeDisplay.html')
    let win = new BrowserWindow({ width: 1200, height: 700 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
});
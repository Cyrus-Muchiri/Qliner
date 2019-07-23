const electron = require('electron')
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow

const serviceButton = document.getElementById('service')
serviceButton.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'mobileNumber.html')
    console.log(modalPath);
    let win = new BrowserWindow({
        modal: true,
        webPreferences: {
            nodeIntegration: true
        }

    });

    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
});
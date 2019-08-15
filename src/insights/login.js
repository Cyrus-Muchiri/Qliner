const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
function login(event) {
    event.preventDefault
    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/insights/authentication');
    request.setRequestHeader('Content-Type', 'application/json');
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    let data = JSON.stringify({
        "email": email,
        "password": password
    });
    ///console.log(data)
    request.send(data);
    request.onreadystatechange = (e) => {
        response = JSON.parse(request.responseText);
        console.log(response);
        if (response.status == "true") {
            console.log('hjdsjdj');
      
                const modalPath = path.join('file://', __dirname, '../insights/insights.html');
                let win = new BrowserWindow({
            
                })
                win.on('close', function () { win = null })
                win.loadURL(modalPath)
                win.maximize();
                win.show();
           
        } else if (response.status == "false"){
            console.log('false');
document.getElementById('errormsg').style.display="block";
document.getElementById('errormsg').innerText = "Invalid credentials"
        }
    }
}
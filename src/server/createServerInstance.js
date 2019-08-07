const electron = require('electron')
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer;
function newService(service) {

    const serviceButton = document.getElementById(service)
    serviceButton.addEventListener('click', function (event) {
        const modalPath = path.join('file://', __dirname, 'server.html')
        console.log(modalPath);
        let win = new BrowserWindow({
            modal: true,
            webPreferences: {
                nodeIntegration: true,
                webSecurity:false

            }

        });
        //condition to set service ids
        var service_id;
        if (service == 'pharmacy'){
            service_id = 4 ;
        } else if(service=='enquiries'){
            service_id = 1 ;
        }else if (service=='laboratory'){
            service_id =  6;
        }else  if (service == 'accidents_emergencies'){
            service_id = 5 ;
        }else if (service == 'paediatrics') {
            service_id = 3;
        }else if (service == 'consultation') {
            service_id = 2 ;

        }
        var service_details = {
            "service":service,
            "service_id":service_id
        };
        /*send service id by IPC*/
        ipc.send('service_details',service_details);
        win.on('close', function () {
            win = null
        });
        win.loadURL(modalPath);
        win.show()
    });
}
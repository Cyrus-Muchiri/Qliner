const {electron,remote} = require('electron');
const ipc = electron.ipcRenderer;
function submitMobile() {
    const form = document.getElementById('mobileForm');
    form.onsubmit = (function (e) {
        e.preventDefault();
    });
    const mobile = document.getElementById('mobilePhone').value;
    //ipc.send('service_id',service_id);


    addCustomerRequest(mobile);

}

function addCustomerRequest(mobile) {
    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/ticketing/addCustomer');
    request.setRequestHeader('Content-Type', 'application/json');
    var service = remote.getGlobal('service_id') ;
    let data =JSON.stringify({
        'mobile': mobile,
        'service_id': service
    });
    request.send(data);

    request.onreadystatechange = (e) => {
       response = JSON.parse(request.responseText);
      // response = request.responseText;
      // console.log(response);
        var response_div = document.getElementById('response');
        response_div.style.display = 'block';

        if(response.status == true) {

            response_div.innerHTML = response['result'];
            response_div.classList.add('alert-success');

        }else{
           // console.log('false');
            response_div.innerHTML = response['result'];
            response_div.classList.add('alert-success');
        }
    };

}
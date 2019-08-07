const {electron,remote} = require('electron');

 window.onload = function () {
    var service_details = remote.getGlobal('service_details');
    var service_id = service_details['service_id'];
    var service_name = service_details['service'];
    document.getElementById('service_title').innerText = service_name;
    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/service/serverInstance');
    request.setRequestHeader('Content-Type', 'application/json');
    let data = JSON.stringify({
        'service_id': service_id
    });
    request.send(data);

    request.onreadystatechange = (e) => {
           response = JSON.parse(request.responseText);
        //response = request.responseText;
        var table_data = '';
        var tbody = document.getElementById('customers_in_queue');
        if (response.status == true) {
        var customers = response.customers;
            for (var i = 0; i < customers.length; i++) {
                 table_data += "<tr><td>"+(i+1)+"</td><td>" + response.customers[i].ticket_no + "</td></tr>";
            }
        } else {
                table_data = "<td>No customers</td>";
        }
        tbody.innerHTML =table_data;

    };
}

function nextCustomer() {
    const ipc = require('electron').ipcRenderer
    ipc.send('ser',"Hey rus");

    //1 : display 2: server
   // ipc.sendTo(1,'next',"Men");
    //refresh table
    //refresh display
    //mark prev customer served
    //call next customer
    //send sms to the next customer

}

function addCustomerRequest(mobile) {
    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/ticketing/addCustomer');
    request.setRequestHeader('Content-Type', 'application/json');
    var service = remote.getGlobal('service_id');
    let data = JSON.stringify({
        'mobile': mobile,
        'service_id': service
    });
    request.send(data);

    request.onreadystatechange = (e) => {
        //   response = JSON.parse(request.responseText);
        response = request.responseText;
        console.log(response);
        var response_div = document.getElementById('response');
        response_div.style.display = 'block';

        if (response.status == true) {

            response_div.innerHTML = response['result'];
            response_div.classList.add('alert-success');

        } else {
            // console.log('false');
            response_div.innerHTML = response['result'];
            response_div.classList.add('alert-success');
        }
    };

}
const {electron,remote} = require('electron');
    var now_serving;
    var next_customer;
    var service_id
 window.onload = function () {
    var service_details = remote.getGlobal('service_details');
    service_id = service_details['service_id'];
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
           console.log(response);
       // response = request.responseText;
        //console.log(response);

        var table_data = '';
        var tbody = document.getElementById('customers_in_queue');
        var now_serving_dom = document.getElementById('now_serving');
        var next_customer_dom = document.getElementById('next_customer');
        if (response.status == true) {
        var customers = response.customers;
            for (var i = 0; i < customers.length; i++) {
                if(i == 0){
                    now_serving = customers[i].ticket_no;
                }else if(i==1){
                    next_customer = customers[i].ticket_no;
                }
                 table_data += "<tr><td>"+(i+1)+"</td><td>" + customers[i].ticket_no + "</td></tr>";
            }
        } else {
                table_data = "<td>No customers</td>";
        }
        tbody.innerHTML =table_data;
        now_serving_dom.innerText = now_serving;
        next_customer_dom.innerText = next_customer;

    };
}

function nextCustomer() {
    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/service/nextCustomer');
    request.setRequestHeader('Content-Type', 'application/json');
    let data = JSON.stringify({
        "current" : now_serving,
        "next" : next_customer,
        "service_id":service_id
    });
    request.send(data);

    request.onreadystatechange = (e) => {
        response = JSON.parse(request.responseText);

        if(response.status == true){
            var table_data = '';
            var tbody = document.getElementById('customers_in_queue');
            var now_serving_dom = document.getElementById('now_serving');
            var next_customer_dom = document.getElementById('next_customer');
            if (response.status == true) {
            var customers = response.customers;
                for (var i = 0; i < customers.length; i++) {
                    if(i == 0){
                        now_serving = customers[i].ticket_no;
                    }else if(i==1){
                        next_customer = customers[i].ticket_no;
                    }
                     table_data += "<tr><td>"+(i+1)+"</td><td>" + customers[i].ticket_no + "</td></tr>";
                }
            } else {
                    table_data = "<td>No customers</td>";
            }
            tbody.innerHTML =table_data;
            now_serving_dom.innerText = now_serving;
            next_customer_dom.innerText = next_customer;
        }
    }

    

}


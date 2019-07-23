function submitMobile() {
    const form = document.getElementById('mobileForm');
    form.onsubmit = (function (e) {
        e.preventDefault();
    });
    const mobile = document.getElementById('mobilePhone').value;

    addCustomerRequest(mobile);

}

function addCustomerRequest(mobile) {
    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/ticketing/addCustomer');
    request.setRequestHeader('Content-Type', 'application/json');
    let data =JSON.stringify({
        'mobile': mobile,
        'service_id': 3
    });
    request.send(data);

    request.onreadystatechange = (e) => {
       response = JSON.parse(request.responseText);
      // response = request.responseText;
        var response_div = document.getElementById('response');
        response_div.style.display = 'block';
        console.log(response);

        if(response.status == true) {
            console.log(response);
            response_div.innerHTML = response['result'];
            response_div.classList.add('alert-success');

        }else{
            console.log('false');
            response_div.innerHTML = response['result'];
            response_div.classList.add('alert-success');
        }
    };

}
const { electron, remote } = require('electron');
function submitMobile() {
    document.getElementById('error_msg').style.display="none";
    var response_div = document.getElementById('response');
    response_div.style.display = 'none';
    const form = document.getElementById('mobileForm');
    form.onsubmit = (function (e) {
        e.preventDefault();
    });
    const mobile = document.getElementById('mobilePhone').value;
    const emergency_code = document.getElementById('emergency').value;
    //validate mobile
    var re = new RegExp(/^(?:254|\+254|0)?(7(?:(?:[123456789][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/);
    if (re.test(mobile)) {
        addCustomerRequest(mobile, emergency_code);

    } else {
       document.getElementById('error_msg').style.display="block";
       document.getElementById('error_msg').innerText = "Kindly enter a valid mobile number"

    }

    //if validate success
    //else
    //display error
}

function addCustomerRequest(mobile, emergency_code) {
    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/ticketing/addCustomer');
    request.setRequestHeader('Content-Type', 'application/json');
    var service = remote.getGlobal('service_id');
    let data = JSON.stringify({
        'mobile': mobile,
        'service_id': service,
        'emergency_code': emergency_code
    });
    request.send(data);

    request.onreadystatechange = (e) => {
        response = JSON.parse(request.responseText);
        //response = request.responseText;
        //console.log(response);
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
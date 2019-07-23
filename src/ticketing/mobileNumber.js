function submitMobile() {
    const form = document.getElementById('mobileForm');
    form.onsubmit = (function (e) {
        e.preventDefault();
    });
    const mobile = document.getElementById('mobilePhone').value;

    addCustomerRequest(mobile);
}

function addCustomerRequest(mobile){
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/ticketing/addCustomer', true);
    request.setRequestHeader('Content-Type', 'application/json');
    let data = JSON.stringify({
        'mobile': mobile,
        'service_id' : 3
    });
    console.log(data);
    request.send(data);

    request.onreadystatechange = (e) => {
        console.log(request.responseText)
    }
}
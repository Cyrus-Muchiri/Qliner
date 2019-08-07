window.onload =  function initialize() {
    var response;
    var request = new XMLHttpRequest();
    request.open("GET", 'http://localhost/qliner_api/queue/index');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.onreadystatechange = (e) => {
        response = JSON.parse(request.responseText);
       // response = request.responseText;
          //  console.log(response);

        var ae_card = document.getElementById('accidents_emergencies');
        var enquiries_card = document.getElementById('enquiries');
        var pharmacy_card = document.getElementById('pharmacy');
        var consultation_card = document.getElementById('consultation')
        var paediatrics_card = document.getElementById('paediatrics');
        var lab_Card = document.getElementById('laboratory');
        if (response.status == true) {
            if (response.pharmacy.length == 0){
                pharmacy_card.innerHTML='<h2>No customers in queue </h2>';
            } if(response.pharmacy.length == 1) {
                pharmacy_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.pharmacy[0].ticket_no+'</h1>\n' +
                    '                        </div>';

            }
            if(response.pharmacy.length == 2) {
                pharmacy_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.pharmacy[0].ticket_no+'</h1>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-md-5" >\n' +
                    '\n' +
                    '                            Next Customer <h4>'+response.pharmacy[1].ticket_no+'</h4>';

            }if (response.accidents_emergencies.length == 0){
                ae_card.innerHTML='<h2>No customers in queue </h2>';
            } if(response.accidents_emergencies.length == 1) {
                ae_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.accidents_emergencies[0].ticket_no+'</h1>\n' +
                    '                        </div>';

            }
            if(response.accidents_emergencies.length == 2) {
                ae_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.accidents_emergencies[0].ticket_no+'</h1>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-md-5" >\n' +
                    '\n' +
                    '                            Next Customer <h4>'+response.accidents_emergencies[1].ticket_no+'</h4>';

            } if (response.enquiries.length == 0){
                enquiries_card.innerHTML='<h2>No customers in queue </h2>';
            } if(response.enquiries.length == 1) {
                enquiries_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.enquiries[0].ticket_no+'</h1>\n' +
                    '                        </div>';

            }
            if(response.enquiries.length == 2) {
                enquiries_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.enquiries[0].ticket_no+'</h1>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-md-5" >\n' +
                    '\n' +
                    '                            Next Customer <h4>'+response.enquiries[1].ticket_no+'</h4>';

            } if (response.laboratory.length == 0){
                lab_Card.innerHTML='<h2>No customers in queue </h2>';
            }if(response.laboratory.length == 1) {
                lab_Card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.laboratory[0].ticket_no+'</h1>\n' +
                    '                        </div>';

            }
            if(response.laboratory.length == 2) {
                lab_Card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.laboratory[0].ticket_no+'</h1>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-md-5" >\n' +
                    '\n' +
                    '                            Next Customer <h4>'+response.laboratory[1].ticket_no+'</h4>';

            } if (response.consultation.length == 0){
                consultation_card.innerHTML='<h2>No customers in queue </h2>';
            } if(response.consultation.length == 1) {
                consultation_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.consultation[0].ticket_no+'</h1>\n' +
                    '                        </div>';

            }
            if(response.consultation.length == 2) {
                consultation_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.consultation[0].ticket_no+'</h1>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-md-5" >\n' +
                    '\n' +
                    '                            Next Customer <h4>'+response.consultation[1].ticket_no+'</h4>';

            } if (response.paediatrics.length == 0){
                paediatrics_card.innerHTML='<h2>No customers in queue </h2>';
            } if(response.paediatrics.length == 1) {
                paediatrics_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.paediatrics[0].ticket_no+'</h1>\n' +
                    '                        </div>';

            }
            if(response.paediatrics.length == 2) {
                paediatrics_card.innerHTML=' <div class="col-md-7">\n' +
                    '                            Now serving <br>\n' +
                    '                            <h1>'+response.paediatrics[0].ticket_no+'</h1>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-md-5" >\n' +
                    '\n' +
                    '                            Next Customer <h4>'+response.paediatrics[1].ticket_no+'</h4>';

            }
        }
    }
};
const ipc = require('electron').ipcRenderer


ipc.on('next', function (event,text) {
    var ae_card = document.getElementById('accidents_emergencies');
    ae_card.innerHTML = "<h4>"+text+"</h4>";
});


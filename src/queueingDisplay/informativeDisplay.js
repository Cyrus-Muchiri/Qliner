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
        if (response.status == true) {
            if (response.pharmacy.length == 0){
                console.log('true') ;
            } if(response.pharmacy.length > 0) {
                console.log('false');
            } if (response.accidents_emergencies.length == 0){
                console.log('true') ;
            } if(response.accidents_emergencies.length > 0) {
                console.log('false');
            } if (response.enquiries.length == 0){
                console.log('true') ;
            } if(response.enquiries.length > 0) {
                console.log('false');
            } if (response.laboratory.length == 0){
                console.log('true') ;
            } if(response.laboratory.length > 0) {
                console.log('false');
            } if (response.consultation.length == 0){
                console.log('true') ;
            } if(response.consultation.length > 0) {
                console.log('false');
            } if (response.paediatrics.length == 0){
                console.log('true') ;
            } if(response.paediatrics.length > 0) {
                console.log('false');
            }
        }
    }
};

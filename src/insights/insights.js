var server_utilizations;
var queue_length;
window.onload = function () {
    var start_Date = "2019-08-12";
    var end_Date = "2019-08-14";

    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/insights/getInsights');
    request.setRequestHeader('Content-Type', 'application/json');
    let data = JSON.stringify({
        "start_date" : start_Date,
        "end_date" : end_Date
    });
    request.send(data);

    request.onreadystatechange = (e) => {
        response = JSON.parse(request.responseText);
       //response = request.responseText;
        var server_utilizations;
        var customers_in_queue;
       if (response.status  == "true"){
          server_utilizations = response.server_utilization;
          customers_in_queue = response.customers;
       }
        var categories = [];
        var utils= [];


            for (var i = 0; i < server_utilizations.length; i++) {
                utils.push([server_utilizations[i].utilizations]);
            }

        for (var i = 0; i < server_utilizations.length; i++) {
            categories.push([server_utilizations[i].date]);
        }
            Highcharts.chart('server_utils', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 25,
                    depth: 70
                }
            },
            title: {
                text: 'Server Utilizations'
            },
            subtitle: {
                text: 'Depicts server utilizations by date'
            },
            plotOptions: {
                column: {
                    dataLabels:{
                        enabled:true,
                        crop:false,
                        overflow: 'none'
                    },
                    depth: 25
                }
            },
            xAxis: {
                categories: categories,
                labels: {
                    skew3d: true,
                    style: {
                        fontSize: '16px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [{
                name: 'Server Utils',
                data: utils
            }]
        });

        // Graph for queue lengths on selected dates
        //geting queue length
        var queue= [];
        var days = [];


        for (var i = 0; i < customers_in_queue.length; i++) {
            queue.push([customers_in_queue[i].queue_length]);
        }

        for (var i = 0; i < customers_in_queue.length; i++) {
            days.push([customers_in_queue[i].date]);
        }
        Highcharts.chart('Queue_lengths', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 25,
                    depth: 70
                }
            },
            title: {
                text: 'Systen Queue Length'
            },
            subtitle: {
                text: 'Depicts queue lengths by date'
            },
            plotOptions: {
                column: {
                    dataLabels:{
                        enabled:true,
                        crop:false,
                        overflow: 'none'
                    },
                    depth: 25
                }
            },
            xAxis: {
                categories: days,
                labels: {
                    skew3d: true,
                    style: {
                        fontSize: '16px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [{
                name: 'Customers in queue',
                data: queue
            }]
        });




    };
}
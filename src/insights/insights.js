var server_utilizations;
var queue_length;
var keys;
window.onload = function () {
    var start_Date = "2019-08-12";
    var end_Date = "2019-08-15";

    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/insights/getInsights');
    request.setRequestHeader('Content-Type', 'application/json');
    let data = JSON.stringify({
        "start_date" : start_Date,
        "end_date" : end_Date
    });
    request.send(data);

    request.onreadystatechange = () => {
        response = JSON.parse(request.responseText);
       //response = request.responseText;
        var server_utilizations;
        var customers_in_queue;
        var service_times;
        var queue_lengths_single;
       if (response.status  == "true"){
          server_utilizations = response.server_utilization;
          customers_in_queue = response.customers;
          service_times = response.service_times;
          queue_lengths_single = response.queue_lengths;
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
        //service chart

        
        var serve_categories = [];
        var serve_times= [];


            for (var i = 0; i < service_times.length; i++) {
                serve_times.push([service_times[i].service_times]);
            }

        for (var i = 0; i < service_times.length; i++) {
            serve_categories.push([service_times[i].date]);
        }
        

            Highcharts.chart('service_times', {
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
                text: 'Service time'
            },
            subtitle: {
                text: 'Shows service times of a server'
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
                categories: serve_categories,
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
                name: 'Service times',
                data: serve_times
            }]
        });

        //individual queue lengths
        var queue_lengths_categories= new Array() ;//local
var serviceee = [];
        keys = Object.keys(queue_lengths_single);

        var count =  Object.keys(queue_lengths_single).length;
        for (var i = 0; i <count;i++) {
            var array1 = queue_lengths_single[keys[i]];
                console.log(array1);
            for (var j = 0; j < array1.length; j++) {
                serviceee[keys[j]] = new Array();

            }
             for (var j = 0; j < array1.length; j++) {
            //     queue_lengths_categories[j] = [];
            //  queue_lengths_categories.push([array1[j].length]);
           // serviceee[keys[i]][j] = new Array();
             serviceee[keys[j]].push(array1[j].length);
             console.log(serviceee[keys[j]]);
             }
        }
       // console.log(keys[1][1])
        console.log(serviceee);
       

        
        Highcharts.chart('queue_lengths_Single', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: keys,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Enquiries',
                data: serviceee[keys[0]]
        
            }, {
                name: 'consultation',
                data: serviceee[keys[1]]        
            }, {
                name: 'paediatrics',
                data:serviceee[keys[2]]
        
            }, {
                name: 'pharmacy',
                data:serviceee[keys[3]]
        
            },
            {
                name: 'accidents_emergencies',
                data: serviceee[keys[4]]        
            },
            {
                name: 'laboratory',
                data:serviceee[keys[5]]
        
            }]
        });



    };
}
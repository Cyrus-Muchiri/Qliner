var server_utilizations;
var queue_length;
var keys;

//set initial dates
var currentDate = new Date();

var date_initial = currentDate.getDate();
var month_initial = currentDate.getMonth(); //Be careful! January is 0 not 1
var year_initiial = currentDate.getFullYear();

var dateString_initial = year_initiial + "-0" +(month_initial + 1) + "-" + date_initial;
start_Date_init = dateString_initial;
end_Date_init = dateString_initial;
window.onload =initialize (start_Date_init,end_Date_init);
 function initialize (start_Date_init,end_Date_init) {
    var response;
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost/qliner_api/insights/getInsights');
    request.setRequestHeader('Content-Type', 'application/json');
    let data = JSON.stringify({
        "start_date" : start_Date_init,
        "end_date" : end_Date_init
    });
    request.send(data);

    request.onreadystatechange = () => {
        response = JSON.parse(request.responseText);
       //response = request.responseText;
        var server_utilizations;
        var customers_in_queue;
        var service_times;
        var queue_lengths_single;
        var  average_queue_length;
        var mean_today_servicetime;
       if (response.status  == "true"){
          server_utilizations = response.server_utilization;
          customers_in_queue = response.customers;
          service_times = response.service_times;
          queue_lengths_single = response.queue_lengths;
          average_queue_length=response.average_queue_length;
          average_waiting_time=response.average_waiting_time;
          mean_today_servicetime=response.average_service_time;
       }

       document.getElementById("avg_queue_length").innerText = average_queue_length;
       document.getElementById("avg_waiting_time").innerText = average_waiting_time ;
       document.getElementById("avg_service_time").innerText = mean_today_servicetime ;

      
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
                text: 'System Queue Length'
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
function selectPeriod(){
var period = document.getElementById('select_period').value
var start_Date;
var end_Date;

    if (period == 'today'){
        document.getElementById('date_picker').style.display = "none";

        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();

        var dateString = year + "-0" +(month + 1) + "-" + date;
        start_Date = dateString;
        end_Date = dateString;
        initialize(start_Date,end_Date);
    }else if (period == 'yesterday'){
        document.getElementById('date_picker').style.display = "none";
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();

        var dateString = year + "-0" +(month + 1) + "-" + (date-1);
        start_Date = dateString;
        end_Date = dateString;
        initialize(start_Date,end_Date);
    }else if (period == 'lastweek'){
        document.getElementById('date_picker').style.display = "none";
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();

    
        start_Date =  year + "-0" +(month + 1) + "-" + (date - 7) ;
        end_Date =  year + "-0" +(month + 1) + "-" + date;;
        initialize(start_Date,end_Date);
    }else if (period == 'custom'){
        document.getElementById('date_picker').style.display = "block";

    }
}
function selectPeriod_datePicker(){
    var start_Date = document.getElementById("start_date").value;
    var end_Date = document.getElementById("end_date").value;

    initialize(start_Date,end_Date);
}
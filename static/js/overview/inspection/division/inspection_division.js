var observer = new IntersectionObserver(function (entries) {
    entries.forEach(e => {
        if (e.isIntersecting === true) {
            if (!isNaN(e.target.innerHTML)) {
                let id = e.target.id;
                let innerHTML = e.target.innerHTML;
                craftChart(id, gaugeOptions, [{
                    data: [Number(Number(innerHTML).toFixed(2))],
                }],
                    {
                        chart: {
                            height: 50,
                            width: 64,
                            backgroundColor: 'transparent'
                        },
                        yAxis: {
                            stops: [
                                [0.1, '#DF5353'], // red
                                [0.5, '#DDDF0D'], // yellow
                                [0.9, '#55BF3B']  // green
                            ]
                        },
                        plotOptions: {
                            solidgauge: {
                                dataLabels: {
                                    verticalAlign: "middle",
                                    borderWidth: 0,
                                    useHTML: true,
                                    format:
                                        '<div style="text-align:center">' +
                                        '<span>{y}%</span>' +
                                        '</div>'
                                }
                            }
                        }
                    }
                )

            }
        }
    });
}, { threshold: [0.5] });


$('document').ready(() => {
    let div_list = document.querySelectorAll('.gauge-charts'); // returns NodeList
    let div_array = [...div_list]; // converts NodeList to Array
    div_array.forEach(div => {
        observer.observe(div);
    });

    // datetimepicker
    datepicker('input.date');

})

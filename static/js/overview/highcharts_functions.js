const gaugeOptions = {
    chart: {
        type: 'solidgauge',
        height: 120,
        margin: [0, 0, 0, 0],
    },

    title: null,

    pane: {
        size: '100%',
        background: {
            backgroundColor:
                '#fff',
            borderWidth: 0,
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 0,
        labels: {
            enabled: false
        }
    },

    credits: {
        enabled: false
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
                verticalAlign: "middle",
                borderWidth: 0,
                useHTML: true,
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:25px">{y}%</span>' +
                    '</div>'
            }
        }
    }
};

const pieOptions = {
    chart: {
        margin: [35, 0, 0, 0],
        height: 200,
        type: 'pie'
    },
    title: {
        text: 'สถานะทั้งหมด',
        align: 'left'
    },
    legend: {
        labelFormat: '{name}',
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemMarginBottom: 10,
        x: -50
    },
    plotOptions: {
        pie: {
            center: [150, 50],
            size: "110%",
            borderWidth: 0
        },
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: -25,
                format: '{point.percentage:.1f}%',
                style: {
                    color: "#fff",
                    fontSize: '0.8em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>=',
                    property: 'percentage',
                    value: 10
                }
            },
            {
                enabled: true,
                distance: -12,
                format: '{point.percentage:.1f}%',
                style: {
                    color: "#fff",
                    fontSize: '0.5em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '<',
                    property: 'percentage',
                    value: 10
                }
            }
            ],
            showInLegend: true
        }
    },
    credits: { enabled: false },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 450
            },
            chartOptions: {
                chart: {
                    margin: [20, 0, 30, 0],
                    height: 300,
                    type: 'pie'
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal',

                    labelFormat: '{name}',
                    itemMarginBottom: 0,
                    x: 0
                },
                plotOptions: {
                    pie: {
                        center: [null, 80],
                        size: "80%",
                        borderWidth: 0
                    },

                },
                credits: {
                    enabled: false
                }
            }
        }]
    },

};

const barOptions = {
    colors: ['#461959', '#7A316F', '#CD6688', '#AED8CC', '#D9D9D9'],
    chart: {
        height: 260,
        type: 'bar',
        backgroundColor: '#f8f4f4'
    },
    title: {
        text: 'ประเภทสภาพปัญหาความเดือดร้อน(นักเรียน)',
        align: 'left'
    },
    xAxis: {
        categories: ['มิติความเป็นอยู่อาศัย', 'มิติรายได้', 'มิติการเข้าถึงบริการรัฐ', 'มิติสุขภาพ', 'มิติการศึกษา'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        tickPixelInterval: 100,
        // max:4,
        title: {
            text: '',
        },
    },
    tooltip: {
        format: "<b>{key}<br>{y} เคส</b>"
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                format: '{y} เคส'
            },
            colorByPoint: true,
            showInLegend: false
        }
    },

    credits: {
        enabled: false
    }
};

function craftChart(container, chartOptions, seriesValues, otherOptions = {}) {
    return Highcharts.chart(container, Highcharts.merge(chartOptions, { series: seriesValues }, otherOptions));
}

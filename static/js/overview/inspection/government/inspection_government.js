var observer = new IntersectionObserver(function (entries) {
    entries.forEach(e => {
        if (e.isIntersecting === true) {
            if (!isNaN(e.target.innerHTML)) {
                let id = e.target.id;
                let innerHTML = e.target.innerHTML;


            }
        }
    });
}, { threshold: [1] });


$('document').ready(() => {
    // gauge chart
    let budget_spent_gauge = document.getElementById('budget-spent-gauge');
    if (budget_spent_gauge) {
        craftChart(budget_spent_gauge.id, gaugeOptions, [{
            data: [Number(Number(budget_spent_gauge.innerHTML).toFixed(2))],
        }],
            {
                chart: {
                    height: 260,
                    // width: 180,
                    margin: [35, 0, 0, 0],
                    backgroundColor: "transparent"
                },
                title: {
                    text: 'งบประมาณที่ถูกใช้ไป',
                    align: 'center'
                },
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'],  // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'], // red
                    ]
                },

                pane: {
                    size: '80%',
                    thickness: 100,
                    background: {
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        shape: 'arc'
                    }
                },
                plotOptions: {
                    solidgauge: {
                        innerRadius:"75%",
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
            }
        )

    }

        // bar chart
    let number_problem_by_moneyType_bar = document.getElementById('number_problem_by_moneyType-bar');
    if (number_problem_by_moneyType_bar) {
        craftChart(number_problem_by_moneyType_bar.id, barOptions, [{
            name: 'ประเภทสภาพปัญหาความเดือดร้อน',
            data: [
                Number(document.getElementById("number_problem_by_moneyType_kid").value),
                Number(document.getElementById("number_problem_by_moneyType_elderly").value),
                Number(document.getElementById("number_problem_by_moneyType_disabled").value),
                Number(document.getElementById("number_problem_by_moneyType_fragile").value),
                Number(document.getElementById("number_problem_by_moneyType_poor").value),
            ]
        }],
            {colors: ['#44BA6A', '#B1E7C1', '#CADDCF', '#F5D9E9', '#F499C9'],
            chart: {
                height: 260,
                width: 420,
                backgroundColor: 'transparent'
            },
                title: {
                    text: 'จำนวนผู้ประสบปัญหาตามกลุ่มเป้าหมาย',
                    align: 'center',
                    
                },
                xAxis: {
                    categories: ['เด็ก', 'ผู้สูงอายุ', 'ผู้พิการ', 'ครัวเรือนเปราะบาง', 'ครัวเรือนยากจน'],
                    title: {
                        text: null
                    }
                },
            }
        );
    }

    // datetimepicker
    datepicker('input.date');

})

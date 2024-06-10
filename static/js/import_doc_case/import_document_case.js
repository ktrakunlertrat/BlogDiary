var i_address_start = 24;
var i_address_end = 30;
var p_problem_start = 31;
var p_problem_end = 55;
var p_pre_address_start = 42;
var p_pre_address_end = 48;
var p_per_address_start = 50;
var p_per_address_end = 56;

$('document').ready(async function () {

    $('.target-button').on('click', function () {
        $(this).addClass('active');
        $('.target-button').not(this).removeClass('active');
    });

    $('select[name="i_relationship"]').on('change', (e) => {
        disableColumns(e,p_problem_start,p_problem_end);
    });

    $('input[name="p_same_address"]').on('change', (e) => {
        disableColumns(e,p_per_address_start,p_per_address_end);
    });

    $('input[name="i_same_address"]').on('change', (e) => {
        disableColumns(e,i_address_start,i_address_end);
    });

    $('input[name="pi_pre_same_address"]').on('change', (e) => {
        disableColumns(e,p_pre_address_start,p_pre_address_end);
    });

})

function disableColumns(e,start_column,end_column){
    if(e.target === undefined){
        var val = e.value;
    } else {
        var val = e.target.value;
    }
    let table = $('.table-warp table').DataTable();
    let columns = table.row( $(e.target).closest('td').get(0)).node().children;
    if (val == '1') {
        for (let i = start_column; i <= end_column; i++) {
            $(columns[i]).addClass("disabled-column");
            for (e in columns[i].children) {
                if (columns[i].children[e].tagName == "INPUT" || columns[i].children[e].tagName == "SELECT") {
                    columns[i].children[e].setAttribute("disabled", "disabled");
                    
                }
                else if(hasClass(columns[i].children[e], "date-time")){
                    for (ele in columns[i].children[e].children) {
                        if (columns[i].children[e].children[ele].tagName == "INPUT" || columns[i].children[e].children[ele].tagName == "SELECT") {
                            columns[i].children[e].children[ele].setAttribute("disabled", "disabled");
                            
                        }
                    }
                }
            }
        }
    } else {
        for (let i = start_column; i <= end_column; i++) {
            $(columns[i]).removeClass("disabled-column")
            for (e in columns[i].children) {
                if (columns[i].children[e].tagName == "INPUT" || columns[i].children[e].tagName == "SELECT") {
                    columns[i].children[e].removeAttribute("disabled")
                }
                else if(hasClass(columns[i].children[e], "date-time")){
                    for (ele in columns[i].children[e].children) {
                        if (columns[i].children[e].children[ele].tagName == "INPUT" || columns[i].children[e].children[ele].tagName == "SELECT") {
                            columns[i].children[e].children[ele].removeAttribute("disabled");
                        }
                    }
                }
            }
        }
    }      
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

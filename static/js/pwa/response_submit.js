$(document).ready(function () {
    loadFormToLocalStorage();
    loadPassPage();
    if (sessionStorage.getItem("edit")) {
        let url_val = window.location.pathname.replace("/", "");
        $('#page_action').html(`
            <a href="pwa_save_form" type="button" class="btn btn-secondary">ยกเลิก</a>
            <input type="submit" value="บันทึก" class="btn btn-success btn" onclick="return validate_form()">
            `);
    }
    history.pushState(null, null, window.location.pathname);
})
var url_dict = {
    // 'pwa_login': 'pwa_login_check',
    'pwa_consent_form': 'pwa_consent_form_insert',
    'pwa_one': 'pwa_one_insert',
    'pwa_one_edit': 'pwa_one_insert',
    'pwa_type_people': 'pwa_check_status_people',
    'pwa_two_one': 'pwa_two_one_insert',
    'pwa_two_two': 'pwa_two_two_insert',
    'pwa_address': 'pwa_check_address',
    'pwa_three': 'pwa_three_insert',
    'pwa_present_address': 'pwa_four',
    'pwa_four': 'pwa_four_insert',
    'pwa_four_one': 'pwa_four_one_insert',
    'pwa_four_two': 'pwa_four_two_insert',
    // 'pwa_four_two_edit': 'pwa_four_two_edit_update',
    'pwa_five': 'pwa_five_insert',
    'pwa_six_one': 'pwa_six_one_insert',
    'pwa_six_two': 'pwa_six_two_insert',
    'pwa_six_three': 'pwa_six_three_insert',
    'pwa_six_four': 'pwa_six_four_insert',
    'pwa_six_five': 'pwa_six_five_insert',
    'pwa_six_six': 'pwa_six_six_insert',
    'pwa_six_seven': 'pwa_six_seven_insert',
    'pwa_six_eight': 'pwa_six_eight_insert',
    'pwa_six_nine': 'pwa_six_nine_insert',
    'pwa_seven_one': 'pwa_seven_one_insert',
    'pwa_seven_two': 'pwa_seven_two_insert',
    'pwa_seven_three': 'pwa_seven_three_insert',
    'pwa_eight': 'pwa_eight_insert',
    'pwa_nine': 'pwa_nine_insert',
    'pwa_ten': 'pwa_ten_insert',
    'pwa_ten_doc': 'pwa_ten_doc_insert',
    // 'pwa_show_data': 'pwa_send_status',
}

var redirect_dict = {
    'pwa_login': 'pwa_main',
    'pwa_one1': 'pwa_two_one',
    'pwa_one2': 'pwa_type_people',
    'pwa_one_edit1': 'pwa_two_one',
    'pwa_one_edit2': 'pwa_type_people',
    'pwa_type_people1': 'pwa_two_one',
    'pwa_type_people2': 'pwa_two_two',
    'pwa_two_one': 'pwa_address',
    'pwa_two_two': 'pwa_address',
    'pwa_address': 'pwa_three',
    'pwa_three': 'pwa_present_address',
    'pwa_present_address': 'pwa_four',
    'pwa_four': 'pwa_four_one',
    'pwa_four_one': 'pwa_four_two',
    'pwa_four_two': 'pwa_four_two',
    'pwa_four_two_edit': 'pwa_four_two',
    'pwa_five': 'pwa_six_one',
    'pwa_six_one': 'pwa_six_two',
    'pwa_six_two': 'pwa_six_three',
    'pwa_six_three': 'pwa_six_four',
    'pwa_six_four': 'pwa_six_five',
    'pwa_six_five': 'pwa_six_six',
    'pwa_six_six': 'pwa_six_seven',
    'pwa_six_seven': 'pwa_six_eight',
    'pwa_six_eight': 'pwa_six_nine',
    'pwa_six_nine': 'pwa_seven_one',
    'pwa_seven_one': 'pwa_seven_two',
    'pwa_seven_two': 'pwa_seven_three',
    'pwa_seven_three': 'pwa_eight',
    'pwa_eight': 'pwa_nine',
    'pwa_nine': 'pwa_ten',
    'pwa_ten': 'pwa_ten_doc',
    'pwa_ten_doc': 'pwa_save_form',
    'pwa_save_form': 'pwa_main',
    'pwa_show_data': 'pwa_clear_session',
    'pwa_consent_form': 'pwa_one',
}


$('#myForm').on('submit', function (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    if (values.url_val == 'pwa_six_nine') {
        saveFormToLocalStorage(values)

        if (sessionStorage.getItem('edit')) {
            window.location.replace('pwa_save_form');
        } else {
            if (!is_checked(values.url_val)) {
                $('#master_modal').modal('show');
                $('#div_modal_body').text('กรุณา เลือก สภาพปัญหาความเดือดร้อนอย่างน้อย อย่างน้อย 1 ข้อ');
            } else {
                window.location.replace(redirect_dict[values.redi_val.replace("/", "")]);
            }
        }

    } else if (values.url_val.startsWith('pwa_seven_three')) {
        saveFormToLocalStorage(values)

        if (sessionStorage.getItem('edit')) {
            window.location.replace('pwa_save_form');
        } else {
            if (!is_checked(values.url_val)) {
                $('#master_modal').modal('show');
                $('#div_modal_body').text('กรุณา เลือก เรื่องขอรับความช่วยเหลือที่ต้องการ อย่างน้อย 1 ข้อ');
            } else {
                window.location.replace(redirect_dict[values.redi_val.replace("/", "")]);
            }
        }


    }
    else if (values.url_val.startsWith('pwa_two_one') || values.url_val.startsWith('pwa_two_two')) {
        check_people(values).then((result) => {
            if (result == 'ok') {
                saveFormToLocalStorage(values)
                if (localStorage.getItem("case_" + get_maxcase())) {
                    let case_data = JSON.parse(localStorage.getItem("case_" + get_maxcase()))

                        if (sessionStorage.getItem('edit')) {
                            window.location.replace('pwa_save_form');
                        } else {
                            if (case_data.pwa_one.type_informer == "1") {
                                window.location.replace(redirect_dict['pwa_address']);
                            } else {
                            window.location.replace(redirect_dict[values.redi_val.replace("/", "")]);}
                        }
                    
                } else
                    if (sessionStorage.getItem('edit')) {
                        window.location.replace('pwa_save_form');
                    } else {
                        window.location.replace(redirect_dict[values.redi_val.replace("/", "")]);
                    }
            }
        })
    }
    else if (values.url_val.startsWith('pwa_one')) {
        check_people(values).then((result) => {
            if (result == 'ok') {
                saveFormToLocalStorage(values)
                if (sessionStorage.getItem('edit')) {
                    window.location.replace('pwa_save_form');
                } else {
                    window.location.replace(redirect_dict[values.redi_val.replace("/", "")]);
                }
            }
        })
    }
    else if (window.location.pathname.replace("/", "") == 'pwa_three') {
        let case_data = JSON.parse(localStorage.getItem("case_" + get_maxcase()))
        if (case_data.pwa_one.type_informer == "1") {
            saveFormToLocalStorage(values)
            if (sessionStorage.getItem('edit')) {
                window.location.replace('pwa_save_form');
            } else {
                window.location.replace(redirect_dict['pwa_present_address']);
            }
        }
        else if (localStorage.getItem('location_pack') ||
            case_data.pwa_noe.same_permanent_present == "1") {
            province = JSON.parse(localStorage.getItem('location_pack')).province[0].id
            if (Number(values.province) != Number(province)) {
                saveFormToLocalStorage(values)
                let case_data = JSON.parse(localStorage.getItem("case_" + get_maxcase()))
                case_data.pwa_present_address.present_address = "2";
                localStorage.setItem("case_" + get_maxcase(), JSON.stringify(case_data))

                if (sessionStorage.getItem('edit')) {
                    window.location.replace('pwa_save_form');
                } else {
                    window.location.replace(redirect_dict['pwa_present_address']);
                }

            } else {
                saveFormToLocalStorage(values)
                if (sessionStorage.getItem('edit')) {
                    window.location.replace('pwa_save_form');
                } else {
                    window.location.replace(redirect_dict[values.redi_val.replace("/", "")]);
                }
            }

        }
    }
    else {
        saveFormToLocalStorage(values);
        if (sessionStorage.getItem('edit')) {
            window.location.replace('pwa_save_form');
        } else {
            window.location.replace(redirect_dict[values.redi_val.replace("/", "")]);
        }
    }
})

function check_people(values) {
    return new Promise((resolve) => {
        if (values['in_edit'] == 'in_edit') return resolve('ok')
        if (values['GiveName'] == undefined || values['FamilyName'] == undefined || values['CitizenID'] == undefined) return resolve('ok')
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: "POST",
            url: "check_exist_people",
            // dataType: "text",
            // processData: false,  // tell jQuery not to process the data
            // contentType: false,  // tell jQuery not to set contentType
            data: { 'GiveName': values['GiveName'], 'FamilyName': values['FamilyName'], 'CitizenID': values['CitizenID'], 'csrfmiddlewaretoken': csrftoken },
            success: function (response, textStatus, xhr) {
                switch (response.result) {
                    case 'ok':
                        return resolve('ok')
                        break;
                    case 'already_exists':
                        $('#loading').hide();
                        setTimeout(function () {
                            GiveName.scrollIntoView({
                                behavior: 'auto',
                                block: 'center',
                                inline: 'center'
                            });
                        }, 500);
                        $('#master_modal').modal('show');
                        $('#div_modal_body').text('ชื่อ-นามสกุลนี้ เคยถูกบันทึกข้อมูลเข้ามาแล้ว กรุณาลองใหม่อีกครั้ง');
                        return resolve('not_ok')
                        break;
                    case 'cid_already_exists':
                        $('#loading').hide();
                        setTimeout(function () {
                            CitizenID.scrollIntoView({
                                behavior: 'auto',
                                block: 'center',
                                inline: 'center'
                            });
                        }, 500);
                        $('#master_modal').modal('show');
                        $('#div_modal_body').text('เลขบัตรประชาชนนี้ เคยถูกบันทึกข้อมูลเข้ามาแล้ว กรุณาลองใหม่อีกครั้ง');
                        return resolve('not_ok')
                        break;
                    case 'login_failed':
                        $('#loading').hide();
                        return resolve(window.location.replace(window.location.origin))

                        break;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return resolve('ok')
            }
        })
    })
}


function is_checked(url) {
    url = url.slice(0, 7);
    if (!localStorage.getItem("case_" + get_maxcase())) return false
    let keys = JSON.parse(localStorage.getItem("case_" + get_maxcase()))
    for (const key in keys) {
        if (key.startsWith(url)) {
            for (const k in keys[key]) if (keys[key][k].toLowerCase() == 'true') return true
        }
    }
    return false;
}


function saveFormToLocalStorage(values) {
    delete values["csrfmiddlewaretoken"]
    // delete values["url_val"]
    // delete values["redi_val"]
    if (!localStorage.getItem("case_" + get_maxcase())) return 0
    data = JSON.parse(localStorage.getItem("case_" + get_maxcase()))
    data[values.url_val] = values
    let q = getQ()
    q[values.url_val] = 'filled';

    if (values.url_val == "pwa_address") {
        q['type_address'] = values.type_address;
    }
    setQ(q)

    if (values.url_val == "pwa_two_one") {
        data["pwa_two_two"] = {}
    } else if (values.url_val == "pwa_two_two") {
        data["pwa_two_one"] = {}
    }



    localStorage.setItem("case_" + get_maxcase(), JSON.stringify(data))
}

function get_maxcase() {
    if (localStorage.getItem('maxcase'))
        return Number(localStorage.getItem('maxcase'))
    let maxcase = 0;
    for (var i = 0; i < localStorage.length; i++)
        if (localStorage.key(i).startsWith('case_')) maxcase += 1;
    localStorage.setItem('maxcase', maxcase)
    return maxcase;
}

function loadFormToLocalStorage() {
    if (!localStorage.getItem("case_" + get_maxcase())) return 0;
    let url_val = window.location.pathname.replace("/", "");

    data = JSON.parse(localStorage.getItem("case_" + get_maxcase()));

    keys = data[url_val];

    if (JSON.stringify(keys) == "{}") return 0;

    if (url_val == 'pwa_one') {
        dochange('loadData', url_val);
        dochange_ap('loadData', url_val);
    } else if (url_val == 'pwa_three' || url_val == 'pwa_four') dochange('loadData', url_val);

    for (key in keys) {
        if (keys[key] == '') continue;
        if (document.getElementsByName(key).length == 0) continue;
        element = document.getElementsByName(key)[0];
        if (element.type == 'file') continue;
        if (key == 'BirthDate') {
            BirthDate = keys[key].split("-");
            document.getElementById("select-day").value = Number(BirthDate[2])
            document.getElementById("select-month").value = Number(BirthDate[1]) - 1
            document.getElementById("select-day").dispatchEvent(new Event('change'))
            
        } else if (key == 'father_BirthDate') {
            BirthDate = keys[key].split("-");
            document.getElementById("select-day-father").value = Number(BirthDate[2])
            document.getElementById("select-month-father").value = Number(BirthDate[1]) - 1
            document.getElementById("select-day-father").dispatchEvent(new Event('change'))
        } else if (key == 'mother_BirthDate') {
            BirthDate = keys[key].split("-");
            document.getElementById("select-day-mother").value = Number(BirthDate[2])
            document.getElementById("select-month-mother").value = Number(BirthDate[1]) - 1
            document.getElementById("select-day-mother").dispatchEvent(new Event('change'))
        }
        if (element.tagName == "INPUT" && element.value == "" || key == "select-year" || key == "select-year-father" || key == "select-year-mother") {
            element.value = keys[key];
            element.dispatchEvent(new Event('change'));
        }
        else if (element.tagName == "SELECT" || element.tagName == 'TEXTAREA') element.value = keys[key]
        else if (element.type == "radio") {
            radio = document.getElementsByName(key);
            for (let i = 0; i < radio.length; i++) {
                if (radio[i].value == keys[key]) {
                    radio[i].checked = true;
                    if (radio[i].name == "received" && radio[i].value == "True")
                        document.getElementById("detail").style.display = "block";
                    break;
                }
            }
        } else if (element.type == "checkbox") {

            if (key == "same_permanent_present") {
                if (keys[key] == '1') {
                    document.getElementById("same_permanent_present").checked = true;
                    element.dispatchEvent(new Event('click'));
                }
            } else {
                element.checked = true;
                element.dispatchEvent(new Event('click'));
                element.dispatchEvent(new Event('change'));
            }
        }
    }
    if (url_val == 'pwa_one' && Number(keys["type_informer"])==1) {
        let relation_case = document.getElementById("relation_case");
        relation_case.value = 1;
        // relation_case.disabled = true;
        relation_case.classList.add("disabled");
    }
}

function loadPassPage() {
    if (!localStorage.getItem("case_" + get_maxcase())) return 0;
    let url_val = window.location.pathname.replace("/", "");

    data = JSON.parse(localStorage.getItem("case_" + get_maxcase()));

    // ยื่นด้วยตนเอง
    if (url_val == 'pwa_two_one' && data['pwa_one']['type_informer'] == '1') {

        keys = data['pwa_one'];
        if (JSON.stringify(keys) == "{}") return 0;
        document.getElementById('select-month').classList.add("disabled");
        document.getElementById('select-day').classList.add("disabled");
        
        if(!keys['no_citizenidentification_check']){
            let element = document.getElementsByName("no_citizenidentification_check")[0];
            element.classList.add("disabled");
            element.checked = false;
            element.dispatchEvent(new Event('change'));
        }
        for (key in keys) {
            if (keys[key] == '' || key == 'url_val' || key == 'redi_val') continue;
            if (document.getElementsByName(key).length == 0) continue;
            element = document.getElementsByName(key)[0];
            if (key == 'BirthDate') {
                BirthDate = keys[key].split("-");
                document.getElementById("select-day").value = Number(BirthDate[2])
                document.getElementById("select-month").value = Number(BirthDate[1]) - 1
                document.getElementById("select-day").dispatchEvent(new Event('change'))
            }
            if (element.tagName == "INPUT" || key == "select-year") {
                element.value = keys[key];          
            }

            else if (element.tagName == "SELECT") element.value = keys[key]
            if (element.type == "radio") {  
                radio = document.getElementsByName(key);
                for (let i = 0; i < radio.length; i++) {
                    // radio[i].classList.add("disabled"); 
                    if (radio[i].value == keys[key]) {
                        radio[i].checked = true;
                    }
                }
            }
            if(element.type == "checkbox") {
                element.checked = true;
                element.dispatchEvent(new Event('change'));
            }
            if(key != 'marital_status'){
                element.classList.add("disabled");  
            }
        }
    }
    else if (url_val == 'pwa_three') {
        let keys = data['pwa_one'];
        if (data['pwa_address']['type_address'] == '1') {
            if (JSON.stringify(keys) == "{}") return 0;
            dochange('loadData', 'pwa_one');

            for (key in keys) {
                if (keys[key] == '' || key == 'redi_val' || key == 'url_val') continue;
                if (document.getElementsByName(key).length == 0) continue;
                element = document.getElementsByName(key)[0];
                if (element.tagName == "INPUT" || key == "select-year")
                    element.value = keys[key];
                else if (element.tagName == "SELECT") {
                    element.value = keys[key]
                }

            }
        }
        if (data['pwa_one']['type_informer'] == '1') {
            if (JSON.stringify(keys) == "{}") return 0;

            if (data['pwa_one']['same_permanent_present'] == '1') {
                dochange('loadData', 'pwa_one');

                for (key in keys) {
                    if (keys[key] == '' || key == 'redi_val' || key == 'url_val') continue;
                    if (document.getElementsByName(key).length == 0) continue;
                    element = document.getElementsByName(key)[0];
                    if (element.tagName == "INPUT" || key == "select-year")
                        element.value = keys[key];
                    else if (element.tagName == "SELECT") {
                        element.value = keys[key]
                    }

                }

            } else {
                dochange_p_ap('loadData', 'pwa_one');
                for (key in keys) {
                    if (keys[key] == '' || key == 'redi_val' || key == 'url_val') continue;
                    if (!key.startsWith('ap_')) continue;
                    if (document.getElementsByName(key.replace('ap_', '')).length == 0) continue;
                    element = document.getElementsByName(key.replace('ap_', ''))[0];
                    if (element.tagName == "INPUT" || key == "select-year")
                        element.value = keys[key];
                    else if (element.tagName == "SELECT") {
                        element.value = keys[key]
                    }
                }

            }

        }

    }
    else if (url_val == 'pwa_four') {
        if (data['pwa_present_address']['present_address'] == '1') {
            let keys = data['pwa_three'];
            if (JSON.stringify(keys) == "{}") {
                keys = data['pwa_one'];
                dochange('loadData', 'pwa_one');
            } else dochange('loadData', 'pwa_three')

            for (key in keys) {
                if (keys[key] == '' || key == 'redi_val' || key == 'url_val') continue;
                if (document.getElementsByName(key).length == 0) continue;
                element = document.getElementsByName(key)[0];
                if (element.tagName == "INPUT" || key == "select-year")
                    element.value = keys[key];
                else if (element.tagName == "SELECT") element.value = keys[key]

            }

        } else if (data['pwa_one']['type_informer'] == '1') {
            let keys = data['pwa_one'];
            if (JSON.stringify(keys) != "{}") {
                keys = data['pwa_one'];
                dochange('loadData', 'pwa_one');
            }

            for (key in keys) {
                if (keys[key] == '' || key == 'redi_val' || key == 'url_val') continue;
                if (document.getElementsByName(key).length == 0) continue;
                element = document.getElementsByName(key)[0];
                if (element.tagName == "INPUT" || key == "select-year")
                    element.value = keys[key];
                else if (element.tagName == "SELECT") element.value = keys[key]

            }
        }
    }
    else if (url_val == 'pwa_four_one' && data['pwa_one']['type_informer'] == '1') {
        let keys = data['pwa_one'];

        for (key in keys) {
            if (keys[key] == '') continue;
            if (document.getElementsByName(key).length == 0) continue;
            element = document.getElementsByName(key)[0];
            if (element.type == "radio") {
                radio = document.getElementsByName(key);
                for (let i = 0; i < radio.length; i++) {
                    if (radio[i].value == keys[key]) {
                        radio[i].checked = true;
                        break;
                    }
                }
            }
        }
    }
}

function setQ(headlist, numcase = get_maxcase()) {
    if (headlist === undefined || headlist === null) {
        let u_id = JSON.parse(localStorage.getItem('user_data')).user_id;
        headlist = {
            pwa_consent_form: "unfilled",
            pwa_one: "unfilled",
            pwa_type_people: "unfilled",
            pwa_two_one: "unfilled",
            pwa_two_two: "unfilled",
            pwa_address: "unfilled",
            pwa_three: "unfilled",
            pwa_present_address: "ok",
            pwa_four: "unfilled",
            pwa_four_one: "unfilled",
            pwa_four_two: [
                {
                    result: "unfilled",
                    fam_people_id: ""
                }
            ],
            pwa_four_two_edit: "unfilled",
            pwa_five: "unfilled",
            pwa_six_one: "unfilled",
            pwa_six_two: "unfilled",
            pwa_six_three: "unfilled",
            pwa_six_four: "unfilled",
            pwa_six_five: "unfilled",
            pwa_six_six: "unfilled",
            pwa_six_seven: "unfilled",
            pwa_six_eight: "unfilled",
            pwa_six_nine: "unfilled",
            pwa_seven_one: "unfilled",
            pwa_seven_two: "unfilled",
            pwa_seven_three: "unfilled",
            pwa_eight: "unfilled",
            pwa_nine: "unfilled",
            pwa_ten: "unfilled",
            pwa_ten_doc: "unfilled",

            type_informer: "",
            informer_id: "",
            type_people: "",
            people_id: "",
            permanent_address_id: "",
            present_address_id: "",
            postcode_id: "",
            consent_id: "",
            survey_id: "",
            user_id: u_id,
        };
    }
    let qJSON = JSON.stringify(headlist);
    localStorage.setItem("caseQ_" + numcase, qJSON);
}

function getQ(numcase) {
    numcase = typeof numcase !== "undefined" ? numcase : get_maxcase();
    if (localStorage.getItem("caseQ_" + numcase)) {
        qJSON = localStorage.getItem("caseQ_" + numcase);
        return JSON.parse(qJSON);
    } else {
        setQ(undefined, numcase);
        qJSON = localStorage.getItem("caseQ_" + numcase);
        return JSON.parse(qJSON);
    }
}

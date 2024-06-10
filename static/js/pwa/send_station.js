async function senders() {
    const maxcase = get_maxcase();
    for (let i = 1; i <= maxcase; i++) {
        let result = find_unfilled(i)
        if (result) {// some page not fileed unready to send.

            //     // await sender(i);
            //     // await clearSession();
        } else {// all page filled ready to send.
            await sender(i);
            await clearSession();
        }
    }
}

function find_unfilled(numcase) {
    let keys = getQ(numcase);
    let user_id = JSON.parse(localStorage.getItem('user_data')).user_id;
    if (Number(keys['user_id']) != Number(user_id)) return 'another user case at case ' + numcase;
    if (keys['type_informer'].toString() == "1") { //ยื่นด้วยตนเอง
        let pagepass = ['pwa_type_people', 'pwa_two_two', 'pwa_address', 'pwa_four_two', 'pwa_four_two_edit', 'pwa_three'];

        if (keys["type_informer_from"] !== undefined) {
            if (keys["type_informer_from"] == 3) pagepass.push("pwa_consent_form")
        }


        for (const key in keys) {
            if (pagepass.includes(key)) continue;
            if (keys[key] == 'unfilled') return key;
        }
    } else if (keys['type_informer'].toString() == "2") { //ยื่นแทน
        if (keys['type_people'].toString() == "") return 'pwa_type_people'; //ไม่มี type_people
        let pagepass = ['pwa_address', 'pwa_four_two', 'pwa_four_two_edit'];
        if (keys['type_people'].toString() == "1") pagepass.push("pwa_two_two") //บุคคลทั้วไป
        else if (keys['type_people'].toString() == "2") pagepass.push("pwa_two_one") //เด็ก
        if (keys["type_informer_from"] !== undefined) {
            if (keys["type_informer_from"] == 3) pagepass.push("pwa_consent_form")
        }
        for (const key in keys) {
            if (pagepass.includes(key)) continue;
            if (keys[key] == 'unfilled') return key;
        }

    } else return 'pwa_one'; //ไม่ได้เลือกประเภทผู้ประสบปัญหา

    return null;
}


function is_full_filled(numcase) {
    // let q = getQ(i);
    let caze = JSON.parse(localStorage.getItem("case_" + numcase))
    if (JSON.stringify(caze.pwa_consent_form) == "{}") return "pwa_consent_form";
    console.log(JSON.stringify(caze.pwa_one))
    if (JSON.stringify(caze.pwa_one) == "{}") return "pwa_one";
    if (JSON.stringify(caze.pwa_two_one) == "{}" && JSON.stringify(caze.pwa_two_two) == "{}") {
        if (JSON.stringify(caze.pwa_two_one) == "{}") return "pwa_two_one";
        if (JSON.stringify(caze.pwa_two_two) == "{}") return "pwa_two_two";
    }
    if (JSON.stringify(caze.pwa_three) == "{}") return "pwa_three";
    if (JSON.stringify(caze.pwa_four) == "{}") return "pwa_four";
    if (JSON.stringify(caze.pwa_four_one) == "{}") return "pwa_four_one";
    if (JSON.stringify(caze.pwa_five) == "{}") return "pwa_five";
    if (!is_filled('pwa_six', numcase)) return "pwa_six_one";
    if (!is_filled('pwa_seven', numcase)) return "pwa_seven_one";
    if (JSON.stringify(caze.pwa_eight) == "{}") return "pwa_eight";
    if (JSON.stringify(caze.pwa_nine) == "{}") return "pwa_nine";
    if (JSON.stringify(caze.pwa_ten == JSON.stringify({
        "imgExteriorHouse": "",
        "imgInteriorHouse": "",
        "imgFamilyMember": "",
        "imgProblem": "",
        "img_people": "",
    }))) return "pwa_ten";
    if (JSON.stringify(caze.pwa_ten_doc == JSON.stringify({
        "img_id_card_case": "",
        "img_house_registration_house_case": "",
        "img_house_registration_people_case": "",
        "img_book_bank_case": "",
        "img_ktb": "",
        "img_privacy": "",
        "img_disabled_card_case": "",
        "img_id_card_parent": "",
        "img_house_registration_parent": "",
        "img_other": ""
    })
    )) return "pwa_ten_doc";
    return "full_filed";
}

async function sender(numcase) { //one case
    if (!localStorage.getItem("case_" + numcase)) return

    if (document.getElementsByClassName("progressbar").length > 0) {
        var elem = document.getElementsByClassName("myBar")[0];
        document.getElementsByClassName("progressbar")[0].style.display = 'block';
    } else {
        var elem = document.createElement('div')
    }
    var width = 1.4;
    elem.style.width = 0 + "%";


    case_data = JSON.parse(localStorage.getItem("case_" + numcase))


    for (i in case_data) {
        //load image
        if (i == 'pwa_consent_form' || i == 'pwa_ten' || i == 'pwa_ten_doc') {
            for (j in case_data[i]) {
                if (j.startsWith('img') && j != 'img_name_other') {
                    case_data[i][j] = await get_Img(`case_${numcase}_${j}`)
                }
            }
        }

        //begin sending.
        if (i == 'pwa_four_two') {
            for (j in case_data[i]) {
                await send(i, url_dict[i], case_data[i][j], idx = j, numcase);
            }
            width += 3.4;
            elem.style.width = width + "%";
        } else if (i.startsWith('pwa_six_') || i.startsWith('pwa_seven_')) continue;
        else if (i == 'pwa_present_address') {
            let caseQ = getQ(numcase);
            caseQ['pwa_present_address'] = 'ok';
            setQ(caseQ, numcase)
            width += 3.4;
            elem.style.width = width + "%";
        }
        else {
            await send(i, url_dict[i], case_data[i], null, numcase);
            width += 3.4;
            elem.style.width = width + "%";
        }
    }

    //sending for six and seven sections.
    for (i in case_data) {
        if (i.startsWith('pwa_six_') && is_filled('pwa_six', numcase)) {
            await send(i, url_dict[i], case_data[i], null, numcase);

            width += 3.4;
            elem.style.width = width + "%";
        }
        else if (i.startsWith('pwa_seven_') && is_filled('pwa_seven', numcase)) {
            await send(i, url_dict[i], case_data[i], null, numcase);

            width += 3.4;
            elem.style.width = width + "%";
        }
    }
    if (document.getElementsByClassName("progressbar").length > 0) {
        document.getElementsByClassName("progressbar")[0].style.display = 'none';
    }
}

function is_filled(url, numcase = get_maxcase()) {
    let keys = getQ(numcase);
    for (const key in keys) {
        if (key.startsWith(url)) {
            if (keys[key] == 'filled') return true;
        }
    }
    return false;
}

function is_checked(url) {
    if (!localStorage.getItem("case_" + get_maxcase())) return false
    let keys = JSON.parse(localStorage.getItem("case_" + get_maxcase()))
    for (const key in keys) {
        if (key.startsWith(url)) {
            for (const k in keys[key]) if (keys[key][k].toLowerCase() == 'true') return true;
        }
    }
    return false;
}

function is_already_exists(numcase = get_maxcase()) {
    let keys = getQ(numcase);
    for (const key in keys) {
        if (keys[key] == 'cid_already_exists' || keys[key] == 'already_exists') return true;
    }
    return is_FamilyMembersAlready_exists();
}

function is_FamilyMembersAlready_exists(numcase = get_maxcase()) {
    let caseQ = getQ(numcase);
    for (idx in caseQ['pwa_four_two']) {
        if (caseQ['pwa_four_two'][idx]['result'] == 'already_exists' || caseQ['pwa_four_two'][idx]['result'] == 'cid_already_exists') return true;
    }
    return false;
}

function send(url, url_insert, case_data, idx, numCase = get_maxcase()) {
    let caseQ = getQ(numCase);
    let user_id = JSON.parse(localStorage.getItem('user_data')).user_id;
    if (Number(user_id) != Number(caseQ.user_id)) return

    if (is_already_exists(numCase)) return

    if (!(url.startsWith('pwa_six_') || url.startsWith('pwa_seven_'))) {
        if (url == 'pwa_four_two' && caseQ['pwa_four_two'][idx]['result'] != 'filled') return;
        else if (url != 'pwa_four_two' && caseQ[url] != 'filled') return;
    }

    if (caseQ.consent_id != '') case_data['consent_id'] = caseQ.consent_id;
    if (caseQ.people_id != '') case_data['people_id'] = caseQ.people_id;
    if (caseQ.informer_id != '') case_data['informer_id'] = caseQ.informer_id;
    if (caseQ.type_informer != '') case_data['type_informer'] = caseQ.type_informer;
    if (caseQ.type_address != '') case_data['type_address'] = caseQ.type_address;
    if (caseQ.postcode_id != '') case_data['postcode_id'] = caseQ.postcode_id;
    if (caseQ.permanent_address_id != '') case_data['permanent_address_id'] = caseQ.permanent_address_id;
    if (caseQ.present_address_id != '') case_data['present_address_id'] = caseQ.present_address_id;
    if (caseQ.consent_form_id != '') case_data['consent_form_id'] = caseQ.consent_form_id;
    if (caseQ.survey_id != '') case_data['survey_id'] = caseQ.survey_id;

    if (case_data.fam_people_id != undefined) case_data.fam_people_id = caseQ['pwa_four_two'][idx]['fam_people_id'];

    const csrftoken = getCookie('csrftoken');
    var form_data = new FormData();

    for (var key in case_data) {
        form_data.append(key, case_data[key]);
    }
    form_data.append('csrfmiddlewaretoken', csrftoken);
    return new Promise((resolve) => {
        $.ajax({
            url: url_insert,
            type: "POST",
            data: form_data,
            processData: false,
            contentType: false,
            caches: false,
            success: (response) => {
                if( response.result == 'login_failed')
                    return resolve()

                if (url == 'pwa_four_two') {
                    caseQ[url][idx]['result'] = response.result;
                    if (response.fam_people_id != '') caseQ[url][idx]['fam_people_id'] = response.fam_people_id;

                } else {
                    caseQ[url] = response.result;
                    caseQ.people_id = response.people_id == "" ? caseQ.people_id : response.people_id;
                    caseQ.informer_id = response.informer_id == "" ? caseQ.informer_id : response.informer_id;
                    caseQ.permanent_address_id = response.permanent_address_id == "" ? caseQ.permanent_address_id : response.permanent_address_id;
                    caseQ.present_address_id = response.present_address_id == "" ? caseQ.present_address_id : response.present_address_id;
                    caseQ.postcode_id = response.postcode_id == "" ? caseQ.postcode_id : response.postcode_id;
                    caseQ.consent_id = response.consent_id == "" ? caseQ.consent_id : response.consent_id;
                }

                setQ(caseQ, numCase)
                resolve()
                
            }, error: function (jqXHR, exception) {
                var error_msg = '';
                if (jqXHR.status === 0) {
                    error_msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 403) {
                    // 403 page error
                    error_msg = 'Forible csrf_token. [403]';
                } else if (jqXHR.status == 404) {
                    // 404 page error
                    error_msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    // 500 Internal Server error
                    error_msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    // Requested JSON parse
                    error_msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    // Time out error
                    error_msg = 'Time out error.';
                } else if (exception === 'abort') {
                    // request aborte
                    error_msg = 'Ajax request aborted.';
                } else {
                    error_msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }

                if (document.getElementById('error_Area') && jqXHR.status != 0) {
                    // document.getElementById('error_Area').innerHTML += `
                    //         ${url} => ${url_insert}
                    //         <br>status codes: ${jqXHR.status}
                    //         <br>error: ${error_msg}
                    //         <br>${jqXHR}`;
                } else if (jqXHR.status === 0) {
                    document.getElementById('error_Area').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    OFFLINE ยังไม่สามารถส่งข้อมูลได้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณและลองอีกครั้ง
                </div>`
                } else {
                    console.log(jqXHR.status)
                }
                resolve()
            },
        });
    })

}

function clearSession() {
    return $.ajax({
        caches: false,
        url: "pwa_clear_session",
        error: () => {
            return true;
        }
    });
}

function Inint_AJAX() {
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) { } //IE
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) { } //IE
    try {
        return new XMLHttpRequest();
    } catch (e) { } //Native Javascript
    alert("XMLHttpRequest not supported");
    return null;
};

function dochange(src, val) {
    var req = Inint_AJAX();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (src == "loadData") {

                    let district_element = document.getElementById("district")
                    let sub_district_element = document.getElementById("sub_district")
                    let postcode_element = document.getElementById("postcode")
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    if (localStorage.getItem("case_" + get_maxcase())) {
                        data = JSON.parse(localStorage.getItem("case_" + get_maxcase()))
                        keys = data[val]
                        if (keys['province'] == '') return
                        // district district
                        district_html = "<select class='form-control form-select' name='district' id='district_input' onChange=\"dochange('sub_district', this.value)\" required >";
                        district_html += "<option value=''>- เลือกเขต/อำเภอ -</option>\n";

                        for (key in jsonResponse['district']) {
                            if (keys['province'] == jsonResponse['district'][key]['province_id']) {
                                district_html += `<option value="${jsonResponse['district'][key]['code']}" >${jsonResponse['district'][key]['name']}</option>`;
                            }
                        }
                        district_html += "</select>\n";
                        district_element.innerHTML = district_html;
                        if (JSON.stringify(keys) == "{}") return 0;
                        for (key in keys) {
                            if (document.getElementsByName(key).length == 0) continue;
                            let element = document.getElementsByName(key)[0];
                            if (element.tagName == "SELECT" && key == "district") {
                                element.value = keys[key];
                            }
                        }



                        // sub_district
                        sub_district_html = "<select class='form-control form-select'  name='sub_district' id='sub_district_input' onChange=\"dochange('postcode', this.value)\" required >";
                        sub_district_html += "<option value=''>- เลือกแขวง/ตำบล -</option>\n";

                        for (key in jsonResponse['sub_district']) {
                            if (keys['district'] == jsonResponse['sub_district'][key]['district_id']) {
                                sub_district_html += `<option value="${jsonResponse['sub_district'][key]['code']}" >${jsonResponse['sub_district'][key]['name']}</option>`;
                            }
                        }
                        sub_district_html += "</select>\n";
                        sub_district_element.innerHTML = sub_district_html;
                        if (JSON.stringify(keys) == "{}") return 0;
                        for (key in keys) {
                            if (document.getElementsByName(key).length == 0) continue;
                            let element = document.getElementsByName(key)[0];
                            if (element.tagName == "SELECT" && key == "sub_district") {
                                element.value = keys[key];
                            }
                        }

                        // postcode
                        for (key in jsonResponse['postcode']) {
                            if (keys['sub_district'] == jsonResponse['postcode'][key]['sub_district_id']) {
                                let postcode_html = `<input type="text" name="postcode" class="form-control form-select" value="${jsonResponse['postcode'][key]['postcode']}"  readonly>`;
                                postcode_element.innerHTML = postcode_html;
                                break;
                            }
                        }

                    }
                }
                else if (src == 'district') {
                    html = "<select class='form-control form-select' name='district' id='district_input' onChange=\"dochange('sub_district', this.value)\" required >";
                    html += "<option value=''>- เลือกเขต/อำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['district']) {
                        if (val == jsonResponse['district'][key]['province_id']) {
                            html += `<option value="${jsonResponse['district'][key]['code']}">${jsonResponse['district'][key]['name']}</option>`;
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'sub_district') {
                    html = "<select class='form-control form-select'  name='sub_district' id='sub_district_input' onChange=\"dochange('postcode', this.value)\" required >";
                    html += "<option value=''>- เลือกแขวง/ตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['sub_district']) {
                        if (val == jsonResponse['sub_district'][key]['district_id']) {
                            html += `<option value="${jsonResponse['sub_district'][key]['code']}" >${jsonResponse['sub_district'][key]['name']}</option>`;
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['postcode']) {
                        if (val == jsonResponse['postcode'][key]['sub_district_id']) {
                            value = jsonResponse['postcode'][key]['postcode'];
                            html = `<input type="text" name="postcode" id="postcode_input" class="form-control form-select" value="${jsonResponse['postcode'][key]['postcode']}"  readonly>`;
                            break;
                        }
                    }

                    document.getElementById(src).innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "pwa_get_location"); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}

var district_case = document.getElementById('district_case').value;

function dochange_p_ap(src, val) {
    var req = Inint_AJAX();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (src == "loadData") {

                    let district_element = document.getElementById("district")
                    let sub_district_element = document.getElementById("sub_district")
                    let postcode_element = document.getElementById("postcode")
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    if (localStorage.getItem("case_" + get_maxcase())) {
                        data = JSON.parse(localStorage.getItem("case_" + get_maxcase()))
                        keys = data[val]
                        // district district
                        district_html = "<select class='form-control form-select' name='district' id='district_input' onChange=\"dochange('sub_district', this.value)\" >";
                        district_html += "<option value=''>- เลือกเขต/อำเภอ -</option>\n";

                        for (key in jsonResponse['district']) {
                            if (keys['ap_province'] == jsonResponse['district'][key]['province_id']) {
                                district_html += `<option value="${jsonResponse['district'][key]['code']}" >${jsonResponse['district'][key]['name']}</option>`;
                            }
                        }
                        district_html += "</select>\n";
                        district_element.innerHTML = district_html;
                        if (JSON.stringify(keys) == "{}") return 0;
                        for (key in keys) {
                            if (!key.startsWith('ap_')) continue;
                            if (document.getElementsByName(key.replace('ap_', '')).length == 0) continue;
                            let element = document.getElementsByName(key.replace('ap_', ''))[0];
                            if (element.tagName == "SELECT" && key == "ap_district") {
                                element.value = keys[key];
                            }
                        }



                        // sub_district
                        sub_district_html = "<select class='form-control form-select'  name='sub_district' id='sub_district_input' onChange=\"dochange('postcode', this.value)\" >";
                        sub_district_html += "<option value=''>- เลือกแขวง/ตำบล -</option>\n";

                        for (key in jsonResponse['sub_district']) {
                            if (keys['ap_district'] == jsonResponse['sub_district'][key]['district_id']) {
                                sub_district_html += `<option value="${jsonResponse['sub_district'][key]['code']}" >${jsonResponse['sub_district'][key]['name']}</option>`;
                            }
                        }
                        sub_district_html += "</select>\n";
                        sub_district_element.innerHTML = sub_district_html;
                        if (JSON.stringify(keys) == "{}") return 0;
                        for (key in keys) {
                            if (!key.startsWith('ap_')) continue;
                            if (document.getElementsByName(key.replace('ap_', '')).length == 0) continue;
                            let element = document.getElementsByName(key.replace('ap_', ''))[0];
                            if (element.tagName == "SELECT" && key == "ap_sub_district") {
                                element.value = keys[key];
                            }
                        }

                        // postcode
                        for (key in jsonResponse['postcode']) {
                            if (keys['ap_sub_district'] == jsonResponse['postcode'][key]['sub_district_id']) {
                                let postcode_html = `<input type="text" name="postcode" id="postcode_input" class="form-control form-select" value="${jsonResponse['postcode'][key]['postcode']}" readonly>`;
                                postcode_element.innerHTML = postcode_html;
                                break;
                            }
                        }

                    }
                }
                else if (src == 'district') {
                    html = "<select class='form-control form-select' name='district' id='district_input' onChange=\"dochange('sub_district', this.value)\" >";
                    html += "<option value=''>- เลือกเขต/อำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['district']) {
                        if (val == jsonResponse['district'][key]['province_id']) {
                            html += `<option value="${jsonResponse['district'][key]['code']}" >${jsonResponse['district'][key]['name']}</option>`;
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'sub_district') {
                    html = "<select class='form-control form-select'  name='sub_district' id='sub_district_input' onChange=\"dochange('postcode', this.value)\" >";
                    html += "<option value=''>- เลือกแขวง/ตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['sub_district']) {
                        if (val == jsonResponse['sub_district'][key]['district_id']) {
                            html += `<option value="${jsonResponse['sub_district'][key]['code']}" >${jsonResponse['sub_district'][key]['name']}</option>`;

                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['postcode']) {
                        if (val == jsonResponse['postcode'][key]['sub_district_id']) {
                            html = `<input type="text" name="postcode" class="form-control form-select" value="${jsonResponse['postcode'][key]['postcode']}"  readonly>`;
                            break;
                        }
                    }

                    document.getElementById(src).innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "pwa_get_location"); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}


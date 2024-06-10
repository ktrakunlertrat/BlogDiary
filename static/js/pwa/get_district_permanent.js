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

function dochange_ap(src, val) {
    var req = Inint_AJAX();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (src == "loadData") {

                    let ap_district_element = document.getElementById("ap_district")
                    let ap_sub_district_element = document.getElementById("ap_sub_district")
                    let ap_postcode_element = document.getElementById("ap_postcode")
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    if (localStorage.getItem("case_" + get_maxcase())) {
                        data = JSON.parse(localStorage.getItem("case_" + get_maxcase()))
                        keys = data[val]
                        // district district
                        ap_district_html = "<select class='form-control form-select' name='ap_district' id='ap_district_input' onChange=\"dochange_ap('ap_sub_district', this.value)\" >";
                        ap_district_html += "<option value=''>- เลือกเขต/อำเภอ -</option>\n";

                        for (key in jsonResponse['district']) {
                            code = jsonResponse['district'][key]['code']
                            value = jsonResponse['district'][key]['name'];
                            if (keys['ap_province'] == jsonResponse['district'][key]['province_id']) {
                                ap_district_html += "<option value=\"" + code + "\" >" + value + "</option>";
                            }
                        }
                        ap_district_html += "</select>\n";
                        ap_district_element.innerHTML = ap_district_html;
                        if (JSON.stringify(keys) == "{}") return 0;
                        for (key in keys) {
                            if (document.getElementsByName(key).length == 0) continue;
                            let element = document.getElementsByName(key)[0];
                            if (element.tagName == "SELECT" && key == "ap_district") {
                                element.value = keys[key];
                            }
                        }



                        // sub_district
                        ap_sub_district_html = "<select class='form-control form-select'  name='ap_sub_district' id='ap_sub_district_input' onChange=\"dochange_ap('ap_postcode', this.value)\" >";
                        ap_sub_district_html += "<option value=''>- เลือกแขวง/ตำบล -</option>\n";

                        for (key in jsonResponse['sub_district']) {
                            code = jsonResponse['sub_district'][key]['code']
                            value = jsonResponse['sub_district'][key]['name'];
                            if (keys['ap_district'] == jsonResponse['sub_district'][key]['district_id']) {
                                ap_sub_district_html += "<option value=\"" + code + "\" >" + value + "</option>";
                            }
                        }
                        ap_sub_district_html += "</select>\n";
                        ap_sub_district_element.innerHTML = ap_sub_district_html;
                        if (JSON.stringify(keys) == "{}") return 0;
                        for (key in keys) {
                            if (document.getElementsByName(key).length == 0) continue;
                            let element = document.getElementsByName(key)[0];
                            if (element.tagName == "SELECT" && key == "ap_sub_district") {
                                element.value = keys[key];
                            }
                        }

                        // postcode
                        for (key in jsonResponse['postcode']) {
                            if (keys['ap_sub_district'] == jsonResponse['postcode'][key]['sub_district_id']) {
                                value = jsonResponse['postcode'][key]['postcode'];
                                let ap_postcode_html = "<input type='text' name='ap_postcode' id='ap_postcode_input' class='form-control form-select' value='" + value + "''  readonly>";
                                ap_postcode_element.innerHTML = ap_postcode_html;
                                break;
                            }
                        }

                    }
                }
                else if (src == 'ap_district') {
                    html = "<select class='form-control form-select' name='ap_district' id='ap_district_input' onChange=\"dochange_ap('ap_sub_district', this.value)\" >";
                    html += "<option value=''>- เลือกเขต/อำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['district']) {
                        code = jsonResponse['district'][key]['code']
                        value = jsonResponse['district'][key]['name'];
                        if (val == jsonResponse['district'][key]['province_id']) {
                            html += "<option value=\"" + code + "\" >" + value + "</option>";
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'ap_sub_district') {
                    html = "<select class='form-control form-select'  name='ap_sub_district' id='ap_sub_district_input' onChange=\"dochange_ap('ap_postcode', this.value)\" >";
                    html += "<option value=''>- เลือกแขวง/ตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['sub_district']) {
                        code = jsonResponse['sub_district'][key]['code']
                        value = jsonResponse['sub_district'][key]['name'];
                        if (val == jsonResponse['sub_district'][key]['district_id']) {
                            html += "<option value=\"" + code + "\" >" + value + "</option>";

                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'ap_postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['postcode']) {
                        if (val == jsonResponse['postcode'][key]['sub_district_id']) {
                            value = jsonResponse['postcode'][key]['postcode'];
                            html = "<input type='text' name='ap_postcode' id='ap_postcode_input' class='form-control form-select' value='" + value + "''  readonly>";
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



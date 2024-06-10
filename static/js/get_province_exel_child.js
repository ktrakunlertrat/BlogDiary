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

function dochange1(src, val) {
    var req = Inint_AJAX();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                
                if (src == 'province') {
                    html = "<select form='child_form' class='form-control form-select' name='i_province' onChange=\"dochange1('district', this.value)\">";
                    html += "<option value=''>- เลือกจังหวัด -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['province']) {
                        value = jsonResponse['province'][key]['fields']['name'];
                        code = jsonResponse['province'][key]['fields']['code'];
                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('i_province').innerHTML = html;

                } else if (src == 'district') {
                    html = "<select form='child_form' class='form-control form-select' name='i_district' onChange=\"dochange1('sub_district', this.value)\">";
                    html += "<option value=''>- เลือกอำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['district']) {
                        value = jsonResponse['district'][key]['fields']['name'];
                        code = jsonResponse['district'][key]['fields']['code'];

                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('i_district').innerHTML = html;

                } else if (src == 'sub_district') {
                    html = "<select form='child_form' class='form-control form-select' name='i_sub_district' onChange=\"dochange1('postcode', this.value)\">";
                    html += "<option value=''>- เลือกตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['sub_district']) {
                        value = jsonResponse['sub_district'][key]['fields']['name'];
                        code = jsonResponse['sub_district'][key]['fields']['code'];

                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('i_sub_district').innerHTML = html;

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    console.log(jsonResponse)

                    for (key in jsonResponse['postcode']) {
                        value = jsonResponse['postcode'][key]['fields']['postcode'];
                        html = "<input form='child_form' type='text' name='i_zipcode' class='form-control' value='" + value + "'' readonly>";
                    }

                    document.getElementById('i_zipcode').innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "get_all_location?data=" + src + "&val=" + val); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}

window.onLoad = dochange1('province', -1);

function dochange2(src, val) {
    var req = Inint_AJAX();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                
                if (src == 'province') {
                    html = "<select form='child_form' class='form-control form-select' name='i_province_now' onChange=\"dochange2('district', this.value)\">";
                    html += "<option value=''>- เลือกจังหวัด -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['province']) {
                        value = jsonResponse['province'][key]['fields']['name'];
                        code = jsonResponse['province'][key]['fields']['code'];
                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('i_province_now').innerHTML = html;

                } else if (src == 'district') {
                    html = "<select form='child_form' class='form-control form-select' name='i_district_now' onChange=\"dochange2('sub_district', this.value)\">";
                    html += "<option value=''>- เลือกอำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['district']) {
                        value = jsonResponse['district'][key]['fields']['name'];
                        code = jsonResponse['district'][key]['fields']['code'];

                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('i_district_now').innerHTML = html;

                } else if (src == 'sub_district') {
                    html = "<select form='child_form' class='form-control form-select' name='i_sub_district_now' onChange=\"dochange2('postcode', this.value)\">";
                    html += "<option value=''>- เลือกตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['sub_district']) {
                        value = jsonResponse['sub_district'][key]['fields']['name'];
                        code = jsonResponse['sub_district'][key]['fields']['code'];

                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('i_sub_district_now').innerHTML = html;

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    console.log(jsonResponse)

                    for (key in jsonResponse['postcode']) {
                        value = jsonResponse['postcode'][key]['fields']['postcode'];
                        html = "<input form='child_form' type='text' name='i_zipcode_now' class='form-control' value='" + value + "'' readonly>";
                    }

                    document.getElementById('i_zipcode_now').innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "get_all_location?data=" + src + "&val=" + val); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}

window.onLoad = dochange2('province', -1);



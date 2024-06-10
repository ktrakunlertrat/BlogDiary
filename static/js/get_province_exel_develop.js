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



function dochange3(src, val) {
    var req = Inint_AJAX();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                
                if (src == 'province') {
                    html = "<select form='develop_form' class='form-control form-select' name='p_province' onChange=\"dochange3('district', this.value)\">";
                    html += "<option value=''>- เลือกจังหวัด -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['province']) {
                        value = jsonResponse['province'][key]['fields']['name'];
                        code = jsonResponse['province'][key]['fields']['code'];
                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('p_province').innerHTML = html;

                } else if (src == 'district') {
                    html = "<select form='develop_form' class='form-control form-select' name='p_district' onChange=\"dochange3('sub_district', this.value)\">";
                    html += "<option value=''>- เลือกอำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['district']) {
                        value = jsonResponse['district'][key]['fields']['name'];
                        code = jsonResponse['district'][key]['fields']['code'];

                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('p_district').innerHTML = html;

                } else if (src == 'sub_district') {
                    html = "<select form='develop_form' class='form-control form-select' name='p_sub_district' onChange=\"dochange3('postcode', this.value)\">";
                    html += "<option value=''>- เลือกตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['sub_district']) {
                        value = jsonResponse['sub_district'][key]['fields']['name'];
                        code = jsonResponse['sub_district'][key]['fields']['code'];

                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('p_sub_district').innerHTML = html;

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    console.log(jsonResponse)

                    for (key in jsonResponse['postcode']) {
                        value = jsonResponse['postcode'][key]['fields']['postcode'];
                        html = "<input form='develop_form' type='text' name='p_zipcode' class='form-control' value='" + value + "'' readonly>";
                    }

                    document.getElementById('p_zipcode').innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "get_all_location?data=" + src + "&val=" + val); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}

window.onLoad = dochange3('province', -1);

function dochange4(src, val) {
    var req = Inint_AJAX();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                
                if (src == 'province') {
                    html = "<select form='develop_form' class='form-control form-select' name='p_province_now' onChange=\"dochange4('district', this.value)\">";
                    html += "<option value=''>- เลือกจังหวัด -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['province']) {
                        value = jsonResponse['province'][key]['fields']['name'];
                        code = jsonResponse['province'][key]['fields']['code'];
                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('p_province_now').innerHTML = html;

                } else if (src == 'district') {
                    html = "<select form='develop_form' class='form-control form-select' name='p_district_now' onChange=\"dochange4('sub_district', this.value)\">";
                    html += "<option value=''>- เลือกอำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['district']) {
                        value = jsonResponse['district'][key]['fields']['name'];
                        code = jsonResponse['district'][key]['fields']['code'];

                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('p_district_now').innerHTML = html;

                } else if (src == 'sub_district') {
                    html = "<select form='develop_form' class='form-control form-select' name='p_sub_district_now' onChange=\"dochange4('postcode', this.value)\">";
                    html += "<option value=''>- เลือกตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (key in jsonResponse['sub_district']) {
                        value = jsonResponse['sub_district'][key]['fields']['name'];
                        code = jsonResponse['sub_district'][key]['fields']['code'];

                        html += "<option value=\"" + code + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById('p_sub_district_now').innerHTML = html;

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    console.log(jsonResponse)

                    for (key in jsonResponse['postcode']) {
                        value = jsonResponse['postcode'][key]['fields']['postcode'];
                        html = "<input form='develop_form' type='text' name='p_zipcode_now' class='form-control' value='" + value + "'' readonly>";
                    }

                    document.getElementById('p_zipcode_now').innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "get_all_location?data=" + src + "&val=" + val); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}

window.onLoad = dochange4('province', -1);
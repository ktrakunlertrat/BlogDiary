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
                var ap_district_case = document.getElementById('ap_district_case').value;
                var ap_sub_district_case = document.getElementById('ap_sub_district_case').value;
                if (src == 'ap_district') {
                    html = "<select class='form-control form-select' name='ap_district' id='ap_district_input' onChange=\"dochange_ap('ap_sub_district', this.value)\" >";
                    html += "<option value=''>- เลือกอำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['district']) {
                        pk = jsonResponse['district'][key]['pk']
                        value = jsonResponse['district'][key]['fields']['name'];
                        if (value == ap_district_case) {
                            html += "<option value=\"" + pk + "\" selected>" + value + "</option>";                            
                        } else {
                            html += "<option value=\"" + pk + "\" >" + value + "</option>";
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'ap_sub_district') {
                    html = "<select class='form-control form-select'  name='ap_sub_district' id='ap_sub_district_input' onChange=\"dochange_ap('ap_postcode', this.value)\" >";
                    html += "<option value=''>- เลือกตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['sub_district']) {
                        pk = jsonResponse['sub_district'][key]['pk']
                        value = jsonResponse['sub_district'][key]['fields']['name'];
                        if (value == ap_sub_district_case) {
                            html += "<option value=\"" + pk + "\" selected>" + value + "</option>";
                        } else {
                            html += "<option value=\"" + pk + "\" >" + value + "</option>";
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'ap_postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['postcode']) {
                        value = jsonResponse['postcode'][key]['fields']['postcode'];
                        
                        html = "<input type='text' name='ap_postcode' id='ap_postcode_input' class='form-control form-select' value='" + value + "''  readonly>";
                    }

                    document.getElementById(src).innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "get_location?data=" + src + "&val=" + val); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}

var ap_district_case = document.getElementById('ap_district_case').value;

window.onLoad = dochange_ap('ap_district', -1);


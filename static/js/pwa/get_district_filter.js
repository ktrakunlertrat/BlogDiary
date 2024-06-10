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
                var district_case = document.getElementById('district_case').value;
                var sub_district_case = document.getElementById('sub_district_case').value;
                if (src == 'district') {
                    html = "<select class='form-control form-select' name='district' onChange=\"dochange('sub_district', this.value)\">";
                    html += "<option value=''>- เลือกอำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['district']) {
                        pk = jsonResponse['district'][key]['pk']
                        value = jsonResponse['district'][key]['fields']['name'];
                        if (value == district_case) {
                            html += "<option value=\"" + pk + "\" selected>" + value + "</option>";                            
                        } else {
                            html += "<option value=\"" + pk + "\" >" + value + "</option>";
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'sub_district') {
                    html = "<select class='form-control form-select' name='sub_district' onChange=\"dochange('postcode', this.value)\">";
                    html += "<option value=''>- เลือกตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['sub_district']) {
                        pk = jsonResponse['sub_district'][key]['pk']
                        value = jsonResponse['sub_district'][key]['fields']['name'];
                        if (value == sub_district_case) {
                            html += "<option value=\"" + pk + "\" selected>" + value + "</option>";
                        } else {
                            html += "<option value=\"" + pk + "\" >" + value + "</option>";
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['postcode']) {
                        value = jsonResponse['postcode'][key]['fields']['postcode'];
                        
                        html = "<input type='text' name='postcode' class='form-control form-select' value='" + value + "'' readonly>";
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

var district_case = document.getElementById('district_case').value;

window.onLoad = dochange('district', -1);


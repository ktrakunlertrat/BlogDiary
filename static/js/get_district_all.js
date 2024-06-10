function Inint_AJAX() {
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {} //IE
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {} //IE
    try {
        return new XMLHttpRequest();
    } catch (e) {} //Native Javascript
    alert("XMLHttpRequest not supported");
    return null;
};

function dochange(src, val) {
    var req = Inint_AJAX();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {

                if (src == 'province') {
                    html = "<select class='form-control' name='province' id='provinces' onChange=\"dochange('district', this.value)\">";
                    html += "<option value=''>- เลือกจังหวัด -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['province']) {
                        pk = jsonResponse['province'][key]['pk']
                        value = jsonResponse['province'][key]['fields']['name'];
                        html += "<option value=\"" + pk + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;
                    $(document).ready(function(){
                        $(document.getElementsByName('province')).select2();
                        $('.filters select').on('change paste keyup', function() {
                            $('#list_user').DataTable().ajax.reload(null, false);
                        });
                    });

                } else if (src == 'district') {
                    html = "<select class='form-control' name='district' id='districts' onChange=\"dochange('sub_district', this.value)\">";
                    html += "<option value=''>- เลือกอำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['district']) {
                        pk = jsonResponse['district'][key]['pk']
                        value = jsonResponse['district'][key]['fields']['name'];
                        html += "<option value=\"" + pk + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;
                    $(document).ready(function(){
                        $(document.getElementsByName('district')).select2();
                        $('.filters select').on('change paste keyup', function() {
                            $('#list_user').DataTable().ajax.reload(null, false);
                        });
                    });

                } else if (src == 'sub_district') {
                    html = "<select class='form-control' name='sub_district' id='sub_districts' onChange=\"dochange('postcode', this.value)\">";
                    html += "<option value=''>- เลือกตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['sub_district']) {
                        pk = jsonResponse['sub_district'][key]['pk']
                        value = jsonResponse['sub_district'][key]['fields']['name'];
                        html += "<option value=\"" + pk + "\" >" + value + "</option>";
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;
                    $(document).ready(function(){
                        $(document.getElementsByName('sub_district')).select2();
                        $('.filters select').on('change paste keyup', function() {
                            $('#list_user').DataTable().ajax.reload(null, false);
                        });
                    });

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['postcode']) {
                        value = jsonResponse['postcode'][key]['fields']['postcode'];
                        html = "<input type='text' name='postcode' class='form-control' value='" + value + "'' readonly>";
                    }

                    document.getElementById(src).innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "get_all_location?data=" + src + "&val=" + val); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}

window.onLoad = dochange('province', -1);
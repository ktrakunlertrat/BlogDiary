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

        if(val!=-1){
            // redraw the table of ajax data table
            $('#main-table').DataTable().ajax.reload(null, false);
        }




        if (req.readyState == 4) {
            if (req.status == 200) {
                var district_case = document.getElementById('query_string_district').value;
                var sub_district_case = document.getElementById('query_string_sub_district').value;
                if (src == 'district') {
                    html = "<select class='form-control form-select' name='district' onChange=\"dochange('sub_district', this.value)\">";
                    html += "<option value=''>- เลือกเขต/อำเภอ -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['district']) {
                        pk = jsonResponse['district'][key]['pk']
                        value = jsonResponse['district'][key]['fields']['name'];
                        if (pk == district_case) {
                            html += "<option value=\"" + pk + "\" selected>" + value + "</option>";                            
                        } else {
                            html += "<option value=\"" + pk + "\" >" + value + "</option>";
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;

                    if(document.getElementById('query_string_district') && document.getElementById('query_string_district').value != ""){
                        let query_string_district = document.getElementById('query_string_district');
                        dochange('sub_district', query_string_district.value);
                        document.querySelector("#district select[name='district']").value = query_string_district.value;
                    }

                } else if (src == 'sub_district') {
                    html = "<select class='form-control form-select' name='sub_district' onChange=\"dochange('postcode', this.value)\">";
                    html += "<option value=''>- เลือกแขวง/ตำบล -</option>\n";
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['sub_district']) {
                        pk = jsonResponse['sub_district'][key]['pk']
                        value = jsonResponse['sub_district'][key]['fields']['name'];
                        if (pk == sub_district_case) {
                            html += "<option value=\"" + pk + "\" selected>" + value + "</option>";
                        } else {
                            html += "<option value=\"" + pk + "\" >" + value + "</option>";
                        }
                    }
                    html += "</select>\n";

                    document.getElementById(src).innerHTML = html;
                    
                    if(document.getElementById('query_string_sub_district') && document.getElementById('query_string_sub_district').value.startsWith(val)){
                        let query_string_sub_district = document.getElementById('query_string_sub_district');
                        document.querySelector("#sub_district select[name='sub_district']").value = query_string_sub_district.value;
                    }

                } else if (src == 'postcode') {
                    var data = req.responseText;
                    var jsonResponse = JSON.parse(data);
                    for (key in jsonResponse['postcode']) {
                        value = jsonResponse['postcode'][key]['fields']['postcode'];
                        
                        html = "<input type='text' name='postcode' class='form-control form-select' value='" + value + "'' readonly>";
                    }

                    // document.getElementById(src).innerHTML = html;

                }
            }
        }
    };
    req.open("GET", "get_location?data=" + src + "&val=" + val); //สร้าง connection
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // set Header
    req.send(null); //ส่งค่า
}

window.onLoad = dochange('district', -1)

// window.onLoad = dochange('sub_district', district_case);

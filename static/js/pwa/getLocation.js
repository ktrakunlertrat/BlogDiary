let lat_id = "";
let long_id = "";
let alert_gps_id = "";
let get_location_btn_id = "";

function getLocation(lat, long, alert_gps, get_location) {
    lat_id = lat;
    long_id = long;
    alert_gps_id = document.getElementById(alert_gps);
    get_location_btn_id = document.getElementById(get_location);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert_gps_id.style.display = 'block'
        // alert_gps_id.innerHTML = "Geolocation is not supported by this browser."
        alert_gps_id.innerHTML = "เว็บเบราว์เซอร์นี้ไม่รองรับการระบุตำแหน่งพิกัด GPS"
    }
}

function showPosition(position) {
    alert_gps_id.style.display = 'none'
    document.getElementById(lat_id).value = position.coords.latitude.toFixed(7);
    document.getElementById(long_id).value = position.coords.longitude.toFixed(7);
    get_location_btn_id.disabled = true;
    get_location_btn_id.value = "รับพิกัด GPS สำเร็จ";
}

function showError(error) {
    alert_gps_id.style.display = 'block'
    switch (error.code) {
        case error.PERMISSION_DENIED:
            // alert_gps_id.innerHTML = "User denied the request for Geolocation."
            alert_gps_id.innerHTML = "ผู้ใช้ปฏิเสธคำขอ 'รับพิกัด GPS'"
            break;
        case error.POSITION_UNAVAILABLE:
            // alert_gps_id.innerHTML = "Location information is unavailable."
            alert_gps_id.innerHTML = "ข้อมูลพิกัดตำแหน่งไม่สามารถใช้ได้"
            break;
        case error.TIMEOUT:
            // alert_gps_id.innerHTML = "The request to get user location timed out."
            alert_gps_id.innerHTML = "คำขอรับตำแหน่งของผู้ใช้หมดเวลา"
            break;
        case error.UNKNOWN_ERROR:
            // alert_gps_id.innerHTML = "An unknown error occurred."
            alert_gps_id.innerHTML = "เกิดข้อผิดพลาดที่ไม่รู้จัก"
            break;
    }
}
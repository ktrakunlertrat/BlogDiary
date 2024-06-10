let province = document.getElementsByName("province");
let ap_province = document.getElementsByName("ap_province");
let province_search = document.getElementById("province_search");



let province_value = "unable to load location_pack from localStorage"

    $(document).ready(function(){
        // Initialize select2
        $(province_search).select2();
    });

if (localStorage.getItem('location_pack')) {
    location_pack = JSON.parse(localStorage.getItem('location_pack'))
    province_value = location_pack.province[0].code
}


if (province.length > 0) {
    const options = Array.from(province[0].options);
    const optionToSelect = options.find(item => item.value == province_value);
    optionToSelect.selected = true;
    if(window.location.pathname.replace("/", "") != 'pwa_three'){
        province[0].style = "pointer-events: none;background-color: #e9ecef;"
    }
    dochange('district',province_value)

}
if (ap_province.length > 0) {
    const options = Array.from(ap_province[0].options);
    const optionToSelect = options.find(item => item.value == province_value);
    optionToSelect.selected = true;
    
    // ap_province[0].style = "pointer-events: none;"
   
    dochange_ap('ap_district',province_value)


}

var cleave = new Cleave("#CitizenID", {
    delimiter: "-",
    blocks: [1, 4, 5, 2, 1],
    uppercase: true,
});

function validate_value() {
    var first_name = document.getElementById('firstname').value;
    var last_name = document.getElementById('lastname').value;
    var citizen_id = document.getElementById('CitizenID').value;
    
    if (first_name == '' && last_name == '' && citizen_id == '') {
        $('#master_modal').modal('show');
        $('#div_modal_body').text('กรุณากรอกข้อมูล ชื่อ-นามสกุล หรือ เลขบัตรประจำตัวประชาชน');
        return false
    } else if (citizen_id != '' && first_name == '' && last_name == '') {
        return checked_cid_people()
    } else if (first_name != '' && last_name == '' && citizen_id == ''){
        $('#master_modal').modal('show');
        $('#div_modal_body').text('กรุณากรอกข้อมูล นามสกุล');
        return false                
    }   else if (first_name == '' && last_name != '' && citizen_id == ''){
        $('#master_modal').modal('show');
        $('#div_modal_body').text('กรุณากรอกข้อมูล ชื่อ');
        return false                
    }

    // if (first_name == '') { //ไม่กรอกชื่อ
    //     $('#master_modal').modal('show');
    //     $('#div_modal_body').text('กรุณากรอกข้อมูล ชื่อ');
    //     return false
    // }    
    // if (last_name == ''){ //ไม่กรอกนามสกุล
    //     $('#master_modal').modal('show');
    //     $('#div_modal_body').text('กรุณากรอกข้อมูล นามสกุล');
    //     return false                
    // }  
    // if (citizen_id == ''){ //ไม่กรอกเลขบัตร
    //     $('#master_modal').modal('show');
    //     $('#div_modal_body').text('กรุณากรอกข้อมูล เลขบัตรประจำตัวประชาชน');
    //     return false                
    // }
    
    return checked_cid_people()
    
}
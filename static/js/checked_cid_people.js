function checked_cid_people() {
    var error_ele = document.getElementsByClassName('error');
    if (error_ele[0].innerHTML == 'เลขบัตรประชาชนผิด') {
        setTimeout(function () {
            error_ele.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }, 500);
        $('#master_modal').modal('show');
        $('#div_modal_body').text('เลขบัตรประชาชนไม่ถูกต้อง กรุณาตรวจสอบในช่องเลขบัตรประชาชนอีกครั้ง');
        return false;
    } else if (error_ele[0].innerHTML == 'เลขบัตรประชาชนถูกต้อง') {
        return true;
    }
}
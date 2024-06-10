var url_dict = {
    'login': 'login_check',
    'one': 'one_insert',
    'one_edit': 'one_insert',
    'type_people': 'check_status_people',
    'two_one': 'two_one_insert',
    'two_two': 'two_two_insert',
    'address': 'check_address',
    'three': 'three_insert',
    'present_address': 'four',
    'four': 'four_insert',
    'four_one': 'four_one_insert',
    'four_two': 'four_two_insert',
    'four_two_edit': 'four_two_edit_update',
    'five': 'five_insert',
    'six_one': 'six_one_insert',
    'six_two': 'six_two_insert',
    'six_three': 'six_three_insert',
    'six_four': 'six_four_insert',
    'six_five': 'six_five_insert',
    'six_six': 'six_six_insert',
    'six_seven': 'six_seven_insert',
    'six_eight': 'six_eight_insert',
    'six_nine': 'six_nine_insert',
    'seven_one': 'seven_one_insert',
    'seven_two': 'seven_two_insert',
    'seven_three': 'seven_three_insert',
    'eight': 'eight_insert',
    'nine': 'nine_insert',
    'ten': 'ten_insert',
    'ten_doc': 'ten_doc_insert',
    'show_data': 'send_status',
    'consent_form': 'consent_form_insert',
}

var redirect_dict = {
    'login': 'main',
    'one1': 'two_one',
    'one2': 'type_people',
    'one_edit1': 'two_one',
    'one_edit2': 'type_people',
    'type_people1': 'two_one',
    'type_people2': 'two_two',
    'two_one': 'address',
    'two_two': 'address',
    'address': 'three',
    'three': 'present_address',
    'present_address': 'four',
    'four': 'four_one',
    'four_one': 'four_two',
    'four_two': 'four_two',
    'four_two_edit': 'four_two',
    'five': 'six_one',
    'six_one': 'six_two',
    'six_two': 'six_three',
    'six_three': 'six_four',
    'six_four': 'six_five',
    'six_five': 'six_six',
    'six_six': 'six_seven',
    'six_seven': 'six_eight',
    'six_eight': 'six_nine',
    'six_nine': 'seven_one',
    'seven_one': 'seven_two',
    'seven_two': 'seven_three',
    'seven_three': 'eight',
    'eight': 'nine',
    'nine': 'ten',
    'ten': 'ten_doc',
    'ten_doc': 'save_form',
    'save_form': 'main',
    'show_data': 'clear_session',
    'consent_form': 'one',
}

$('#myForm').on('submit', function (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    $.ajax({
        type: "POST",
        url: url_dict[values.url_val], // or whatever
        // dataType: "text",
        // processData: false,  // tell jQuery not to process the data
        // contentType: false,  // tell jQuery not to set contentType
        data: values,
        success: function (response, textStatus, xhr) {
            switch (response) {
                case 'ok':
                    $('#loading').hide();
                    window.location.replace(redirect_dict[values.redi_val]);
                    break;
                case 'already_exists':
                    $('#loading').hide();
                    setTimeout(function () {
                        GiveName.scrollIntoView({
                            behavior: 'auto',
                            block: 'center',
                            inline: 'center'
                        });
                    }, 500);
                    $('#master_modal').modal('show');
                    $('#div_modal_body').text('ชื่อ-นามสกุลนี้ เคยถูกบันทึกข้อมูลเข้ามาแล้ว กรุณาลองใหม่อีกครั้ง');
                    break;
                case 'cid_already_exists':
                    $('#loading').hide();
                    setTimeout(function () {
                        CitizenID.scrollIntoView({
                            behavior: 'auto',
                            block: 'center',
                            inline: 'center'
                        });
                    }, 500);
                    $('#master_modal').modal('show');
                    $('#div_modal_body').text('เลขบัตรประชาชนนี้ เคยถูกบันทึกข้อมูลเข้ามาแล้ว กรุณาลองใหม่อีกครั้ง');
                    break;
                case 'login_failed':
                    $('#loading').hide();
                    window.location.replace(window.location.origin);
                    break;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#master_modal').modal('show');
            $('#div_modal_body').text('กรุณาลองใหม่อีกครั้ง');
            $('#loading').hide();
        }
    })
})
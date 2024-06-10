
$('#login').on('submit', function (e) {
    e.preventDefault();
    $('#loading').show();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    $.ajax({
        type: "POST",
        url: "login_check", // or whatever
        // dataType: "text",
        // processData: false,  // tell jQuery not to process the data
        // contentType: false,  // tell jQuery not to set contentType
        data: values,
        success: function (response, textStatus, xhr) {
            switch (response.result) {
                case 'ok':
                    if (response.user_data) {
                        localStorage.setItem("user_data", JSON.stringify(response.user_data));
                    }
                    window.location.replace("/main");
                    // $('#loading').hide();
                    break;
                case 'login_failed':
                    $('#loading').hide();
                    // $('#master_modal').modal('show');
                    // $('#div_modal_body').text('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
                    window.location.replace(window.location.origin);
                    break;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#loading').hide();
            $('#master_modal').modal('show');
            $('#div_modal_body').text('กรุณาลองใหม่อีกครั้ง');
        }
    })
})
$(document).ready(() => {

    $(".comment").on("click", (btn_e) => {
        let btn = btn_e.target
        let save_btn = document.getElementById("save_comment");

        save_btn.innerHTML = "บันทึก";
        save_btn.style.backgroundColor = "#0d6efd";
            
        $('#modal_comment').modal("show");
        $('form input[name="section_show_data_id"]').val(btn.getAttribute('data-ID'))
        $('form textarea[name="text"]').val(btn.value)
    })

    $('#form_comment').on("submit", function (event) {
        event.preventDefault();

        const csrftoken = getCookie('csrftoken');
        const data = new FormData(event.target);
        let save_btn = document.getElementById("save_comment");
        data.append('csrfmiddlewaretoken', csrftoken);

        $(`button[data-ID='${data.get("section_show_data_id")}']`).val(data.get("text"))

        save_btn.innerHTML = "กำลังบันทึก";
        save_btn.disabled = true;

        $.ajax({
            type: "POST",
            url: "save_comment",
            data: Object.fromEntries(data.entries()),
            caches: false,
            success: function (response, textStatus, xhr) {
                save_btn.disabled = false;
                switch (response) {
                    case "ok":
                        save_btn.innerHTML = "บันทึกสำเร็จ";
                        save_btn.style.backgroundColor = "#006400";
                        setTimeout(() => {
                            $('#modal_comment').modal("hide");
                        }, 1400)
                        break;
                    case "login_failed":
                        save_btn.innerHTML = "login_failed";
                        setTimeout(() => {
                            window.location.replace(window.location.origin);
                        }, 2000)
                        break;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                save_btn.disabled = false;
                save_btn.innerHTML = "บันทึกไม่สำเร็จ";
                save_btn.style.backgroundColor = "#FF0800";
                setTimeout(() => {
                    save_btn.innerHTML = "ลองอีกครั้ง";
                }, 2000)

            }
        })

    })

})
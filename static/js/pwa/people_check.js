$('document').ready(function () {
    $('input[name="GiveName"]').on('change', async function () {
        let GiveName = this;
        let FamilyName = document.getElementById('FamilyName');
        let result = await check_people_onchange(GiveName.value, FamilyName.value)
        if (result.msg != "" && result.msg != undefined) {
            document.getElementById('people_name_info').innerHTML = "ชื่อ-นามสกุลนี้ เคยยื่นเข้ามาแล้ว และสามารถบันทึกข้อมูลต่อไปได้";
        } else {
            document.getElementById('people_name_info').innerHTML = ""
        }
    })

    $('input[name="FamilyName"]').on('change', async function () {
        let GiveName = document.getElementById('GiveName');
        let FamilyName = this;
        let result = await check_people_onchange(GiveName.value, FamilyName.value)
        if (result.msg != "" && result.msg != undefined) {
            document.getElementById('people_name_info').innerHTML = "ชื่อ-นามสกุลนี้ เคยยื่นเข้ามาแล้ว และสามารถบันทึกข้อมูลต่อไปได้";
        } else {
            document.getElementById('people_name_info').innerHTML = ""
        }
    })

    $('input[name="CitizenID"]').on('change', async function () {
        let CitizenID = this;
        let result = await check_people_onchange("", "", CitizenID.value)
        if (result.msg != "" && result.msg != undefined) {
            document.getElementById('people_cid_info').innerHTML = "เลขบัตรประจำตัวประชาชนนี้ เคยยื่นเข้ามาแล้ว และสามารถบันทึกข้อมูลต่อไปได้";
        } else {
            document.getElementById('people_cid_info').innerHTML = "";
        }
    })

})


function check_people_onchange(first_name = "", last_name = "", citizen_id = "") {
    const csrftoken = getCookie('csrftoken');
    return new Promise((resolve) => {
        let url = "check_name_people";
        if (citizen_id != "") url = "check_cid_people"
        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            data: {
                'GiveName': first_name,
                'FamilyName': last_name,
                'CitizenID': citizen_id,
                'csrfmiddlewaretoken': csrftoken
            },
            success: function (response, textStatus, xhr) {
                switch (response.result) {
                    case 'ok':
                        return resolve(response)
                        break;
                    case 'already_exists':
                        alert('ชื่อ-นามสกุลนี้ เคยถูกบันทึกข้อมูลเข้ามาแล้ว กรุณาลองใหม่อีกครั้ง');
                        return resolve(response)
                        break;
                    case 'login_failed':
                        $('#loading').hide();
                        return resolve(window.location.replace(window.location.origin))
                        break;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return resolve({msg:''})
            }
        })
    })

}

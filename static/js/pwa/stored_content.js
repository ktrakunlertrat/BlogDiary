$('.stored_content').hide();
function show_stored_case() {
    let is_stored_case = false;
    for (const key in localStorage) {
        if (key.startsWith('case_')) is_stored_case = true;
    }

    if (is_stored_case) {
        $('.stored_content').show();
        for (const key in localStorage) {
            if (key.startsWith('case_')) {
                let data = JSON.parse(localStorage.getItem(key));
                let infor_data = data.pwa_one;
                $('.stored_content tbody').append(`
                <tr style="text-align: center;">
                    <td>${key.replace('case_', '')}</td>
                    <td>${get_prefix(infor_data.Prefix)} ${infor_data.GiveName} ${infor_data.FamilyName}</td>
                    <td>${get_sub_district(infor_data.sub_district)}</td>
                    <td>${get_district(infor_data.district)}</td>
                    <td>ยังไม่ถูกส่งเข้าระบบ</td>
                    <td>
                    <button type="button" class="btn btn-link" value="show_data_offline&${key.replace('case_', '')}" onclick="edit_case(this);">
                        <i style="font-size:24px; color:black" class="fa">
                            &#xf05a;
                        </i>
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-link" value="pwa_consent_form&${key.replace('case_', '')}" onclick="edit_case(this);">
                        <i style="font-size:24px; color:black" class="fa">
                            &#xf044;
                        </i>
                    </button>
                    </td>
                </tr>`);
            }
        }
    }
}
const img_ID_AllName = [
    "imgIdentityVeriflyExample",
    "imgExteriorHouse",
    "imgInteriorHouse",
    "imgFamilyMember",
    "imgProblem",
    "img_people",
    "img_id_card_case",
    "img_house_registration_house_case",
    "img_house_registration_people_case",
    "img_book_bank_case",
    "img_ktb",
    "img_privacy",
    "img_disabled_card_case",
    "img_id_card_parent",
    "img_house_registration_parent",
    "img_other",
    "img_id_card_case_family",
    "img_house_registration_house_case_family",
    "img_house_registration_people_case_family",
    "img_other_family",
]



function fetch_image(src) {
    return new Promise((resolve) => {
        fetch(src)
            .then(res => {
                if (res.status == 200)
                    return res.blob()
                else
                    return null;
            })
            .then(blob => {
                if (blob == null) {
                    resolve(null)
                } else {
                    const file = new File([blob],src.split("/").slice(-1), { type: blob.type });
                    resolve(file)

                }
            })
    })
}

function get_maxcase() {
    if (localStorage.getItem('maxcase'))
        return Number(localStorage.getItem('maxcase'))
    let maxcase = 0;
    for (var i = 0; i < localStorage.length; i++)
        if (localStorage.key(i).startsWith('case_')) maxcase += 1;
    localStorage.setItem('maxcase', maxcase)
    return maxcase;
}

function update_form(e,confirm=false) {
    if (!confirm) {
        {
            $('#master_modal').modal('show');
            $('#master_modal .modal-header #staticBackdropLabel').html(`คุณต้องการ แก้ไข ข้อมูลใช่หรือไม่?`);
            $('#master_modal .modal-body').remove();
            $('#master_modal .modal-footer').html(`
            <div>
                <button type="button" class="btn btn-warning btn-lg w-100" onclick="update_form(this,true)" value="${e.value}" data-bs-dismiss="modal">แก้ไข</button>
            </div>
            <div>
                <button type="button" class="btn btn-secondary btn-lg w-100" data-bs-dismiss="modal">ยกเลิก</button>
            </div>
            `);
            $('.modal-footer').css('display', 'flex');
            $('.modal-footer').css('flex-direction', 'row')
            $('.modal-footer').css('justify-content', 'center')
            $('.modal-footer div').css('width', '45%')
        }

    }
    if (confirm) {
        $('body').append('<div id="loading"><img src="/static/assets/spinner.png"><div class="text-black">กรุณารอสักครู่</div></div>')
        return new Promise((resolve) => {
            $.ajax({
                type: "POST",
                cache: false,
                url: "get_case_data",
                data: {
                    'informer_id': e.value,
                    'csrfmiddlewaretoken': getCookie('csrftoken'),
                },
                success: async (res) => {
                    let maxcase = get_maxcase();
                    let data = res.pwa_data;
                    let Qjsondata = res.pwa_data.pwa_id;
                    let pwa_id = {
                        pwa_consent_form: "unfilled",
                        pwa_one: "unfilled",
                        pwa_type_people: "unfilled",
                        pwa_two_one: "unfilled",
                        pwa_two_two: "unfilled",
                        pwa_address: "unfilled",
                        pwa_three: "unfilled",
                        pwa_present_address: "ok",
                        pwa_four: "unfilled",
                        pwa_four_one: "unfilled",
                        pwa_four_two: [
                            {
                                result: "unfilled",
                                fam_people_id: ""
                            }
                        ],
                        pwa_four_two_edit: "unfilled",
                        pwa_five: "unfilled",
                        pwa_six_one: "unfilled",
                        pwa_six_two: "unfilled",
                        pwa_six_three: "unfilled",
                        pwa_six_four: "unfilled",
                        pwa_six_five: "unfilled",
                        pwa_six_six: "unfilled",
                        pwa_six_seven: "unfilled",
                        pwa_six_eight: "unfilled",
                        pwa_six_nine: "unfilled",
                        pwa_seven_one: "unfilled",
                        pwa_seven_two: "unfilled",
                        pwa_seven_three: "unfilled",
                        pwa_eight: "unfilled",
                        pwa_nine: "unfilled",
                        pwa_ten: "unfilled",
                        pwa_ten_doc: "unfilled",

                        type_informer: Qjsondata['type_informer'],
                        type_informer_from: Qjsondata['type_informer_from'],
                        informer_id: Qjsondata['informer_id'],
                        type_people: "",
                        people_id: Qjsondata['people_id'],
                        permanent_address_id: Qjsondata['permanent_address_id'],
                        present_address_id: Qjsondata['present_address_id'],
                        postcode_id: Qjsondata['postcode_id'],
                        consent_id: Qjsondata['consent_id'],
                        survey_id: Qjsondata['survey_id'],
                        type_address: Qjsondata['type_address'],
                        user_id: res.User_id
                    }
                    let fam_mem_id = []
                    for (const key in data['pwa_four_two']) {
                        fam_mem_id.push({
                            result: "ok",
                            fam_people_id: data['pwa_four_two'][key].people_id
                        })
                    }
                    pwa_id.pwa_four_two = fam_mem_id;

                    let numcase = Number(get_maxcase())

                    localStorage.setItem('maxcase', (numcase + 1))
                    localStorage.setItem(`case_${(numcase + 1)}`, JSON.stringify(data))
                    localStorage.setItem(`caseQ_${(numcase + 1)}`, JSON.stringify(pwa_id))
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            if (key == 'pwa_consent_form' || key == 'pwa_ten' || key == 'pwa_ten_doc') {
                                for (const k in data[key]) {
                                    if (k.startsWith('img') && k != "img_name_other") {
                                        src = window.location.href.replace(window.location.pathname, "").replace(window.location.search, "") + `/media/${data[key][k]}`;
                                        img_file = await fetch_image(src)
                                        if (img_file != null) {
                                            await set_Img(k, img_file)
                                        }
                                    }
                                }
                            }
                            if(key== 'pwa_four_two'){
                                c=0
                                for (const k in data[key]) {
                                    for(const x in data[key][k]){
                                        if (x.startsWith('img')) {
                                            src = window.location.href.replace(window.location.pathname, "").replace(window.location.search, "") + `/media/${data[key][k][x]}`;
                                            img_file = await fetch_image(src)
                                            if (img_file != null) {
                                                await set_Img(x+c, img_file)
                                            }
                                        }
                                    }
                                    c++
                                }
                            }
                        }
                    }
                    if (Qjsondata['type_informer_from'] == 3) {
                        resolve(window.location.replace('pwa_one'))
                    } else if (Qjsondata['type_informer_from'] == 4) {
                        resolve(window.location.replace('pwa_one'))
                    } else {
                        resolve(window.location.replace('pwa_consent_form'))
                    }
                }
            })

        })

    }
}

function update_page(page, informer_id, text=' ข้อมูล', confirm = false) {
    if (!confirm) {
        {
            $('#master_modal').modal('show');
            $('#master_modal .modal-header #staticBackdropLabel').html(`<p class="text-black">คุณต้องการแก้ไข <b class="text-black">"${text}"</b> </p>ใช่หรือไม่?`);
            $('#master_modal .modal-body').remove();
            $('#master_modal .modal-footer').html(`
            <div>
                <button type="button" class="btn btn-warning btn-lg w-100" onclick="update_page('${page}','${informer_id}','${text}',true)" data-bs-dismiss="modal">แก้ไข</button>
            </div>
            <div>
                <button type="button" class="btn btn-secondary btn-lg w-100" data-bs-dismiss="modal">ยกเลิก</button>
            </div>
            `);
            $('.modal-footer').css('display', 'flex');
            $('.modal-footer').css('flex-direction', 'row')
            $('.modal-footer').css('justify-content', 'center')
            $('.modal-footer div').css('width', '45%')
        }

    }

    if (confirm) {
        if (!page.startsWith('pwa_')) {
            if (page == 'เด็ก') {
                page = 'pwa_two_two';
            } else if(page == 'บุคคลทั่วไป') {
                page = 'pwa_two_one';
            }else{
                page = 'pwa_type_people';
            }
        }
        $('body').append('<div id="loading"><img src="/static/assets/spinner.png"><div class="text-black">กรุณารอสักครู่</div></div>')
        return new Promise((resolve) => {
            $.ajax({
                type: "POST",
                cache: false,
                url: "get_case_data",
                data: {
                    'informer_id': informer_id,
                    'page': page,
                    'csrfmiddlewaretoken': getCookie('csrftoken'),
                },
                success: async (res) => {
                    let data = res.pwa_data;
                    let Qjsondata = res.pwa_data.pwa_id;
                    let pwa_id = {
                        pwa_consent_form: "unfilled",
                        pwa_one: "unfilled",
                        pwa_type_people: "unfilled",
                        pwa_two_one: "unfilled",
                        pwa_two_two: "unfilled",
                        pwa_address: "unfilled",
                        pwa_three: "unfilled",
                        pwa_present_address: "ok",
                        pwa_four: "unfilled",
                        pwa_four_one: "unfilled",
                        pwa_four_two: [
                            {
                                result: "unfilled",
                                fam_people_id: ""
                            }
                        ],
                        pwa_four_two_edit: "unfilled",
                        pwa_five: "unfilled",
                        pwa_six_one: "unfilled",
                        pwa_six_two: "unfilled",
                        pwa_six_three: "unfilled",
                        pwa_six_four: "unfilled",
                        pwa_six_five: "unfilled",
                        pwa_six_six: "unfilled",
                        pwa_six_seven: "unfilled",
                        pwa_six_eight: "unfilled",
                        pwa_six_nine: "unfilled",
                        pwa_seven_one: "unfilled",
                        pwa_seven_two: "unfilled",
                        pwa_seven_three: "unfilled",
                        pwa_eight: "unfilled",
                        pwa_nine: "unfilled",
                        pwa_ten: "unfilled",
                        pwa_ten_doc: "unfilled",

                        type_informer: Qjsondata['type_informer'],
                        type_informer_from: Qjsondata['type_informer_from'],
                        informer_id: Qjsondata['informer_id'],
                        type_people: "",
                        people_id: Qjsondata['people_id'],
                        permanent_address_id: Qjsondata['permanent_address_id'],
                        present_address_id: Qjsondata['present_address_id'],
                        postcode_id: Qjsondata['postcode_id'],
                        consent_id: Qjsondata['consent_id'],
                        survey_id: Qjsondata['survey_id'],
                        type_address: Qjsondata['type_address'],
                        user_id: res.User_id
                    }
                    let fam_mem_id = []
                    for (const key in data['pwa_four_two']) {
                        fam_mem_id.push({
                            result: "ok",
                            fam_people_id: data['pwa_four_two'][key].people_id
                        })
                    }
                    pwa_id.pwa_four_two = fam_mem_id;

                    let numcase = Number(get_maxcase())

                    localStorage.setItem('maxcase', (numcase + 1))
                    localStorage.setItem(`case_${(numcase + 1)}`, JSON.stringify(data))
                    if(page!='pwa_four_two')
                    pwa_id[page] = 'edit';
                    localStorage.setItem(`caseQ_${(numcase + 1)}`, JSON.stringify(pwa_id))
                    if (page == 'pwa_ten' || page == 'pwa_ten_doc') {
                        for (const key in data) {
                            if (data.hasOwnProperty(key)) {
                                if (key == 'pwa_ten' || key == 'pwa_ten_doc') {
                                    for (const k in data[key]) {
                                        if (k.startsWith('img') && k != "img_name_other") {
                                            src = window.location.href.replace(window.location.pathname, "").replace(window.location.search, "") + `/media/${data[key][k]}`;
                                            img_file = await fetch_image(src)
                                            if (img_file != null) {
                                                await set_Img(k, img_file)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    if(page == 'pwa_four_two'){
                        c=0
                        for (const k in data[page]) {
                            for(const x in data[page][k]){
                                if (x.startsWith('img')) {
                                    src = window.location.href.replace(window.location.pathname, "").replace(window.location.search, "") + `/media/${data[page][k][x]}`;
                                    img_file = await fetch_image(src)
                                    if (img_file != null) {
                                        await set_Img(x+c, img_file)
                                    }
                                }
                            }
                            c++
                        }
                    }

                    sessionStorage.setItem(`edit`, `${(numcase + 1)}`)
                    resolve(window.location.replace(page))
                }
            })

        })

    }
}


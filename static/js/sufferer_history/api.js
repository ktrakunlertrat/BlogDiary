$(document).ready(() => {
    dayjs.extend(window.dayjs_plugin_buddhistEra);
    dayjs.locale("th");

    const api_key = ['mso-welfare', 'dop', 'dsdw', 'dcy']
    let promise = []

    var url_string = window.location.href;
    var url = new URL(url_string);
    var citizen_id = url.searchParams.get("citizen_id");
    url.searchParams.forEach((value, key) => {
        if (api_key.includes(key)) promise.push(api_request(key, citizen_id));
    })


    Promise.all(promise).then((values) => {
        setTimeout(() => {
            document.getElementById('api-loading-wrapper').classList.add('d-none');
        }, 150000);

        // sort data from many department
        let xx = list_data.sort((o,x)=>{
            o = dayjs(o.VISIT_DATE);
            x = dayjs(x.VISIT_DATE);
            return o < x ? 1 : -1;
        })

        // check if profile not exist.
        const profile = document.getElementById('profile').dataset.profile
        if (profile == 'false' &&  xx[0]) {
            const d = xx[0]
            document.getElementById("profile-name").innerHTML = d.FIRSTNAME
            document.getElementById("profile-lastname").innerHTML = d.LASTNAME
            document.getElementById("provile-citizenID").innerHTML = d.IDCARD
            
            document.getElementById("profile-birthday").innerHTML =  dayjs(d.BIRTH_DATE).format("D MMMM BBBB");

            document.getElementById("profile-pre-building-number").innerHTML = d.CURR_ADD_HOUSE_NO ? d.CURR_ADD_HOUSE_NO : "-"
            document.getElementById("profile-pre-road").innerHTML = d.CURR_ADD_ROAD ? d.CURR_ADD_ROAD : "-"
            document.getElementById("profile-pre-sub-district").innerHTML = d.CURR_ADD_SUBDISTRICTS_NAME ? d.CURR_ADD_SUBDISTRICTS_NAME : "-"
            document.getElementById("profile-pre-district").innerHTML = d.CURR_ADD_DISTRICTS_NAME
            document.getElementById("profile-pre-province").innerHTML = d.CURR_ADD_PROVINCES_NAME

            document.getElementById("profile-per-building-number").innerHTML = d.REGIST_ADD_HOUSE_NO ? d.REGIST_ADD_HOUSE_NO : "-"
            document.getElementById("profile-per-road").innerHTML = d.REGIST_ADD_ROAD ? d.REGIST_ADD_ROAD : "-"
            document.getElementById("profile-per-sub-district").innerHTML = d.REGIST_ADD_SUBDISTRICTS_NAME ? d.REGIST_ADD_SUBDISTRICTS_NAME : "-"
            document.getElementById("profile-per-district").innerHTML = d.REGIST_ADD_DISTRICTS_NAME
            document.getElementById("profile-per-province").innerHTML = d.REGIST_ADD_PROVINCES_NAME

            document.getElementById("profile-nationality").innerHTML = d.NATIONALITY
            document.getElementById("profile-ethnicity").innerHTML = d.RACE
            document.getElementById("profile-religion").innerHTML = d.RELIGIONS_NAME

            document.getElementById("profile-isintpmap").innerHTML = d.TPMAP ? d.TPMAP : "ไม่อยู่"
            
        }
    });

});

var list_data = []
var main_history_by_province_obj = {}

function api_request(key, citizen_id) {
    return new Promise((resolve, reject) => {
        document.getElementById('loading-' + key).classList.remove('d-none');
        $.ajax({
            url: `sh_api`,
            type: "POST",
            data: {
                'csrfmiddlewaretoken': getCookie('csrftoken'),
                api_key: key,
                identification_number: citizen_id
            },
            success: (response) => {

                let history_by_department_obj = response[0];
                let history_by_province_obj = response[1];

                let xx = response[2].sort((o,x)=>{
                    o = dayjs(o.VISIT_DATE);
                    x = dayjs(x.VISIT_DATE);
                    return o < x ? 1 : -1;
                })
                
                if(xx[0]) list_data.push(xx[0])

                render_by_department(history_by_department_obj)
                render_by_province(history_by_province_obj)

                document.querySelector(`#loading-${key} .fa-check`).classList.remove('d-none');
                document.querySelector(`#loading-${key} .fa-circle-o-notch`).classList.add('d-none');

                resolve(response);
            },
            error: (e) => {
                document.querySelector(`#loading-${key} .fa-times`).classList.remove('d-none');
                document.querySelector(`#loading-${key} .fa-circle-o-notch`).classList.add('d-none');
                resolve(e);
            }
        })
    })
}
function render_by_department(obj){
    let history_by_department_html = '';

    for (const [key, value] of Object.entries(obj)) {
        let list = ''
        value.list.forEach((o) => {
            list += `<div class="col-12 border-pink-rounded py-2">
            <div class="row">
              <div class="col-3 d-flex align-items-center">
                <div class="h2 fw-bolder lh-1" style="color: ${value.color}">${key}</div>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-7 p-0 text-pink-soft">
                    <div class="small lh-1 fw-bolder text-pink">วันรับเรื่อง</div>
                    ${o.receive_date}
                  </div>
                  <div class="col-5 p-0 text-pink-soft">
                    <div class="small lh-1 fw-bolder text-pink">จำนวนเงิน</div>
                    ${o.money} <span class="d-none d-sm-inline-block">บาท</span><span class="d-sm-none">฿</span>
                  </div>
                </div>
                <div class="row pt-2">
                  <div class="col-7 p-0 text-pink-soft">
                    <div class="small lh-1 fw-bolder text-pink">วันที่ช่วยเหลือ</div>
                    ${o.help_date}
                  </div>
                  <div class="col-5 p-0 text-pink-soft">
                    <div class="small lh-1 fw-bolder text-pink">จังหวัด</div>
                    ${o.province}
                  </div>
                </div>
              </div>
              <div class="col-1 p-0 d-flex flex-column justify-content-between">
                <div class="text-center"></div>
                <div class="text-start"><!--...--></div>
              </div>
            </div>
          </div>`
        })

        history_by_department_html += `
                        <div class="col-12 col-lg-6 card-column d-flex flex-column justify-content-between align-items-start">
                        <div class="h1 fw-bolder lh-1" style="color: ${value.color}">${key}</div>
                        <div class="lh-1" style="tranform:translate(0,50px)">${value.money_name}</div>
                        <div class="position-relative border-pink-rounded mt-3 py-2 w-100">
                        <div class="position-absolute top-0 border-text fw-bolder">ประวัติการขอความช่วยเหลือ</div>
                        <div class="container box-height-md overflow-auto">
                            <!-- history-content-items-->
                            <div class="row history-content-items g-3 mt-1">
                            <!-- history-content-item-->
                            ${list}
                            </div>
                        </div>
                        </div>
                    </div>
                `
    }
    document.querySelector("#history_by_department .emty-card-column").insertAdjacentHTML("beforeBegin", history_by_department_html);
}

function render_by_province(obj){

    // set data
    for (const [key, value] of Object.entries(obj)) {
        if (main_history_by_province_obj[key]) {
            main_history_by_province_obj[key].push(...value);
        } else {
            main_history_by_province_obj[key] = value;
        }
    }

    // render
    let history_by_province_html = '';
    for (const [key, value] of Object.entries(main_history_by_province_obj)) {

        let list = ''

        value.forEach((o) => {
            list += `
            <div class="row">
                <div class="col fw-bolder">${o.money_name_acronym}</div>
                <div class="col fw-bolder">${o.count} ครั้ง</div>
                <div class="col fw-bolder">
                    <span class="d-block d-lg-none">${o.meeting_year}</span>
                    <span class="d-none d-lg-block">ปีงบ ${o.meeting_year}</span>
                </div>
            </div>`})

        history_by_province_html += `
            <div class="row card-column align-items-center border-pink-rounded p-2 mb-3">
                <h4 class="col-4 col-lg-3 fw-bolder text-pink">${key}</h4>
                <div class="col-8 col-lg-9">
                    ${list}
                </div>
            </div> `
    }

    if (!document.getElementById("api-wrapper-h-province")) {
        document.querySelector("#history_by_province .emty-card-column").insertAdjacentHTML("beforeBegin", `
        <div id="api-wrapper-h-province" class="api-wrapper card-column"></div>`);
    }
    document.getElementById("api-wrapper-h-province").innerHTML = history_by_province_html

}

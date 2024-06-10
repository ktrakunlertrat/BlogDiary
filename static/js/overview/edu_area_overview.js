only_department=false;

function fetchData(dict_obj = {}) {
    dict_obj["ministry_id"] = document.getElementById("ministry_id").value;
    dict_obj["province_id"] = document.getElementById("province_id").value;

    $('body').append('<div id="loading-overview"><div class="text-white">กรุณารอสักครู่ ...</div></div>')
    return new Promise(async (resolve) => {
        $.ajax({
            url: "get_Detail_Dashboard",
            type: "GET",
            caches: false,
            data: dict_obj,
            success: async (response) => {
                document.getElementById("loading-overview").remove();
                if (response.result != "ok") {

                }
                resolve(response);
            },
            error:(e)=>{
                document.getElementById("loading-overview").remove();
                resolve(response);
            }
        });
    })
}

function resolveData(json_data) {
    // heading
    let department_wrapper = document.getElementById("department-wrapper");
    let departments_wrapper = document.getElementById("departments-wrapper");
    let back_btn = document.getElementById("back-btn");

    // departments
    let info_area_table = document.getElementById("info-area-table");
    let area_overview = document.getElementById("area-overview");

    document.getElementById("school_number_all").innerHTML = json_data["จำนวนโรงเรียนทั้งหมด"] ? json_data["จำนวนโรงเรียนทั้งหมด"] : 0;
    document.getElementById("school_number").innerHTML = json_data["จำนวนโรงเรียนที่ลงทะเบียน"] ? json_data["จำนวนโรงเรียนที่ลงทะเบียน"] : 0;

    document.getElementById("teadher_number_all").innerHTML = json_data["จำนวนครูทั้งหมด"] ? json_data["จำนวนครูทั้งหมด"] : 0;
    document.getElementById("teadher_number").innerHTML = json_data["จำนวนครูที่ลงทะเบียน"] ? json_data["จำนวนครูที่ลงทะเบียน"] : 0;

    document.getElementById("student_number_all").innerHTML = json_data["จำนวนนักเรียนทั้งหมด"] ? json_data["จำนวนนักเรียนทั้งหมด"] : 0;
    document.getElementById("student_number").innerHTML = json_data["จำนวนนักเรียนที่ถูกช่วยเหลือ"] ? json_data["จำนวนนักเรียนที่ถูกช่วยเหลือ"] : 0;

    if (json_data["สถานะ"]) {
        let status = json_data["สถานะ"];
        let data = []
        const status_color = {
            'ช่วยเหลือแล้ว': '#00B628',
            'กรอกแบบสอบ': '#00A7CB',
            'ตรวจสอบข้อมูล': '#E86100',
            'อยู่ระหว่างพิจารณา': '#808080',
            'สถานะทั้งหมด': '#C63884'
        }
        //กรองจำนวนสถานะที่มากกว่า 0 
        for (s in status) if (status[s] != 0 & s != 'สถานะทั้งหมด') data.push({ name: s, y: status[s], color: status_color[s] })
        craftChart('overview', pieOptions,
            [{
                name: 'ภาพรวม',
                data: data,
            }],
            {
                tooltip: {
                    format: `<b>{key}<br>{y} / ${status["สถานะทั้งหมด"]} เคส</b>`,
                },
            })
    }
    if (json_data["จำนวนครูในแต่ละเขต"]) {
        only_department = false;
        departments_wrapper.classList.remove('d-none');
        departments_wrapper.classList.add('d-block');
        department_wrapper.classList.remove('d-block');
        department_wrapper.classList.add('d-none');
        
        back_btn.classList.add('d-none');
        back_btn.classList.remove('d-inline-block');

        let area = json_data["จำนวนครูในแต่ละเขต"];
        area_html = "";
        checkbox_student_html  = `<div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox_student_area_all">
                                    <label class="form-check-label" for="checkbox_student_area_all">
                                        ทั้งหมด
                                    </label>
                                </div>`;  
        checkbox_teacher_html = `<div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox_teacher_area_all">
                                    <label class="form-check-label" for="checkbox_teacher_area_all">
                                        ทั้งหมด
                                    </label>
                                </div>`;             
        for (a in area) {
            area_html += `
                <div class="col-6 col-md-4 py-0 px-1">
                <div class="container-fluid bg-white rounded p-2 h-200 d-flex flex-column justify-content-between">
                    <div class="fw-bolder text-center">${area[a]["division_id__department_id__name"]}</div>
                    <div class="chart" id="area_${area[a]["division_id__department_id__id"]}"></div>
                    <div class="detail-btn text-end text-secondary" onclick="areaViewDetail(${area[a]["division_id__department_id__id"]});">...</div>
                </div>
                </div>
            `;
            checkbox_student_html += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="departments" value="${area[a]["division_id__department_id__id"]}" id="checkbox_student_area_${area[a]["division_id__department_id__id"]}">
                    <label class="form-check-label" for="checkbox_student_area_${area[a]["division_id__department_id__id"]}">
                        ${area[a]["division_id__department_id__name"]}
                    </label>
                </div>
            `;
            checkbox_teacher_html += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="departments" value="${area[a]["division_id__department_id__id"]}" id="checkbox_teacher_area_${area[a]["division_id__department_id__id"]}">
                    <label class="form-check-label" for="checkbox_teacher_area_${area[a]["division_id__department_id__id"]}">
                        ${area[a]["division_id__department_id__name"]}
                    </label>
                </div>
            `;
        }
        $('#all_area_info').html(area_html)
        $('#excel_model_student .checkbox-wrapper').html(checkbox_student_html)
        $('#excel_model_teacher .checkbox-wrapper').html(checkbox_teacher_html)
        for (a in area) {
            craftChart(`area_${area[a]["division_id__department_id__id"]}`, gaugeOptions, [{
                data: [area[a]["percent"]],
            }])
        }

    } else if (json_data["ข้อมูลในเขต"]) {
        only_department = true;
        department_wrapper.classList.add('d-block');
        department_wrapper.classList.remove('d-none');
        departments_wrapper.classList.add('d-none');
        departments_wrapper.classList.remove('d-block');


        info_area_table.classList.add('d-block');
        info_area_table.classList.remove('d-none');
        area_overview.classList.add('d-none');
        area_overview.classList.remove('d-block');

        back_btn.classList.add('d-inline-block');
        back_btn.classList.remove('d-none');


        document.getElementById("department").innerHTML = json_data["ข้อมูลในเขต"]["name"]
        document.getElementById("area-name").innerHTML = json_data["ข้อมูลในเขต"]["name"]

        let rows = "";

        for (r in json_data["ข้อมูลในเขต"]["detail"]) {
            rows += `<tr>
                        <td>${Number(r) + 1}</td>
                        <td>${json_data["ข้อมูลในเขต"]["detail"][r]['โรงเรียน']}</td>
                        <td>${json_data["ข้อมูลในเขต"]["detail"][r]['เคสทั้งหมด']}</td>
                        <td>${json_data["ข้อมูลในเขต"]["detail"][r]['ปัญหาที่พบมากที่สุด']}</td>
                        <td>${json_data["ข้อมูลในเขต"]["detail"][r]['อยู่ระหว่างการพิจารณา']}</td>
                        <td>${json_data["ข้อมูลในเขต"]["detail"][r]['ดำเนินการแล้ว']}</td>
                    </tr>`
        }
        document.getElementById("info-area-table-tbody").innerHTML = rows;
    }

    if (json_data["สภาพปัญหา"]) {
        let problem_type = json_data["สภาพปัญหา"]
        craftChart('problem_type', barOptions, [{
            name: 'ประเภทสภาพปัญหาความเดือดร้อน',
            data: [
                problem_type["มิติความเป็นอยู่"],
                problem_type["มิติรายได้"],
                problem_type["มิติการเข้าถีงสวัสดิการภาครัฐ"],
                problem_type["มิติสุขภาพ"],
                problem_type["มิติการศึกษา"]
            ]
        }],
            {
                yAxis: {
                    max: Number(json_data["จำนวนนักเรียนที่ถูกช่วยเหลือ"]) != 0 ? Number(json_data["จำนวนนักเรียนที่ถูกช่วยเหลือ"]) : null
                },
            }
        );
    }

}
// ดูข้อมูลเฉพาะเขต
async function areaViewDetail(department_id) {
    const d = await fetchData({ department_id: department_id });
    resolveData(d);
}

document.addEventListener('DOMContentLoaded', async function () {
    // if(document.getElementById('department_id')){
    //     const department_id = document.getElementById('department_id').value;
    //     const d = await fetchData({ department_id: department_id });
    // }
    // else{
    //     const d = await fetchData();
    // }

    
// ดูภาพรวมทุกเขตf
    const d = await fetchData();
    resolveData(d);
    
    $("#checkbox_student_area_all").click(function () {
        $("#excel_model_student .form-check input[type='checkbox']").prop('checked', $(this).prop('checked'));
    });

    $("#checkbox_teacher_area_all").click(function () {
        $("#excel_model_teacher .form-check input[type='checkbox']").prop('checked', $(this).prop('checked'));
    });
});
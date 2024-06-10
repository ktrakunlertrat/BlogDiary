$(async () => {
    const modal = document.querySelector("#loadCaseHistoryConfirmModal");

    const datetime_date_e = document.querySelector('.insert-row input[name="datetime_date"]'),
        tpmap_e = document.querySelector('.insert-row input[name="tpmap"]'),
        informer_type_e = document.querySelector('.insert-row select[name="informer_type"]'),// ประเภทผู้รับบริการ

        i_cid_e = document.querySelector('.insert-row input[name="i_cid"]'),
        i_prefix_e = document.querySelector('.insert-row select[name="i_prefix"]'),
        i_first_name_e = document.querySelector('.insert-row input[name="i_first_name"]'),
        i_last_name_e = document.querySelector('.insert-row input[name="i_last_name"]'),
        i_date_date_e = document.querySelector('.insert-row input[name="i_date_date"]'),
        i_date_e = document.querySelector('.insert-row #i_date'),
        i_relationship_e = document.querySelector('.insert-row select[name="i_relationship"]'),
        i_edu_e = document.querySelector('.insert-row select[name="i_edu"]'),
        i_ethnicity_e = document.querySelector('.insert-row select[name="i_ethnicity"]'),
        i_nationality_e = document.querySelector('.insert-row select[name="i_nationality"]'),
        i_religion_e = document.querySelector('.insert-row select[name="i_religion"]'),
        i_marital_status_e = document.querySelector('.insert-row select[name="i_marital_status"]'),

        i_homenum_e = document.querySelector('.insert-row input[name="i_homenum"]'),
        i_moo_e = document.querySelector('.insert-row input[name="i_moo"]'),
        i_road_e = document.querySelector('.insert-row input[name="i_road"]'),
        i_province_e = document.querySelector('.insert-row select[name="i_province"]'),
        i_district_e = document.querySelector('.insert-row select[name="i_district"]'),
        i_sub_district_e = document.querySelector('.insert-row select[name="i_sub_district"]'),
        i_zipcode_e = document.querySelector('.insert-row input[name="i_zipcode"]'),

        i_same_address_1_e = document.querySelector('.insert-row input[name="i_same_address"]#i_same_address_1'),
        i_same_address_2_e = document.querySelector('.insert-row input[name="i_same_address"]#i_same_address_2'),

        i_homenum_now_e = document.querySelector('.insert-row input[name="i_homenum_now"]'),
        i_moo_now_e = document.querySelector('.insert-row input[name="i_moo_now"]'),
        i_road_now_e = document.querySelector('.insert-row input[name="i_road_now"]'),
        i_province_now_e = document.querySelector('.insert-row select[name="i_province_now"]'),
        i_district_now_e = document.querySelector('.insert-row select[name="i_district_now"]'),
        i_sub_district_now_e = document.querySelector('.insert-row select[name="i_sub_district_now"]'),
        i_zipcode_now_e = document.querySelector('.insert-row input[name="i_zipcode_now"]'),


        p_cid_e = document.querySelector('.insert-row input[name="p_cid"]'),
        p_prefix_e = document.querySelector('.insert-row select[name="p_prefix"]'),
        p_first_name_e = document.querySelector('.insert-row input[name="p_first_name"]'),
        p_last_name_e = document.querySelector('.insert-row input[name="p_last_name"]'),
        p_date_date_e = document.querySelector('.insert-row input[name="p_date_date"]'),
        p_date_e = document.querySelector('.insert-row #p_date'),
        p_edu_e = document.querySelector('.insert-row select[name="p_edu"]'),
        p_ethnicity_e = document.querySelector('.insert-row select[name="p_ethnicity"]'),
        p_nationality_e = document.querySelector('.insert-row select[name="p_nationality"]'),
        p_religion_e = document.querySelector('.insert-row select[name="p_religion"]'),
        p_marital_status_e = document.querySelector('.insert-row select[name="p_marital_status"]'),

        pi_pre_same_address_true_e = document.querySelector('.insert-row input[name="pi_pre_same_address"]#pi_pre_same_address_true'),
        pi_pre_same_address_false_e = document.querySelector('.insert-row input[name="pi_pre_same_address"]#pi_pre_same_address_false'),

        p_building_number_e = document.querySelector('.insert-row input[name="p_building_number"]'),
        p_moo_e = document.querySelector('.insert-row input[name="p_moo"]'),
        p_road_e = document.querySelector('.insert-row input[name="p_road"]'),
        p_province_e = document.querySelector('.insert-row select[name="p_province"]'),
        p_district_e = document.querySelector('.insert-row select[name="p_district"]'),
        p_sub_district_e = document.querySelector('.insert-row select[name="p_sub_district"]'),
        p_zipcode_e = document.querySelector('.insert-row input[name="p_zipcode"]'),

        p_same_address_1_e = document.querySelector('.insert-row input[name="p_same_address"]#p_same_address_1'),
        p_same_address_2_e = document.querySelector('.insert-row input[name="p_same_address"]#p_same_address_2'),

        p_building_number_now_e = document.querySelector('.insert-row input[name="p_building_number_now"]'),
        p_moo_now_e = document.querySelector('.insert-row input[name="p_moo_now"]'),
        p_road_now_e = document.querySelector('.insert-row input[name="p_road_now"]'),
        p_province_now_e = document.querySelector('.insert-row select[name="p_province_now"]'),
        p_district_now_e = document.querySelector('.insert-row select[name="p_district_now"]'),
        p_sub_district_now_e = document.querySelector('.insert-row select[name="p_sub_district_now"]'),
        p_zipcode_now_e = document.querySelector('.insert-row input[name="p_zipcode_now"]'),

        housing_conditions_e = document.querySelector('.insert-row select[name="housing_conditions"]'),
        occupation_e = document.querySelector('.insert-row select[name="occupation"]');

    let primary_case = {}

    modal.querySelector(".yes-btn").addEventListener('click', () => set());

    i_cid_e.addEventListener('change', async (event) => {
        const value = event.target.value;
        if (!Script_checkID(value.replace(/-/g, "").trim())) return

        primary_case = await load(value)

        // ป๊อปอัพถามการยืนยันการใช้ข้อมูลเคสที่มีอยู่
        if (Object.keys(primary_case).length) $(modal).modal("show");
    });

    // โหลดข้อมูลเคสที่เคยมีอยู่
    function load(citizen_id) {
        return new Promise((resolve) =>
            $.ajax({
                type: "POST",
                url: "loadCaseHistory",
                data: {
                    citizen_id: citizen_id,
                    csrfmiddlewaretoken: getCookie('csrftoken')
                },
                success: (response) => resolve(response),
                error: () => resolve({})
            })
        )
    }

    // นำข้อมูลเคสไปใส่ในฟอร์ม
    function set() {

        const informer = primary_case.pwa_one;
        const problem = (informer.type_informer == 2 ? primary_case.pwa_two_one : primary_case.pwa_one)
        const problem_pre_address = primary_case.pwa_four
        const problem_per_address = primary_case.pwa_three

        // ที่อยู่ปัจจุบัน กับ ทะเบียนบ้าน ของ ผู้ยื่น  เป็นที่เดียวกันหรือไม่
        const check_is_i_same_address = () => {
            if (informer.ap_AddressID != informer.AddressID) return false
            if (informer.ap_TownshipNumber != informer.TownshipNumber) return false
            if (informer.ap_StreetName != informer.StreetName) return false
            if (informer.ap_province != informer.province) return false
            if (informer.ap_district != informer.district) return false
            if (informer.ap_sub_district != informer.sub_district) return false
            if (informer.ap_postcode != informer.postcode) return false
            return true;
        }

        // ที่อยู่ปัจจุบัน กับ ทะเบียนบ้าน ของ ผู้ประสบปัญหา เป็นที่เดียวกันหรือไม่
        const check_is_p_same_address = () => {
            if (problem_pre_address.AddressID != problem_per_address.AddressID) return false
            if (problem_pre_address.TownshipNumber != problem_per_address.TownshipNumber) return false
            if (problem_pre_address.StreetName != problem_per_address.StreetName) return false
            if (problem_pre_address.province != problem_per_address.province) return false
            if (problem_pre_address.district != problem_per_address.district) return false
            if (problem_pre_address.sub_district != problem_per_address.sub_district) return false
            if (problem_pre_address.postcode != problem_per_address.postcode) return false
            return true;
        }

        // ที่อยู่ปัจจุบัน ของ ผู้ยื่น กับ ที่อยู่ปัจจุบัน ของ ผู้ประสบปัญหา เป็นที่เดียวกันหรือไม่
        const check_is_pi_same_address = () => {
            if (problem_pre_address.AddressID != informer.AddressID) return false
            if (problem_pre_address.TownshipNumber != informer.TownshipNumber) return false
            if (problem_pre_address.StreetName != informer.StreetName) return false
            if (problem_pre_address.province != informer.province) return false
            if (problem_pre_address.district != informer.district) return false
            if (problem_pre_address.sub_district != informer.sub_district) return false
            if (problem_pre_address.postcode != informer.postcode) return false
            return true;
        }

        // people informer
        i_cid_e.value = informer.CitizenID
        i_prefix_e.value = informer.Prefix
        i_first_name_e.value = informer.GiveName
        i_last_name_e.value = informer.FamilyName
        i_date_date_e.value = informer.BirthDate
        i_date_e.value = new Date(informer.BirthDate).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        })
        i_relationship_e.value = informer.relation_case
        i_edu_e.value = informer.Education
        i_ethnicity_e.value = informer.ethnicity
        i_nationality_e.value = informer.nationality
        i_religion_e.value = informer.religion
        i_marital_status_e.value = informer.marital_status

        i_homenum_e.value = informer.AddressID
        i_moo_e.value = informer.TownshipNumber
        i_road_e.value = informer.StreetName

        i_zipcode_e.value = informer.postcode

        let i_same_address = check_is_i_same_address()
        i_same_address_1_e.checked = i_same_address;
        i_same_address_2_e.checked = !i_same_address;
        if (i_same_address_1_e.checked) i_same_address_1_e.dispatchEvent(new Event('change'))

        i_homenum_now_e.value = informer.ap_AddressID
        i_moo_now_e.value = informer.ap_TownshipNumber
        i_road_now_e.value = informer.ap_StreetName
        i_province_now_e.value = informer.ap_province

        document.getElementById(`select2-${i_province_now_e.id}-container`).innerHTML = informer.ap_province_case
        i_zipcode_now_e.value = informer.ap_postcode


        // people problem
        p_cid_e.value = problem.CitizenID
        p_prefix_e.value = problem.Prefix
        p_first_name_e.value = problem.GiveName
        p_last_name_e.value = problem.FamilyName
        p_date_date_e.value = problem.BirthDate
        p_date_e.value = new Date(problem.BirthDate).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        })
        p_edu_e.value = problem.Education
        p_ethnicity_e.value = problem.ethnicity
        p_nationality_e.value = problem.nationality
        p_religion_e.value = problem.religion
        p_marital_status_e.value = problem.marital_status

        let pi_same_address = check_is_pi_same_address()
        pi_pre_same_address_true_e.checked = pi_same_address;
        pi_pre_same_address_false_e.checked = !pi_same_address;
        if (pi_pre_same_address_true_e.checked) pi_pre_same_address_true_e.dispatchEvent(new Event('change'))

        p_building_number_e.value = problem_pre_address.AddressID
        p_moo_e.value = problem_pre_address.TownshipNumber
        p_road_e.value = problem_pre_address.StreetName

        p_zipcode_e.value = problem_pre_address.postcode

        let p_same_address = check_is_p_same_address()
        p_same_address_1_e.checked = p_same_address;
        p_same_address_2_e.checked = !p_same_address;
        if (p_same_address_1_e.checked) p_same_address_1_e.dispatchEvent(new Event('change'))

        p_building_number_now_e.value = problem_per_address.AddressID
        p_moo_now_e.value = problem_per_address.TownshipNumber
        p_road_now_e.value = problem_per_address.StreetName
        document.getElementById(`select2-${p_province_now_e.id}-container`).innerHTML = problem_per_address.province_case

        p_zipcode_now_e.value = problem_per_address.postcode

        housing_conditions_e.value = primary_case.pwa_four_one.living
        occupation_e.value = primary_case.pwa_four_one.career


        //เลือกที่อยู่ AutoProvince
        $('.insert-row').AutoProvince({
            PROVINCE: i_province_e, // select สำหรับรายชื่อจังหวัด
            AMPHUR: i_district_e, // select สำหรับรายชื่ออำเภอ
            DISTRICT: i_sub_district_e, // select สำหรับรายชื่อตำบล
            POSTCODE: i_zipcode_e, // input field สำหรับรายชื่อรหัสไปรษณีย์
            arrangeByName: true, // กำหนดให้เรียงตามตัวอักษร ลำดับจังหวัด
            CURRENT_PROVINCE: informer.province, // แสดงค่าเริ่มต้น ใส่ไอดีจังหวัดที่เคยเลือกไว้
            CURRENT_AMPHUR: informer.district, // แสดงค่าเริ่มต้น ใส่ไอดีอำเภอที่เคยเลือกไว้
            CURRENT_DISTRICT: informer.sub_district.toString().substring(0, 6), // แสดงค่าเริ่มต้น ใส่ไอดีตำบลที่เคยเลือกไว้
        });

        $('.insert-row').AutoProvince({
            PROVINCE: i_province_now_e, // select สำหรับรายชื่อจังหวัด
            AMPHUR: i_district_now_e, // select สำหรับรายชื่ออำเภอ
            DISTRICT: i_sub_district_now_e, // select สำหรับรายชื่อตำบล
            POSTCODE: i_zipcode_now_e, // input field สำหรับรายชื่อรหัสไปรษณีย์
            arrangeByName: true, // กำหนดให้เรียงตามตัวอักษร ลำดับจังหวัด
            CURRENT_PROVINCE: informer.ap_province, // แสดงค่าเริ่มต้น ใส่ไอดีจังหวัดที่เคยเลือกไว้
            CURRENT_AMPHUR: informer.ap_district, // แสดงค่าเริ่มต้น ใส่ไอดีอำเภอที่เคยเลือกไว้
            CURRENT_DISTRICT: informer.ap_sub_district.toString().substring(0, 6), // แสดงค่าเริ่มต้น ใส่ไอดีตำบลที่เคยเลือกไว้
        });

        $('.insert-row').AutoProvince({
            PROVINCE: p_province_e, // select สำหรับรายชื่อจังหวัด
            AMPHUR: p_district_e, // select สำหรับรายชื่ออำเภอ
            DISTRICT: p_sub_district_e, // select สำหรับรายชื่อตำบล
            POSTCODE: p_zipcode_e, // input field สำหรับรายชื่อรหัสไปรษณีย์
            arrangeByName: true, // กำหนดให้เรียงตามตัวอักษร ลำดับจังหวัด
            CURRENT_PROVINCE: problem_pre_address.province, // แสดงค่าเริ่มต้น ใส่ไอดีจังหวัดที่เคยเลือกไว้
            CURRENT_AMPHUR: problem_pre_address.district, // แสดงค่าเริ่มต้น ใส่ไอดีอำเภอที่เคยเลือกไว้
            CURRENT_DISTRICT: problem_pre_address.sub_district.toString().substring(0, 6), // แสดงค่าเริ่มต้น ใส่ไอดีตำบลที่เคยเลือกไว้
        });

        $('.insert-row').AutoProvince({
            PROVINCE: p_province_now_e, // select สำหรับรายชื่อจังหวัด
            AMPHUR: p_district_now_e, // select สำหรับรายชื่ออำเภอ
            DISTRICT: p_sub_district_now_e, // select สำหรับรายชื่อตำบล
            POSTCODE: p_zipcode_now_e, // input field สำหรับรายชื่อรหัสไปรษณีย์
            arrangeByName: true, // กำหนดให้เรียงตามตัวอักษร ลำดับจังหวัด
            CURRENT_PROVINCE: problem_per_address.province, // แสดงค่าเริ่มต้น ใส่ไอดีจังหวัดที่เคยเลือกไว้
            CURRENT_AMPHUR: problem_per_address.district, // แสดงค่าเริ่มต้น ใส่ไอดีอำเภอที่เคยเลือกไว้
            CURRENT_DISTRICT: problem_per_address.sub_district.toString().substring(0, 6), // แสดงค่าเริ่มต้น ใส่ไอดีตำบลที่เคยเลือกไว้
        });
    }
})
$('document').ready(() => {

    const user_data = JSON.parse(localStorage.getItem(`user_data`));
    const case_data = JSON.parse(localStorage.getItem(`case_${numcase}`));
    
    //แจ้งโดย
    document.getElementById('examiner-full_name').innerHTML = `${user_data.prefix} ${user_data.first_name} ${user_data.last_name}`;     //ชื่อ-นามสกุล:
    document.getElementById('examiner-position').innerHTML = `${user_data.position}`;                                                   //ตำแหน่ง
    document.getElementById('examiner-sdhsv_id').innerHTML = `${user_data.sdhsv_id}`;                                                   //รหัสประจำตัว อพม.
    document.getElementById('examiner-department').innerHTML = `ศูนย์ประสานงาน ${user_data.district}`;                                    //หน่วยงาน
    document.getElementById('examiner-area').innerHTML = `ตำบล${user_data.sub_district} อำเภอ${user_data.district}`;                    //ประจำพื้นที่ 
    
    //1. ข้อมูลส่วนตัวผู้ยื่นแบบคำร้อง
    document.getElementById('informer-type_informer').innerHTML = `${case_data.pwa_one.type_informer == 1 ? 'ผู้ยื่นคำร้อง' : 'ยื่นแทน'}`;                                        //ประเภทยื่นคำร้อง
    document.getElementById('informer-full_name').innerHTML = `${get_prefix(case_data.pwa_one.Prefix)} ${case_data.pwa_one.GiveName} ${case_data.pwa_one.FamilyName}`;      //ชื่อ-นามสกุล:
    document.getElementById('informer-cid').innerHTML = `${case_data.pwa_one.CitizenID}`;                                                                                   //เลขบัตรประชาชน:
    document.getElementById('informer-birthdate_th').innerHTML = `${get_birthday_th(case_data.pwa_one.BirthDate)}`;                                                         //วัน/เดือน/ปีเกิด
    document.getElementById('informer-age').innerHTML = `${case_data.pwa_one.age}`;                                                                                         //อายุ
    document.getElementById('informer-gender').innerHTML = `${case_data.pwa_one.Gender == 1 ? 'ชาย' : 'หญิง'}`;                                                             //เพศ
    document.getElementById('informer-relation_case').innerHTML = `${get_relation_case(case_data.pwa_one.relation_case)}`;                                                  //ความสัมพันธ์กับผู้ประสบปัญหา
    document.getElementById('informer-education').innerHTML = `${get_education(case_data.pwa_one.Education)}`;                                                              //ระดับการศึกษาสูงสุด
    document.getElementById('informer-landline_number').innerHTML = `${case_data.pwa_one.HomeTelephone}`;                                                                   //เบอร์โทรศัพท์
    document.getElementById('informer-fax_number').innerHTML = `${case_data.pwa_one.fax_number}`;                                                                           //เบอร์โทรสาร
    document.getElementById('informer-mobile_phone').innerHTML = `${case_data.pwa_one.MobilePhone}`;                                                                        //เบอร์โทรศัพท์มือถือ
    document.getElementById('informer-email').innerHTML = `${case_data.pwa_one.email}`;

    //informer-present_address
    document.getElementById('informer-present_address-gps').innerHTML = `${case_data.pwa_one.lat}, ${case_data.pwa_one.long}`;
    document.getElementById('informer-present_address-address_identification').innerHTML = `${case_data.pwa_one.permanent_address}`;
    document.getElementById('informer-present_address-building_number').innerHTML = `${case_data.pwa_one.AddressID}`;
    document.getElementById('informer-present_address-township_number').innerHTML = `${case_data.pwa_one.TownshipNumber}`;
    document.getElementById('informer-present_address-township_name').innerHTML = `${case_data.pwa_one.TownshipName}`;
    document.getElementById('informer-present_address-sub_lane').innerHTML = `${case_data.pwa_one.SubLane}`;
    document.getElementById('informer-present_address-lane').innerHTML = `${case_data.pwa_one.Lane}`;
    document.getElementById('informer-present_address-street_name').innerHTML = `${case_data.pwa_one.StreetName}`;
    document.getElementById('informer-present_address-sub_district').innerHTML = `${get_sub_district(case_data.pwa_one.sub_district)}`;
    document.getElementById('informer-present_address-district').innerHTML = `${get_district(case_data.pwa_one.district)}`;
    document.getElementById('informer-present_address-province').innerHTML = `${case_data.pwa_one.province}`;
    document.getElementById('informer-present_address-postcode').innerHTML = `${case_data.pwa_one.postcode}`; 
    
    //informer-permanent_address
    if(case_data.pwa_one["same_permanent_present"] == '1'){
        document.getElementById('informer-permanent_address-gps').innerHTML = `${case_data.pwa_one.lat}, ${case_data.pwa_one.long}`;
        document.getElementById('informer-permanent_address-address_identification').innerHTML = `${case_data.pwa_one.permanent_address}`;
        document.getElementById('informer-permanent_address-building_number').innerHTML = `${case_data.pwa_one.AddressID}`;
        document.getElementById('informer-permanent_address-township_number').innerHTML = `${case_data.pwa_one.TownshipNumber}`;
        document.getElementById('informer-permanent_address-township_name').innerHTML = `${case_data.pwa_one.TownshipName}`;
        document.getElementById('informer-permanent_address-sub_lane').innerHTML = `${case_data.pwa_one.SubLane}`;
        document.getElementById('informer-permanent_address-lane').innerHTML = `${case_data.pwa_one.Lane}`;
        document.getElementById('informer-permanent_address-street_name').innerHTML = `${case_data.pwa_one.StreetName}`;
        document.getElementById('informer-permanent_address-sub_district').innerHTML = `${get_sub_district(case_data.pwa_one.sub_district)}`;
        document.getElementById('informer-permanent_address-district').innerHTML = `${get_district(case_data.pwa_one.district)}`;
        document.getElementById('informer-permanent_address-province').innerHTML = `${case_data.pwa_one.province}`;
        document.getElementById('informer-permanent_address-postcode').innerHTML = `${case_data.pwa_one.postcode}`; 
    }else{
        document.getElementById('informer-permanent_address-gps').innerHTML = `${case_data.pwa_one.ap_lat}, ${case_data.pwa_one.ap_long}`;
        document.getElementById('informer-permanent_address-address_identification').innerHTML = `${case_data.pwa_one.ap_permanent_address}`;
        document.getElementById('informer-permanent_address-building_number').innerHTML = `${case_data.pwa_one.ap_AddressID}`;
        document.getElementById('informer-permanent_address-township_number').innerHTML = `${case_data.pwa_one.ap_TownshipNumber}`;
        document.getElementById('informer-permanent_address-township_name').innerHTML = `${case_data.pwa_one.ap_TownshipName}`;
        document.getElementById('informer-permanent_address-sub_lane').innerHTML = `${case_data.pwa_one.ap_SubLane}`;
        document.getElementById('informer-permanent_address-lane').innerHTML = `${case_data.pwa_one.ap_Lane}`;
        document.getElementById('informer-permanent_address-street_name').innerHTML = `${case_data.pwa_one.ap_StreetName}`;
        document.getElementById('informer-permanent_address-sub_district').innerHTML = `${get_sub_district(case_data.pwa_one.ap_sub_district)}`;
        document.getElementById('informer-permanent_address-district').innerHTML = `${get_district(case_data.pwa_one.ap_district)}`;
        document.getElementById('informer-permanent_address-province').innerHTML = `${case_data.pwa_one.ap_province}`;
        document.getElementById('informer-permanent_address-postcode').innerHTML = `${case_data.pwa_one.ap_postcode}`;  
    }                                                                                  //email
    
    //2. ข้อมูลส่วนตัวผู้ประสบปัญหา
    const two = case_data.pwa_one.type_informer == 1 ? case_data.pwa_one : case_data.pwa_type_people.type_people == 2 ? case_data.pwa_two_two : case_data.pwa_two_one                                                                         
    document.getElementById('problem-type_people').innerHTML = `${case_data.pwa_type_people.type_people == 2 ? 'กรณีเด็ก':'กรณีบุคคลทั่วไป' }`;
    document.getElementById('problem-full_name').innerHTML = `${get_prefix(two.Prefix)} ${two.GiveName} ${two.FamilyName}`;
    document.getElementById('problem-cid').innerHTML = `${two.CitizenID}`;
    document.getElementById('problem-gender').innerHTML = `${two.Gender == 1 ? 'ชาย' : 'หญิง'}`;
    document.getElementById('problem-birthdate_th').innerHTML = `${get_birthday_th(two.BirthDate)}`;
    document.getElementById('problem-age').innerHTML = `${two.age}`;
    document.getElementById('problem-relation_case').innerHTML = `${get_relation_case(two.relation_case)}`;
    document.getElementById('problem-ethnicity').innerHTML = `${two.ethnicity}`;
    document.getElementById('problem-nationality').innerHTML = `${two.nationality}`;
    document.getElementById('problem-religion').innerHTML = `${get_religion(two.religion)}`;
    if(two.marital_status == undefined){
        document.getElementById('problem-marital_status-row').hidden = true;  //สถานภาพ
    }else{
        document.getElementById('problem-marital_status').innerHTML = `${get_marital_status(two.marital_status)}`;
    }

    //ข้อมูลเพิ่มเติม กรณีเด็ก      
    if(case_data.pwa_type_people.type_people != 2){
        $('.child-detail').hide();
    }else{      
        document.getElementById('child-father-full_name').innerHTML = `${two.father_GiveName} ${two.father_FamilyName}`;
        document.getElementById('child-father-birthdate_th').innerHTML = `${two.father_GiveName} ${two.father_FamilyName}`;
        document.getElementById('child-father-age').innerHTML = `${two.age01}`;
        document.getElementById('child-mother-full_name').innerHTML = `${two.mother_GiveName} ${two.mother_FamilyName}`;
        document.getElementById('child-mother-birthdate_th').innerHTML = `${get_birthday_th(two.BirthDate)}`;
        document.getElementById('child-mother-age').innerHTML = `${two.age02}`;
        document.getElementById('child-relationship').innerHTML = `${two.relation_child}`;
        document.getElementById('child-father-reasons_foster_child').innerHTML = `${two.because_father}`;
        document.getElementById('child-mother-reasons_foster_child').innerHTML = `${two.because_mother}`;
    }                                                 

    //3. ที่อยู่ตามทะเบียนบ้าน
    const three = case_data.pwa_three;
    document.getElementById('problem-permanent_address-gps').innerHTML = `${three.lat}, ${three.long}`;
    document.getElementById('problem-permanent_address-address_identification').innerHTML = `${three.permanent_address_id}`;
    document.getElementById('problem-permanent_address-building_number').innerHTML = `${three.AddressID}`;
    document.getElementById('problem-permanent_address-township_number').innerHTML = `${three.TownshipNumber}`;
    document.getElementById('problem-permanent_address-township_name').innerHTML = `${three.TownshipName}`;
    document.getElementById('problem-permanent_address-sub_lane').innerHTML = `${three.SubLane}`;
    document.getElementById('problem-permanent_address-lane').innerHTML = `${three.Lane}`;
    document.getElementById('problem-permanent_address-street_name').innerHTML = `${three.StreetName}`;
    document.getElementById('problem-permanent_address-sub_district').innerHTML = `${get_sub_district(three.sub_district)}`;
    document.getElementById('problem-permanent_address-district').innerHTML = `${get_district(three.district)}`;
    document.getElementById('problem-permanent_address-province').innerHTML = `${three.province}`;
    document.getElementById('problem-permanent_address-postcode').innerHTML = `${three.postcode}`;

    //4. ที่อยู่ปัจจุบัน
    const four = case_data.pwa_four;
    document.getElementById('problem-present_address-gps').innerHTML = `${four.lat}, ${four.long}`;
    document.getElementById('problem-present_address-address_identification').innerHTML = `${four.present_address_id}`;
    document.getElementById('problem-present_address-building_number').innerHTML = `${four.AddressID}`;
    document.getElementById('problem-present_address-township_number').innerHTML = `${four.TownshipNumber}`;
    document.getElementById('problem-present_address-township_name').innerHTML = `${four.TownshipName}`;
    document.getElementById('problem-present_address-sub_lane').innerHTML = `${four.SubLane}`;
    document.getElementById('problem-present_address-lane').innerHTML = `${four.Lane}`;
    document.getElementById('problem-present_address-street_name').innerHTML = `${four.StreetName}`;
    document.getElementById('problem-present_address-sub_district').innerHTML = `${get_sub_district(four.sub_district)}`;
    document.getElementById('problem-present_address-district').innerHTML = `${get_district(four.district)}`;
    document.getElementById('problem-present_address-province').innerHTML = `${four.province}`;
    document.getElementById('problem-present_address-postcode').innerHTML = `${four.postcode}`;

    //ติดต่อผ่าน
    document.getElementById('contact_via-name').innerHTML = `${four.contact_via_name}`;  //ชื่อ-นามสกุล:
    document.getElementById('contact_via-mobile').innerHTML = `${four.contact_via_mobile}`;  //เบอร์โทรศัพท์มือถือ:
    document.getElementById('contact_via-phone').innerHTML = `${four.contact_via_phone}`;  //เบอร์โทรศัพท์บ้าน:

    //รายละเอียดผู้ประสบปัญหา
    const detail = case_data.pwa_four_one;
    document.getElementById('detail-living').innerHTML = `${get_residence_place(detail.living)}`;  //สภาพที่อยู่อาศัย
    document.getElementById('detail-edu').innerHTML = `${get_education(detail.Education)}`;  //ระดับการศึกษาสูงสุด
    document.getElementById('detail-career').innerHTML = `${get_carreer(detail.career)}`;  //อาชีพ
    document.getElementById('detail-income').innerHTML = `${detail.income} บาท`;  //รายได้เฉลี่ยต่อเดือน
    document.getElementById('detail-income_source').innerHTML = `${detail.income_soure} บาท`;  //ที่มาของรายได้
    document.getElementById('detail-debt').innerHTML = `${detail.debt} บาท`;  //หนี้สินในระบบ
    document.getElementById('detail-informal_debt').innerHTML = `${detail.informal_debt} บาท`;  //หนี้สินนอกระบบ


    // case_1_img_house_registration_house_case_family0
    // case_1_img_house_registration_people_case_family0
    // case_1_img_id_card_case_family0
    // case_1_img_other_family0


    //สมาชิกในครอบครัว
    const family_members = case_data.pwa_four_two;
    let family_income = Number(detail.income.replace(/\.|,/gi, '').slice(0, -2))
    family_members.forEach(async function(member,idx) {
        promises = [
            get_Img('case_' + numcase + '_img_id_card_case_family'+(idx)),
            get_Img('case_' + numcase + '_img_house_registration_house_case_family'+(idx)),
            get_Img('case_' + numcase + '_img_house_registration_people_case_family'+(idx)),
            get_Img('case_' + numcase + '_img_other_family'+(idx)),
          ];
        await Promise.all(promises)
                .then((values) => {
                    let img_id_card = values[0] == undefined ? "": URL.createObjectURL(values[0]);
                    let img_house_registration_house = values[1] == undefined ? "": URL.createObjectURL(values[1]);
                    let img_house_registration_people = values[2] == undefined ? "": URL.createObjectURL(values[2]);
                    let img_other = values[3] == undefined ? "": URL.createObjectURL(values[3]);
                    let row = `<tr style="text-align: center;">
                                    <td> ${idx+1}</td>
                                    <td> ${member.CitizenID}</td>
                                    <td> ${get_prefix(member.Prefix)} ${member.GiveName} ${member.FamilyName}</td>
                                    <td> ${ get_birthday_th(member.BirthDate) }</td>
                                    <td> ${ member.age }</td>
                                    <td> ${ member.Gender == 1 ? 'ชาย' : 'หญิง' }</td>
                                    <td> ${ get_relation_case(member.relation_case) }</td>
                                    <td> ${ get_carreer(member.career) }</td>
                                    <td> ${ member.income }</td>
                                    <td> ${ member.body }</td>
                                    <td> ${ member.help_yourself }</td>
                                    <td> ${get_education(member.Education)}</td>
                                    <td> 
                                        <a class="btn btn-outline-primary" data-bs-toggle="modal" href="#fam_document_${idx}" role="button">
                                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                                            &nbsp;ดู
                                        </a>

                                        <div class="modal fade" id="fam_document_${idx}" aria-hidden="false" aria-labelledby="fam_document_${idx}Label" tabindex="-1">
                                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                <h5 class="modal-title text-black" id="fam_document_${idx}Label">รูปเอกสารแนบ</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body text-black">
                                                    <table id="fam_document_{{ member.d_document_obj.document_id }}" class="table table-bordered">`;
                                                    if(img_id_card != ""){
                                                        row +=`
                                                        <tr class="img_id_card">
                                                            <td>บัตรประชาชน</td>
                                                            <td>
                                                                <img src="${ img_id_card }" width="50%">
                                                            </td>
                                                        </tr>`
                                                    }
                                                    if(img_house_registration_house != ""){
                                                        row +=`
                                                        <tr class="img_house_registration_house">
                                                            <td>ทะเบียนบ้าน: รายการเกี่ยวกับบ้าน</td>
                                                            <td>
                                                                <img src="${ img_house_registration_house }" width="50%">
                                                            </td>
                                                        </tr>`
                                                        
                                                    }
                                                    if(img_house_registration_people != ""){
                                                        row += `
                                                        <tr class="img_house_registration_people">
                                                            <td>ทะเบียนบ้าน: รายการเกี่ยวกับบุคคล</td>
                                                            <td>
                                                                <img src="${ img_house_registration_people }" width="50%">
                                                            </td>
                                                        </tr>`
                                                        
                                                    }
                                                    if(img_other != ""){
                                                        row +=`
                                                        <tr class="img_other">
                                                            <td>รูปอื่น ๆ
                                                                <div class="text-black">
                                                                ${member.img_name_other_family}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <img src="${ img_other }" width="50%">
                                                            </td>
                                                        </tr>`
                                                    }
                                                    if(img_id_card == "" && img_house_registration_house == "" && img_house_registration_people == "" && img_other == ""){
                                                        row +=`
                                                        <tr class="img_other">
                                                            <td colspan="2">
                                                                ไม่มีรูปเอกสารแนบใดๆ
                                                            </td>
                                                        </tr>`
                                                    }
                                                    
                                    row +=        `
                                                    </table>
                                                </div>
                                                <div class="modal-footer">
                                                <button class="btn btn-secondary"  data-bs-dismiss="modal" aria-label="Close"> ปิด</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>`;
                                                
                    $(`#family-members`).append(row);
                    family_income += Number(member.income.replace(/\.|,/gi, '').slice(0, -2))
                    document.getElementById('detail-family_average_income').innerHTML = `${family_income.toLocaleString()} บาท`;     //รายได้เฉลี่ยของครอบครัวต่อเดือน
   
                })
                .catch((error) => {
                    // This catch block will not be executed
                    console.error(error);
                });

    });
    
    
    //5. ประเภทผู้เข้ารับบริการ
    const five = case_data.pwa_five
    Object.entries(five).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_5 tbody ol ').append(`<li style="color: #212529">${get_five(key)}</li>`);  //checked ประเภทผู้เข้ารับบริการ
    });

    //6. สภาพปัญหาความเดือนร้อนที่พบ
    //6.1 ด้านที่อยู่อาศัย
    const six1 = case_data.pwa_six_one
    Object.entries(six1).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(3) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.1 ด้านที่อยู่อาศัย
    });
    //6.2 ด้านสุขภาพอนามัย
    const six2 = case_data.pwa_six_two;
    Object.entries(six2).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(5) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.2 ด้านสุขภาพอนามัย
    });
    if (six2.Radio62_012_text != '') $('.section_6 tbody tr:nth-child(5) ol li:last-child').html($('.section_6 tbody tr:nth-child(5) ol li:last-child').html() + ` ${six2.Radio62_012_text}`);
    //6.3 ด้านการศึกษา
    const six3 = case_data.pwa_six_three;
    Object.entries(six3).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(7) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.3 ด้านการศึกษา
    });
    //6.4 ด้านการมีงานทำ และมีรายได้
    const six4 = case_data.pwa_six_four;
    Object.entries(six4).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(9) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.4 ด้านการมีงานทำ และมีรายได้
    });
    if (six4.Radio64_015_text != '') $('.section_6 tbody tr:nth-child(9) ol li:last-child').html($('.section_6 tbody tr:nth-child(9) ol li:last-child').html() + ` ${six4.Radio64_015_text}`);
    //6.5 ด้านครอบครัว
    const six5 = case_data.pwa_six_five;
    Object.entries(six5).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(11) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.5 ด้านครอบครัว
    });
    //6.6 ด้านความรุนแรงในครอบครัว/สังคม
    const six6 = case_data.pwa_six_six;
    Object.entries(six6).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(13) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.6 ด้านความรุนแรงในครอบครัว/สังคม
    });
    //6.7 ด้านการเป็นผู้เสียหายจากการค้ามนุษย์
    const six7 = case_data.pwa_six_seven;
    Object.entries(six7).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(15) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.7 ด้านการเป็นผู้เสียหายจากการค้ามนุษย์
    });
    //6.8 ด้านการเข้าไม่ถึงสิทธิและความเป็นธรรมในสังคม
    const six8 = case_data.pwa_six_eight;
    Object.entries(six8).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(17) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.8 ด้านการเข้าไม่ถึงสิทธิและความเป็นธรรมในสังคม
    });
    //6.9 ด้านสภาพปัญหาสังคมอื่น ๆ
    const six9 = case_data.pwa_six_nine;
    Object.entries(six9).forEach(([key, value]) => {
        if (value == 'True')
            $('.section_6 tbody tr:nth-child(19) ol ').append(`<li style="color: #212529">${get_six(key)}</li>`);  //checked 6.9 ด้านสภาพปัญหาสังคมอื่น ๆ
    });
    if (six9.Radio69_005_text != '') $('.section_6 tbody tr:nth-child(19) ol li:last-child').html($('.section_6 tbody tr:nth-child(19) ol li:last-child').html() + ` ${six9.Radio69_005_text}`);

    //7. เรื่องที่ขอรับความช่วยเหลือที่ต้องการ
    //7.1 ด้านเงิน
    const sev1 = case_data.pwa_seven_one;
    let sev1_row = "";
    Object.entries(sev1).forEach(([key, value]) => {
        if (value == 'True') {
            if (key == '7_24') sev1_row += `<tr><td>${get_seven(key)} ${sev1.value7_24}</td></tr>`;
            else sev1_row += `<tr><td>${get_seven(key)}</td></tr>`;
        }
    });
    $('.section_7 tbody .7_1').after(sev1_row);

    //7.2 ด้านสิ่งของ
    const sev2 = case_data.pwa_seven_two;
    let sev2_row = "";
    Object.entries(sev2).forEach(([key, value]) => {
        if (value == 'True') {
            if (key == 'Radio72_007') sev2_row += `<tr><td>${get_seven(key)} ${sev2.Radio72_007_value}</td></tr>`;
            else sev2_row += `<tr><td>${get_seven(key)}</td></tr>`;
        }
    });
    $('.section_7 tbody .7_2').after(sev2_row);

    //7.3 ความช่วยเหลืออื่น ๆ
    const sev3 = case_data.pwa_seven_three;
    let sev3_row = "";
    Object.entries(sev3).forEach(([key, value]) => {
        if (value == 'True') {
            if (key == 'Radio73_012') sev3_row += `<tr><td>${get_seven(key)} ${sev3.Radio73_012_value}</td></tr>`;
            else sev3_row += `<tr><td>${get_seven(key)}</td></tr>`;
        }
    });
    $('.section_7 tbody .7_3').after(sev3_row);

    //8. สิทธิสวัสดิการที่เคยได้รับ
    const eight = case_data.pwa_eight;
    if (eight.received == 'True') {//else ไม่เคยได้รับสิทธิสวัสดิการ
        $('.section_8 tbody tr:first-child td').html(`<b class="text-black">เคยได้รับสิทธิสวัสดิการ</b>`);  //เคยได้รับสิทธิสวัสดิการ
        Object.entries(eight).forEach(([key, value]) => {
            if (value == 'True' && key != 'received') {
                if(!key.startsWith('value'))
                $('.section_8 tbody ').append(`<tr><td>${get_eight(key)}</td></tr>`); //checked สิทธิสวัสดิการที่เคยได้รับ
            }
        });

    }

    //ผลการเยี่ยมบ้าน 
    const survey = case_data.pwa_ten;
    $('.survey tbody tr:nth-child(1) td:last-child').html(`${survey.HousingStatus}`); //สภาพที่อยู่อาศัย
    $('.survey tbody tr:nth-child(2) td:last-child').html(`${survey.PeopleProblem}`); //สภาพปัญหาความเดือนร้อน
    $('.survey tbody tr:nth-child(3) td:last-child').html(`${survey.agree_staff == 'True' ? 'เห็นชอบ' : 'ไม่เห็นชอบ'}`); //ความเห็นของเจ้าหน้าที่ผู้เยี่ยมบ้าน
    $('.survey tbody tr:nth-child(4) td:last-child').html(`${survey.CommentVisitor}`); //รายละเอียดความเห็นของเจ้าหน้าที่ผู้เยี่ยมบ้าน
    //รูปการเยี่ยมบ้าน
    (async function () {
        $('.survey tbody tr:nth-child(5) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_imgExteriorHouse'))}`);
        $('.survey tbody tr:nth-child(6) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_imgInteriorHouse'))}`);
        $('.survey tbody tr:nth-child(7) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_imgFamilyMember'))}`);
        $('.survey tbody tr:nth-child(8) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_imgProblem'))}`);
        $('.survey tbody tr:nth-child(9) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_people'))}`);
    //รูปเอกสารเพิ่มเติม
        $('.survey tbody tr:nth-child(10) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_id_card_case'))}`);
        $('.survey tbody tr:nth-child(11) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_house_registration_house_case'))}`);
        $('.survey tbody tr:nth-child(12) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_house_registration_people_case'))}`);
        $('.survey tbody tr:nth-child(13) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_book_bank_case'))}`);
        $('.survey tbody tr:nth-child(14) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_ktb'))}`);
        $('.survey tbody tr:nth-child(15) td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_privacy'))}`);
    //unrequired img
        if (await get_Img('case_' + numcase + '_img_disabled_card_case') == undefined)
            $('.survey tbody .img_disabled_card_case').remove();
        else
            $('.survey tbody .img_disabled_card_case td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_disabled_card_case'))}`);

        if (await get_Img('case_' + numcase + '_img_id_card_parent') == undefined)
            $('.survey tbody .img_id_card_parent').remove();
        else
            $('.survey tbody .img_id_card_parent td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_id_card_parent'))}`);

        if (await get_Img('case_' + numcase + '_img_house_registration_parent') == undefined)
            $('.survey tbody .img_house_registration_parent').remove();
        else
            $('.survey tbody .img_house_registration_parent td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_house_registration_parent'))}`);

        if (await get_Img('case_' + numcase + '_img_other') == undefined)
            $('.survey tbody .img_other').remove();
        else {
            $('.survey tbody .img_other td:last-child img').attr("src", `${URL.createObjectURL(await get_Img('case_' + numcase + '_img_other'))}`);//รูปอื่น ๆ
            $('.survey tbody .img_other td:last-child div').html(`${case_data.pwa_ten_doc.img_name_other}`);            //ชื่อรูปอื่น ๆ
        }


    }())
        
    $('.edit-btn').click(()=>{
            localStorage.setItem('maxcase', numcase)
            window.location.replace('pwa_consent_form')
    })
})

function fam_doc_modal(modal_id) {
    $('#document_modal').modal('show');
    let table_content = document.getElementById(modal_id).innerHTML
    $('#document_modal #div_modal_body').html(`<table class="table table-bordered">${table_content}</table>`);
    $('#document_modal #div_modal_body td').css({ "text-align": "center", "vertical-align": "middle" });
}

function update_page_offline(page, numcase,text=' ข้อมูล', confirm = false) {
    if (!confirm) {
        {
            $('#master_modal').modal('show');
            $('#master_modal .modal-header #staticBackdropLabel').html(`<p class="text-black">คุณต้องการแก้ไข <b class="text-black">"${text}"</b> </p>ใช่หรือไม่?`);
            $('#master_modal .modal-body').remove();
            $('#master_modal .modal-footer').html(`
            <div>
                <button type="button" class="btn btn-warning btn-lg w-100" onclick="update_page_offline('${page}','${numcase}','${text}',true)" data-bs-dismiss="modal">แก้ไข</button>
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
        sessionStorage.setItem(`edit`, `offline`)
        window.location.replace(page)

    }
}
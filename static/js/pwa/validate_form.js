function calculate_age(dateString) {
     let today = new Date();
     let birthDate = new Date(dateString);
     let age = today.getFullYear() - birthDate.getFullYear();
     let m = today.getMonth() - birthDate.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
     }
     return age;
}

function validate_form() {
     let results = [];
     results.push(checked_cid_people());

     let age_str = document.getElementById("age").value;
     let age_int = calculate_age(document.getElementById("BirthDate").value);
     let child_true = document.getElementById("child_true").value;

     if (document.getElementById("ap_AddressID"))
          var ap_AddressID = document.getElementById("ap_AddressID").value;
     else var ap_AddressID = "";
     
     if (document.getElementById("ap_district_input"))
          var ap_district_input = document.getElementById("ap_district_input").value;
     else var ap_district_input = "";
     
     if (document.getElementById("ap_sub_district_input"))
          var ap_sub_district_input = document.getElementById("ap_sub_district_input").value;
     else var ap_sub_district_input = "";
     
     let same_permanent_present = document.getElementById("same_permanent_present");

     let select_year = document.getElementById("select-year");

     if (age_str == "ไม่สามารถคำนวณอายุได้ กรุณาใส่ วัน/เดือน/ปี ให้ถูกต้อง") {
          setTimeout(function () {
               select_year.scrollIntoView({
                    behavior: "auto",
                    block: "center",
                    inline: "center",
               });
          }, 500);
          $("#master_modal").modal("show");
          $("#div_modal_body").text("กรุณากรอก วัน/เดือน/ปี เกิด ให้ถูกต้อง");
          results.push(false);

     } else if (age_int < 18 && child_true == "False") {
          setTimeout(function () {
               select_year.scrollIntoView({
                    behavior: "auto",
                    block: "center",
                    inline: "center",
               });
          }, 500);
          $("#master_modal").modal("show");
          if(window.location.pathname == "/pwa_two_one") $("#div_modal_body").html('โปรดตรวจสอบความถูกต้องของอายุ <br>หากเป็นกรณีเด็กให้เลือก "ยื่นแทน" -> "เด็ก" ในหน้าก่อนหน้านี้');
          else $("#div_modal_body").text('หากเป็นกรณีเด็กให้เลือก "ยื่นแทน" และกรอกข้อมูลผู้ยื่นแทนในหน้านี้');
          results.push(false);
     }

     if (same_permanent_present && (ap_AddressID == "" || ap_district_input == "" || ap_sub_district_input == "") && !same_permanent_present.checked) {
          setTimeout(function () {
               same_permanent_present.scrollIntoView({
                    behavior: "auto",
                    block: "center",
                    inline: "center",
               });
          }, 500);
          $("#master_modal").modal("show");
          $("#div_modal_body").text(
               "กรุณา กรอก ที่อยู่ตามทะเบียนบ้านของผู้ยื่นคำร้อง"
          );
          results.push(false);
     }

     if (results.includes(false)) {
          return false;
     } else {
          return true;
     }
}
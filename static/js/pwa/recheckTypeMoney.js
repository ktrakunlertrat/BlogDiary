// link file showData_confirmProblem.html

// get money id 
async function checkStatus(money_id) {
    let valueElementStatus = await document.querySelector('#change_status_to').value
    console.log(money_id)
    if (valueElementStatus !== '') {
        // if input have value then send value to show type of modal
        modalConfirmChangstatus(valueElementStatus, money_id)

    } else if (valueElementStatus == '') {
        // if not have input value,get function alert to insert input 
        console.log("get alert");
        modalAlertInput()
    } else {
        console.log("มีข้อผิดพลาดการป้อนข้อมูล")
    }
}

async function modalAlertInput() {
    await resetValueModal()
    $('#confirm_body').text("กรุณาเลือกสถานะ");

    const buttonCancleElement = await document.querySelector("#recheckCancle");
    const buttonAcceptElement = document.getElementById("recheckAccept");
    buttonCancleElement.style.display = "none";
    buttonAcceptElement.setAttribute("data-bs-dismiss", "modal");
    $('#modalRecheck').modal("show");
}

async function modalConfirmChangstatus(numberValue, money_id) {
    await resetValueModal()
    console.log('enter function ');

    // numberValue is value from status input

    if (numberValue == 3) { // 3 == 1.รับเรื่อง
        if (money_id == 5) {
            // money_id:5  == หมวดเงิน พส
            const headerModal = document.querySelector("#recheck-modal-header");
            headerModal.style.display = "none"
            $('#confirm_body').text("สำหรับเคสรายได้น้อยต้องการเลือกข้อที่ 6 ตามนี้ เพื่อให้เข้าหลักเกณฑ์การจ่ายงานของกรมพส. หรือไม่");
            $('#modalRecheck').modal("show");
            $('#recheck-modal-header').css('display','none')

            const buttonAccept = document.querySelector('#recheckAccept');
            buttonAccept.addEventListener('click',submitForm);
        } else {
            // not match // ไม่ตรงกับเงื่อนไขไหนเลย
            submitForm()
        }
    }
}

async function submitForm(event){
    let formElement = document.querySelector('#bt-submit-statusForm')
    formElement.click();
}

// reset ค่าทั้งหมดของ modal ที่เปลี่ยน
async function resetValueModal() {

    const headerModal = await document.querySelector('#recheck-modal-header');
    const buttonCancleElement = await document.querySelector("#recheckCancle");
    const buttonAcceptElement = await document.getElementById("recheckAccept");
    
    headerModal.style.display = "flex";
    buttonCancleElement.style.display = "block";
    buttonAcceptElement.removeAttribute("data-bs-dismiss")
    buttonAcceptElement.removeEventListener('click',submitForm);

    // text body modal
    $('#confirm_body').text(" ");

}


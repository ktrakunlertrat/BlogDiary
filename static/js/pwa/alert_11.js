$(document).ready(function () {
    checkTypeMoney(typeMoney);

    async function checkTypeMoney(moneyId) {
        if (moneyId == 5) {
            // หมวดเงิน พส
            $("#modalRecheck").modal("show")
            await countCheckboxTrue('input[type="checkbox"].form-check-input');
            await disableInputCheckbox('input[type="checkbox"].form-check-input')
        }
    }


    // นับ checkbox ที่ถูกกด และใส่ eventlistener
    async function countCheckboxTrue(queryCheckbox) {
        const checkBoxs = document.querySelectorAll(queryCheckbox);
        checkBoxs.forEach(element => {
            element.addEventListener('change', function () {
                // Your code to handle the change event for each input
                const arCheckbox = Array.from(checkBoxs)
                const checkedCount = arCheckbox.filter(checkbox => checkbox.checked).length;
                // Update display the count
                if (checkedCount == 0) {
                    const countDisplay = document.getElementById('countChoice');
                    countDisplay.textContent = '0';
                } else {
                    const countDisplay = document.getElementById('countChoice');
                    countDisplay.textContent = checkedCount;
                }

            });
        });
    }

    async function disableInputCheckbox(queryCheckbox) {
        const checkBoxs = document.querySelectorAll(queryCheckbox);
        checkBoxs.forEach(element => {


            element.addEventListener('change', function () {
                // หาโหนดแม่ของ checkbox
                console.log('log')
                const parentNode = this.parentNode.parentNode;
                // หา input ทั้งหมดภายในโหนดแม่
                const inputs = parentNode.querySelectorAll('input[type="number"], textarea');
                // ถ้า checkbox ถูกกด
                if (this.checked) {
                    console.log('Checkbox ถูกตรวจสอบ');
                    inputs.forEach(input => {
                        input.removeAttribute('disabled');
                        // input.setAttribute('required', 'required');
                    });

                } else {
                    inputs.forEach(input => {
                        input.setAttribute('disabled', 'disabled');
                        // input.removeAttribute('required');
                    });
                }
            })
        })
    }


});

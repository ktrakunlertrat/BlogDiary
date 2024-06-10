$(async () => {

    // do not working when offline. 
    if(!window.navigator.onLine) return

    const num_case = get_maxcase();
    const _case = JSON.parse(localStorage.getItem(`case_${num_case}`));
    const modal = document.querySelector("#loadCaseHistoryConfirmModal")
    const citizen_id_e = document.querySelector("#CitizenID")
    if (Object.keys(_case.pwa_one).length) return
    
    let primary_case = {};

    modal.querySelector(".yes-btn").addEventListener('click', () => saveCaseHistory());
    
    citizen_id_e.addEventListener('change', async (event) => {
        const value = event.target.value;
        if (!Script_checkID(value.replace(/-/g, "").trim())) return

        primary_case = await loadCaseHistory(value)

        // ป๊อปอัพถามการยืนยันการใช้ข้อมูลเคสที่มีอยู่
        if (Object.keys(primary_case).length) $(modal).modal("show");
    });


    // โหลดข้อมูลเคสที่เคยมีอยู่
    function loadCaseHistory(citizen_id) {
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

    // บันทึกข้อมูลเคส
    function saveCaseHistory(){
        for (const [key, value] of Object.entries(primary_case)) _case[key] = value;
        localStorage.setItem(`case_${num_case}`, JSON.stringify(_case));
        window.location.reload();
    }
})
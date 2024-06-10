$('.excel-icon button').click((e)=>{
    let value = e.target.value;
    console.log(e.target.value)
    if(only_department){
        console.log("เฉพาะเขต")
    }
})

// $('#excel_model_student').on("submit",(e)=>{
//     e.preventDefault();
//     console.log($('input[type="checkbox"]:checked', this).val())
// })
function manageValue(e){
    e.preventDefault();
    // let checkboxs = e.target.informer_ids;
    // let l_informer_id = e.target.l_informer_id;
    // let checkbox_value = []
    // for(let i = 0;i< checkboxs.length;i++){
    //     if(checkboxs[i].checked && checkboxs[i].value != ''){
    //         checkbox_value.push(...checkboxs[i].value.split(','));
    //     }
    // }
    // l_informer_id.value = checkbox_value;
    // console.log(checkbox_value)
    // console.log(l_informer_id)

    let form = new FormData(e.target);
    const values = Object.fromEntries(form.entries());
    console.log(values)
    


    return true;
}


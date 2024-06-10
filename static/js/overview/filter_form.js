
function closeFilterForm() {
    let filter_form_wrapper = document.getElementsByClassName('filter-form-wrapper')[0];
    filter_form_wrapper.classList.remove('d-block');
    filter_form_wrapper.classList.add('d-none');
    document.getElementById("filter-form-backdrop").remove();
}

function openFilterForm() {
    let filter_form_wrapper = document.getElementsByClassName('filter-form-wrapper')[0];
    filter_form_wrapper.classList.add('d-block');
    filter_form_wrapper.classList.remove('d-none');
    $('body').append('<div id="filter-form-backdrop" onclick="closeFilterForm()"></div>')
}

function clearFilterForm(){
    let e = document.querySelectorAll('.filter-form input:not(input[type="hidden"]), .filter-form select');
    e.forEach(element => {
        element.value="";
    });
}

$(document).ready(()=>{

    let filter_input = document.querySelector('.filter input.text-box');
    filter_input.addEventListener("keyup", (e) => {
        const value = e.target.value;
        if (value == '') return;
        var xpath = `//div[contains(@class,'custom-table-body')]//div[contains(@class,'tr')][.//span[contains(text(),'${value}')]]`;
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.scrollIntoView();
        }
    })
    let filter_options_btn = document.getElementById("filter-options");
    filter_options_btn.addEventListener("click", () => openFilterForm()
    );

    document.getElementById("clear-btn").addEventListener("click", () => clearFilterForm());
    



})
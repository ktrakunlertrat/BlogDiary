$("#generatePassword").on("click", function (e) {
    const csrftoken = getCookie('csrftoken');
    let values = {};
    values.csrfmiddlewaretoken = csrftoken
    $.ajax({
        url: "generate_password",
        type: "POST",
        data: values,
        caches: false,
        success: (response) => {
            document.getElementById("password").value = response;
        }
    })
})
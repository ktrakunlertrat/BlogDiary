document.getElementById("no_citizenidentification_check").addEventListener("change", (event) => {

    const CitizenID = document.getElementById("CitizenID")
    const no_citizenidentification = document.getElementById("no_citizenidentification")



    if (event.target.checked) {
        CitizenID.value = '';
        CitizenID.dispatchEvent(new Event('keyup'));
        CitizenID.dispatchEvent(new Event('change'));
        document.querySelector(".CitizenID-wrapper").classList.add("d-none");
        document.getElementById("CitizenID").required = false;
        document.querySelector("label[for=CitizenID]").classList.remove("required");

        document.querySelector(".no_citizenidentification-wrapper").classList.remove("d-none");
        document.getElementById("no_citizenidentification").required = true;
        document.querySelector("label[for=no_citizenidentification]").classList.add("required");

    } else {
        CitizenID.required = true;
        document.querySelector(".CitizenID-wrapper").classList.remove("d-none");
        document.querySelector("label[for=CitizenID]").classList.add("required");

        no_citizenidentification.required = false;
        document.querySelector(".no_citizenidentification-wrapper").classList.add("d-none");
        document.querySelector("label[for=no_citizenidentification]").classList.remove("required");

    }
});
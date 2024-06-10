function hide_ojb() {
    var page_action = document.getElementById('page_action');

    if (page_action.style.visibility === "hidden") {
        page_action.style.visibility = "visible";
    } else {
        page_action.style.visibility = "hidden";
    }
}
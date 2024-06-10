function hide_ojb() {
    var back = document.getElementById('back');
    var next = document.getElementById('next');

    if (back.style.visibility === "hidden") {
        back.style.visibility = "visible";
        next.style.visibility = "visible";
    } else {
        back.style.visibility = "hidden";
        next.style.visibility = "hidden";
    }
}
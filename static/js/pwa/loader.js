$(function () {
    $('form').on('submit', function (e) {
        $('body').append('<div id="loading"><img src="/static/assets/spinner.png"><div class="text-black">กรุณารอสักครู่</div></div>')
    });
})
window.addEventListener('pageshow', (event) => {
    if (event.persisted) document.getElementById("loading").remove();
});
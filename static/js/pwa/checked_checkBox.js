$(document).ready(function () {
    $("form").submit(function () {
        if ($('input:checkbox').filter(':checked').length < 1) {
            alert("กรุณาเลือกข้อมูลอย่างน้อย 1 ข้อ");
            return false;
        }
    });
});
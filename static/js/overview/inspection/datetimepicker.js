
$.fn.datepicker.dates['th'] = {
    days: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
    daysShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    daysMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
    monthsShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
    today: "วันนี้",
    clear: "ล้าง",
    format: "dd/mm/yyyy",
    titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
    weekStart: 0
};

function datepicker(target) {
    $(target).datepicker({
        endDate: new Date(),
        language: 'th',
        todayHighlight: true,
        clearBtn: true,
        format: {
            toDisplay: (date) => dayjs(date).format('DD/MM/BBBB'),
            toValue: (date) => dayjs(date, "DD/MM/BBBB").toDate()
        }
    }).on('show', function (e) {
        text = dayjs($('.datepicker-switch').html(),'MMMM YYYY').format('MMMM BBBB')
        $('.datepicker-switch').attr('data-title', text);
    })

}
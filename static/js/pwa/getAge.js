/**
 * this function is work with dayjs
 * @param {String} day query selector of day select element.
 * @param {String} month query selector of month select element.
 * @param {String} year query selector of year select element.
 * @param {String} value query selector of value element.
 * @param {String} output query selector of calculated age output element.
 */

function calcAge(day, month, year, value, output) {
    const day_e = document.querySelector(day);
    const month_e = document.querySelector(month);
    const year_e = document.querySelector(year);

    const value_e = document.querySelector(value);
    const output_e = document.querySelector(output);
    const age_fail_text = 'ไม่สามารถคำนวณอายุได้ กรุณาใส่ วัน/เดือน/ปี ให้ถูกต้อง';

    let birth_dayjs = dayjs('1 1', 'D M');

    (() => {
        setDay(birth_dayjs);
        setAge();
        day_e.value = 1;
        month_e.value = 0;
        year_e.value = birth_dayjs.format('BBBB');
    })();

    $([day_e, month_e, year_e]).on('keyup change', function (event) {
        let _birth_dayjs = dayjs(`${day_e.value} ${parseInt(month_e.value) + 1} ${year_e.value}`, 'D M BBBB');
        if (!_birth_dayjs.isValid()) return (output_e.value = age_fail_text);
        birth_dayjs = _birth_dayjs;
        setDay(birth_dayjs);
        setAge();
    });

    // make sure the number of days correspond with the selected month
    function setDay() {
        let options = '';
        for (let i = 1; i <= birth_dayjs.daysInMonth(); i++) options += `<option value="${i}">${i}</option>`;
        day_e.innerHTML = options;
        day_e.value = birth_dayjs.date();
    }

    function setAge() {
        const today = dayjs();
        let ageString = '';
        age = {
            year: today.diff(birth_dayjs, 'year'),
            month: today.diff(birth_dayjs, 'month') % 12,
            day:
                today.date() - birth_dayjs.date() >= 0
                    ? today.date() - birth_dayjs.date()
                    : today.diff(birth_dayjs.year(today.year()).month(today.month() - 1), 'day'),
        };

        ageString += age.year > 0 ? (age.month > 0 ? age.year + ' ปี, ' : age.year > 0 ? age.year + ' ปี' : '') : '';
        ageString += age.month > 0 ? (age.day > 0 ? age.month + ' เดือน, ' : age.month + ' เดือน') : '';
        ageString += age.day > 0 ? age.day + ' วัน' : '';
        if (age.year < 0 || today.diff(birth_dayjs, 'month') < 0 || today.diff(birth_dayjs, 'day') <= 0) ageString = age_fail_text;

        output_e.value = ageString;
        value_e.value = birth_dayjs.format('YYYY-MM-DD');
        year_e.min = parseInt(today.format('BBBB')) - 150;
        year_e.max = today.format('BBBB');
    }
}
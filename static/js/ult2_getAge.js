function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function calcAge(element=null) {
    console.log('hello')
    var now = new Date();
    var today = new Date(now.getYear(), now.getMonth(), now.getDate());

    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
    let day,month,year

    if(element!=null){
        day = $(element).closest('.select-date').find('.select-day').val();
        month = $(element).closest('.select-date').find('.select-month').val();
        year = parseInt($(element).closest('.select-date').find('.select-year').val()) - 543;
    }else{
        day = document.getElementById('select-day').value;
        month = document.getElementById('select-month').value;
        year = parseInt(document.getElementById('select-year').value) - 543;
    }

    let dob = new Date(year, month, day);

    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";

    yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
    else {
        yearAge--;
        var monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
        var dateAge = dateNow - dateDob;
    else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };

    if (age.years > 1) yearString = " ปี";
    else yearString = " ปี";
    if (age.months > 1) monthString = " เดือน";
    else monthString = " เดือน";
    if (age.days > 1) dayString = " วัน";
    else dayString = " วัน";

    if(age.years <= 150){
        if ((age.years > 0) && (age.months > 0) && (age.days > 0))
            ageString = age.years + yearString + ", " + age.months + monthString + ", " + age.days + dayString;
        else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
            ageString = age.days + dayString;
        else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
            ageString = age.years + yearString;
        else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
            ageString = age.years + yearString + ", " + age.months + monthString;
        else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
            ageString = age.months + monthString + ", " + age.days + dayString;
        else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
            ageString = age.years + yearString + ", " + age.days + dayString;
        else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
            ageString = age.months + monthString;
        else ageString = "ไม่สามารถคำนวณอายุได้ กรุณาใส่ วัน/เดือน/ปี ให้ถูกต้อง";
    }
    else {
        ageString = "ไม่สามารถคำนวณอายุได้ กรุณาใส่ วัน/เดือน/ปี ให้ถูกต้อง";
    }

    $(element).closest('.date-section').find('input[name="age"]').val(ageString);
    $(element).closest('.date-section').find('input[name="BirthDate"]').val(formatDate(dob));
    $(element).closest('.date-section').find('input[name="select-year"]').attr("min",yearNow + 150);
    $(element).closest('.date-section').find('input[name="select-year"]').attr("max",yearNow);

    // document.getElementById('age').value = ageString;
    // document.getElementById('BirthDate').value = formatDate(dob);
    // document.getElementById("select-year").min = yearNow + 150;
    // document.getElementById("select-year").max = yearNow;
}
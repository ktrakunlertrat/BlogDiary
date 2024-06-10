function fun_ult2_change_status(people_informer_id) {
    var people_informer_id_str = String(people_informer_id);
    var l_people_informer_id = document.getElementById('l_people_informer_id');
    var l_people_informer_id_val = l_people_informer_id.value;
    const myArray = l_people_informer_id_val.split(',');
    if (myArray.includes(people_informer_id_str)) {
        l_people_informer_id.value = l_people_informer_id_val.replace(people_informer_id_str,'');
    } else {
        l_people_informer_id.value += people_informer_id_str + ','
    }
}
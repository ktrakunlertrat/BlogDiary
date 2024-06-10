async function clean_Localstorage() {
    const maxcase = get_maxcase();
    for (let numcase = 1; numcase <= maxcase; numcase++) {
        if (is_AllPagePass(numcase)) {
            await removeCaseFromLs(numcase);
        }
    }
}

// check is all page in that case was ok.
function is_AllPagePass(numcase) {
    let keys = getQ(numcase);
    let user_id = JSON.parse(localStorage.getItem('user_data')).user_id;
    if (Number(keys['user_id']) != Number(user_id)) return true;
    for (const key in keys) {
        if (keys[key] == 'filled' || keys[key] == 'already_exists' || keys[key] == 'cid_already_exists') return false;
    }
    return is_AllFamilyMemberPass(numcase);
}



function is_AllFamilyMemberPass(numcase = get_maxcase()) {
    let caseQ = getQ(numcase);
    for (idx in caseQ['pwa_four_two']) {
        if (caseQ['pwa_four_two'][idx]['result'] == 'filled' ||
            caseQ['pwa_four_two'][idx]['result'] == 'already_exists' ||
            caseQ['pwa_four_two'][idx]['result'] == 'cid_already_exists') return false;
    }
    return true;
}

function removeCaseFromLs(numcase) {
    return new Promise(async (resolve) => {

        let name_numcase = "case_" + numcase;
        let nameQ_numcase = "caseQ_" + numcase;
        const case_data = JSON.parse(localStorage.getItem(name_numcase))
        for (i in case_data) {
            if (i == 'pwa_consent_form' || i == 'pwa_ten' || i == 'pwa_ten_doc') {
                for (j in case_data[i]) {
                    if (j.startsWith('img')) {
                        case_data[i][j] = await delete_Img(`case_${numcase}_${j}`)
                    }
                }
            }
            if (i == 'pwa_four_two') {
                c = 0
                for (j in case_data[i]) {
                    for(x in case_data[i][j]){
                        if (x.startsWith('img')) {
                            case_data[i][j][x] = await delete_Img(`case_${numcase}_${x}${c}`)
                        }
                    }
                    c++
                }
            }
        }

        localStorage.removeItem(name_numcase);
        localStorage.removeItem(nameQ_numcase);
        resolve()
    })
}


async function manageNumCase() {
    let maxcase = 0;
    for (var i = 0; i < localStorage.length; i++)
        if (localStorage.key(i).startsWith('case_')) {
            if (maxcase <= Number(localStorage.key(i).slice(5))) maxcase = Number(localStorage.key(i).slice(5))
        }
    cazelist = [];

    for (let caze = 1; caze <= maxcase; caze++) {
        let namels = "case_" + caze;

        for (let key in localStorage) {
            if (key == namels) {
                cazelist.push(caze);
                break;
            }
        }
    }

    for (let i = 0; i < cazelist.length; i++) {
        let oldkey = "case_" + cazelist[i];
        let oldkeyQ = "caseQ_" + cazelist[i];

        for (let key in localStorage) {
            if (key.startsWith(oldkey)) {
                let newkey = key.replace(oldkey, "case_" + (i + 1));

                let case_data = JSON.parse(localStorage.getItem(oldkey))
                for (p in case_data) {
                    if (p == 'pwa_consent_form' || p == 'pwa_ten' || p == 'pwa_ten_doc') {
                        for (j in case_data[p]) {
                            if (j.startsWith('img')) {
                                await rename_NameImage(`case_${cazelist[i]}_${j}`, `case_${i + 1}_${j}`);
                            }
                        }
                    }
                    if (p == 'pwa_four_two') {
                        c = 0
                        for (j in case_data[p]) {
                            for(x in case_data[p][j]){
                                if (x.startsWith('img')) {
                                    await rename_NameImage(`case_${cazelist[i]}_${x}${c}`, `case_${i + 1}_${x}${c}`);
                                }
                            }
                            c++
                        }
                    }
                }
                rename_KeyLocalStorage(key, newkey);
            }
        }

        for (let key in localStorage) {
            if (key.startsWith(oldkeyQ)) {
                let newkey = key.replace(oldkeyQ, "caseQ_" + (i + 1));
                rename_KeyLocalStorage(key, newkey);
            }
        }



    }

    cazelist = [];
    for (let caze = 1; caze <= maxcase; caze++) {
        let namels = "case_" + caze;

        for (let key in localStorage) {
            if (key == namels) {
                cazelist.push(caze);
                break;
            }
        }
    }

    localStorage.setItem("maxcase", cazelist.length);
}

function rename_KeyLocalStorage(oldkey, newkey) {
    if (localStorage.getItem(oldkey)) {
        let oldkey_value = localStorage.getItem(oldkey);
        localStorage.setItem(newkey, oldkey_value);
        if (oldkey != newkey) localStorage.removeItem(oldkey);
        return newkey;
    }
    return oldkey;
}

// this function required some function from send_station.js
function rename_NameImage(oldname, newname) {
    return new Promise(async (resolve) => {
        if (oldname != newname) {

            let image = await get_Img(oldname);
            if (image != undefined) {
                const db = await get_indexedDB();
                let transaction = db.transaction(["image"], "readwrite");
                let objectStore = transaction.objectStore("image")

                let data = { Key: newname, file: image }
                const request = objectStore.put(data);
                request.onsuccess = (event) => {
                    delete_Img(oldname).then(resolve());
                };
            }
            resolve();
        }
        resolve();

    })
}
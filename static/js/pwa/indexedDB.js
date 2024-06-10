function get_indexedDB() {
    return new Promise((resolve, reject) => {
        var request = window.indexedDB.open("mydatabase", 1);
        request.onerror = function (error) {
            resolve(error)
        };
        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            db.createObjectStore("image", { keyPath: "Key" });
        };

        request.onsuccess = function (event) {
            let db = request.result;
            resolve(db)
        };

    });
}

async function get_Img(key) {
    const db = await get_indexedDB();
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(["image"], "readwrite");
        let objectStore = transaction.objectStore("image")
        const request = objectStore.get(key);
        request.onsuccess = (event) => {
            if (event.target.result !== undefined)
                resolve(event.target.result.file)
            else
                resolve();
        };
        request.onerror = (er) => reject("can't get", key, er);
    })
}

async function delete_Img(key) {
    const db = await get_indexedDB();
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(["image"], "readwrite");
        let objectStore = transaction.objectStore("image")
        const request = objectStore.delete(key);
        request.onsuccess = (event) => {
            resolve();
        };
        request.onerror = (er) => reject("can't delete", key, er);
    })
}

async function set_Img(img_id, img_file, numcase = get_maxcase()) {
    const db = await get_indexedDB();
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(["image"], "readwrite");
        let objectStore = transaction.objectStore("image")
        let data = { Key: "case_" + numcase + '_' + img_id, file: img_file }
        const request = objectStore.put(data);
        request.onsuccess = (event) => {
            resolve()
        };
        request.onerror = (er) => reject("can't set", key, er);
    })
}

// for delete button action
function modal(img_name, sample_img_path, numcase = get_maxcase()) {
    $('#master_modal').modal('show');
    $('#master_modal .modal-header #staticBackdropLabel').html(`ท่านแน่ใจหรือไม่ที่จะลบรูปนี้ออก ?`);
    $('#master_modal .modal-body').remove();
    $('#master_modal .modal-footer').html(`
    <div>
        <button type="button" class="btn btn-danger btn-lg w-100" onclick="delete_image('${img_name}','${sample_img_path}')" data-bs-dismiss="modal">ลบ</button>
    </div>
    <div>
        <button type="button" class="btn btn-secondary btn-lg w-100" data-bs-dismiss="modal">ยกเลิก</button>
    </div>
    `);
    $('#master_modal .modal-footer').css('display', 'flex');
    $('#master_modal .modal-footer').css('flex-direction', 'row')
    $('#master_modal .modal-footer').css('justify-content', 'center')
    $('#master_modal .modal-footer div').css('width', '45%')
      
}

// for delete button action
async function delete_image(img_name, sample_img_path, numcase = get_maxcase()) {
    const key = `case_${numcase}_${img_name}`
    await delete_Img(key)
    const imageBlob = await fetchBlob(sample_img_path);
    const imageObjectURL = URL.createObjectURL(imageBlob);
    const fileInput = document.getElementById(`${img_name}`);
    const output_img = document.getElementById(`output_${img_name}`)
    output_img.src = imageObjectURL;
    output_img.classList.add("org_img");
    fileInput.value = "";

    const is_required = $(`label[for="${img_name}"]`).attr('class').includes("required");
    if(is_required){
        fileInput.setAttribute("required","");
    }

    var video = document.getElementById('video');
    if (video != undefined){
        const output_img = document.getElementById(`output_${img_name}`)
        formsrc = document.getElementById('imgIdentityVeriflyExample');
        formsrc.value = none
        output_img.style.display = "none"
        video.style.display = "block"
    }
}

// for delete button action
async function fetchBlob(url) {
    const response = await fetch(url);
    return response.blob();
}
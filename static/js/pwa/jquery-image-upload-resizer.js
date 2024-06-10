(function ($) {
    $.fn.imageUploadResizer = function (db, options) {
        var settings = {
            max_width: 1000,
            max_height: 1000,
            quality: 0.7,
            do_not_resize: [],
            ...options,
        };

        this.filter('input[type="file"]').each(function (e) {
            // load exist image in IndexedDB.
            let transaction = db.transaction(['image'], 'readwrite');
            let objectStore = transaction.objectStore('image');

            const request = objectStore.get(`case_${get_maxcase()}_${this.id}`);
            request.onsuccess = (event) => {
                if (event.target.result !== undefined) {
                    const output_img = document.getElementById('output_' + this.id);
                    output_img.src = URL.createObjectURL(event.target.result.file);
                    output_img.classList.remove('org_img');
                    this.removeAttribute('required');
                }
            };
            request.onerror = (er) => console.log("can't get", `case_${get_maxcase()}_${this.id}`, er);

            this.onchange = function () {
                const that = this; // input node
                const originalFile = this.files[0];

                // image type failed handler.
                if (!originalFile || !originalFile.type.startsWith('image')) {
                    let text = `${originalFile.name.split('.').pop()}`;
                    $('#div_modal_body').html(`
                            <div class="h5 text-center text-black">
                                ไม่สามารถถ่าย/เพิ่มรูปด้วยนามสกุล  
                                    <div class="fw-bolder text-black">.${text} </div>
                                กรุณาเปลี่ยนการตั้งค่าที่กล้อง
                            </div>`);

                    $('#master_modal').modal('show');
                    return;
                }

                // Don't resize if doNotResize is set
                if (settings.do_not_resize.includes('*') || settings.do_not_resize.includes(originalFile.type.split('/')[1])) {
                    return;
                }

                var reader = new FileReader();

                reader.onload = function (e) {
                    var img = document.createElement('img');
                    var canvas = document.createElement('canvas');

                    img.src = e.target.result;
                    img.onload = function () {
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);

                        const ratio = Math.min(settings.max_width / img.width, settings.max_height / img.height);
                        const width = Math.round(img.width * ratio) / 1.0;
                        const height = Math.round(img.height * ratio) / 1.0;

                        canvas.width = width;
                        canvas.height = height;

                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        if (that.id == 'imgIdentityVeriflyExample') {
                            var thai_currnet_date = document.getElementById('thai_currnet_date').innerHTML;
                            ctx.font = '48px THsarabun';
                            ctx.translate(width / 2, height / 2);
                            ctx.rotate(-Math.PI / 4);
                            ctx.textAlign = 'center';
                            // ctx.fillText(text, x, y);
                            ctx.fillText(thai_currnet_date, 0, 0);
                        }

                        canvas.toBlob(
                            function (blob) {
                                var resizedFile = new File([blob], 'resized_' + originalFile.name, originalFile);

                                var dataTransfer = new DataTransfer();
                                dataTransfer.items.add(resizedFile);

                                // temporary remove event listener, change and restore
                                var currentOnChange = that.onchange;

                                that.onchange = null;
                                that.files = dataTransfer.files;
                                that.onchange = currentOnChange;

                                let transaction = db.transaction(['image'], 'readwrite');
                                let objectStore = transaction.objectStore('image');

                                let data = { Key: 'case_' + get_maxcase() + '_' + that.id, file: that.files[0] };
                                const request = objectStore.put(data);
                                request.onsuccess = (event) => {
                                    dataurl = canvas.toDataURL(img.type);
                                    // document.getElementById('output_' + that.id).src = dataurl;

                                    const output_img = document.getElementById('output_' + that.id);
                                    output_img.src = dataurl;
                                    output_img.classList.remove('org_img');
                                };
                            },
                            'image/jpeg',
                            settings.quality
                        );
                    };
                };
                reader.readAsDataURL(originalFile);
            };
        });

        return this;
    };
})(jQuery);

function get_maxcase() {
    if (localStorage.getItem('maxcase')) return Number(localStorage.getItem('maxcase'));
    let maxcase = 0;
    for (var i = 0; i < localStorage.length; i++) if (localStorage.key(i).startsWith('case_')) maxcase += 1;
    localStorage.setItem('maxcase', maxcase);
    return maxcase;
}

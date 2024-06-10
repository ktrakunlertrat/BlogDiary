(function ($) {

    $.fn.imageUploadResizer = function (options) {
        var settings = $.extend({
            max_width: 1000,
            max_height: 1000,
            quality: 0.7,
            do_not_resize: [],
        }, options);

        this.filter('input[type="file"]').each(function () {
            this.onchange = function () {
                const that = this; // input node
                const originalFile = this.files[0];

                if (!originalFile || !originalFile.type.startsWith('image')) {
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

                    img.src = e.target.result
                    img.onload = function () {
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);

                        const ratio = Math.min(settings.max_width / img.width, settings.max_height / img.height);
                        const width = Math.round(img.width * ratio);
                        const height = Math.round(img.height * ratio);

                        canvas.width = width;
                        canvas.height = height;

                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        if (that.id == 'imgIdentityVeriflyExample') {
                            var thai_currnet_date = document.getElementById('thai_currnet_date').innerHTML;
                            ctx.font = '48px THsarabun';
                            ctx.translate(width/2, height/2);
                            ctx.rotate(-Math.PI / 4);
                            ctx.textAlign = "center";
                            // ctx.fillText(text, x, y);
                            ctx.fillText(thai_currnet_date, 0, 0);                            
                        }

                        canvas.toBlob(function (blob) {
                            var resizedFile = new File([blob], 'resized_' + originalFile.name, originalFile);

                            var dataTransfer = new DataTransfer();
                            dataTransfer.items.add(resizedFile);

                            // temporary remove event listener, change and restore
                            var currentOnChange = that.onchange;

                            that.onchange = null;
                            that.files = dataTransfer.files;
                            that.onchange = currentOnChange;

                        }, 'image/jpeg', 0.7);

                        dataurl = canvas.toDataURL(img.type);
                        $(that).closest('td').find('img').attr("src",dataurl);
                    }
                }
                reader.readAsDataURL(originalFile);
            }
        });

        return this;
    };

}(jQuery));

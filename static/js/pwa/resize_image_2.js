get_indexedDB()
.then((inxdb) => {
    const db = inxdb;
    $('input[type="file"]').imageUploadResizer(db,{
        max_width: 1000, // Defaults 1000
        max_height: 1000, // Defaults 1000
        quality: 0.7, // Defaults 0.7
        do_not_resize: ['gif', 'svg', 'image'], // Defaults []
    });
})

$('.area-overview .detail-btn').click(()=>{
    $('.area-overview').addClass('d-none');
    $('.info-area-table').removeClass('d-none').addClass('d-block');
})

$('.info-area-table .btn-close').click(()=>{
    $('.info-area-table').removeClass('d-block').addClass('d-none');
    $('.area-overview').removeClass('d-none').addClass('d-block');
})
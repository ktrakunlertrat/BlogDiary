$('.family-member .collapse').on('hide.bs.collapse', (event) => {
    $(event.target).parent(".member").css("background", "#F8F4F6");
    $(event.target).parent(".member").find('svg').css("transform", "rotate(180deg)");
    $(event.target).parent(".member").removeClass("pb-0");
});
$('.family-member .collapse').on('show.bs.collapse', (event) => {
    $(event.target).parent(".member").css("background", "#FFEEF8");
    $(event.target).parent(".member").find('svg').css("transform", "rotate(0deg)");
    $(event.target).parent(".member").addClass("pb-0");
});

// overview-history
$('.overview-history #overview-tab').on('click',()=>$('#history-content').collapse('hide'));
$('.overview-history #history-tab').on('click',()=>$('#overview-content').collapse('hide'));
$('#overview-content').on('hidden.bs.collapse', () => {
    $("#history-tab").addClass("active");
    $("#overview-tab").removeClass("active");
    $('#history-content').collapse('show');
});
$('#history-content').on('hidden.bs.collapse', () => {
    $("#overview-tab").addClass("active");
    $("#history-tab").removeClass("active");
    $('#overview-content').collapse('show');
});
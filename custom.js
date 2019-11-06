$(document).ready(function () {

    // $("div").click(function (e) {
    //     $(this).css("background-color", "red");
    //     $('div:not(#' + this.id + ')').css("background-color", "white");
    //     e.stopImmediatePropagation();
    // });

    $(".sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    //$('#sidebarCollapse').on('click', function () { // Use if button for collapsing sidebar needed
    $('.sidebar-top').on('click', function () {
        // open or close navbar
        $('.sidebar, .content-container, .sidebar-top').toggleClass('active');
        // close dropdowns
        $('.collapse.in').toggleClass('in');
        // and also adjust aria-expanded attributes we use for the open/closed arrows
        // in our CSS
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});
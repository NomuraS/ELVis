 $(document).ready(function () {
        $('#open_close_left_panel2').css("display", "none");
        $('#open_close_left_panel1').css("display", "block")
    });
    $("#open_close_left_panel1").on("click", function () {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1024) {
            $('#content_left').css("display", "none");
            $('#open_close_left_panel1').css("display", "none");
            $('#open_close_left_panel2').css("display", "block");
            $('#content_right').css("max-width", "100%");
            $('#content_right').css("width", "100%");
        }
    });
    $("#open_close_left_panel2").on("click", function () {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1024) {
            $('#content_left').css("display", "block");
            $('#open_close_left_panel2').css("display", "none");
            $('#open_close_left_panel1').css("display", "block");
            $('#content_right').css("max-width", "60%");
            $('#content_right').css("width", "60%");
        }
    })
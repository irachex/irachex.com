function init_wall() {
    wall = $("#wall");
    wall.doodle();
    $.ajax({
        url: "/load",
        beforeSend: function() {
            showLoading("#content");
        },
        success: function(content) {
            wall.doodle("load", content);
            hideLoading();
        }
    });
}

function init_control() {
    var offset = $("#content").offset();
    $("#control").css({
        "top": offset.top + 50,
        "left": offset.left + 650 + 10
    });
    $(".btn_color").click(function() {
        var color = $(this).css("background-color");
        wall.doodle("setColor", color);
        $("#now_color").css("background-color", color);
    });
    $("#width_slider").change(function() {
        wall.doodle("setWidth", $(this).val());
    });
    $(".btn_save").click(function() {
        showLoading("#content");
        wall.doodle("save", "/save");
        hideLoading();
        showTip("saved", 1000);
    });
}
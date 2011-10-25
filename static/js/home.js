function init_wall() {
    wall = $("#wall");
    wall.doodle();
    $.ajax({
        url: "/load",
        accepts: "text",
        beforeSend: function() {
            showLoading("#content");
        },
        success: function(content) {
            wall.doodle("load", content);
            hideLoading();
        }
    });
}

function getNowWidthTop() {
    var width_slider = $("#width_slider");
    return width_slider.width()*(width_slider.val()-width_slider.attr("min"))/width_slider.attr("max")+width_slider.offset().top;
}
function init_control() {
    var offset = $("#content").offset();
    $("#control").css({
        "top": offset.top+25,
        "left": offset.left + 650 + 10
    });
    $(".btn_color").click(function() {
        var color = $(this).css("background-color");
        wall.doodle("setColor", color);
        $("#now_color").css("background-color", color);
    });
    $("#slider").hover(function() {
        $("#now_width").css({
            "top" : getNowWidthTop(),
            "left" : $("#width_slider").offset().left-20,
        }).fadeIn(100);
    }, function() {
        $("#now_width").fadeOut(1000);
    });
    $("#width_slider").change(function() {
        wall.doodle("setWidth", $(this).val());
        $("#now_width").html($(this).val()).css("top",getNowWidthTop());
    });
    $(".btn_save").click(function() {
        showLoading("#content");
        wall.doodle("save", "/save");
        hideLoading();
        showTip("Saved.", 1500);
    });
}
function init() {
    if (window.location.hash != "") {
        page = window.location.hash.replace("#", "");
        if (page!="home" && page!="about" && page!="work" && page!="blog") {
            page = "home";
        }
    }
    else {
        page = "home";
    }
    var offset = $("#content").offset();
    $("#menu_arrow").css("left", offset.left-20);
    
    changePage(page);
    
    $("#menu div").click(function() {
        page = $("span", this).html().toLowerCase();
        changePage(page);
    });
}

function changeMenu(page) {
    $("div.active").removeClass("active");
    $("div.menu_"+page).addClass("active");
    var offset = $("#menu div.active").offset();
    $("#menu_arrow").animate({"top":offset.top+$("#menu div").height()/2-10}, 200);
}

function changePage(page) {
    //change url
    window.location.hash = page;
    
    //change title
    $("title").html("irachex | "+page.substring(0,1).toUpperCase() +page.substring(1));
    
    //change menu
    changeMenu(page);
    
    //change content
    $.ajax({
        url : "/"+page,
        success: function(content) {
            $("#content").html(content).fadeIn(100);
        }
    });
}

function showTip(text, timeout) {
    var offset = $("#content").offset();
    $("#tip").html(text).css({
        "top": offset.top + 480/2 - $("#tip").height() - 50,
        "left": offset.left + 650/2 - $("#tip").width()/2
    }).fadeIn(300);
    window.setTimeout(function() {
        $("#tip").fadeOut(500);
    }, timeout);
}

function showLoading(selector) {
    var offset = $(selector).offset();
    if (selector=="body") selector=window;
    var w = $(selector).width();
    var h = $(selector).height();
    $("#loading_layer").css({
        "top": offset.top,
        "left": offset.left,
        "width": w,
        "height": h
    }).show();

    $("#loading").css({
        "top": h/2 - 21,
        "left": w/2 - 21
    });
    loading_img = document.getElementById("loading");
    loading_pos = 0;
    loading_ani = function () {
        loading_pos > -504 ? loading_pos -= 42 : loading_pos = 0;
        loading_img.style.backgroundPosition = "0 " + (loading_pos)+ "px";
    }
    loading_func = window.setInterval(loading_ani, 50);
}

function hideLoading() {
    $("#loading_layer").fadeOut(100);
    if (!(typeof loading_func === 'undefined')) {
        window.clearInterval(loading_func);
    }
}

$(document).ready(function() {
    if(!($.browser.safari || $.browser.webkit || $.browser.mozilla || $.browser.msie && parseInt($.browser.version)>=9.0)) {
        window.location.href="http://irachex.com/index.php";
    }
});

$(window).load(function() {
    hideLoading();
    $("#container").fadeIn(500);
    init();
    
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");  
    $.getScript(gaJsHost + "google-analytics.com/ga.js",function(){  
    try {  
    var pageTracker = _gat._getTracker("UA-8931954-1");  
    pageTracker._trackPageview();  
    } catch(err) {}  
    });
});
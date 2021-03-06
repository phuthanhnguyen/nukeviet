/* *
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 31/05/2010, 00:36
 */

// NukeViet Default Custom JS
var myTimerPage = "",
	myTimersecField = "",
	tip_active = !1,
    ftip_active = !1,
    tip_autoclose = !0,
    ftip_autoclose = !0,
	winX = 0,
	winY = 0,
	docX = 0,
	docY = 0,
	mapLoaded = 0;

function winResize() {
	winX = $(window).width();
	winY = $(window).height();
	docX = $(document).width();
	docY = $(document).height()
}

function fix_banner_center() {
	var a = Math.round((winX - 1330) / 2);
	0 <= a ? ($("div.fix_banner_left").css("left", a + "px"), $("div.fix_banner_right").css("right", a + "px"), a = Math.round((winY - $("div.fix_banner_left").height()) / 2), 0 >= a && (a = 0), $("div.fix_banner_left").css("top", a + "px"), a = Math.round((winY - $("div.fix_banner_right").height()) / 2), 0 >= a && (a = 0), $("div.fix_banner_right").css("top", a + "px"), $("div.fix_banner_left").show(), $("div.fix_banner_right").show()) : ($("div.fix_banner_left").hide(), $("div.fix_banner_right").hide())
}

function timeoutsesscancel() {
	clearInterval(myTimersecField);
	$.ajax({
		url: nv_siteroot + "index.php?second=statimg",
		cache: !1
	}).done(function() {
		$("#timeoutsess").hide();
		myTimerPage = setTimeout(function() {
			timeoutsessrun()
		}, nv_check_pass_mstime)
	})
}

function timeoutsessrun() {
	clearInterval(myTimerPage);
	document.getElementById("secField").innerHTML = 60;
	jQuery("#timeoutsess").show();
	var a = (new Date).getTime();
	myTimersecField = setInterval(function() {
		var b = (new Date).getTime(),
			b = 60 - Math.round((b - a) / 1E3);
		0 <= b ? document.getElementById("secField").innerHTML = b : -3 > b && (clearInterval(myTimersecField), $(window).unbind(), window.location.reload())
	}, 1E3)
}

function checkWidthMenu() {
	theme_responsive && "absolute" == $("#menusite").css("position") ? ($("li.dropdown ul").removeClass("dropdown-menu"), $("li.dropdown ul").addClass("dropdown-submenu"), $("li.dropdown a").addClass("dropdown-mobile"), $("#menu-site-default ul li a.dropdown-toggle").addClass("dropdown-mobile"), $("li.dropdown ul li a").removeClass("dropdown-mobile")) : ($("li.dropdown ul").addClass("dropdown-menu"), $("li.dropdown ul").removeClass("dropdown-submenu"), $("li.dropdown a").removeClass("dropdown-mobile"), $("li.dropdown ul li a").removeClass("dropdown-mobile"), $("#menu-site-default ul li a.dropdown-toggle").removeClass("dropdown-mobile"));
	$("#menu-site-default .dropdown").hover(function() {
		$(this).addClass("open")
	}, function() {
		$(this).removeClass("open")
	})
}

function tipHide() {
	$("[data-toggle=tip]").attr("data-click", "y").removeClass("active");
    $("#tip").hide();
    tip_active = !1;
    tipAutoClose(!0)
}

function ftipHide() {
	$("[data-toggle=ftip]").attr("data-click", "y").removeClass("active");
	$("#ftip").hide();
	ftip_active = !1;
    ftipAutoClose(!0)
}

function tipAutoClose(a)
{
    !0 != a && (a = !1);
    tip_autoclose = a
}

function ftipAutoClose(a)
{
    !0 != a && (a = !1);
    ftip_autoclose = a
}

function tipShow(a, b) {
    if ($(a).is(".pa")) switchTab(a + " .guest-sign");
    tip_active && tipHide();
    ftip_active && ftipHide();
	$("[data-toggle=tip]").removeClass("active");
	$(a).attr("data-click", "n").addClass("active");
	$("#tip").attr("data-content", b).show("fast");
	tip_active = !0
}

function ftipShow(a, b) {
	if ($(a).is(".qrcode") && "no" == $(a).attr("data-load")) return qrcodeLoad(a), !1;
	tip_active && tipHide();
    ftip_active && ftipHide();
	$("[data-toggle=ftip]").removeClass("active");
	$(a).attr("data-click", "n").addClass("active");
	$("#ftip").attr("data-content", b).show("fast");
	ftip_active = !0
};

//QR-code
function qrcodeLoad(a) {
	var b = new Image,
		c = $(a).data("img");
	$(b).load(function() {
		$(c).attr("src", b.src);
		$(a).attr("data-load", "yes").click()
	});
	b.src = nv_siteroot + "index.php?second=qr&u=" + encodeURIComponent($(a).data("url")) + "&l=" + $(a).data("level") + "&ppp=" + $(a).data("ppp") + "&of=" + $(a).data("of")
};

//Switch tab*/
function switchTab(a) {
	if ($(a).is(".current")) return !1;
	var b = $(a).data("switch").split(/\s*,\s*/),
		c = $(a).data("obj");
	$(c + " [data-switch]").removeClass("current");
	$(a).addClass("current");
    $(c + " " + b[0]).removeClass("hidden");
	for (i = 1; i < b.length; i++) $(c + " " + b[i]).addClass("hidden")
};

/*Change Captcha*/
function change_captcha(a) {
    $("img.captchaImg").attr("src",nv_siteroot + "index.php?scaptcha=captcha&nocache=" + nv_randomPassword(10));
	$(a).val("");
	return !1
};

$(function() {
	winResize();
	fix_banner_center();
	// Modify all empty link
	$('a[href="#"], a[href=""]').attr("href", "javascript:void(0);");
	// Smooth scroll to top
	$("#totop,#bttop,.bttop").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 800);
		return !1
	});
	//Search form
	$(".headerSearch button").on("click", function() {
		if ("n" == $(this).attr("data-click")) return !1;
		$(this).attr("data-click", "n");
		var a = $(".headerSearch input"),
			c = a.attr("maxlength"),
			b = strip_tags(a.val()),
			d = $(this).attr("data-minlength");
		a.parent().removeClass("has-error");
		"" == b || b.length < d || b.length > c ? (a.parent().addClass("has-error"), a.val(b).focus(), $(this).attr("data-click", "y")) : window.location.href = $(this).attr("data-url") + rawurlencode(b);
		return !1
	});
	$(".headerSearch input").on("keypress", function(a) {
		13 != a.which || a.shiftKey || (a.preventDefault(), $(".headerSearch button").trigger("click"))
	});
	// Show messger timeout login users 
	nv_is_user && (myTimerPage = setTimeout(function() {
		timeoutsessrun()
	}, nv_check_pass_mstime));
	// Show confirm message on leave, reload page
	$("form.confirm-reload").change(function() {
		$(window).bind("beforeunload", function() {
			return nv_msgbeforeunload
		})
	});
	// Trigger tooltip
	$(".form-tooltip").tooltip({
		selector: "[data-toggle=tooltip]",
		container: "body"
	});
	// Change site lang
	$(".nv_change_site_lang").change(function() {
		document.location = $(this).val()
	});
	// Menu bootstrap
	$("#menu-site-default a").hover(function() {
		$(this).attr("rel", $(this).attr("title"));
		$(this).removeAttr("title")
	}, function() {
		$(this).attr("title", $(this).attr("rel"));
		$(this).removeAttr("rel")
	});
	//Tip + Ftip
	$("[data-toggle=collapse]").click(function(a) {
    	tipHide();
    	ftipHide();
    	$(".header-nav").is(".hidden-ss-block") ? setTimeout(function() {
    		$(".header-nav").removeClass("hidden-ss-block")
    	}, 500) : $(".header-nav").addClass("hidden-ss-block")
    });
    $(document).on("keydown", function(a) {
    	27 === a.keyCode && (tip_active && tip_autoclose && tipHide(), ftip_active && ftip_autoclose && ftipHide())
    });
    $(document).on("click", function() {
    	tip_active && tip_autoclose && tipHide();
    	ftip_active && ftip_autoclose && ftipHide()
    });
    $("#tip, #ftip").on("click", function(a) {
    	a.stopPropagation()
    });
    $("[data-toggle=tip], [data-toggle=ftip]").click(function() {
    	var a = $(this).attr("data-target"),
    		d = $(a).html(),
    		b = $(this).attr("data-toggle"),
    		c = "tip" == b ? $("#tip").attr("data-content") : $("#ftip").attr("data-content");
    	a != c ? ("" != c && $('[data-target="' + c + '"]').attr("data-click", "y"), "tip" == b ? ($("#tip .bg").html(d), tipShow(this, a)) : ($("#ftip .bg").html(d), ftipShow(this, a))) : "n" == $(this).attr("data-click") ? "tip" == b ? tipHide() : ftipHide() : "tip" == b ? tipShow(this, a) : ftipShow(this, a);
    	return !1
    });
    
    // Google map
    if( $('#company-address').length ){
		$('#company-map-modal').on('shown.bs.modal', function(){
			var a, b, c;
		    a = new google.maps.Map(document.getElementById("company-map"), {
		        zoom: 14,
		        mapTypeId: google.maps.MapTypeId.ROADMAP,
		        disableDefaultUI: false
		 	});
			b = new google.maps.Geocoder();
			b.geocode({ 'address': $('#company-address').text() }, function(results, status){
			    if(status == google.maps.GeocoderStatus.OK){
			        a.setCenter(results[0].geometry.location);
			        var marker = new google.maps.Marker({
			            map: a,
			            position: results[0].geometry.location,
				        draggable: false,
				        animation: google.maps.Animation.DROP
			        });
			    }
			});
		})
    }
});
$(window).on("resize", function() {
	winResize();
	fix_banner_center();
	tipHide();
    ftipHide()
});

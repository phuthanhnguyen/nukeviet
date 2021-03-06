/**
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC ( contact@vinades.vn )
 * @Copyright ( C ) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 1 - 31 - 2010 5 : 12
 */

function inputSignIn(b) {
	!1 === $("#tip .bsubmit").prop("disabled") && (13 != b.which || b.shiftKey || (b.preventDefault(), $("#tip .bsubmit").trigger("click")))
}

function buttonSignIn(b) {
	var a = $("#tip " + b),
		c = $("[name=blogin]", a),
		g = $("[name=bpass]", a),
		e = $("[name=bsec]", a),
		h = $(".info", a),
		d = $(".bsubmit", a).attr("data-errorMessage"),
		k = $(".bsubmit", a).attr("data-loginOk");
	a.find("input,button").each(function() {
		$(this).val(trim(strip_tags($(this).val()))).prop("disabled", !0).parent().parent().removeClass("has-error")
	});
	$.ajax({
		type: "POST",
		cache: !1,
		url: nv_siteroot + "index.php?" + nv_lang_variable + "=" + nv_sitelang + "&" + nv_name_variable + "=users&" + nv_fc_variable + "=login&nocache=" + (new Date).getTime(),
		data: "nv_login=" + encodeURIComponent(c.val()) + "&nv_password=" + encodeURIComponent(g.val()) + (e ? "&nv_seccode=" + encodeURIComponent(e.val()) : "") + "&nv_ajax_login=1",
		dataType: "json",
		success: function(b) {
			if (b.length) {
				$("input", a).prop("disabled", !1);
				setTimeout(function() {
					$(".bsubmit", a).prop("disabled", !1)
				}, 3E3);
				change_captcha(".bsec");
				var f = d + ":<ul>";
				$.each(b, function(a, b) {
					f += "<li>- " + b.value + "</li>";
					"nv_login" == b.name ? c.parent().parent().addClass("has-error") : "nv_password" == b.name ? g.parent().parent().addClass("has-error") : "nv_seccode" == b.name && e.parent().parent().addClass("has-error")
				});
				f += "</ul>";
				h.html(f).addClass("error")
			} else a.find("input,button").parent().parent().removeClass("has-error").addClass("has-success"), h.html(k).removeClass("error").addClass("success"), setTimeout(function() {
				window.location.href = window.location.href
			}, 2E3)
		}
	});
	return !1
}

function inputReg(b) {
	!1 === $("#tip .brsubmit").prop("disabled") && (13 != b.which || b.shiftKey || (b.preventDefault(), $("#tip .brsubmit").trigger("click")))
}

function usageTermsShow()
{
    $.ajax({
        type: 'POST',
        cache: !0,
        url: nv_siteroot + 'index.php?' + nv_lang_variable + '=' + nv_sitelang + '&' + nv_name_variable + '=users&' + nv_fc_variable + '=register',
        data: 'get_usage_terms=1',
        dataType: 'html',
        success: function(e){
            $('#bt_usage-terns').find('.modal-body .ct').html(e);
            $('#bt_usage-terns').modal()
        }
    });
    return!1
}

function addQuestion(b) {
	$("#tip [name=bryq]").val($(b).text());
	$("#tip .btql").attr("data-show", "no");
	$("#tip .qlist").hide();
	return !1
}

function showQlist() {
	var b = $("#tip .qlist"),
		a = b.html(),
		c = $("#tip .btql");
	"yes" == c.attr("data-show") ? (c.attr("data-show", "no"), b.hide()) : ("" == a && $.ajax({
		type: "POST",
		cache: !0,
		url: nv_siteroot + "index.php?" + nv_lang_variable + "=" + nv_sitelang + "&" + nv_name_variable + "=users&" + nv_fc_variable + "=register",
		data: "get_question=1",
		dataType: "json",
		success: function(a) {
			var c = "<ul>";
			$.each(a, function(a, b) {
				0 != a && (c += '<li><a href="javascript:void(0);" onclick="addQuestion(this);">' + b.title + "</a></li>")
			});
			b.html(c)
		}
	}), c.attr("data-show", "yes"), b.show());
	return !1
}

function buttonReg(b) {
	var a = $("#tip " + b),
		c = $(".info", a),
		g = $(".brsubmit", a).attr("data-errorMessage"),
		e = $(".brsubmit", a).attr("data-regOK");
	a.find("input,button").each(function() {
		$(this).val(trim(strip_tags($(this).val()))).prop("disabled", !0).parent().parent().removeClass("has-error")
	});
	$("#tip .btql").attr("data-show", "no");
	$("#tip .qlist").hide();
	b = {
		first_name: $("[name=brfname]", a).val(),
		last_name: $("[name=brlname]", a).val(),
		email: $("[name=bremail]", a).val(),
		username: $("[name=brlogin]", a).val(),
		password: $("[name=brpass]", a).val(),
		re_password: $("[name=brpass2]", a).val(),
		your_question: $("[name=bryq]", a).val(),
		answer: $("[name=brya]", a).val(),
		nv_seccode: $("[name=brsec]", a).val(),
		agreecheck: $("[name=bragr]", a).prop("checked") ? 1 : 0,
		checkss: $("[name=checkss]", a).val(),
		nv_ajax_register: 1
	};
	$.ajax({
		type: "POST",
		cache: !1,
		url: nv_siteroot + "index.php?" + nv_lang_variable + "=" + nv_sitelang + "&" + nv_name_variable + "=users&" + nv_fc_variable + "=register&nocache=" + (new Date).getTime(),
		data: $.param(b),
		dataType: "json",
		success: function(b) {
			if ("success" == b.status) a.find("input,button").parent().parent().removeClass("has-error").addClass("has-success"), c.html("" != b.message ? b.message : e).removeClass("error").addClass("success"), $(".inputs", a).hide(), $("html,body").animate({
				scrollTop: 0
			}, 800, function() {
				setTimeout(function() {
					$("#tip .guest-sign").trigger("click")
				}, 1E4)
			});
			else {
				$("input", a).prop("disabled", !1);
				setTimeout(function() {
					$(".brsubmit", a).prop("disabled", !1)
				}, 3E3);
				change_captcha(".brsec");
				var d = g + ":<ul>";
				b = b.error;
				$.each(b, function(b, c) {
					d += "<li>- " + c.value + "</li>";
					"email" == c.name ? $("[name=bremail]", a).parent().parent().addClass("has-error") : "username" == c.name ? $("[name=brlogin]", a).parent().parent().addClass("has-error") : "password" == c.name ? $("[name=brpass]", a).parent().parent().addClass("has-error") : "re_password" == c.name ? $("[name=brpass2]", a).parent().parent().addClass("has-error") : "your_question" == c.name ? $("[name=bryq]", a).parent().parent().addClass("has-error") : "answer" == c.name ? $("[name=brya]", a).parent().parent().addClass("has-error") : "nv_seccode" == c.name ? $("[name=brsec]", a).parent().parent().addClass("has-error") : "agreecheck" == c.name && $("[name=bragr]", a).parent().parent().addClass("has-error")
				});
				d += "</ul>";
				c.html(d).addClass("error")
			}
		}
	});
	return !1
};

function bt_logout(a){
    $.ajax({
        type: 'POST',
        cache: !1,
        url: nv_siteroot + 'index.php?' + nv_lang_variable + '=' + nv_sitelang + '&' + nv_name_variable + '=users&' + nv_fc_variable + '=logout&nocache=' + new Date().getTime(),
        data: 'nv_ajax_login=1',
        dataType: 'html',
        success: function(e){
            $('#tip .userBlock').hide();
            $('#tip .info').addClass("text-center success").html(e).show();
            setTimeout(function() {
				window.location.href = window.location.href
			}, 2E3)
        }
    });
    return!1
}

var UAV = {};

// Default config, replace it with your own
UAV.config = {
	inputFile: 'image_file',
	uploadIcon: 'upload_icon',
	pattern: /^(image\/jpeg|image\/png)$/i,
	maxsize: 2097152,
	avatar_width: 80,
	avatar_height: 80,
	max_width: 1500,
	max_height: 1500,
	target: 'preview',
	uploadInfo: 'uploadInfo',
	x1: 'x1',
	y1: 'y1',
	x2: 'x2',
	y2: 'y2',
	w: 'w',
	h: 'h',
	originalDimension: 'original-dimension',
	displayDimension: 'display-dimension',
	imageType: 'image-type',
	imageSize: 'image-size',
	btnSubmit: 'btn-submit',
	btnReset: 'btn-reset',
	uploadForm: 'upload-form'
};

// Default language, replace it with your own
UAV.lang = {
	bigsize: 'File too large',
	smallsize: 'File too small',
	filetype: 'Only accept jmage file tyle',
	bigfile: 'File too big',
	upload: 'Please upload and drag to crop'
};

UAV.data = {
	error: false,
	busy: false,
	jcropApi: null
};

UAV.tool = {
	bytes2Size: function( bytes ){
		var sizes = ['Bytes', 'KB', 'MB'];
		if( bytes == 0 ) return 'n/a';
		var i = parseInt( Math.floor( Math.log(bytes) / Math.log(1024) ) );
		return ( bytes / Math.pow(1024, i) ).toFixed(1) + ' ' + sizes[i];
	},
	update: function(e){
		$('#' + UAV.config.x1).val(e.x);
		$('#' + UAV.config.y1).val(e.y);
		$('#' + UAV.config.x2).val(e.x2);
		$('#' + UAV.config.y2).val(e.y2);
	},
	clear: function(e){
		$('#' + UAV.config.x1).val(0);
		$('#' + UAV.config.y1).val(0);
		$('#' + UAV.config.x2).val(0);
		$('#' + UAV.config.y2).val(0);
	}
};

// Please use this package with Jcrop http://deepliquid.com/content/Jcrop.html
UAV.common = {
	read: function(file){
		var fRead = new FileReader();
		fRead.onload = function(e){
			$('#' + UAV.config.target).show();
			$('#' + UAV.config.target).attr('src', e.target.result);
			$('#' + UAV.config.target).load(function(){
				var img = document.getElementById(UAV.config.target);

				if( img.naturalWidth > UAV.config.max_width || img.naturalHeight > UAV.config.max_height ){
					UAV.common.error(UAV.lang.bigsize);
					UAV.data.error = true;
					return false;
				}

				if( img.naturalWidth < UAV.config.avatar_width || img.naturalHeight < UAV.config.avatar_height ){
					UAV.common.error(UAV.lang.smallsize);
					UAV.data.error = true;
					return false;
				}

				if( ! UAV.data.error ){
					// Hide and show data
					$('#' + UAV.config.uploadIcon).hide();
					$('#' + UAV.config.uploadInfo).show();

					$('#' + UAV.config.imageType).html( file.type );
					$('#' + UAV.config.imageSize).html( UAV.tool.bytes2Size( file.size ) );
					$('#' + UAV.config.originalDimension).html( img.naturalWidth + ' x ' + img.naturalHeight );

					$('#' + UAV.config.target).Jcrop({
						minSize: [UAV.config.avatar_width, UAV.config.avatar_height],
						aspectRatio : 1,
						bgFade: true,
						bgOpacity: .3,
						onChange: function(e){ UAV.tool.update(e); },
						onSelect: function(e){ UAV.tool.update(e); },
						onRelease: function(e){ UAV.tool.clear(e); }
					}, function(){
						var bounds = this.getBounds();
						$('#' + UAV.config.w).val(bounds[0]);
						$('#' + UAV.config.h).val(bounds[1]);
						$('#' + UAV.config.displayDimension).html( bounds[0] + ' + ' + bounds[1] );
						UAV.data.jcropApi = this;
					});
				}
			});
		};

		fRead.readAsDataURL(file);
	},
	init: function(){
		UAV.data.error = false;

		if( $('#' + UAV.config.inputFile).val() == '' ){
			UAV.data.error = true;
		}

		var image = $('#' + UAV.config.inputFile)[0].files[0];

		// Check ext
		if( ! UAV.config.pattern.test( image.type ) ){
			UAV.common.error(UAV.lang.filetype);
			UAV.data.error = true;
		}

		// Check size
		if( image.size > UAV.config.maxsize){
			UAV.common.error(UAV.lang.bigfile);
			UAV.data.error = true;
		}

		if( ! UAV.data.error ){
			// Read image
			UAV.common.read(image);
		}
	},
	error: function(e){
		UAV.common.reset();
		alert(e);
	},
	reset: function(){
		if( UAV.data.jcropApi != null ){
			UAV.data.jcropApi.destroy();
		}
		UAV.data.error = false;
		UAV.data.busy = false;
		UAV.tool.clear();
		$('#' + UAV.config.target).removeAttr('src').removeAttr('style').hide();
		$('#' + UAV.config.uploadIcon).show();
		$('#' + UAV.config.uploadInfo).hide();
		$('#' + UAV.config.imageType).html('');
		$('#' + UAV.config.imageSize).html('');
		$('#' + UAV.config.originalDimension).html('');
		$('#' + UAV.config.w).val('');
		$('#' + UAV.config.h).val('');
		$('#' + UAV.config.displayDimension).html('');
	},
	submit: function(){
		if( ! UAV.data.busy ){
			if( $('#' + UAV.config.x2).val() == '' || $('#' + UAV.config.x2).val() == '0' ){
				alert(UAV.lang.upload);
				return false;
			}
			UAV.data.busy = true;
			return true;
		}
		return false;
	}
};

UAV.init = function(){
	$('#' + UAV.config.uploadIcon).click(function(){
		$('#' + UAV.config.inputFile).trigger('click');
	});
	$('#' + UAV.config.inputFile).change(function(){
		UAV.common.init();
	});
	$('#' + UAV.config.btnReset).click(function(){
		if( ! UAV.data.busy ){
			UAV.common.reset();
		}
	});
	$('#' + UAV.config.uploadForm).submit(function(){
		return UAV.common.submit();
	});
};

// User login and register
(function($){
	$.fn.user = function( options ){
		var opts = $.extend( {}, $.fn.user.defaults, options );
		var ajaxLoaded = false;
		var openID = "";
		
		if( opts.isOpenID && opts.openIDSV.length ){
			for( i = 0, j = opts.openIDSV.length; i < j; i ++ ){
				openID += "\
					<a title=\"" + opts.openIDSV[i].title + "\" href=\"" + opts.openIDSV[i].href + "\">\
				 		<img alt=\"" + opts.openIDSV[i].title + "\" src=\"" + opts.openIDSV[i].imgSRC + "\" width=\"" + opts.openIDSV[i].imgW + "\" height=\"" + opts.openIDSV[i].imgH + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + opts.openIDSV[i].title + "\"/>\
					</a>\
				";
			}
		}
		
	    opts.loginHTML = "\
		<div class=\"modal fade\" id=\"loginModal\"> \
		  <div class=\"modal-dialog\">\
		    <div class=\"modal-content\">\
		      <div class=\"modal-header\">\
		        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"" + opts.lang.close + "\"><span aria-hidden=\"true\">&times;</span></button>\
		        <h4 class=\"modal-title\">" + opts.lang.login + "</h4>\
		      </div>\
		      <div class=\"modal-body\">\
		      	<div class=\"container-fluid\">\
					<form action=\"\" method=\"post\" role=\"form\" class=\"form-tooltip\">\
						<div class=\"form-group\">\
							<div class=\"input-group\">\
								<span class=\"input-group-addon\"><em class=\"fa fa-user fa-lg\"></em></span>\
								<input type=\"text\" class=\"form-control\" id=\"block_login_iavim\" name=\"nv_login\" value=\"\" placeholder=\"" + opts.lang.username + "\">\
							</div>\
						</div>\
						<div class=\"form-group\">\
							<div class=\"input-group\">\
								<span class=\"input-group-addon\"><em class=\"fa fa-key fa-lg fa-fix\"></em></span>\
								<input type=\"password\" class=\"form-control\" id=\"block_password_iavim\" name=\"nv_password\" value=\"\" placeholder=\"" + opts.lang.password + "\">\
							</div>\
						</div>\
						" + ( opts.isCaptchaLogin ?
						"<div class=\"form-group text-right\">\
							<img class=\"captchaImg\" src=\"" + opts.siteroot + "index.php?scaptcha=captcha&t=" + opts.timeStamp + "\" width=\"" + opts.captchaW + "\" height=\"" + opts.captchaH + "\"/>\
							<em class=\"fa fa-pointer fa-refresh fa-lg\" onclick=\"change_captcha('#block_seccode_iavim');\"></em>\
						</div>\
						<div class=\"form-group\">\
							<div class=\"input-group\">\
								<span class=\"input-group-addon\"><em class=\"fa fa-shield fa-lg fa-fix\"></em></span>\
								<input id=\"block_seccode_iavim\" name=\"nv_seccode\" type=\"text\" class=\"form-control\" maxlength=\"" + opts.captchaLen + "\" placeholder=\"" + opts.lang.securitycode + "\"/>\
							</div>\
						</div>" : "" ) + "\
						<div class=\"form-group\">\
							<a class=\"pull-right\" title=\"" + opts.lang.lostpass + "\" href=\"" + opts.lostpassLink + "\">" + opts.lang.lostpass + "?</a>\
						</div>\
						" + ( opts.isOpenID ? "\
						<div class=\"clearfix\">\
							<hr />\
							<p class=\"text-center\">\
						 		<i class=\"fa fa-openid\"></i> " + opts.lang.openidLogin + "\
							</p>\
							<div class=\"text-center\">\
								" + openID + "\
							</div>\
						</div>" : "" ) + "\
						<!-- END: openid -->\
					</form>\
		      	</div>\
		      </div>\
		      <div class=\"modal-footer\">\
		        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">" + opts.lang.close + "</button>\
		        <button type=\"button\" class=\"btn btn-primary\" id=\"block-login-submit\">" + opts.lang.loginSubmit + "</button>\
		      </div>\
		    </div>\
		  </div>\
		</div>";

	    opts.registerHTML = "\
		<div class=\"modal fade\" id=\"registerModal\"> \
		  <div class=\"modal-dialog\">\
		    <div class=\"modal-content\">\
		      <div class=\"modal-header\">\
		        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"" + opts.lang.close + "\"><span aria-hidden=\"true\">&times;</span></button>\
		        <h4 class=\"modal-title\">" + opts.lang.register + "</h4>\
		      </div>\
		      <div class=\"modal-body\">\
		      	<div class=\"container-fluid\">\
		      		<form id=\"registerForm\" action=\"\" method=\"post\" role=\"form\" class=\"form-horizontal form-tooltip m-bottom\">\
						<div class=\"form-group\">\
							<label for=\"first_name\" class=\"col-sm-8 control-label\">" + opts.lang.firstName + ":</label>\
							<div class=\"col-sm-16\">\
								<input type=\"text\" class=\"form-control\" id=\"first_name\" name=\"first_name\" value=\"\" maxlength=\"255\" />\
							</div>\
						</div>\
						<div class=\"form-group\">\
					        <label for=\"last_name\" class=\"col-sm-8 control-label\">" + opts.lang.lastName + ":</label>\
					        <div class=\"col-sm-16\">\
					            <input type=\"text\" class=\"form-control\" id=\"last_name\" name=\"last_name\" value=\"\" maxlength=\"255\" />\
					        </div>\
					    </div>\
						<div class=\"form-group\">\
							<label for=\"nv_email_iavim\" class=\"col-sm-8 control-label\">" + opts.lang.email + "<span class=\"text-danger\"> (*)</span>:</label>\
							<div class=\"col-sm-16\">\
								<input type=\"email\" class=\"email required form-control\" name=\"email\" value=\"\" id=\"nv_email_iavim\" maxlength=\"100\" />\
							</div>\
						</div>\
						<div class=\"form-group\">\
							<label for=\"nv_username_iavim\" class=\"col-sm-8 control-label\">" + opts.lang.account + "<span class=\"text-danger\"> (*)</span>:</label>\
							<div class=\"col-sm-16\">\
								<input type=\"text\" class=\"required form-control\" name=\"username\" value=\"\" id=\"nv_username_iavim\" maxlength=\"{NICK_MAXLENGTH}\" />\
							</div>\
						</div>\
						<div class=\"form-group\">\
							<label for=\"nv_password_iavim\" class=\"col-sm-8 control-label\">" + opts.lang.password + "<span class=\"text-danger\"> (*)</span>:</label>\
							<div class=\"col-sm-16\">\
								<input class=\"form-control required password\" name=\"password\" value=\"\" id=\"nv_password_iavim\" type=\"password\" maxlength=\"{PASS_MAXLENGTH}\" autocomplete=\"off\"/>\
							</div>\
						</div>\
						<div class=\"form-group\">\
							<label for=\"nv_re_password_iavim\" class=\"col-sm-8 control-label\">" + opts.lang.rePassword + "<span class=\"text-danger\"> (*)</span>:</label>\
							<div class=\"col-sm-16\">\
								<input class=\"form-control required password\" name=\"re_password\" value=\"\" id=\"nv_re_password_iavim\" type=\"password\" maxlength=\"{PASS_MAXLENGTH}\" autocomplete=\"off\"/>\
							</div>\
						</div>\
						<div class=\"form-group\">\
							<label for=\"question\" class=\"col-sm-8 control-label\">" + opts.lang.question + ":</label>\
							<div class=\"col-sm-16\">\
								<select name=\"question\" id=\"question\" class=\"form-control\"></select>\
							</div>\
						</div>\
						<div class=\"form-group\">\
							<label for=\"your_question\" class=\"col-sm-8 control-label\">" + opts.lang.yourQuestion + ":</label>\
							<div class=\"col-sm-16\">\
								<input type=\"text\" class=\"form-control\" name=\"your_question\" id=\"your_question\" value=\"\" />\
							</div>\
						</div>\
						<div class=\"form-group\">\
							<label for=\"answer\" class=\"col-sm-8 control-label\">" + opts.lang.answerYourQuestion + "<span class=\"text-danger\"> (*)</span>:</label>\
							<div class=\"col-sm-16\">\
								<input type=\"text\" class=\"form-control required\" name=\"answer\" id=\"answer\" value=\"\" />\
							</div>\
						</div>\
						" + ( opts.isCaptchaReg ? "\
						<div class=\"form-group\">\
							<label for=\"nv_seccode_iavim\" class=\"col-sm-8 control-label\">" + opts.lang.captcha + "<span class=\"text-danger\"> (*)</span>:</label>\
							<div class=\"col-sm-8\">\
								<input type=\"text\" name=\"nv_seccode\" id=\"nv_seccode_iavim\" class=\"required form-control\" maxlength=\"" + opts.captchaLen + "\" />\
							</div>\
							<div class=\"col-sm-8\">\
								<label class=\"control-label\">\
									<img class=\"captchaImg\" src=\"" + opts.siteroot + "index.php?scaptcha=captcha&t=" + opts.timeStamp + "\" width=\"" + opts.captchaW + "\" height=\"" + opts.captchaH + "\" />\
									&nbsp;<em class=\"fa fa-pointer fa-refresh fa-lg\" onclick=\"change_captcha('#nv_seccode_iavim');\">&nbsp;</em>\
								</label>\
							</div>\
						</div>\
						" : "" ) + "\
						<div class=\"form-group\">\
							<label for=\"question\" class=\"col-sm-8 control-label\"><a id=\"show-usage-terns\" href=\"\">" + opts.lang.usageTerms + " <i class=\"fa fa-globe\"></i></a>:</label>\
							<div class=\"col-sm-16\">\
								<div class=\"checkbox\">\
									<label>\
										<input class=\"required\" type=\"checkbox\" name=\"agreecheck\" id=\"agreecheck\" value=\"1\"/>\
										" + opts.lang.accept + "\
									</label>\
								</div>\
							</div>\
						</div>\
		      		</div>\
		      </div>\
		      <div class=\"modal-footer\">\
		      	<input type=\"hidden\" name=\"checkss\" id=\"checkss\" value=\"" + opts.checkss + "\" />\
		      	<i id=\"block-register-loading\" class=\"fa fa-circle-o-notch fa-spin hidden\"></i>\
		        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">" + opts.lang.close + "</button>\
		        <button type=\"button\" class=\"btn btn-primary\" id=\"block-register-submit\">" + opts.lang.register + "</button>\
		      </div>\
		    </div>\
		  </div>\
		</div>";
		
		// Render html
		if(this.length){
			$('body').append(opts.loginHTML);
			
			if( opts.allowreg ){
				$('body').append(opts.registerHTML);
				
				$('#registerModal').on('show.bs.modal', function(e){
					if( ! ajaxLoaded ){
						$('#block-register-submit').attr('disabled', 'disabled');
						$('#block-register-loading').removeClass('hidden');
						
						$.ajax({
							type: 'POST',
							cache: true,
							url: nv_siteroot + 'index.php?' + nv_lang_variable + '=' + nv_sitelang + '&' + nv_name_variable + '=users&' + nv_fc_variable + '=register&nocache=' + new Date().getTime(),
							data: 'get_question=1',
							dataType: 'json',
							success: function(e){
								var html = '';
								$.each(e, function(k, v){
									html += '<option value="' + v.qid + '"' + v.selected + '>' + v.title + '</option>';
								});
								$('select#question').html(html);
								ajaxLoaded = true;
								$('#block-register-loading').addClass('hidden');
								$('#block-register-submit').removeAttr('disabled');
							}
						});
					}
					
					$('#agreecheck').attr('disabled', 'disabled');
				});
				
				$('#show-usage-terns').click(function(e){
					e.preventDefault();
					
					if( $('#usage-terns').length ){
						$('#usage-terns').modal('toggle');
						$('#agreecheck').removeAttr('disabled');
					}else{
						$('body').append(
							"<div id=\"usage-terns\" class=\"modal fade\">\
							  <div class=\"modal-dialog\">\
							    <div class=\"modal-content\">\
							      <div class=\"modal-header\">\
							        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\
							        <h4 class=\"modal-title\">" + opts.lang.usageTerms + "</h4>\
							      </div>\
							      <div class=\"modal-body\">\
							        <div class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin fa-3x\"></i></div>\
							      </div>\
							    </div>\
							  </div>\
							</div>"
						);
						$('#usage-terns').modal('toggle');
						
						$.ajax({
							type: 'POST',
							cache: true,
							url: nv_siteroot + 'index.php?' + nv_lang_variable + '=' + nv_sitelang + '&' + nv_name_variable + '=users&' + nv_fc_variable + '=register&nocache=' + new Date().getTime(),
							data: 'get_usage_terms=1',
							dataType: 'html',
							success: function(e){
								$('#usage-terns').find('.modal-body').html(e);
								$('#agreecheck').removeAttr('disabled');
							}
						});
					}
				});
			}
		}
		
		$('#block-login-submit').click(function(){
			$this = $(this);
			$this.attr('disabled', 'disabled');
			$.ajax({
				type: 'POST',
				cache: false,
				url: nv_siteroot + 'index.php?' + nv_lang_variable + '=' + nv_sitelang + '&' + nv_name_variable + '=users&' + nv_fc_variable + '=login&nocache=' + new Date().getTime(),
				data: 'nv_login=' + encodeURIComponent($('#block_login_iavim').val()) + '&nv_password=' + encodeURIComponent($('#block_password_iavim').val()) + ( opts.isCaptchaLogin ? '&nv_seccode=' + encodeURIComponent($('#block_seccode_iavim').val()) : '' ) + '&nv_ajax_login=1',
				dataType: 'json',
				success: function(e){
					$this.removeAttr('disabled');
                    change_captcha('#block_seccode_iavim');
					if( e.length ){
						$.each(e, function(k, v){
							if( v.name == '' ){
								alert( v.value );
							}else{
								$('#loginModal [name=' + v.name + ']').attr({
									'title': v.value,
									'data-trigger': 'focus'
								}).tooltip().parent().parent().addClass('has-error');
							}
						});
						
						$('#loginModal .has-error:first input').focus();
					}else{
						opts.loginComplete.call(undefined, e, opts);
					}
				}
			});
		});		
		
		$('#block-register-submit').click(function(){
			var data = {
				first_name		: $('#first_name').val(),
				last_name		: $('#last_name').val(),
				email			: $('#nv_email_iavim').val(),
				username		: $('#nv_username_iavim').val(),
				password		: $('#nv_password_iavim').val(),
				re_password		: $('#nv_re_password_iavim').val(),
				question		: $('#question').val(),
				your_question	: $('#your_question').val(),
				answer			: $('#answer').val(),
				nv_seccode		: $('#nv_seccode_iavim').length ? $('#nv_seccode_iavim').val() : "",
				agreecheck		: $('#agreecheck:checked').length ? 1 : 0,
				checkss			: $('#checkss').val()
			};
			
			$this = $(this);
			$this.attr('disabled', 'disabled');
			$('#registerModal .has-error').removeClass('has-error');
			$('#registerModal input, #registerModal select').tooltip('destroy');
			
			$.ajax({
				type: 'POST',
				cache: false,
				url: nv_siteroot + 'index.php?' + nv_lang_variable + '=' + nv_sitelang + '&' + nv_name_variable + '=users&' + nv_fc_variable + '=register&nocache=' + new Date().getTime(),
				data: $.param( data ) + '&nv_ajax_register=1',
				dataType: 'json',
				success: function(e){
					$this.removeAttr('disabled');
					change_captcha('#nv_seccode_iavim');
					
					if( e.status == 'success' ){
						opts.registerComplete.call(undefined, e.message, opts);
					}else{
						e = e.error;
						$.each(e, function(k, v){
							if( v.name == '' ){
								alert( v.value );
							}else{
								$('#registerModal [name=' + v.name + ']').attr({
									'title': v.value,
									'data-trigger': 'focus'
								}).tooltip().parent().parent().addClass('has-error');
							}
						});
						
						$('#registerModal .has-error:first input').focus();
					}
				}
			});
		});
		
		return this.each(function(){
			$(this).find('.login').click(function(e){
				e.preventDefault();
				$('#loginModal').modal('toggle');
			});
			$(this).find('.register').click(function(e){
				e.preventDefault();
				$('#registerModal').modal('toggle');
				$('#registerModal [type="text"]').val('');
				$('#registerModal [type="email"]').val('');
				$('#registerModal [type="password"]').val('');
				$('#registerModal [type="checkbox"]').removeAttr('checked');
				$('#registerModal select option').removeAttr('selected');
			});
		});
	};
	
	// Debug
	function debug(msg){
        if( window.console && window.console.log ){
            window.console.log( msg );
        }
    };
}(jQuery));

$.fn.user.defaults = {
	isCaptchaLogin: false,
	isCaptchaReg: false,
	captchaW: 120,
	captchaH: 25,
	captchaLen: 6,
	timeStamp: 0,
	siteroot: "/",
	lostpassLink: "/",
	isOpenID: false,
	openIDSV: new Array(),
	allowreg: false,
	checkss: "",
	lang: {
		close: "Close",
		login: "Login",
		loginSubmit: "Login",
		username: "Username",
		password: "Password",
		securitycode: "Security code",
		lostpass: "Lost password",
		openidLogin: "Openid login",
		register: "Register",
		firstName: "First name",
		lastName: "Last name",
		email: "Email",
		account: "Account",
		rePassword: "Repeat password",
		question: "Question",
		yourQuestion: "Your question",
		answerYourQuestion: "Answer your question",
		inGroup: "Group",
		usageTerms: "Usage terms",
		captcha: "Captcha",
		accept: "Accept"
	},
    loginComplete: function(res, opts){
    	window.location.href = window.location.href;
    },
    registerComplete: function(res, opts){
    	alert(res);
    	window.location.href = window.location.href;
    }
};

// Trigger login & register
$(document).ready(function(){
	$('#nv-block-login').user();
});
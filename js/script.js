$(document).ready(function() {
    if ($('.container').width() > 720) {
    } else {
        $('form.gorizontal').removeClass('gorizontal').addClass('vertical');
    }
    $('input[name="phone"]').mask("+7(999) 999-9999");
});

//slider
$(document).ready(function() {
        $('.speakers-slider').slick({
        	arrows: false,
          dots: false,
          infinite: false,
          speed: 300,
          slidesToShow: 6,
				  slidesToScroll: 1,
				  autoplay: true,
				  autoplaySpeed: 1600,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
});
$('form').submit(function(e) {
    var form_id = $(this).attr('id');
    if (validateForm(form_id) == false) {} else {
        send_form(form_id);
    }
    return false;
});

var geo_url = '';
function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;}
function run_geo(geo_url){
    $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
        success: function(xml) {$(xml).find('ip').each(function(){
            var city = $(this).find('city').text();
            var region = $(this).find('region').text();
            if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
            $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
        });}});
}
$.get("http://ipinfo.io", function(response) {var geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp"); 
var utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
$('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
$('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");

function validateForm(form) {
    var err = false;
    var form_id = '#' + form;
    $(form_id + ' input').each(function() {
        $(this).removeClass('field-error');
        if (($(this).val() == '')) {
            $(this).addClass('field-error');
            err = true;
        } else {
            $(this).removeClass('field-error');
        }
    });
    if (err == true) return false;
}

function send_form(form) {
    var form_id = '#' + form;
    var postData = $('#' + form).serialize();
    var roistat_visit = encodeURIComponent(getCookie('roistat_visit'));
    var source = encodeURIComponent($(location).attr('href'));
    var subject = '#' + form;    
    var btnText = $('#' + form + ' button[type=submit]').text();
    if($('#' + form).find('input[name="type"]').length) {
        btnText = $('#' + form).find('input[name="type"]').val();    
    }
    var formSource = encodeURIComponent("Как снизить налоги и обезопасить бизнес в 2018 году (г. Краснодар) [" + btnText + "]");
    var formSubject = encodeURIComponent(subject);
    post_url = '//bflp.ru/input';
    post_url = 'send.php';
    post_url = 'formManager.php';
		console.log(postData);
		form_sended(form_id)
    $.ajax({
        type: "post",
        url: post_url,
        data: postData + "&site=hl82",
        dataType: "html",
        // data: postData + "&site=forum-nalogi&land=" + formSource + "&subject=" + formSubject + "&roistat=" + roistat_visit + "&source=" + source,
        // contentType: "application/x-www-form-urlencoded",        
        success: function() {
            console.log('success');
            go_cookies(form);
		// fbq('track', 'Lead');
            form_sended(form_id);
            stat(form);            
        },
        error: function() {
            console.log('error');
        }
    });
}

function form_sended(form_id) {
    var fh = $(form_id).height();
    $(form_id).find('.form-input').hide();
    $(form_id).find('.form-button').hide();
    $(form_id).find('.form-buttons').hide();
    $(form_id).parent().find('.form-title').hide();
    $(form_id).parent().find('.form-subtitle').hide();
    // $(form_id).parents('.modal-content').find('.title').hide();
    // $(form_id).addClass('hidden');
    $(form_id).height(fh).addClass('sended-block');
    $(form_id).parent().find('.sended').removeClass('hidden');
    setTimeout(function() {
        $('.modal').modal('hide');
    }, 5000);
}

function stat(form) {
    if (typeof yaCounter48881234 != 'undefined') {
        yaCounter48881234.reachGoal(form + '_send');
    }
    console.log('Цель ЯМ ' + form + '_send достигнута');

    if (typeof gtag != 'undefined') {
        gtag('event', 'send', {
            'event_category': form
        });
    }
    console.log('Цель ГА ' + form + ' send достигнута');
}

function go_cookies(form_id) {
    setCookie('form-name', $('#' + form_id + ' input.form-name').val(), 365);
    setCookie('form-email', $('#' + form_id + ' input.form-email').val(), 365);
    setCookie('form-phone', $('#' + form_id + ' input.form-phone').val(), 365);
}


var lm_modal = getCookie("lm-order-modal");
if (lm_modal == 'undefined' || lm_modal == '') {
    setCookie('lm-order-modal', 0, 1);
}
// $('#lm-order-modal').modal('show');

setTimeout(function() {
    if (lm_modal == 0) {
        $('#lm-order-modal').modal('show');
        setCookie('lm-order-modal', 1, 1);
    }
}, 10000);
$('#lm-order-modal #step2').click(function() {
    var mh = $('#lm-order-modal .modal-content').height();
    $('#lm-order-modal .step1').hide();
    if ($('.container').outerWidth() > 540) {
        $('#lm-order-modal .modal-content').height(mh);
    }
    $('#lm-order-modal .modal-dialog .modal-content .modal-body').addClass('form-active');
    $('#lm-order-modal .step2').removeClass('hidden');
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}


function clearF1Cookie() {
    setCookie("name", "", -1);
    setCookie("email", "", -1);
    setCookie("last1", "", -1);
}
$(window).load(function() {
    $("input.form-name").val(getCookie("form-name"));
    $("input.form-surname").val(getCookie("form-surname"));
    $("input.form-email").val(getCookie("form-email"));
    $("input.form-phone").val(getCookie("form-phone"));
});

// $('.mybtn_close').on('click', function(event) {
// 	// event.preventDefault();
// 	$('div.sended.hidden').toggleClass('sended-hidden_hide');
// });
// $("#select-form").submit(function() {
//         $.ajax({
//             type: "POST",
//             url: "mail.php",
//             data: $(this).serialize()
//         }).done(function() {
//             window.location = "/thanks";
//         });
//         return false;
//});
var timeout = null;
var time_blende = 750;
var time_teaser = 950;

var indexFotos = 0;

var heightContentProgrammierung = 0;

function showWir() {
    $('#blende').animate({'opacity': 1.0});

    var content2 = $('#content2');

    content2.css('opacity', '1.0')
        .css('display', 'block')
        .animate({'opacity': 1.0});
    $('#content').animate({
        'top': -2000,
        'bottom': 1800
    });
    $('#teaser').animate({
        'top': -1800,
        'bottom': 1600
    });

    content2.find('.content_wrapper').each(function() {

        var divs = $(this).children('div');
        var width = 0;

        var heightWindow = $(window).height();
        var height = heightWindow - 136;

        divs.each(function() {
            width += $(this).width();
        });

        var left = Math.round(($(this).parent().width() - width) / 2);

        $(this).width(width);
        $(this).height(height);
        $(this).css('margin-left', '-1000px');
    });

    setProgrammierungContent();
}

function setFotos() {
    $('#fotos').children('img').each(function(i) {
        $(this).css('position', 'absolute');
        if (i > 0) {
            $(this).css('left', '238px');
        }
    });
    $('#texte').children('.text').each(function(i) {
        $(this).css('position', 'absolute');
        if (i > 0) {
            $(this).css({
                'left': '600px',
                'width': '600px'
            });
        }
    });
}

function prevWir() {
    var prev = indexFotos - 1;
    var fotos = $('#fotos').children('img');
    var texte = $('#texte').children('.text');

    if (prev < 0) {
        prev = fotos.length - 1;
    }

    $(texte[prev]).css('left', '-600px');
    $(texte[indexFotos]).stop().animate({
        'left': '600px'
    });
    $(texte[prev]).stop().animate({
        'left': '0'
    });

    $(fotos[prev]).css('left', '-238px');
    $(fotos[indexFotos]).stop().animate({
        'left': '238px'
    });
    $(fotos[prev]).stop().animate({
        'left': '0'
    });

    indexFotos--;
    if (indexFotos < 0) {
        indexFotos = fotos.length - 1;
    }
}

function nextWir() {
    var next = indexFotos + 1;
    var fotos = $('#fotos').children('img');
    var texte = $('#texte').children('.text');

    if (next > fotos.length - 1) {
        next = 0;
    }

    $(texte[next]).css('left', '600px');
    $(texte[indexFotos]).stop().animate({
        'left': '-600px'
    });
    $(texte[next]).stop().animate({
        'left': '0'
    });

    $(fotos[next]).css('left', '275px');
    $(fotos[indexFotos]).stop().animate({
        'left': '-275px'
    });
    $(fotos[next]).stop().animate({
        'left': '0'
    });

    indexFotos++;
    if (indexFotos > fotos.length - 1) {
        indexFotos = 0;
    }
}

function showProgrammierung() {
    setProgrammierungHeadlines();

    $('#blende').animate({'opacity': 1.0});

    var content2 = $('#content2');

    content2.css('opacity', '0.0')
        .css('display', 'block')
        .animate({'opacity': 1.0});
    $('#content').animate({
        'top': -2000,
        'bottom': 1800
    });
    $('#teaser').animate({
        'top': -1800,
        'bottom': 1600
    });

    content2.find('.headline_wrapper').each(function() {
        var divs = $(this).children('div');
        var width = $(divs[0]).width() + $(divs[1]).width() + $(divs[2]).width();

        var left = Math.round(($(this).parent().width() - width) / 2);

        $(this).width(width);
        $(this).css('margin-left', left);
    });

    $(window).trigger('resize');
}

function setProgrammierungHeadlines() {

    var heightWindow = $(window).height();
    var heightDiff = heightWindow - 136;
    var height = Math.round(heightDiff / 5);

    heightContentProgrammierung = heightDiff;

    var content2 = $('#content2');

    content2.find('.headline').css({
        'height': height + 'px',
        'line-height': height + 'px'
    });

    content2.find('.headlinemain').css({
        'font-size': height + 'px',
        'line-height': height + 'px'
    });

    content2.find('.headline_wrapper').each(function() {
        var divs = $(this).children('div');
        var width = 0;

        divs.each(function() {
            width += $(this).width();
        });
        width += 5;

        var left = Math.round(($(this).parent().width() - width) / 2);

        $(this).width(width);
        $(this).css('margin-left', left);
    });
}

function setProgrammierungContent() {

    $('.content_wrapper').each(function() {
        var divs = $(this).children('div');
        var width = 0;

        divs.each(function() {
            width += $(this).width() + parseInt($(this).css('margin-right'));
        });

        var widthContent = $('#content2').width();

        var left = Math.round((widthContent - width) / 2);

        $(this).css('margin-left', left);
    });
}

function content2HeadlineClick1() {
    // Programmierung Klick auf Headline
    $('#content2').find('.headline').each(function(i) {
        content2HeadlineClick3($(this), i);
    });
}

function content2HeadlineClick2(el, i) {
    el.click(function() {
        $(this).stop().animate({'backgroundColor': '#400000'});
        $(this).find('.headlinesub').stop().animate({'color': '#9f5e5d'});
        $(this).unbind();

        $(this).hover(function() {
            $(this).css('cursor', 'pointer');
            $(this).stop().animate({'backgroundColor': '#ff0000'});
            $(this).find('.headlinesub').stop().animate({'color': '#ff0000'});
        }, function() {
            $(this).stop().animate({'backgroundColor': '#400000'});
            $(this).find('.headlinesub').stop().animate({'color': '#9f5e5d'});
        });

        $('#content2').stop().animate({'top': '0px'});
        el.next().stop().animate({'height': '0px'});

        content2HeadlineClick3(el, i);
    });
}

function content2HeadlineClick3(el, i) {
    el.click(function() {
        var top = i * el.height();

        el.stop().animate({'backgroundColor': '#ff0000'});
        el.find('.headlinesub').stop().animate({'color': '#ff0000'});
        el.unbind();

        $('#content2').stop().animate({'top': '-' + (top + i) + 'px'});
        el.next().stop().animate({'height': heightContentProgrammierung + 'px'});

        content2HeadlineClick2(el, i);
    });
}

function showWerke() {

    $('#blende').animate({'opacity': 1.0});

    $('#content2_wrapper').css('top', '0');

    $('#content2').css('opacity', '0.0')
        .css('display', 'block')
        .css('top', '0')
        .css('bottom', '0')
        .animate({'opacity': 1.0});
    $('#content').animate({
        'top': -2000,
        'bottom': 1800
    });
    $('#teaser').animate({
        'top': -1800,
        'bottom': 1600
    });

    setWerkeContent();
}
// Zeige bei Werke die linke Inhaltshälfte
function showWerkeLeft(el) {

    // rechtes Element verschwinden lassen
    el.next().css('display', 'none');

    // Titel Mouseover entfernen
    el.children('.werke_title').unbind();

    el.children('.werke_title').click(function() {
        closeWerkeLeft($(this).parent());
    });

    // Titel animieren
    el.children('.werke_title').css({
        'text-align': 'right',
        'right': '5%'
    });

    // Rechte Hälfte animieren
    el.stop().animate({
        'left': '0',
        'width': '100%'
    });

    el.children('.werke_content_wrapper').stop().animate({
        'left': '6%'
    });
}
// Zeige bei Werke die rechte Inhaltshälfte
function showWerkeRight(el) {

    // linkes Element verschwinden lassen
    el.prev().css('display', 'none');

    // Titel Mouseover entfernen
    el.children('.werke_title').unbind();

    el.children('.werke_title').click(function() {
        closeWerkeRight($(this).parent());
    });

    // Titel animieren
    el.children('.werke_title').css({
        'text-align': 'left',
        'left': '5%'
    });

    // Rechte Hälfte animieren
    el.stop().animate({
        'left': '0',
        'width': '100%'
    });

    el.children('.werke_content_wrapper_right').stop().animate({
        'right': '6%'
    });
}
// Schliesse bei Werke die linken Inhaltshälfte
function closeWerkeLeft(el) {

    // Titel Mouseover entfernen
    el.children('.werke_title').unbind();

    // Titel Mausklick setzen
    el.children('.werke_title').click(function() {
        showWerkeLeft($(this).parent());
    });

    // Linke Hälfte animieren
    el.stop().animate({
        'left': '0',
        'width': '50%'
    }, 'normal', 'linear', function() {
        // Titel animieren
        el.children('.werke_title').css({
            'text-align': 'center'
        });
        // rechtes Element verschwinden lassen
        el.next().css('display', 'block');

        el.children('.werke_title').hover(function() {
            $(this).css('cursor', 'pointer');
            $(this).css('color', '#000');
            $(this).parent().css('background-color', '#ff6700');
        }, function() {
            $(this).css('color', '#fff');
            $(this).parent().css('background-color', '#000');
        });
    });

    el.children('.werke_content_wrapper').stop().animate({
        'left': '200%'
    });
}
// Schliesse bei Werke die rechte Inhaltshälfte
function closeWerkeRight(el) {

    // Titel Mouseover entfernen
    el.children('.werke_title').unbind();

    // Titel Mausklick setzen
    el.children('.werke_title').click(function() {
        showWerkeRight($(this).parent());
    });

    // Rechte Hälfte animieren
    el.stop().animate({
        'left': '50%',
        'width': '50%'
    }, 'normal', 'linear', function() {
        // Titel animieren
        el.children('.werke_title').css({
            'text-align': 'center'
        });
        // linkes Element verschwinden lassen
        el.prev().css('display', 'block');

        el.children('.werke_title').hover(function() {
            $(this).css('cursor', 'pointer');
            $(this).css('color', '#000');
            $(this).parent().css('background-color', '#ff6700');
        }, function() {
            $(this).css('color', '#fff');
            $(this).parent().css('background-color', '#000');
        });
    });

    el.children('.werke_content_wrapper_right').stop().animate({
        'right': '-200%'
    });
}
// Setzt den Inhalt in die vertikale Mitte
function setWerkeContent() {

    var heightWindow = $(window).height();
    var heightDiff = heightWindow - 30;

//    $('.werke_content_wrapper').each(function() {
//
//        var divs = $(this).children('div');
//        var height = 0;
//        var top = 0;
//
//        divs.each(function() {
//            if ($(this).height() > height) {
//                height = $(this).height();
//            }
//        });
//
//        top = Math.round((heightDiff - height) / 2);
//
//        $(this).css('top', top + 'px');
//    });

    $('.werke_title').each(function() {

        var divs = $(this).children('div');
        var height = $(this).height();
        var top = 0;

        top = Math.round((heightDiff - height) / 2);

        $(this).css('top', top + 'px');
    })
}

function changeColors(colorFooter) {
    $('#teaser').find('a').css('color', colorFooter);
    $('h3').css('color', colorFooter);
    $('#footer_content').find('a').css('color', colorFooter);
    $('.important').css('color', colorFooter);
}

function closeMenu() {
    $('.header_menu_subtitle').css('display', 'none');
    $('.header_submenu').css('display', 'none');
}

function logoPosition() {
    // Logo Ausrichtung
    var heightWindow = $(window).height();
    var heightLogo = $("#content_logo").height();
    var heightDiff = heightWindow - 292;
    var marginTop = Math.round((heightDiff - heightLogo) / 2);

    $('#content_logo').css('margin-top', marginTop + 'px');
}

function init(colorFooter) {

    // Hintergrundblende
    var blende = $('<div id="blende"></div>');
    blende.appendTo($('body'));
    blende.animate({'opacity': 0.0});
    blende.css('display', 'block');
    setTimeout(function() {
        blende.animate({'opacity': 0.3});
    }, time_blende);

    // Teaser
    setTimeout(function() {
        $('#teaser').animate({'height': '105px'}, 250);
    }, time_teaser);
    
    var hmr = $('#header_menu_right');

    // Menü rechts oben
    hmr.find('a').hover(function() {
        $(this).find('span').css('display', 'block');
        $('#header_menu_right').find('a').css('color', '#999');
        $(this).css('color', '#fff');
    }, function() {
        $(this).find('span').css('display', 'none');
        $('#header_menu_right').find('a').css('color', '#fff');
    });

    hmr.hover(function() {
        $(this).css('color', '#999');
    }, function() {
        $(this).css('color', '#fff');
    });

    // Funktion bei Menü Mouseover
    $('#header_menu_opener').hover(function() {
        $('#header_menu_background').css('opacity', 0.5);
        $('#header_menu_background').css('display', 'block');
        $(this).html('');
        $('#header_menu_logo').fadeIn(500);
        $('#header_menu').css({
            'display': 'block',
            'opacity': '0'
        });
        $('#header_menu').stop().animate({
            'opacity': 1.0,
            'left': '140px'
        }, 250);
    });

    $('#header').mouseleave(function() {
        $('#header_menu').stop().animate({
            'opacity': 1.0,
            'left': '0'
        }, 250);
        $('#header_menu').css({
            'display': 'none',
            'opacity': '1.0'
        });
        $('#header_menu_logo').stop().fadeOut(500);
        $('#header_menu_logo').html('');
        $('#header_menu_background').css('display', 'none');
        $('#header_menu_background').css('opacity', 0);
    });

    // Funktion für MenüMouseover
    $('#header_menu').hover(function() {
        // nothing
    }, function() {
        $(this).find('a').css('color', '#fff');
    });

    // Funktion bei Menüelement Mouseover
    $('#header_menu').find('li').hover(function() {

        $(this).parent().find('a').css('color', '#999');

        $(this).find('a').css('color', '#fff');

        $(this).parent().find('.header_menu_subtitle').css('display', 'none');

        var ils = $(this).parent().find('li');
        for (var i = 0; i < ils.length; i++) {
            if (!$(ils[i]).is($(this))) {
                $(ils[i]).find('.header_submenu').css('display', 'none');
            }
        }

        $(this).find('.header_menu_subtitle').css('display', 'block');
        $(this).find('.header_submenu').stop().slideDown(250);

        //clearTimeout(timeout);
        //timeout = setTimeout('closeMenu()', 4000);
    });

    $('#header_menu').find('li').mouseleave(function() {
        closeMenu();
        $(this).find('a').css('color', '#999');
    });

    // Footer Rahmenfarbe
    $('#footer').css('border-top', '1px solid ' + colorFooter);

    // Footer Mouseover
    $('#footer_titles').hover(function() {
        $(this).css({
            'background-color': colorFooter,
            'color': '#000',
            'cursor': 'pointer'
        });
        $(this).html('&lt; Blog &gt;&nbsp;&nbsp;&nbsp;//&nbsp;&nbsp;&nbsp;&lt; Supportforum &gt;');
    }, function() {
        $(this).css({
            'background-color': '#000',
            'color': '#fff'
        });
        $(this).html('Wissen&nbsp;&nbsp;&nbsp;//&nbsp;&nbsp;&nbsp;Austausch');
    });

    // Footer Mausklick
    $('#footer_titles').click(function() {
        $(this).css('display', 'none');
        $('#footer_content').css('display', 'block');
        $('#footer').css('line-height', '18px');
        $('#content_logo').animate({'opacity': 0.5});
        $('#footer').animate({
            'height': '179px'
        }, 250, function() {
            $('#footer').mouseleave(function() {
                $('#content_logo').animate({'opacity': 1.0});
                $(this).animate({
                    'height': '39px'
                }, 250, 'linear', function() {
                    $('#footer_content').css('display', 'none');
                    $(this).css('line-height', '39px');
                    $('#footer_titles').css('display', 'block');
                    $('#footer').unbind();
                });
            });
        });
    });

    // Programmierung Headlines Mouseover
    $('#content2').find('.headline').hover(function() {
        $(this).css('cursor', 'pointer');
        $(this).stop().animate({'backgroundColor': '#ff0000'});
        $(this).find('.headlinesub').stop().animate({'color': '#ff0000'});
    }, function() {
        $(this).stop().animate({'backgroundColor': '#400000'});
        $(this).find('.headlinesub').stop().animate({'color': '#9f5e5d'});
    });

    // Programmierung Inhalt positionieren
    setProgrammierungContent();

    // Programmierung Klick auf Headline
    content2HeadlineClick1();

    // Werke Mouseover
    $('.werke_title').hover(function() {
        $(this).css('cursor', 'pointer');
        $(this).css('color', '#000');
        $(this).parent().css('background-color', '#ff6700');
    }, function() {
        $(this).css('color', '#fff');
        $(this).parent().css('background-color', '#000');
    });

    var werke_title = $('.werke_title');

    $(werke_title[0]).click(function() {
        showWerkeLeft($(this).parent());
    });
    $(werke_title[1]).click(function() {
        showWerkeRight($(this).parent());
    });

    // Logo positionieren
    logoPosition();

    $(window).resize(function() {
        logoPosition();
        setProgrammierungHeadlines();
        setProgrammierungContent();
        setWerkeContent();
    });

    setFotos();

    $('#header').mouseleave(function() {
    });
}

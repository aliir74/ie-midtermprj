var currentBackground = -1;

var homeData;
function loadViewport1(i) {
    $('#viewport1-title').html( (homeData.response.result.homepage.slider[i].title) );
    $('#viewport1-desc').html( (homeData.response.result.homepage.slider[i].abstract) );
    var imgUrl = (homeData.response.result.homepage.slider[i].large_image);
    $('#viewport1').css('background-image', 'url(' + imgUrl + ')' );
    $('#viewport1').css('background-repeat', 'no-repeat' );
    $('#viewport1').css('background-size', 'cover' );
    if(currentBackground != -1) {
        $(".idItem" + currentBackground).removeClass('activeSOverlay');
        $(".idItem" + currentBackground).parents('.owl-item').removeClass('center');
    }
    currentBackground = i;

    $(".idItem" + i).addClass('activeSOverlay');
    $(".idItem" + i).parents('.owl-item').not('.cloned').addClass('center');

}
$(document).ready(function () {
    $.get('http://api.ie.ce-it.ir/F95/home',function (data) {
        homeData = data;

        createSlider(data);
        loadViewport1(0);
        createSlider2(data);
        test();
        loadComments();
    });
});

function createSlider(data) {
    var sArray = data.response.result.homepage.slider;
    for (i = 0; i < sArray.length; i++) {
        var s = $("<li><div id='item"+i+"' class='slideBarItem' onclick='loadViewport1("+i+")'>" +
            "<div id='sOverlay"+i+"' class='sliderOverlay row idItem"+i+"'><div id='sText"+i+"' class='sliderText'></div>" +
            "<div id='sComments"+i+"' class='sliderComments row'></div>" +
            "<button type='button' id='sButton"+i+"' class='btn btn-default sliderButtons'> صفحه بازی</button>" +
            "<img class='sliderImage' src="+sArray[i].small_image+"</div>" +
            "</div></li>");
        //transform: scale(1.3);
        //var s = $("<li id='item"+i+"' class='slideBarItem'><div class='sliderOverlay'><img class='sliderImage' src="+sArray[i].small_image+"</div></li>");
        $("#slider").append(s);
        $("#item"+i).css('background-image', 'url(' + sArray[i].small_image + ')');
        $("#sText"+i).html('بررسی '+sArray[i].title);
        $("#sComments"+i).html('تعداد نظرات: '+sArray[i].number_of_comments);
    }




    jQuery.noConflict();
    /*
     $('.owl-carousel').owlCarousel({
     center: true,
     items:2,
     loop:true,
     margin:0,
     responsive:{
     600:{
     items:4
     }
     }
     })
     */
    //$('.owl-stage-outer')[0].setAttribute('id', 'slider-row')
}

function createSlider2(data) {
    var sArray = data.response.result.homepage.new_games;
    for (i = 0; i < sArray.length; i++) {
        var s = $("<div id='s2item"+i+"'>" +
            "<img class='sliderImage2' src='"+sArray[i].small_image+"'>" +
            "<div id='s2itemTitle"+i+"'>"+sArray[i].title+"</div>" +
            "<div id='s2itemCat"+i+"'></div>" +
            "<div id='s2itemRate"+i+"'></div>" +
            "</div>");
        //transform: scale(1.3);
        //var s = $("<li id='item"+i+"' class='slideBarItem'><div class='sliderOverlay'><img class='sliderImage' src="+sArray[i].small_image+"</div></li>");
        $("#slider2").append(s);
        //$("#s2item"+i).css('background-image', 'url(' + sArray[i].small_image + ')');
        //$("#s2itemCat"+i).html('تعداد نظرات: '+sArray[i].number_of_comments);

    }
}

function test() {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })

}

function loadComments() {
    var sArray = homeData.response.result.homepage.comments;
    for(i = 0; i < sArray.length; i++) {
        var imgUrl = sArray[i].player.avatar;
        var text = sArray[i].text;
        var date = sArray[i].date;
        var s = $("<img class='imgFloat' src='"+imgUrl+"'>"+
            "<div class='rtl'>"+text+"</div>"+
        "<div>"+date+"</div>"+
        "<br><hr class='style14'>");

        $("#commentsContent").append(s);
    }
}
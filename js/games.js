/**
 * Created by ali on 1/18/17.
 */

var gameTitle;
var gameData;

$(document).ready(function () {
    var query = 'http://api.ie.ce-it.ir/F95/games/'+getUrlVars()['game']+'/header';
    $.get(query,function (data) {
        console.log(query);
        gameData = data.response.result.game;
        loadHeader();
    });
});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function loadHeader() {
    var bigImg = gameData.large_image;
    var littleImg = gameData.small_image;
    var gameTitle = gameData.title;
    $('#header').css('background-image', 'url('+bigImg+')');
    $('#headerTitle').html(gameTitle);
    $('#headerImg').attr('src', littleImg);

    var categories = gameData.categories;
    var catstr = "";
    for(i = 0; i < categories.length; i++) {
        catstr += categories[i];
        if(i != categories.length-1)
            catstr += '، ';
    }
    $('#headerCat').html(catstr);

    var rate = gameData.rate;
    var ratef = Math.floor(parseFloat(rate));
    var half = false;
    if(parseFloat(rate) - ratef != 0)
        half = true;
    for(j = 0 ; j < ratef; j++) {
        $("#headerRate").append("<i class='fa fa-star' aria-hidden='true'></i>");
    }
    if(half)
        $("#headerRate").append("<i class='fa fa-star-half-o' aria-hidden='true'></i>");
    var ratec = Math.ceil(parseFloat(rate));
    for(i = 0; i < 5-ratec; i++) {
        $("#headerRate").append("<i class='fa fa-star-o' aria-hidden='true'></i>");
    }
    console.log(rate+' '+ratef+' '+ratec);
    console.log('loadHeader');

}
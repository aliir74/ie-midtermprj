/**
 * Created by ali on 1/18/17.
 */

var gameTitle;
var gameData;

var tabQuery = ['http://api.ie.ce-it.ir/F95/games/'+getUrlVars()['game']+'/info', 'http://api.ie.ce-it.ir/F95/games/'+getUrlVars()['game']+'/leaderboard', 'http://api.ie.ce-it.ir/F95/games/'+getUrlVars()['game']+'/comments', 'http://api.ie.ce-it.ir/F95/games/'+getUrlVars()['game']+'/related_games', 'http://api.ie.ce-it.ir/F95/games/'+getUrlVars()['game']+'/gallery'];
var tabData = [null, null, null, null, null];

$(document).ready(function () {
    var query = 'http://api.ie.ce-it.ir/F95/games/'+getUrlVars()['game']+'/header';
    $.get(query,function (data) {
        gameData = data.response.result.game;
        console.log('document ready'+data.response.result.game);
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
    console.log(gameData);
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

    loadData(0);
}

function loadData(x) {
    if(tabData[x] == null) {
        $.get(tabQuery[x],function (data) {
            console.log(tabQuery[x]);
            if(x==0)
                tabData[x] = data.response.result.game;
            else if(x==1)
                tabData[x] = data.response.result.leaderboard;
            showData(x);
        });
    } else {
        showData(x);
    }
}

function showData(x) {
    if(x == 0) {
        $('#infoContent').html(tabData[x].info)
    } else if(x == 1) {
        ///console.log(tabData[1]);
        loadScoreTab();
    }
}

function loadScoreTab() {

    tabData[1].sort(function (a, b) {
        return a.displacement - b.displacement;
    });

    for(i = 0; i < tabData[1].length; i++) {
        var rank = tabData[1][i].displacement;
        var medalQuery = "<div class='col-md-2'><i class='fa fa-arrow-down' aria-hidden='true'></i></div>"
        var s = $("<div class='rowList row'>" +
            "<div class='col-md-2'>"+tabData[1][i].score+"</div>"+
        medalQuery+
            "<div class='col-md-1'>"+tabData[1][i].level+"</div>"+
        "<div class='col-md-5'><img class='profileList' src='"+tabData[1][i].player.avatar+"'>"+
            "<div id='textlist1'>"+tabData[1][i].player.name+"</div>"+
                "</div>"+
        "<div class='col-md-1'><i id='medal' class='rank"+rank+" fa fa-trophy' aria-hidden='true'></i>"+
            "</div>"+
            "<div class='col-md-1'>"+rank+"</div></div>");

        $('#scoreList').append(s);

    }
}
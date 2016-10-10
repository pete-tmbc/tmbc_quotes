// Check if browser supports local storage
var localStorageEnabled = '';
function testLocalStorage() {
    if (Modernizr.localstorage) {
        localStorageEnabled = 'yes';
    }
    else {
        // no native support for local storage
        localStorageEnabled = 'no';
    }
}

testLocalStorage();

// Add some basic caching and cache clearing, set for a week
function checkQuotesAge() {
    if (localStorage.getItem('quotes')) {
        var lastSaved = JSON.parse(localStorage.getItem('quotes'));
        var timeNow   = new Date().getTime();
        lastSaved     = lastSaved.quotes.seton;
        if (timeNow - lastSaved > 604800000) {
            localStorage.removeItem('quotes');
            getData();
        }
        else {
            getQuote();
        }
    } else {
        getData();
    }
}

function getData() {
    var quoData;
    if (localStorage.getItem('quotes')) {
        getQuote();
    } else {
        $.ajax({
            url        : 'json/quotes.json',
            type       : 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType   : 'json',
            async      : false,
            success    : function (quoData) {
                quoData.quotes.seton = new Date().getTime();
                localStorage.setItem('quotes', JSON.stringify(quoData));
                getQuote();
            }
        });
    }
}

function getQuote() {
    var quoteList;
    var dispQuote;
    quoteList = JSON.parse(localStorage.getItem('quotes'));
    dispQuote = quoteList.quotes.entries[Math.floor(Math.random() * quoteList.quotes.entries.length)];
    $('#loaderoverlay').empty().append("<p>&#x201C;" + dispQuote.quote + "&#x201D;</p>");
    $('#loaderoverlay').append("<cite>&#x2013; &#x2013; " + dispQuote.author + "</cite>");
}

$("form").submit(function () {
    $("#loader").fadeIn();

    var opts = {
        lines    : 13 // The number of lines to draw
        , length : 28 // The length of each line
        , width  : 14 // The line thickness
        , radius : 42 // The radius of the inner circle
//            , scale: 1 // Scales overall size of the spinner
//            , corners: 1 // Corner roundness (0..1)
        , color  : '#2299dd' // #rgb or #rrggbb or array of colors
//            , opacity: 0.25 // Opacity of the lines
//            , rotate: 0 // The rotation offset
//            , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed  : 1 // Rounds per second
        , trail  : 60 // Afterglow percentage
//            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
//            , zIndex: 2e9 // The z-index (defaults to 2000000000)
//            , className: 'spinner' // The CSS class to assign to the spinner
        , top    : '30%' // Top position relative to parent
//            , left: '50%' // Left position relative to parent
        , shadow : false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
//            , position: 'absolute' // Element positioning
    };

    var target  = document.getElementById('loader');
    var spinner = new Spinner(opts).spin(target);

    if (localStorageEnabled === 'yes') {
        checkQuotesAge();
    }
    else {
        // display the spinner only
    }

});

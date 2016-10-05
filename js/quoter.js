$("form").submit(function() {
    var randQuote;
    var quotJson = 'json/quotes.json';
    $.getJSON(quotJson,function(quotes){
        randQuote = quotes.entries[Math.floor(Math.random() * quotes.entries.length)];
        $('#loaderoverlay').empty().append("<p>&#x201C;" + randQuote.quote + "&#x201D;</p>");
        // $('#qauth').empty().append(randQuote.author);
        $('#loaderoverlay').append("<cite>&#x2013; &#x2013; " + randQuote.author + "</cite>");
    });
});
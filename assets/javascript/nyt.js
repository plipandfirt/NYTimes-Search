$(document).ready( function() {

    const numRecords = 10;

    function submitRequest() {

        // NOTE:   HARD CODED CONSTANTS THAT NEED TO BE REPLACED BY UI 
        var qValue = $("#searchTerm").val();
        var beginDate = $("#startYear").val() + "0101";
        var endDate = $("#endYear").val() + "1231";


        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "f20d8aff31de4d28a2f07792a13de289",
            'q': qValue,
        });

        if (beginDate) {
            url += "&" + $.param({
                'begin_date': beginDate
            });
        }

        if (endDate) {
            url += "&" + $.param({
                'end_date': endDate
            });
        }

        console.log(url);

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {
            console.log(result);
            displayResults(result);
        }).fail(function (err) {
            throw err;
        });
    }

    function displayResults(result) {

        var maxRecords = (numRecords < result.response.docs.length) ? numRecords : result.response.docs.length;

        for (var i = 0; (i < maxRecords); i++) {

            var newStory = result.response.docs[i];

            // <div>
            //    <h1>my title</h1>
            //    <h2>By: my author</h2>
            // </div>
            var articleDiv = $("<div>");
            var title = $("<h1>");
            title.text(newStory.headline.main);
            articleDiv.append(title)

            if (newStory.byline) {
                var author = $("<h2>");
                author.text(newStory.byline.original);
                articleDiv.append(author);
            }

            // NOTE:   HARD CODED ELEMENTS THAT NEED TO BE WIRED TO UI 
            $("#displayArticles").append(articleDiv);
        }
    }

    $("#searchArticles").on("click", function () {
        submitRequest();
    });
});
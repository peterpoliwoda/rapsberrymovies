$( document ).ready(function() {
    $.get( "https://api.themoviedb.org/3/movie/popular?api_key=bc94cbdbf16a0bc39441827885a21f97", function( data ) {
        var myMovies = data.results;
        console.log(myMovies);     
        $( "#movies" ).html( myMovies );

        });
});

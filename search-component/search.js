$( document ).ready(function() {

	// create new Vue instance
	var app = new Vue({
		el: '#app',
			data: {
            search: '',
			movies: null
		},
		created: function() {
			// get data for movies
			$.getJSON("https://raw.githubusercontent.com/wearebond/frontend-coding-challenge/master/data/movie_metadata.json", function(json) {
			    app.movies = json;
                $.each(json, function() {
					// create new property for array of words from each movie title
                    var keyWords = this.title.split(' ');
                    this.keyWords = keyWords;
                    this.isActive = true;
                });
			});
		},
        methods: {

        },
        watch: {
			// when search input value changes...
            search: function(val) {
				// create array of lowercase words
                var searchVal = val.toLowerCase().split(' ');
                $.each(this.movies, function() {
                    var match;
					// for each keyword in each movie's "keyWords" array...
                    this.keyWords.forEach(function(el) {
                        var keyWord = el.toLowerCase();
                        $.each(searchVal, function(el) {
                            if (this != '') {
								// check if the keyword includes a string from the search input value
                                if (keyWord.includes(this)) {
                                    match = true;
                                };
                            };
                        });
                    });
					// if there is a match, keep the "active" class on the movie
                    if (match == true) {
                        this.isActive = true;
                    } else {
                        this.isActive = false;
                    };
                });
				// if search bar is empty, make all movies active
                if (val == '') {
                    app.movies.forEach(function(el) {
                        el.isActive = true;
                    });
                };
            }
        }
	});

});

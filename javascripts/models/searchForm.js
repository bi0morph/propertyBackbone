app.models.SearchForm = Backbone.Model.extend({
	defaults: {
		searchQuery: '',
		latitude: 0,
		longitude: 0,
		locations: [],
		recentSearches: [],
		errorMessage: '',
	},
	setError: function(message) {
		console.log('setError');
		this.set({
			errorMessage: message,
			locations: [],
			recentSearches: []
		});
	},
	setLocations: function(locations) {
		console.log('setLocations');
		this.set({
			errorMessage: '',
			locations: locations,
			recentSearches: []
		});
	},
	updateQuery: function(query) {
		var searchQuery = this.get('searchQuery');
		if (searchQuery !== query) {
			this.set('searchQuery', query);
		};
	},
	setRecentSearches: function(recentSearches) {
		this.set({
			errorMessage: '',
			locations: [],
			recentSearches: app.listRecentSearches.toJSON()
		});
	}
});

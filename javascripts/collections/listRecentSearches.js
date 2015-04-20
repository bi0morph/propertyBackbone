var app = app || {};

app.collections.ListRecentSearches = Backbone.Collection.extend({
	model: app.models.RecentSearch,
	initialize: function () {
		this.fetch();
	},
	getTimestamp: function() {
		return (new Date()).getTime();
	},
	addSearch: function(query, qntResults) {
		var recentSearch = new app.models.RecentSearch({
			query: query,
			qntResults: qntResults,
			timestamp: this.getTimestamp()
		});
		this.add(recentSearch, {merge: true})
		this.sync('update');
	},
	sync: function(method, collection) {
		var recentSearchLoc = localStorage.getItem('recentSearch');
		if (!recentSearchLoc) {
			localStorage.setItem('recentSearch', JSON.stringify([]));
		}
		if (method === 'read') {
			this.set( JSON.parse(recentSearchLoc) );
		} else if (method === 'update') {
			localStorage.recentSearch = JSON.stringify( app.listRecentSearches.toJSON() );
		};
	},
	comparator: function ( resentSearch ) {
		return -resentSearch.get('timestamp');
	},
});
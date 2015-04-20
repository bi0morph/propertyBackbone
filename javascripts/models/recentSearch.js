var app = app || {};

app.models.RecentSearch = Backbone.Model.extend({
	defaults: {
		query: '',
		qntResults: 0,
		timestamp: 0
	},
	idAttribute: 'query'
});
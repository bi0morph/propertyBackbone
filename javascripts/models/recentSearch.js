var app = app || {};

app.models.RecentSearch = Backbone.Model.extend({
	default: {
		query: '',
		timestamp: 0
	}
});
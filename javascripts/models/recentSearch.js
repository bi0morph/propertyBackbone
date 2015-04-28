console.log(app);
app.Models.RecentSearch = Backbone.Model.extend({
	defaults: {
		query: '',
		qntResults: 0,
		timestamp: 0
	},
	idAttribute: 'query'
});
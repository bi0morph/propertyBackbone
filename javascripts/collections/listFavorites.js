var app = app || {};

app.collections.ListFavotites = Backbone.Collection.extend({
	model: app.models.PropertyDetail,
	idAttribute: 'guid'
});
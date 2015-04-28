app.Collections.ListFavotites = Backbone.Collection.extend({
	model: app.Models.PropertyDetail,
	idAttribute: 'guid'
});
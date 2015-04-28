app.models.PropertyDetail = Backbone.Model.extend({
	defaults: {
		price: '',
		title: '',
		image: {
			src: '',
			width: '',
			height: ''
		},
		bedrooms: 0,
		bathrooms: 0,
		summary: '',
		isFavorite: false,
		guid: 0
	},
	toggleFave: function() {
		var isFavorite = this.get('isFavorite');
		this.set('isFavorite', !isFavorite);
		return !isFavorite;
	}
});

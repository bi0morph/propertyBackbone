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
		favorite: false
	},
});

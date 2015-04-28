app.views.PropertyDetail = Backbone.View.extend({
	template: app.templates.propertyDetail,
	initialize: function() {
		this.listenTo(this.model, 'change:isFavorite', this.render);
	},
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	},
	close: function() {
	    this.stopListening();
	},
	events: {
		'click #add-to-fave': 'toggleFave'
	},
	toggleFave: function() {
		console.log(this.model.attributes);
		if(this.model.toggleFave()) {
			app.listFavotites.add(this.model);
		}else{
			app.listFavotites.remove(this.model);
		};
		console.log(app.listFavotites);
	}
});
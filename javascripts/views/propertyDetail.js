var app = app || {};

app.views.PropertyDetail = Backbone.View.extend({
	template: app.templates.propertyDetail,
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	},
	close: function() {
	    this.stopListening();
	}
});
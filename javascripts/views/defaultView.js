app.Views.DeafultView = Backbone.View.extend({
	initialize: function() {
		console.log('initialize SearchForm');
		this.render();
	},
	close: function() {
	    this.stopListening();
	},
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	}
});
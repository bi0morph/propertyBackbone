app.views.DeafultView = Backbone.View.extend({
	initialize: function() {
		console.log('initialize SearchForm');
		this.render();
	},
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	}
});
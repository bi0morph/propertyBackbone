app.Views.PropertyItem = Backbone.View.extend({
	tagName: 'li',
	template: app.templates.propertyItem,
	initialize: function(options) {
		this.index = options.index;
	},
	render: function() {
		var variables = this.model.attributes;
		variables.index = this.index;
		this.$el.html( this.template( variables ) );
		return this;
	}
});
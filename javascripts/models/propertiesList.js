app.Models.PropertiesList = Backbone.Model.extend({
	defaults: {
		page: 1,
		properties: [],
		total_results: 0,
		isLoading: false
	},
	getProperty: function(index) {
		return this.attributes.properties[index];
	}
});

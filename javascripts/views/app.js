var app = app || {};

app.AppView = Backbone.View.extend({
	
	el: '#search-app',
	
	searchFormTemplate: _.template( $('#search-form-template').html() ),
	propertiesListTemplate: _.template( $('#properties-list-template').html() ),
	propertyDetailTemplate: _.template( $('#property-detail-template').html() ),
	
	initialize: function() {
		this.$el.append( this.searchFormTemplate() );
	}
});
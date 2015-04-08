app.views.PropertiesList = Backbone.View.extend({
	template: app.templates.propertiesList,
	events: {
		'click #load-more': 'loadMoreProperties'
	},
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		this.$loadMore = this.$('#load-more');
		return this;
	},
	toggleLoading: (function() {
		var isLoading = false,
			toggleLoading = function toggleLoading() { 
				if ( isLoading ) {
					this.$loadMore.removeClass('loading').text('Load more');
				} else {
					this.$loadMore.addClass('loading').text('Loading...');
				}
				isLoading = !isLoading;
			};
		return toggleLoading; 
	} )(),
	loadMoreProperties: function() {
		toggleLoading();
	}
});
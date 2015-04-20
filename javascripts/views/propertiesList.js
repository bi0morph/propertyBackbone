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
		this.toggleLoading();
		var success = _.bind(this.loadSuccess, this),
			error = _.bind(this.loadError, this);
		app.searchService.nextPage(success, error);

	},
	loadSuccess: function(result) {
		console.log(result.response);
		console.log(result.request);
		this.toggleLoading();
	},
	loadError: function() {
		console.log('An error occurred while searching. Please check your network connection and try again.');
		this.toggleLoading();
		// app.searchFormModel.setError('An error occurred while searching. Please check your network connection and try again.');
	},
});
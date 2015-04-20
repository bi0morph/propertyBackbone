var app = app || {
	views: {},
	models: {},
	currentView: null,
	templates: {
		searchForm: _.template( $('#search-form-template').html() ),
		propertiesList: _.template( $('#properties-list-template').html() ),
		propertyDetail: _.template( $('#property-detail-template').html() )
	}
};

app.views.AppView = Backbone.View.extend({
	
	el: '#search-app',

	initialize: function() {

		this.on('currentView', this.updateCurrentView);
	},
	createCurrentView: function(viewName) {
		
		console.log(viewName);
		switch (viewName) {
			case 'SearchForm': 
				app.currentView = new app.views.SearchForm({
					el: this.el,
					model: app.searchFormModel
				});
			break;
			case 'PropertiesList': 
				app.currentView = new app.views.PropertiesList({
					el: this.el,
					model: app.propertiesListModel
				});
			break;
		}
	},
	updateCurrentView: function(viewName) {
		if (app.currentView) {
			app.currentView.close();
		};
		this.createCurrentView(viewName);
		
		app.currentView.render();
	}
});
var ENTER_KEY = 13;
$(function() {
	app.appView = new app.views.AppView();
	
	app.listRecentSearches = new app.collections.ListRecentSearches();
	app.searchFormModel = new app.models.SearchForm();
	app.propertiesListModel = new app.models.PropertiesList();
	

	app.PropertySearchRouter = new Workspace();
	Backbone.history.start();
});

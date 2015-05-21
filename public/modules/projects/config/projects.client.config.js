'use strict';

// Configuring the Articles module
angular.module('projects').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('topbar', 'Feed', 'feed', 'item', 'feed', true);
		Menus.addMenuItem('topbar', 'Projects', 'projects', 'dropdown', '/projects(/create)?', false);
		Menus.addSubMenuItem('topbar', 'projects', 'List Projects', 'projects', false);
		Menus.addSubMenuItem('topbar', 'projects', 'New Project', 'projects/create', false);*/
	}
]);
'use strict';

module.exports = function(app) {
	var regions = require('../../app/controllers/regions.server.controller');

	app.route('/regions')
		.get(function (req,res,next) {
			console.log('regions');
			next();
		},regions.list)
		.post(function (req,res,next) {
			console.log('regions');
			next();
		},regions.create);

};
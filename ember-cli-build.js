'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');

module.exports = function (defaults) {
	let app = new EmberApp(defaults, {
		babel: {
			sourceMaps: 'inline'
		},
		// Add options here
		nodeAssets: {
			'popper.js': {
				srcDir: 'dist/umd',
				import: {
					include: ['popper.js'],
					processTree(input) {
						return fastbootTransform(input);
					}
				},
				public: ['popper.js.map']
			}
		}
	});

	// funnel bootstrap 4 scss files in
	// const bootstrapTree = new Funnel('node_modules/bootstrap/scss', {
	// 	destDir: 'bootstrap'
	// });
	// app.trees.styles = mergeTrees([app.trees.styles, bootstrapTree]);

	// console.log(bootstrapTree);

	return app.toTree();
};

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

	app.getSrc = function () {
		let rawSrcTree = this.trees.src;

		if (!rawSrcTree) {
			return null;
		}

		const bootstrapTree = new Funnel('node_modules/bootstrap/scss', {
			destDir: 'src/ui/styles/bootstrap',
			annotation: 'Bootstrap'
		});

		const src = new Funnel(rawSrcTree, {
			destDir: 'src',
		});

		return mergeTrees([src, bootstrapTree], {
			overwrite: true
		});
	};

	return app.toTree();
};

import EmberRouter from "@ember/routing/router";
import config from "../config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
	this.route('freestyle-bullshit-bingo', function () {
		this.route('play');
		this.route('not-todo-list');
	});
});

export default Router;

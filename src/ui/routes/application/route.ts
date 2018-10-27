import Route from "@ember/routing/route";
import { service } from '@ember-decorators/service';

export default class ApplicationRoute extends Route {
	@service intl;

	beforeModel() {
		return this.intl.setLocale('de');
	}

}

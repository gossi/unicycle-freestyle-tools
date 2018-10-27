import Controller from "@ember/controller";
import BullshitService from "freestyle-tools/services/bullshit";
import { service } from "@ember-decorators/service";
import { computed, action } from "@ember-decorators/object";
import { RouterService } from '@ember/routing';

export default class BullshitBingoListController extends Controller {
	@service bullshit!: BullshitService;
	@service router!: RouterService;

	queryParams: string[] = ['tag'];
	tag: string | null = null;

	@computed('tag')
	get principles(): any {
		if (this.tag === null) {
			return this.bullshit.all;
		}

		return this.bullshit.filteredByTag(this.tag);
	}

	reset(isExiting: boolean) {
		if (isExiting) {
			this.set('tag', null);
		}
	}

	@action
	filterTag(tag: string) {
		if (this.tag === tag) {
			this.set('tag', null);
		} else {
			this.router.replaceWith('freestyle-bullshit-bingo.not-todo-list', {
				queryParams: {
					tag
				}
			});
		}
	}
}

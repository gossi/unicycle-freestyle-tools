import Controller from "@ember/controller";
import BullshitService from "freestyle-tools/services/bullshit";
import { service } from "@ember-decorators/service";

export default class BullshitBingoListController extends Controller {
	@service bullshit!: BullshitService;
}

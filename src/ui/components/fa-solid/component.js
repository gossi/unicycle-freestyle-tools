import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
// import layout from '@fortawesome/ember-fontawesome/templates/components/fa-icon';

export default class FaSolid extends FaIcon {
	// layout = layout;
	constructor() {
		super(...arguments);
		this.prefix = 'fas';
	}
}

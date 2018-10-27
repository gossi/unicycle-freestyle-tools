import Component, { tracked } from 'sparkles-component';
import { Principle } from 'freestyle-tools/services/bullshit';

interface Args {
	principle: Principle;
}

export default class PrincipleComponent extends Component<Args> {

	// props
	@tracked open: boolean = false;

	toggle() {
		this.open = !this.open;
	}
}

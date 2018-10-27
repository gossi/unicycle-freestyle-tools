import Component, { tracked } from 'sparkles-component';
import { Principle } from 'freestyle-tools/services/bullshit';
import BingoComponent from 'freestyle-tools/ui/components/bingo/component';

interface Args {
	principle: Principle;
	bingo: BingoComponent;
	selection: Set<Principle>;
	winner: Set<Principle>;
	select: () => void;
}

export default class BingoTileComponent extends Component<Args> {
	@tracked('args')
	get selected(): boolean {
		return this.args.selection.has(this.args.principle);
	}

	@tracked('args')
	get winner(): boolean {
		return this.args.winner.has(this.args.principle);
	}

	select() {
		this.args.bingo.select(this.args.principle);
	}
}

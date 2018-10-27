import Component, { tracked } from 'sparkles-component';
import BullshitService, { Principle } from 'freestyle-tools/services/bullshit';
import { service } from '@ember-decorators/service';

interface Args {

}

export default class BingoComponent extends Component<Args> {
	@service bullshit!: BullshitService;

	@tracked principles: Principle[] = [];
	@tracked selection: Set<Principle> = new Set();
	@tracked winner: Set<Principle> = new Set();

	constructor(props: Args) {
		super(props);
	}

	didInsertElement() {
		super.didInsertElement();
		this.start();
	}

	reset() {
		this.selection.clear();
		this.winner.clear();
	}

	start() {
		this.reset();
		this.principles = this.bullshit.all.sort(() => .5 - Math.random()).slice(0, 25);
	}

	select(principle: Principle) {
		if (this.selection.has(principle)) {
			this.selection.delete(principle);
		} else {
			this.selection.add(principle);
		}

		this.selection = this.selection;
		this.winner.clear();

		const winner = this.getWinner();
		if (winner !== undefined) {
			const [line, index] = winner;

			if (line === 'row') {
				const start = (index - 1) * 5;

				for (let i = start; i < start + 5; i++) {
					this.winner.add(this.principles[i]);
				}
			}

			if (line === 'col') {
				for (let i = 0; i < this.principles.length; i++) {
					if (this.getColumn(i + 1) === index) {
						this.winner.add(this.principles[i]);
					}
				}
			}

			if (line === 'cross') {
				for (let i = 0; i < this.principles.length; i++) {
					const row = this.getRow(i + 1);
					const col = this.getColumn(i + 1);
					if (index === 0 && row === col) {
						this.winner.add(this.principles[i]);
					}

					if (index === 1 && row + col === 6) {
						this.winner.add(this.principles[i]);
					}
				}
			}
		}

	}

	getWinner(): [string, number] | undefined {
		const rows: Array<Array<boolean>> = [[], [], [], [], []];
		const cols: Array<Array<boolean>> = [[], [], [], [], []];
		const cross: Array<Array<boolean>> = [[], []];

		for (let i = 0; i < this.principles.length; i++) {
			const selected = this.selection.has(this.principles[i]);
			const index = i + 1;
			const row = this.getRow(index);
			const col = this.getColumn(index);
			rows[row - 1].push(selected);
			cols[col - 1].push(selected);

			if (row === col) {
				cross[0].push(selected);
			}

			if (row + col === 6) {
				cross[1].push(selected);
			}
		}

		const lines = [rows, cols, cross].reduce((acc, val) => acc.concat(val), []);
		const winnerLine = lines.findIndex((line) => line.every(v => v === true));

		if (winnerLine >= 0 && winnerLine <= 4) {
			return ['row', winnerLine + 1];
		} else if (winnerLine >= 5 && winnerLine <= 9) {
			return ['col', winnerLine + 1 - 5];
		}  else if (winnerLine >= 10) {
			return ['cross', winnerLine - 10];
		}

		return undefined;
	}

	private getRow(index: number): number {
		return Math.ceil(index / 5);
	}

	private getColumn(index: number): number {
		const col = index % 5;
		return col === 0 ? 5 : col;
	}
}

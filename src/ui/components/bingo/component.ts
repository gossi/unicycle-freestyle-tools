import Component, { tracked } from 'sparkles-component';
import BullshitService, { Principle } from 'freestyle-tools/services/bullshit';
import { service } from '@ember-decorators/service';
import uuid from 'uuid';
import { observes } from '@ember-decorators/object';

interface Args {
}

interface Counter {
	id: string;
	name: string;
	count: number;
}

export default class BingoComponent extends Component<Args> {
	@service bullshit!: BullshitService;

	@tracked principles: Principle[] = [];
	@tracked selection: Set<Principle> = new Set();
	@tracked winner: Set<Principle> = new Set();
	@tracked finished: boolean = false;
	@tracked display: string = 'game';

	@tracked counters: {[key: string]: Counter};
	@tracked activeCounter!: Counter;

	private static STORAGE_COUNTER: string = 'bullshit_bingo.counter';
	private static STORAGE_ACTIVE_COUNTER_ID: string = 'bullshit_bingo.active_counter_id';
	private static STORAGE_PRINCIPLES: string = 'bullshit_bingo.principles';
	private static STORAGE_SELECTION: string = 'bullshit_bingo.selection';

	constructor(props: Args) {
		super(props);

		let activeCounter = window.localStorage.getItem(BingoComponent.STORAGE_ACTIVE_COUNTER_ID);
		const data = window.localStorage.getItem(BingoComponent.STORAGE_COUNTER);
		this.counters = data ? JSON.parse(data) : {};

		if (activeCounter && Object.keys(this.counters).includes(activeCounter)) {
			this.activeCounter = this.counters[activeCounter];
		}

		if (Object.keys(this.counters).length === 0) {
			const id = uuid();
			this.counters[id] = {
				id,
				name: 'Standard',
				count: 0
			};
			this.activeCounter = this.counters[id];
		}
		this.persistCounters();
	}

	didInsertElement() {
		super.didInsertElement();

		const principles = window.localStorage.getItem(BingoComponent.STORAGE_PRINCIPLES);

		if (principles) {
			this.load();
		} else {
			this.newGame();
		}
	}

	toggle() {
		this.display = this.display === 'game' ? 'counter' : 'game';
	}

	private clear() {
		this.selection.clear();
		this.winner.clear();
		this.selection = this.selection;
		this.finished = false;
	}

	start() {
		this.clear();
		this.principles = this.bullshit.all.sort(() => .5 - Math.random()).slice(0, 25);
		this.persistGame();
	}

	reset() {
		this.start();
	}

	newGame() {
		this.incrementActiveCounter();
		this.start();
	}

	load() {
		const principles = window.localStorage.getItem(BingoComponent.STORAGE_PRINCIPLES);
		if (principles) {
			this.principles = JSON.parse(principles);
		}

		const selection = window.localStorage.getItem(BingoComponent.STORAGE_SELECTION);
		if (selection) {
			this.selection.clear();

			for (const p of JSON.parse(selection)) {
				this.selection.add(this.principles.findBy('id', p.id));
			}

			this.selection = this.selection;
		}
	}

	select(principle: Principle) {
		if (this.selection.has(principle)) {
			this.selection.delete(principle);
		} else {
			this.selection.add(principle);
		}

		this.finished = false;

		this.winner.clear();
		this.selection = this.selection;
	}

	@observes('selection')
	selectionListener() {
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

			this.finished = true;
		}

		if (this.selection.size > 0) {
			this.persistGame();
		}
	}

	getWinner(): [string, number] | undefined {
		if (this.principles.length === 0) {
			return undefined;
		}

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

	private persistGame() {
		window.localStorage.setItem(BingoComponent.STORAGE_PRINCIPLES, JSON.stringify(this.principles));
		window.localStorage.setItem(BingoComponent.STORAGE_SELECTION, JSON.stringify(Array.from(this.selection)));
	}

	// counter logic
	activateCounter(id: string) {
		if (this.counters[id]) {
			this.activeCounter = this.counters[id];9
			window.localStorage.setItem(BingoComponent.STORAGE_ACTIVE_COUNTER_ID, id);
		}
	}

	updateCounter(id: string, event: FocusEvent) {
		this.counters[id].name = event.target.textContent;
		if (id === this.activeCounter.id) {
			this.activeCounter = this.counters[id];
		}
		this.persistCounters();
	}

	incrementCounter(id: string) {
		this.counters[id].count++;
		if (id === this.activeCounter.id) {
			this.activeCounter = this.counters[id];
		}
		this.persistCounters();
	}

	incrementActiveCounter() {
		this.incrementCounter(this.activeCounter.id);
	}

	newCounter() {
		const input = document.getElementById('counter-new');

		const cnt = {
			id: uuid(),
			name: input.value,
			count: 0
		};

		this.counters[cnt.id] = cnt;
		this.persistCounters();
	}

	deleteCounter(id: string) {
		delete this.counters[id];
		this.persistCounters();
	}

	persistCounters() {
		this.counters = this.counters;
		window.localStorage.setItem(BingoComponent.STORAGE_COUNTER, JSON.stringify(this.counters));
		window.localStorage.setItem(BingoComponent.STORAGE_ACTIVE_COUNTER_ID, this.activeCounter.id);
	}
}

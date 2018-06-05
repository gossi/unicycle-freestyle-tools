import Service from '@ember/service';

const CHOREO = 'choreography';
const TRICKS = 'tricks';
const CATEGORIES: string[] = [CHOREO, TRICKS];

const simpleFacts: object = {
	"music-in-background": {
		category: CHOREO
	},
	"similar-arm-motions": {
		category: CHOREO
	},
	"tricks-only": {
		category: CHOREO,
		alias: "x-style"
	},
	"x-style": {
		category: CHOREO
	},
	"hearable-cut": {
		category: CHOREO
	},
	"arabesque-no-bowtension": {
		category: TRICKS
	},
	"arabesque-hand-on-seat": {
		category: TRICKS,
		reference: "standup-hand-on-seat"
	},
	"standup-hand-on-seat": {
		category: TRICKS
	}
};

const FACTS = Object.keys(simpleFacts).map((id) => {
	let obj: {} = simpleFacts[id];
	obj.id = id;
	return obj;
});

export default class BullshitService extends Service {

	categories: string[] = CATEGORIES;

	all: object = FACTS;
}

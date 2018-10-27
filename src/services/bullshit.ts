import Service from '@ember/service';

const CHOREO = 'choreography';
const TRICKS = 'tricks';
const FLOW = 'flow';
const POSTURE = 'posture';
const MISC = 'misc';
const TAGS: string[] = [CHOREO, TRICKS, FLOW, POSTURE, MISC];

interface SimplePrinciple {
	tags: string[];
	alias?: string;
	refs?: string[];
}

export interface Principle extends SimplePrinciple {
	id: string;
}

const simplePrinciples: { [s: string]: SimplePrinciple; } = {
	"music-in-background": {
		tags: [CHOREO]
	},
	"similar-arm-motions": {
		tags: [CHOREO]
	},
	"tricks-only": {
		tags: [CHOREO],
		alias: "x-style"
	},
	"x-style": {
		tags: [CHOREO]
	},
	"audible-cut": {
		tags: [CHOREO]
	},
	"standup-hand-on-seat": {
		tags: [TRICKS]
	},
	"arabesque-no-bowtension": {
		tags: [TRICKS]
	},
	"arabesque-hand-on-seat": {
		tags: [TRICKS],
		refs: ["standup-hand-on-seat"]
	},
	"lyrics-to-gestures": {
		tags: [CHOREO]
	},
	"rider-role-diff": {
		tags: [CHOREO]
	},
	"arm-motions-repeat": {
		tags: [CHOREO]
	},
	"arms-only": {
		tags: [CHOREO]
	},
	"palms-extended": {
		tags: [POSTURE]
	},
	"foot-not-pointed": {
		tags: [POSTURE]
	},
	"no-body-tension": {
		tags: [POSTURE, CHOREO]
	},
	"rider-watches-ground": {
		tags: [CHOREO, TRICKS]
	},
	"same-posture": {
		tags: [CHOREO]
	},
	"same-mimic": {
		tags: [CHOREO]
	},
	"routine-has-theme": {
		tags: [CHOREO]
	},
	"no-content": {
		tags: [CHOREO]
	},
	"provocative-clothes": {
		tags: [CHOREO]
	},
	"ineffective-room-usage": {
		tags: [CHOREO]
	},
	"perma-grin": {
		tags: [CHOREO]
	},
	"overwhelmed-with-costume": {
		tags: [CHOREO]
	},
	"no-brainer-props": {
		tags: [CHOREO]
	},
	"music-charts": {
		tags: [CHOREO]
	},
	"rider-cannot-handle-prop": {
		tags: [CHOREO]
	},
	"rider-cannot-hide-anger": {
		tags: [CHOREO]
	},
	"routine-no-dynamics": {
		tags: [CHOREO]
	},
	"routine-no-tension": {
		tags: [CHOREO]
	},
	"tricks-mainstream": {
		tags: [CHOREO]
	},
	"tricks-for-counts": {
		tags: [CHOREO]
	},
	"techno": {
		tags: [CHOREO]
	},
	"unknown-musicvideo": {
		tags: [CHOREO]
	},
	"dont-do-the-obvious": {
		tags: [CHOREO]
	},
	"too-many-songs": {
		tags: [CHOREO]
	},
	"national-songs-at-international": {
		tags: [CHOREO]
	},
	"costume-most-important": {
		tags: [CHOREO]
	},
	"standardskill": {
		tags: [POSTURE]
	},
	"spin-no-posture": {
		tags: [POSTURE]
	},
	"costume-change": {
		tags: [CHOREO]
	},
	"groupies": {
		tags: [MISC]
	},
	"costume-problems": {
		tags: [MISC]
	},
	"fraction-clapping": {
		tags: [MISC]
	},
	"dont-deliever-to-michael-jackson": {
		tags: [CHOREO]
	},
	"kids-on-barbie-girl": {
		tags: [CHOREO]
	},
	"prehops": {
		tags: [TRICKS]
	},
	"picked-theme-failed-theme": {
		tags: [CHOREO]
	}
};

const PRINCIPLES: Principle[] = Object.keys(simplePrinciples).map((id) => {
	let obj = simplePrinciples[id] as Principle;
	obj.id = id;
	return obj;
});

export default class BullshitService extends Service {

	tags: string[] = TAGS;

	all: Principle[] = PRINCIPLES;

	filteredByTag(tag: string) {
		return PRINCIPLES.filter((principle: Principle) => {
			return principle.tags.includes(tag);
		});
	}
}

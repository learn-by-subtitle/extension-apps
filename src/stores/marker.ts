import { defineStore } from "pinia";
import { log } from "../common/helper/log";

interface State {
	mode: 'mark' | 'select';
	marking: boolean;
	markedWords: { id: number, word: string }[];
}

export const useMarkerStore = defineStore('marker', {
	state: (): State => ({
		mode: 'select',
		marking: false,
		markedWords: [],
	}),

	getters: {
		isMarkingMode: (state) => state.mode === 'mark',
		isMarking: (state) => state.marking,
		selectedPhrase: (state) => {
			// sort base id and join words
			const sorted = state.markedWords.sort((a, b) => a.id - b.id);
			return sorted.map((item) => item.word).join(' ');
		},
	},

	actions: {
		toggleMarkingMode(value: boolean) {
			this.mode = value ? 'mark' : 'select';
		},

		toggleMarking(value: boolean) {
			this.marking = value;
		},

		markWord(id: number, word: string) {
			this.markedWords.push({ id, word });
		},

		clear() {
			this.markedWords = [];
		},

		checkedSelected(id: number) {
			return !!this.markedWords.find((item) => item.id === id);
		}
	}
})

export const startMarking = (e: KeyboardEvent) => {
	if (e.key !== 'Control' && e.key !== 'Meta') return;

	useMarkerStore().toggleMarkingMode(true);
	document.body.style.cursor = 'text';

	document.addEventListener('keyup', stopMarking);

	// @ TODO: Clear for production
	log('Start Marking', useMarkerStore().isMarkingMode);
}

export const stopMarking = (e: KeyboardEvent) => {
	if (e.key !== 'Control' && e.key !== 'Meta') return;

	useMarkerStore().toggleMarkingMode(false);
	document.body.style.cursor = 'default';

	document.removeEventListener('keyup', stopMarking);

	log('Stop Marking', useMarkerStore().isMarkingMode);
}
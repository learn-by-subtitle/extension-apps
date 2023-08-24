import { defineStore } from "pinia";
import { log } from "../common/helper/log";

export interface MarkedWord {
	id: number,
	word: string,
	domeRect: DOMRect
}

interface State {
	mode: 'mark' | 'select';
	marking: boolean;
	markedWords: MarkedWord[];
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
		words: (state) => state.markedWords,
		selectedPhrase: (state) => {
			return state.markedWords.map((item) => item.word).join(' ');
		},
	},

	actions: {
		toggleMarkingMode(value: boolean) {
			this.mode = value ? 'mark' : 'select';
		},

		toggleMarking(value: boolean) {
			log('toggleMarking', value);
			this.marking = value;

			if (value == true) {
				const _this = this;
				document.addEventListener('mouseup', () => {
					_this.toggleMarking(false);
				}, { once: true });
			}
		},

		markWord(id: number, word: string, domeRect: DOMRect) {
			const isExist = this.markedWords.find((item) => item.id === id);
			if (isExist) return

			this.markedWords.push({ id, word, domeRect });
			// Sort base id
			this.markedWords = this.markedWords.sort((a, b) => a.id - b.id);
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
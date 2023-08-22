import { defineStore } from "pinia";
import { log } from "../common/helper/log";

interface State {
	marking: boolean;
	markedWords: { id: number, word: string }[];
}

export const useMarkerStore = defineStore('marker', {
	state: (): State => ({
		marking: false,
		markedWords: [],
	}),

	getters: {
		isMarking: (state) => state.marking,
		selectedPhrase: (state) => {
			// sort base id and join words
			const sorted = state.markedWords.sort((a, b) => a.id - b.id);
			return sorted.map((item) => item.word).join(' ');
		},
	},

	actions: {
		toggleMarking(value?: boolean) {
			this.marking = value || !this.isMarking;
		},

		markWord(id: number, word: string) {
			this.markedWords.push({ id, word });
		},

		clear() {
			this.markedWords = [];
		},

		checkSelectedWord(id: number) {
			return !!this.markedWords.find((item) => item.id === id);
		}
	}
})

export const startMarking = (e: KeyboardEvent) => {
	if (e.key !== 'Control' && e.key !== 'Meta') return;

	useMarkerStore().toggleMarking(true);

	// @ TODO: Clear for production
	log('Start Marking', useMarkerStore().isMarking);
}

export const stopMarking = (e: KeyboardEvent) => {
	if (e.key !== 'Control' && e.key !== 'Meta') return;

	useMarkerStore().toggleMarking(false);
	log('Stop Marking', useMarkerStore().isMarking);
}
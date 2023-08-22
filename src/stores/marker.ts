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
		}
	}
})

export const startMarking = (e: KeyboardEvent) => {
	if (e.key !== 'Control' && e.key !== 'Meta') return;

	useMarkerStore().toggleMarking(true);
	log('startMarking', e.key);
}

export const stopMarking = (e: KeyboardEvent) => {
	if (e.key !== 'Control' && e.key !== 'Meta') return;

	useMarkerStore().toggleMarking(false);
	log('startMarking', e.key);
}
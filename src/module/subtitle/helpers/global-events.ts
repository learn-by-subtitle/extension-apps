import { startMarking, stopMarking } from "../../../stores/marker";

export function registerGlobalEvents() {
	document.addEventListener('keydown', startMarking);
	// document.addEventListener('keyup', stopMarking);
}

export function unregisterGlobalEvents() {
	// document.removeEventListener('keydown', startMarking);
	// document.removeEventListener('keyup', stopMarking);
}
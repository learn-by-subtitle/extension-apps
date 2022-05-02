document.addEventListener('keyup', (event) => {
	if (event.code != 'Space') return;

	let list = document.querySelectorAll('.player-timedtext-text-container span ')

	console.log(list.length);

	list.forEach(item => {
		if (item.childElementCount == 0) {
			console.log(item.textContent);
			createSpanForWords(item)
		}
	})
})

function createSpanForWords(parentTag) {
	let words = parentTag.textContent.split(' ');

	words.forEach(word => {
		word = `<span>${word}</span>`
	})
	
	parentTag.innerHTML = words.join(' ')
}
console.log('Learn by subtitle 0.0');

import { createApp } from "vue";
import components from './common/components/components';
import rootComponent from "./App.vue";
import { NetflixInitializer } from "./module/netflix/initializer";

let vueApp = createApp(rootComponent as any);

Object.keys(components).forEach(name => {
	let component = (components as any)[name]
	vueApp.component(name, component);
})

NetflixInitializer(vueApp);
// vueApp.mount("#app");

// document.addEventListener("keyup", (event) => {
//   if (event.code != "Space") return;

//   let list = document.querySelectorAll(
//     ".player-timedtext-text-container span "
//   );

//   console.log(list.length);

//   list.forEach((item) => {
//     if (item.childElementCount == 0) {
//       console.log(item.textContent);
//       createSpanForWords(item);
//     }
//   });
// });

// function createSpanForWords(parentTag: Element) {
//   let words = parentTag.textContent!.split(" ");

//   words.forEach((word, i) => {
//     words[i] = `<span class="word">${word}</span>`;
//   });

//   debugger;
//   parentTag.innerHTML = words.join(" ");
// }

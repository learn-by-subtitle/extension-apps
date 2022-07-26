console.log("Learn by subtitle added");

import { createApp } from "vue";
import components from './common/components/components';
import rootComponent from "./App.vue";

let appDiv = document.createElement("div");
document.body.append(appDiv);

appDiv.id = "app";
appDiv.style.position = "relative";
appDiv.style.zIndex = "9999";

let vueApp = createApp(rootComponent as any);

Object.keys(components).forEach(name => {
	let component = (components as any)[name]
	vueApp.component(name, component);
})

vueApp.mount("#app");

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

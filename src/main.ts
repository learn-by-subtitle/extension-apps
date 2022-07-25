console.log("Learn by subtitle added");

import { createApp } from "vue";
import rootComponent from "./App.vue";

let appDiv = document.createElement("div");
appDiv.id = "app";
appDiv.style.position = "relative";

document.body.append(appDiv);
createApp(rootComponent as any).mount("#app");

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

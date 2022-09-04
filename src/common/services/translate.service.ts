import {
  DefinitionStore,
  WordFromDictionaryApi,
} from "../types/dictionaryapi.type";

import { Dictionary } from "../types/general.type";
import { TinyEmitter } from "tiny-emitter";
import { SUPPORTED_LANGUES } from "../statics/langueges.static";

export class TranslateService {
  static instance = new TranslateService();

  _eventBus = new TinyEmitter();

  constructor() {
    // Load target language
    //
    chrome.storage.local.get("target", (data) => {
      this.targetLanguage = data.target || "fa";
      console.log("Defautl languges is", this.targetLanguage);
    });

    // Listen for change on target language
    //
    chrome.runtime.onMessage.addListener((message, sender) => {
      if (message.target) {
        console.log("Target languege changed", message.target);

        this.targetLanguage = message.target;
        localStorage.setItem("target", this.targetLanguage);

        this._eventBus.emit("target-changed", this.targetLanguage);
      }
    });
  }

  targetLanguage = "fa";

  get targetLanguageTitle() {
    return SUPPORTED_LANGUES.find(l => l.code == this.targetLanguage)?.title || "";
  }

  async translateByGoogle(text: string | string[]) {
    let key = "AIzaSyCzR9jH7EGCHgvfHXJxM0997UmuwiSRkH0";
    let url = `https://translation.googleapis.com/language/translate/v2?key=${key}`;

    let body = {
      q: text,
      target: this.targetLanguage,
    };

    return fetch(url, {
      body: JSON.stringify(body),
      method: "POST",
    })
      .then((res) => {
        if (res.status == 200) return res.json() as Promise<Dictionary>;
        else throw res;
      })
      .then((body: Dictionary) => body.data.translations)
      .then((list) => {
        let lang = "en";
        let newList = list.map(
          (item: { translatedText: string; detectedSourceLanguage: string }) =>
            item.translatedText
        ) as string[];

        return {
          lang,
          list: newList,
        };
      });
  }

  async translateByDictionaryapi(word: string) {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    url += encodeURI(word);

    return fetch(url)
      .then((res) => res.json())
      .then((body) => {
        if (body.title) throw body;
        else return body as WordFromDictionaryApi[];
      })
      .then((list) => {
        let store = new DefinitionStore(list);
        return store;
      });
  }

  addTargetChangeListerner(callback: (lang: string) => void) {
    this._eventBus.on("target-changed", callback);
  }

  removeTargetChangeListerner(callback: (lang: string) => void) {
    this._eventBus.off("target-changed", callback);
  }
}

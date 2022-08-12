import { Dictionary } from "../types/general.type";

export class TranslateService {
  static instance = new TranslateService();

  targetLanguage = "fa";

  async translate(text: string | string[]) {
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
      .then((res) => res.json() as Promise<Dictionary>)
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
}

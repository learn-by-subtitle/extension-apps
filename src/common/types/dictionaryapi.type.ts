export interface License {
  name: string;
  url: string;
}

export interface Phonetic {
  text: string;
  audio: string;
  sourceUrl: string;
  license: License;
}

export interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

export interface License2 {
  name: string;
  url: string;
}

export interface WordFromDictionaryApi {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License2;
  sourceUrls: string[];
}

export class DefinitionStore {
  word: string = "";
  phonetic: string = "";
  meanings: Meaning[] = [];

  constructor(list: WordFromDictionaryApi[]) {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];

      if (element.word.length) this.word = element.word;
      if (element.phonetic && element.phonetic.length)
        this.phonetic = element.phonetic;

      for (let i2 = 0; i2 < element.meanings.length; i2++) {
        const meaning = element.meanings[i2];

        let index = this.meanings.findIndex(
          (item) => item.partOfSpeech == meaning.partOfSpeech
        );

        if (index > -1) {
          this.meanings[index].definitions.concat(meaning.definitions);
        } else {
          this.meanings.push(meaning);
        }
      }
    }

    console.log(this);
  }

  get partsOfSpeech() {
    return this.meanings.map((item) => item.partOfSpeech);
  }

  getPartOfSpeech(part: string) {
    return this.meanings.find((item) => item.partOfSpeech == part) as Meaning;
  }
}

import { TranslateService } from "../services/translate.service";

export function cleanText(text: string) {
  [
    "\\",
    ".",
    "+",
    "*",
    "?",
    "؟",
    "[",
    "^",
    "]",
    "$",
    "(",
    ")",
    "{",
    "}",
    "=",
    "!",
    "<",
    ">",
    "|",
    ":",
    "-",
  ].forEach((remove) => {
    text = text.replaceAll(remove, " ");
  });

  return text.trim();
}

export const rtls = [
  "ar",
  "arc",
  "dv",
  "fa",
  "ha",
  "he",
  "khw",
  "ks",
  "ku",
  "ps",
  "ur",
  "yi",
];

export function getDir() {
  let dir =
    rtls.indexOf(TranslateService.instance.targetLanguage) != -1
      ? "rtl"
      : "ltr";

  return dir;
}

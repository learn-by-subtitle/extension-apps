export function cleanText(text: string) {
  ["[", "]", ".", ",", "!"].forEach((remove) => {
    text = text.replaceAll(remove, " ");
  });

  return text.trim();
}

export const clone = function (object: Object) {
  let cloned: Object;
  let type = typeof object;

  if (type == "object") {
    try {
      cloned = JSON.parse(JSON.stringify(object));
    } catch (error) {
      cloned = {};
    }
  }

  // It may be a simple value except object
  // so it should be return simply
  else cloned = object;

  return cloned;
};

export function mapStyleString(style: string){
  let map = {};
  let styleParts = style?.split(";") as string[];

  for (let i = 0; i < styleParts.length; i++) {
    const stylePart = styleParts[i];
    if (!stylePart.length) continue;

    let key = stylePart.split(":")[0];
    let value = stylePart.split(":")[1];

    map[key.trim()] = value.trim();
  }

  return map;
}

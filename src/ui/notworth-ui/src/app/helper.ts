export function copy(object: Object) {
  return JSON.parse(JSON.stringify(object));
}

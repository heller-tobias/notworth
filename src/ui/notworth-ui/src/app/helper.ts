export function copy(object: Object) {
  console.log(object);
  return JSON.parse(JSON.stringify(object));
}

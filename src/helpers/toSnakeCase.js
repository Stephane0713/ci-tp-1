export function toSnakeCase(string) {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[A-Z]/g, "")
    .replace(/\s+/g, "_");
}

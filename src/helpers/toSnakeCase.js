/**
 * Converts a string to snake_case format.
 *
 * @function
 * @param {string} string - The input string to be converted.
 * @returns {string} The string converted to snake_case.
 */
export function toSnakeCase(string) {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[A-Z]/g, "")
    .replace(/\s+/g, "_");
}

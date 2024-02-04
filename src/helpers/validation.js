const REGEX_NAME = /^[A-Za-zÀ-ÿ\-]{2,}$/g;
const REGEX_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
const REGEX_ZIP = /^[0-9]{5}$/g;
const REGEX_DATE = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const AGE_MAJOR = 18;

/**
 * Checks if name is valid
 *
 * @param {string} name
 * @return {boolean}
 */
export function isValidName(name) {
  return !!name.match(REGEX_NAME);
}

/**
 * Checks if email is valid
 *
 * @param {string} email
 * @return {boolean}
 */
export function isValidEmail(email) {
  return !!email.match(REGEX_EMAIL);
}

/**
 * Checks if zip code is valid
 *
 * @param {string|number} code
 * @return {boolean}
 */
export function isValidZipCode(code) {
  return !!code.match(REGEX_ZIP);
}

/**
 * Checks if date is valid
 *
 * @param {string} date
 * @return {boolean}
 */
export function isValidDate(date) {
  return !!date.match(REGEX_DATE);
}

/**
 * Checks if age is above AGE_MAJOR constant
 * @param {string|number} age
 * @return {boolean}
 */
export function isMajor(age) {
  return age >= AGE_MAJOR;
}

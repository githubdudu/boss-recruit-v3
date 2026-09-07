export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}
/**
 * Capitalizes the first letter of a string.
 * If the string is undefined or empty, it returns an empty string.
 * @param str - The string to capitalize.
 * @returns The string with the first letter capitalized, or an empty string if the input is undefined or empty.
 */
export function capitalizeFirstLetter(str: string | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

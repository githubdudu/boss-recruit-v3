export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export function capitalizeFirstLetter(str: string | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

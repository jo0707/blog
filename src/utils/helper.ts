export function formatDate(date: string | Date): string {
  if (!date) return 'Unknown date';

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
}

export function postSlug(id: string): string {
  return id.replace(/^\d+\.?/, '');
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function postUrl(id: string): string {
  return `/blogs/${postSlug(id)}/`;
}

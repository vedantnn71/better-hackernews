export function trimUrl(url: string) {
  return url.replace(/https?:\/\/(www\.)?/, '').replace(/\/.*/, '');
}


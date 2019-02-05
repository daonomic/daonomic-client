const tokenMatchingRegexp = /password\s<b>([^<]+)<\/b>/;

export function extractPasswordFromLetter(letterContent) {
  const [, password] = letterContent.match(tokenMatchingRegexp) || [];

  return password;
}

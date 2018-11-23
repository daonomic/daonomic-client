const tokenMatchingRegexp = /href="http[^"]+sign\/create-new-password\/([^"]+)"/;

export function extractTokenFromLetter(letterContent) {
  const [, token] = letterContent.match(tokenMatchingRegexp) || [];

  return token;
}

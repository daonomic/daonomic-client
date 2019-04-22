const tokenMatchingRegexp = /href="http[^"]+sign\/create-new-password\/([^"]+)"/;

export const extractTokenFromLetter = (letterContent) => {
  const [, token] = letterContent.match(tokenMatchingRegexp) || [];

  return token;
};

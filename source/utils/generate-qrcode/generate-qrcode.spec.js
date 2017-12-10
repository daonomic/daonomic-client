import generateQRCode from './';

describe('QRCode generator', () => {
  const promises = [
    {
      original: '9999',
      code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKnSURBVO3BQW7sWAwEwSxC979yjpdcPUCQ2tOfZkT8wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw8l4TepvCkJnUqXhN+k8kSxRinWKMUa5eJlKm9KwkkSOpUuCZ1Kp3KHypuS8KZijVKsUYo1ysWHJeEOlSeScJKEE5U7knCHyicVa5RijVKsUS7+GJUuCZMUa5RijVKsUS6GUzlRmaRYoxRrlGKNcvFhKt8sCZ3KHSrfpFijFGuUYo1y8bIk/J9UuiR0Kk8k4ZsVa5RijVKsUeIP/pAkdCqTFGuUYo1SrFEuPiwJncpJEt6kcpKEE5UuCW9SeVOxRinWKMUa5eJlSehUuiTcodIloVN5k0qXhE7ljiScJKFTeaJYoxRrlGKNcvEylROVLgmdSpeEJ5JwRxI6lTepdEl4U7FGKdYoxRrl4mVJOFE5SUKncpKETuUOlSeS0Kl0Kr+pWKMUa5RijRJ/8KIk3KHSJeEOlS4JJypdEk5U7kjCiconFWuUYo1SrFEuXqbyhModSehUuiTcodIl4UTljiScqDxRrFGKNUqxRrl4KAm/SeUkCSdJeFMSTlS6JHxSsUYp1ijFGuXiZSpvSsITKl0SOpUuCZ1Kl4ROpUtCl4QTlTcVa5RijVKsUS4+LAl3qNyhcpKETuVNSXgiCZ3KE8UapVijFGuUiz8mCScqJyrfrFijFGuUYo1y8Y9LwolKl4RO5SQJncodSbhD5YlijVKsUYo1ysWHqXySSpeEE5WTJHQqJ0noVDqVLgmdypuKNUqxRinWKBcvS8I3ScIdKneonCThJAmdyhPFGqVYoxRrlPiDNUaxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFH+A7hQAPWGS0VEAAAAAElFTkSuQmCC',
    },
    {
      original: 'string',
      code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKfSURBVO3BQW7kQAwEwUxC//9yrY88NSBIY88SjDA/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4iGV35SETuUkCZ1Kl4QTld+UhCeKNUqxRinWKBcvS8KbVN6UhE6lS8JJEt6k8qZijVKsUYo1ysWHqdyRhDepdEl4k8odSfikYo1SrFGKNcrFfy4JJyqdSpeESYo1SrFGKdYoxRqlWKMUa5RijXLxYUn4JJW/lIRvUqxRijVKsUa5eJnKX0pCp9IloVPpknCi8s2KNUqxRinWKBcPJeGbqLwpCf+TYo1SrFGKNcrFh6nckYROpUvCSRI6lTtU7kjCicodSXiiWKMUa5RijXLxkMqbVLokdCpdEjqVLgl3JOFE5UTlLxVrlGKNUqxRLl6WhBOVO1TepPJEEjqVLgmdykkS3lSsUYo1SrFGMT94QKVLQqfSJeEJlSeS0Kl8kyQ8UaxRijVKsUa5+HIqXRI6lZMknCThRKVLQqdykoTfVKxRijVKsUYxP/iPqZwkoVPpknCHSpeEE5U7kvBEsUYp1ijFGuXiIZXflIQuCScqXRI6lS4JncoTSehUuiS8qVijFGuUYo1y8bIkvEnlDpUTlROVkyR0KnckoVPpkvBEsUYp1ijFGuXiw1TuSMIdKl0STlROktCpnCThDpUuCW8q1ijFGqVYo1wMp3KShJMkdConSThJwicVa5RijVKsUS6GUXlC5SQJJyonSfikYo1SrFGKNcrFhyXhk5Jwh0qn0iWhU+lUvlmxRinWKMUa5eJlKn9J5SQJTyShU+mScKLSJeFNxRqlWKMUaxTzgzVGsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxR/gH3yO78aomP2AAAAABJRU5ErkJggg==',
    },
  ].map(({ original, code }) => (
    generateQRCode(original)
      .then((result) => {
        expect(result).toBe(code);
      })
  ));

  test('success QRCode generation', (done) => {
    Promise.all(promises)
      .then(() => {
        done();
      });
  });
});

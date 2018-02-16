import listToHash from './';

describe('listToHash', () => {
  const testList = [
    { id: 1, letter: 'a' },
    { id: 2, letter: 'b' },
    { id: 3, letter: 'c' },
  ];
  const getId = (object) => object.id;
  const getLetter = (object) => object.letter;

  test('should be curried', () => {
    expect(typeof listToHash()).toEqual('function');
    expect(typeof listToHash()()).toEqual('object');
    expect(typeof listToHash('id')(testList)).toEqual('object');
    expect(typeof listToHash('id', getLetter)(testList)).toEqual('object');
  });

  test('should transform list to object according to specified key and value selectors', () => {
    expect(listToHash('id')(testList)).toEqual({
      1: testList[0],
      2: testList[1],
      3: testList[2],
    });

    expect(listToHash('id', getLetter)(testList)).toEqual({
      1: 'a',
      2: 'b',
      3: 'c',
    });

    expect(listToHash('letter', getId)(testList)).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});

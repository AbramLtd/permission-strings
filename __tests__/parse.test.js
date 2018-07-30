const parse = require('../src/parse');

test('parse permissions correctly', () => {
  expect(parse('user:get,put:*')).toEqual({
    resource: 'user',
    actions: ['get', 'put'],
    ids: ['*'],
  });
  expect(parse('user:*:*')).toEqual({
    resource: 'user',
    actions: ['*'],
    ids: ['*'],
  });
  expect(parse('user:get:1')).toEqual({
    resource: 'user',
    actions: ['get'],
    ids: ['1'],
  });
  expect(parse('user:*:1,2')).toEqual({
    resource: 'user',
    actions: ['*'],
    ids: ['1', '2'],
  });
  expect(parse('user:get,post:1,2')).toEqual({
    resource: 'user',
    actions: ['get', 'post'],
    ids: ['1', '2'],
  });
});

test('throws errors on invalid permissions', () => {
  expect(() => {
    parse('');
  }).toThrow();
  expect(() => {
    parse(undefined);
  }).toThrow();
  expect(() => {
    parse('a:3');
  }).toThrow();
});

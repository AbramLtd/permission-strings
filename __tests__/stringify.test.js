const stringify = require('../src/stringify');

test('stringify permission objects correctly', () => {
  expect(stringify({ resource: 'user', actions: [], ids: [] })).toEqual('user:*:*');
  expect(stringify({ resource: 'user', actions: ['get'], ids: [] })).toEqual('user:get:*');
  expect(stringify({ resource: 'user', actions: ['get', 'post'], ids: [] })).toEqual('user:get,post:*');
  expect(stringify({ resource: 'user', actions: [], ids: ['1'] })).toEqual('user:*:1');
  expect(stringify({ resource: 'user', actions: [], ids: ['1', '7'] })).toEqual('user:*:1,7');

  expect(stringify({ resource: 'user', actions: ['get'], ids: ['1'] })).toEqual('user:get:1');
  expect(stringify({ resource: 'user', actions: ['get', 'put'], ids: ['1'] })).toEqual('user:get,put:1');
  expect(stringify({ resource: 'user', actions: ['get'], ids: ['1', '2'] })).toEqual('user:get:1,2');
  expect(stringify({ resource: 'user', actions: ['get', 'put', 'delete'], ids: ['1', '2', '4', '7'] })).toEqual('user:get,put,delete:1,2,4,7');
});

test('throws errors on invalid permission objects', () => {
  expect(() => {
    stringify({});
  }).toThrow();
  expect(() => {
    stringify(undefined);
  }).toThrow();
  expect(() => {
    stringify({ resource: 'user' });
  }).toThrow();
  expect(() => {
    stringify({ resource: 'user', actions: 3 });
  }).toThrow();
  expect(() => {
    stringify({ resource: 'user', actions: [], ids: 3 });
  }).toThrow();
});

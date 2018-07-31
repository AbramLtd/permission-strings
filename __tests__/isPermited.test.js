const isPermited = require('../');

test('it is permited', () => {
  expect(isPermited(['user:get:1'], ['user:get:1'])).toEqual(true);
  expect(isPermited(['user:get:1'], ['apple:get:1'])).toEqual(false);
  expect(isPermited(['user:get:*'], ['user:get:1'])).toEqual(true);
  expect(isPermited(['user:*:*'], ['user:get:1'])).toEqual(true);
  expect(isPermited(['user:get:1'], ['user:post:1'])).toEqual(false);
  expect(isPermited(['user:get,post:1'], ['user:post:1'])).toEqual(false);
});

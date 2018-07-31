const create = require('../src/permissionTree');

test('creates permission tree correctly', () => {
  expect(create('user:get,post:1,2')).toEqual({ user: { get: ['1', '2'], post: ['1', '2'] } });
  expect(create('user:get:1,2', 'user:post:1,2')).toEqual({ user: { get: ['1', '2'], post: ['1', '2'] } });
  expect(create('user:*:*')).toEqual({ user: { '*': ['*'] } });
  expect(create('user:get:*', 'user:get:1')).toEqual({ user: { get: ['*'] } });
  expect(create('user:get:1', 'user:get:*')).toEqual({ user: { get: ['*'] } });
  expect(create('user:*:2', 'user:*:1')).toEqual({ user: { '*': ['1', '2'] } });
  expect(create('user:*:2', 'user:get:1', 'user:post:3', 'user:delete:4')).toEqual({
    user: {
      '*': ['2'], get: ['1'], post: ['3'], delete: ['4'],
    },
  });
  expect(create('user:*:2', 'user:get,post,delete:1', 'user:post:3', 'user:delete:4')).toEqual({
    user: {
      '*': ['2'], get: ['1'], post: ['1', '3'], delete: ['1', '4'],
    },
  });
  expect(create('user:*:1', 'user:get,post,delete:1,2', 'user:post:3', 'user:delete:4')).toEqual({
    user: {
      '*': ['1'], get: ['2'], post: ['2', '3'], delete: ['2', '4'],
    },
  });
});

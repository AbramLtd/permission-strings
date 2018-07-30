const create = require('../src/permissionTree');

test('creates permission tree correctly', () => {
  expect(create('user:*:*')).toEqual({ user: { '*': ['*'] } });
  expect(create('user:post:*')).toEqual({ user: { post: ['*'] } });
  expect(create('user:*:1,2,3')).toEqual({ user: { '*': ['1', '2', '3'] } });
  expect(create('user:*:1,2,3', 'user:*:2,3,4')).toEqual({ user: { '*': ['1', '2', '3', '4'] } });
  expect(create('user:*:1,2,3', 'user:*:*', 'user:*:2,3,4')).toEqual({ user: { '*': ['*'] } });
});

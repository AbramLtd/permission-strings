const parse = require('./parse');

function create(...permissionStrings) {
  const permissions = permissionStrings.map(permission => parse(permission));
  const permissionTree = {};
  permissions.forEach(({ resource, actions, ids }) => {
    if (!(resource in permissionTree)) {
      permissionTree[resource] = {};
    }
    if (!(actions in permissionTree[resource])) {
      permissionTree[resource][actions] = [];
    }
    const idsArray = Array.from(
      new Set(permissionTree[resource][actions].concat(ids.map(t => t.toString()))),
    ).sort();
    if (idsArray.includes('*')) {
      permissionTree[resource][actions] = ['*'];
    } else {
      permissionTree[resource][actions] = idsArray;
    }
  });
  return permissionTree;
}

module.exports = create;

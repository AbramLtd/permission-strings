const parse = require('./parse');


function create(...permissionStrings) {
  const permissions = permissionStrings.map(permission => parse(permission));
  const permissionTree = {};
  permissions.forEach(({ resource, actions, ids }) => {
    if (!permissionTree[resource]) permissionTree[resource] = {};
    if (permissionTree[resource]['*'] && permissionTree[resource]['*'].includes('*')) return;
    actions.forEach((action) => {
      if (!permissionTree[resource][action]) permissionTree[resource][action] = [];
      if (permissionTree[resource][action].includes('*')) return;
      if (ids.includes('*')) {
        permissionTree[resource][action] = ['*'];
      } else {
        ids.forEach((id) => {
          if (permissionTree[resource]['*'] && permissionTree[resource]['*'].includes(id)) return;
          permissionTree[resource][action].push(id);
        });
      }
      permissionTree[resource][action].sort();
    });
  });
  return permissionTree;
}

module.exports = create;

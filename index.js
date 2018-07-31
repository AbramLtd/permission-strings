const create = require('./src/permissionTree');

function resolveToArray(value) {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}


function isPermited(permitedPermissionStrings, testingPermissionStrings) {
  if (!testingPermissionStrings) {
    throw Error('provide permission string for testing as first argument');
  }
  if (!permitedPermissionStrings) {
    throw Error('provide permission string that are permitted as second argument');
  }
  const permits = create(...resolveToArray(permitedPermissionStrings));
  const permissions = create(...resolveToArray(testingPermissionStrings));

  if (permits['*'] && permits['*']['*'] && permits['*']['*'].includes('*')) {
    return true;
  }

  return Object.keys(permits).every((resource) => {
    if (permissions[resource] && permits[resource]['*'] && permits[resource]['*'].includes('*')) {
      return true;
    }
    return Object.keys(permits[resource]).every((action) => {
      if (permissions[resource] && permissions[resource][action] && permits[resource][action].includes('*')) {
        return true;
      }
      return permits[resource][action].every((id) => {
        if (
          permissions[resource]
          && permissions[resource][action]
          && permissions[resource][action].includes(id)
        ) {
          return true;
        }
        return false;
      });
    });
  });
}

module.exports = isPermited;

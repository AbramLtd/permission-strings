const create = require('./src/permissionTree');

function resolveToArray(value) {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}


function isPermited(testingPermissionStrings, permitedPermissionStrings) {
  if (!testingPermissionStrings) {
    throw Error('provide permission string for testing as first argument');
  }
  if (!permitedPermissionStrings) {
    throw Error('provide permission string that are permitted as second argument');
  }
  const permits = create(...resolveToArray(permitedPermissionStrings));
  const permissions = create(...resolveToArray(testingPermissionStrings));

  console.log(permits, permissions);
}

module.exports = isPermited;

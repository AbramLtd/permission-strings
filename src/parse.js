function parse(permissionString) {
  if (!permissionString || typeof permissionString !== 'string') throw new Error('Invalid permission string');
  const [resource, actions, ids] = permissionString.split(':');
  if (!resource || !actions || !ids) throw new Error('Invalid permission string parameters');
  const result = {};
  result.resource = resource;
  result.actions = [];
  if (actions) {
    const actionsArray = actions.split(',');
    if (actionsArray.every(action => action !== '*' && action !== undefined)) {
      result.actions = actionsArray;
    } else {
      result.actions = ['*'];
    }
  }
  result.ids = [];
  if (ids) {
    const idsArray = ids.split(',');
    if (idsArray.every(id => id !== '*' && id !== undefined)) {
      result.ids = idsArray;
    } else {
      result.ids = ['*'];
    }
  }
  return result;
}

module.exports = parse;

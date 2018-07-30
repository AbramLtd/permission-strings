function stringify({ resource, actions, ids }) {
  if (!resource) throw new Error('Invalid resource');
  if (!actions || !Array.isArray(actions)) throw new Error('Invalid actions');
  if (!ids || !Array.isArray(ids)) throw new Error('Invalid ids');
  return `${resource}:${actions.length > 0 ? actions.join(',') : '*'}:${ids.length > 0 ? ids.join(',') : '*'}`;
}

module.exports = stringify;

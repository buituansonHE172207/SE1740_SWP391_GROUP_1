export const getPath = (object: any, search: string): any => {
  if (object?.path === search) return [object.key];
  else if (object.children || Array.isArray(object)) {
    let children = Array.isArray(object) ? object : object.children;
    for (let child of children) {
      let result = getPath(child, search);
      if (result) {
        if (object.path) result.unshift(object.key);
        return result;
      }
    }
  }
};

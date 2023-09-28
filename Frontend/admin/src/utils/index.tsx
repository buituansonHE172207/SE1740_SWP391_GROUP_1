export const getPath = (object: any, search: string): any => {
    if (object?.path === search) return [object.key];
    else if (object.subMenu || Array.isArray(object)) {
      let subMenu = Array.isArray(object) ? object : object.subMenu;
      for (let child of subMenu) {
        let result = getPath(child, search);
        if (result) {
          if (object.path) result.unshift(object.key);
          return result;
        }
      }
    }
  };
export const checkUserPermission = (
    acceptPermissions: Array<string> = [],
    currentPermissions: Array<string> = [],

  ): boolean => {
    // không truyền vào quyền nào => được phép truy cập
    // if (!acceptPermissions || (Array.isArray(acceptPermissions) && acceptPermissions.length === 0)) {
    //   return true;
    // }
  
    // // kiểm tra quyền truy cập của use nếu chưa có hoặc không chưa quyền nào => không cho truy cập
    // if (!Array.isArray(currentPermissions) || currentPermissions?.length === 0) {
    //   return false;
    // }
  
    // // admin_all => full quyền => được phép truy cập
    // if (Array.isArray(currentPermissions) && currentPermissions?.includes(AdminPermission.all)) {
    //   return true;
    // }
  
    return false;
  };
import { useCallback } from "react";

type AuthRouteProps = {
  permissions?: string[];
  children: React.ReactNode;
};

const AuthRoute = ({ permissions, children }: AuthRouteProps) => {
  const content = useCallback(() => {
    return (
      //   <AuthWrapper acceptPermissions={permissions} passThrough>
      //     {(allowed: boolean, isLoadingUserPermission: boolean) =>
      //       isLoadingUserPermission ? (
      //         <SplashScreen />
      //       ) : allowed ? (
      <>{children}</>
      //           ) : (
      //             <NoPermission />
      //           )
      //         }
      //       </AuthWrapper>
      // );
    );
  }, [children]);

  return <>{content()}</>;
};

export default AuthRoute;

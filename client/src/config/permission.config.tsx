// const PermissionConfig=({children}:any)=>{
// return  children

// }
// export default PermissionConfig


import React, { Suspense } from 'react';

const PermissionConfig = ({ children }: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default PermissionConfig;



import  { Suspense } from 'react';

const PermissionConfig = ({ children }: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default PermissionConfig;

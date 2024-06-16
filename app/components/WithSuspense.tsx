import React, { Suspense } from 'react';

const WithSuspense = <P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = <div>Loading...</div>
) => {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default WithSuspense;

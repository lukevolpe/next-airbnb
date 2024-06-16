import React, { Suspense } from 'react';

const WithSuspense = <P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = <div>Loading...</div>
) => {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `WithSuspense(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
};

export default WithSuspense;

import React, { Suspense } from 'react';
import LoadingSpinner from '../UIElements/LoadingSpinner';

/**
 * LazyRoute component for wrapping lazy-loaded components
 * Provides consistent loading states and error boundaries
 */
const LazyRoute = ({ children, fallback }) => {
  const defaultFallback = (
    <div className="center fade-in" style={{ minHeight: '50vh' }}>
      <LoadingSpinner />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export default LazyRoute;

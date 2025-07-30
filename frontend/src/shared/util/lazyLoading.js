import { lazy } from 'react';

/**
 * Utility functions for lazy loading with retry mechanism
 * Handles network failures and provides better user experience
 */

// Retry function for failed lazy imports
const retry = (fn, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // No more retries left
            reject(error);
            return;
          }
          
          // Try again
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

// Enhanced lazy loading with retry mechanism
export const lazyWithRetry = (componentImport) => {
  return lazy(() => retry(componentImport));
};

// Preload function for critical routes
export const preloadRoute = (routeComponent) => {
  const componentImport = routeComponent;
  if (typeof componentImport === 'function') {
    componentImport();
  }
};

// Lazy load with chunk names for better debugging
export const lazyWithChunkName = (importFn, chunkName) => {
  return lazy(() => 
    importFn().then(module => {
      // Add chunk name for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`Loaded chunk: ${chunkName}`);
      }
      return module;
    })
  );
};

export default {
  lazyWithRetry,
  preloadRoute,
  lazyWithChunkName
};

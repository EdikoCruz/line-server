const cache = {};

type CacheItem<T> = {
  instance: T;
  promise: Promise<T> | null;
  error: Error;
};

function getItem(key) {
  if (!cache[key]) {
    cache[key] = {
      instance: null,
      promise: null,
      error: null,
    };
  }
  return cache[key];
}

export function getInstance<T>(
  key: string,
  asyncFactoryFuntion: () => Promise<T>
) {
  const cacheItem: CacheItem<T> = getItem(key);

  return new Promise((resolve, reject) => {
    // cached
    if (cacheItem.instance) {
      resolve(cacheItem.instance);
      return;
    }

    // not cached but requested
    if (cacheItem.promise !== null) {
      (cacheItem.promise as Promise<T>).then(resolve).catch(reject);
      return;
    }

    // already got error
    if (cacheItem.error) {
      reject(cacheItem.error);
      return;
    }

    cacheItem.promise = asyncFactoryFuntion();
    cacheItem.promise
      .then((instance) => {
        cacheItem.instance = instance;
        cacheItem.promise = null;
        resolve(instance);
      })
      .catch((error) => {
        cacheItem.error = error;
        cacheItem.promise = null;
        reject(error);
      });
  });
}

const memoize = <T>(factory: T): T => {
  let cache = new Map();

  return ((...args: any) => {
    let cacheKey = args.toString();
    if (!cache.has(cacheKey)) cache.set(cacheKey, (factory as Function)(args));
    return cache.get(cacheKey);
  }) as T;
};

export default memoize;

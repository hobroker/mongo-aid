async function createBucket(name, storage) {
  return storage.createBucket(name).then(([bucket]) => bucket);
}

async function findBucket(name, storage) {
  const [buckets] = await storage.getBuckets();

  return buckets.find(bucket => bucket.name === name);
}

const getBucket = async (bucketName, storage) => {
  const bucket = await findBucket(bucketName, storage);

  if (bucket) {
    return bucket;
  }

  return createBucket(bucketName, storage);
};

export default getBucket;

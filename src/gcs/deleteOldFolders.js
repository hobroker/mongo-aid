/**
 * @param {number} keepCount
 * @param {Bucket} bucket
 * @returns {Promise<void>}
 */
const deleteOldFolders = async (keepCount, bucket) => {
  const files = await bucket.getFiles({delimiter: "/", autoPaginate: false});
  const oldPrefixes = files[2].prefixes.slice(0, -keepCount);

  await Promise.all(oldPrefixes.map(async prefix => {
    try {
      await bucket.deleteFiles({prefix});
      console.log("deleted", prefix);
    } catch (e) {
      console.error("failed to delete", prefix, e);
    }
  }));
};

export default deleteOldFolders;

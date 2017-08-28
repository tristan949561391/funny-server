const Pool_mongo = require('../../pool/mongo');
module.exports = {
  /**
   * @param pageAble
   * @returns {Promise.<Cursor>}
   */
  getJokers: async (pageAble, filter, sort) => {
    let db = await Pool_mongo.acquire();
    let collection = db.collection('jokes');
    let skip = (pageAble.pageNum - 1) * pageAble.pageSize;
    let jokers = await collection.find(filter).sort(sort).skip(skip).limit(pageAble.pageSize).toArray();
    Pool_mongo.release(db);
    return jokers;
  }
};

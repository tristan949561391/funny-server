const Pool_mongo = require('../../pool/mongo');
const ObjectId = require('mongodb').ObjectID;
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
  },

  getJokerTypes: async () => {
    let db = await Pool_mongo.acquire();
    let collection = db.collection('joke-types');
    let jokers = await collection.find({}).toArray();
    Pool_mongo.release(db);
    return jokers;
  },
  praiseJoker: async (_id) => {
    let db = await Pool_mongo.acquire();
    let collection = db.collection('jokes');
    let fileter = {_id: ObjectId(_id)};
    let jokers = await collection.updateOne(fileter, {$inc: {praise: 1}});
    jokers = await collection.findOne(fileter);
    Pool_mongo.release(db);
    return jokers;
  }
};

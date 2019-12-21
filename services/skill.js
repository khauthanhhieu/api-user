const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/learning';

class SkillService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    const db = await MongoClient.connect(url);
    try {
      const skillCollection = db.collection("skills");
      const list = await skillCollection.find().toArray()
      console.log(list)

      return this.res.json({
        isSuccess: true,
        skills: list,
      })
    } catch (err) {
      console.log(err)
      return this.res.status(503).json({
        isSuccess: false,
      })
    } finally {
      db.close()
    }
  }
}

module.exports = SkillService;